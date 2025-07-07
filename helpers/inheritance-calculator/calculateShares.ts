import { Heir, HeirType, ShareResult } from "./types";

type ShareMap = Partial<Record<HeirType, number>>;

export default class InheritanceCalculator {
  private heirs: Heir[];
  private estate: number;
  private shares: ShareMap = {};
  private present: Partial<Record<HeirType, number>> = {};
  private blocked: Partial<Record<HeirType, boolean>> = {};

  constructor(heirs: Heir[], estate: number) {
    this.heirs = heirs;
    this.estate = estate;
    heirs.forEach((h) => {
      this.present[h.type] = (this.present[h.type] || 0) + h.count;
    });
  }

  public calculate(): ShareResult[] {
    this.shares = {};
    this.ensureNoSpouseConflict();
    this.determineBlocks();
    const eligibleHeirs = Object.entries(this.present).filter(
      ([type, count]) => count! > 0 && !this.blocked[type as HeirType]
    );

    if (eligibleHeirs.length === 1) {
      const [soleType, count] = eligibleHeirs[0];
      const sharePer = 1 / count!;
      this.shares[soleType as HeirType] = sharePer;
      return this.buildResults();
    }
    this.calculateFixedShares();
    this.applyAwlIfNeeded();

    const remaining = this.estate * (1 - this.sum(this.shares));
    if (remaining > 0) this.allocateAsaba(remaining);

    this.applyRaddIfNeeded();
    return this.buildResults();
  }

  private ensureNoSpouseConflict() {
    if (this.present["husband"] && this.present["wife"]) {
      throw new Error("لا يمكن وجود زوج وزوجة معًا.");
    }
  }

  private determineBlocks() {
    const p = this.present;
    const b = this.blocked;

    const block = (...types: HeirType[]) => types.forEach((t) => (b[t] = true));

    const hasMaleDescendants = !!p["son"] || !!p["son_son"];

    if (p["father"]) {
      block(
        "full_brother",
        "full_sister",
        "paternal_brother",
        "paternal_sister",
        "grandfather"
      );
    }

    if (
      (p["father"] || hasMaleDescendants) &&
      !p["full_brother"] &&
      !p["full_sister"]
    ) {
      block(
        "full_brother",
        "full_sister",
        "paternal_brother",
        "paternal_sister"
      );
    }

    if (p["mother"]) {
      block("paternal_grandmother", "maternal_grandmother");
    }

    if (p["full_uncle"] || p["paternal_uncle"]) {
      block(
        "son_of_full_uncle",
        "son_of_paternal_uncle",
        "son_of_full_brother",
        "son_of_paternal_brother"
      );
    }

    if (p["son"]) {
      block("son_son", "son_daughter");
    }

    if (hasMaleDescendants) {
      block(
        "son_of_full_uncle",
        "son_of_paternal_uncle",
        "son_of_full_brother",
        "son_of_paternal_brother"
      );
    }

    if (
      p["daughter"] &&
      p["son_daughter"] &&
      p["daughter"] >= 2 &&
      !p["son_son"]
    ) {
      b["son_daughter"] = true;
    }
  }

  private calculateFixedShares() {
    const p = this.present;
    const s = this.shares;

    const hasChild =
      !!p["son"] || !!p["daughter"] || !!p["son_son"] || !!p["son_daughter"];

    // Spouses
    if (p["wife"]) s["wife"] = hasChild ? 1 / 8 : 1 / 4;
    if (p["husband"]) s["husband"] = hasChild ? 1 / 4 : 1 / 2;

    // Mother
    if (p["mother"]) {
      const siblings =
        (p["full_brother"] || 0) +
        (p["full_sister"] || 0) +
        (p["paternal_brother"] || 0) +
        (p["paternal_sister"] || 0);
      s["mother"] = hasChild || siblings >= 2 ? 1 / 6 : 1 / 3;
    }

    // Father/Grandfather
    if (p["father"] && hasChild) {
      s["father"] = 1 / 6;
    } else if (p["grandfather"] && hasChild && !this.blocked["grandfather"]) {
      s["grandfather"] = 1 / 6;
    }

    // Special case: daughter + son_daughter only
    if (
      p["daughter"] === 1 &&
      p["son_daughter"] === 1 &&
      !this.hasOtherHeirs(["daughter", "son_daughter"])
    ) {
      s["daughter"] = 3 / 4;
      s["son_daughter"] = 1 / 4;
      return;
    }

    // Daughters
    if (!p["son"] && p["daughter"]) {
      const count = p["daughter"];
      const hasSonSon = !!p["son_son"];
      const hasSonDaughter =
        !!p["son_daughter"] && !this.blocked["son_daughter"];

      s["daughter"] = count === 1 ? 1 / 2 : 2 / 3;
      if (!hasSonSon && !hasSonDaughter) {
        s["daughter"] = count === 1 ? 1 / 2 : 2 / 3;
      }
    }

    // Son's daughters
    if (!p["son"] && p["son_daughter"] && !this.blocked["son_daughter"]) {
      const count = p["son_daughter"];
      const hasDaughter = !!p["daughter"];

      if (hasDaughter) {
        s["son_daughter"] = p["daughter"] === 1 ? 1 / 6 : 0;
        if ((p["daughter"] ?? 0) > 1) this.blocked["son_daughter"] = true;
      } else {
        s["son_daughter"] = count === 1 ? 1 / 2 : 2 / 3;
      }
    }

    // Sisters
    ["full_sister", "paternal_sister"].forEach((type) => {
      if (
        p[type as HeirType] &&
        !this.blocked[type as HeirType] &&
        !p["son"] &&
        !p["daughter"] &&
        !p["son_daughter"] &&
        !p["son_son"] &&
        !p[type.replace("sister", "brother") as HeirType]
      ) {
        s[type as HeirType] = p[type as HeirType]! === 1 ? 1 / 2 : 2 / 3;
      }
    });

    // Grandmothers
    if (!p["mother"] && p["maternal_grandmother"]) {
      s["maternal_grandmother"] = 1 / 6;
    }

    if (
      !p["mother"] &&
      !p["father"] &&
      !p["grandfather"] &&
      p["paternal_grandmother"]
    ) {
      s["paternal_grandmother"] = 1 / 6;
    }
  }

  private applyAwlIfNeeded() {
    const total = this.sum(this.shares);
    if (total > 1) {
      Object.keys(this.shares).forEach((k) => {
        this.shares[k as HeirType]! /= total;
      });
    }
  }

  private allocateAsaba(remaining: number) {
    const p = this.present;
    const s = this.shares;

    const distributeAsaba = (male: HeirType, female?: HeirType) => {
      const mCount = p[male] || 0;
      const fCount = female ? p[female] || 0 : 0;
      const units = mCount * 2 + fCount;
      const unitValue = remaining / units;

      if (mCount)
        s[male] = (s[male] || 0) + (unitValue * 2 * mCount) / this.estate;
      if (female && fCount)
        s[female] = (s[female] || 0) + (unitValue * fCount) / this.estate;
    };

    if (p["son"]) return distributeAsaba("son", "daughter");
    if (p["son_son"] && !p["son_daughter"] && !p["son"])
      return (s["son_son"] = (s["son_son"] || 0) + remaining / this.estate);
    if (p["son_son"]) return distributeAsaba("son_son", "son_daughter");
    if (p["father"] && !this.blocked["father"])
      return (s["father"] = (s["father"] || 0) + remaining / this.estate);
    if (p["grandfather"] && !this.blocked["grandfather"] && !p["father"])
      return (s["grandfather"] =
        (s["grandfather"] || 0) + remaining / this.estate);

    const fallbackAsaba: [HeirType, HeirType | undefined][] = [
      ["full_brother", "full_sister"],
      ["paternal_brother", "paternal_sister"],
    ];

    for (const [m, f] of fallbackAsaba) {
      if ((p[m] || p[f as HeirType]) && !this.blocked[m])
        return distributeAsaba(m, f);
    }

    const maleAsaba: HeirType[] = [
      "full_uncle",
      "paternal_uncle",
      "son_of_full_uncle",
      "son_of_paternal_uncle",
      "son_of_full_brother",
      "son_of_paternal_brother",
    ];

    const totalUnits = maleAsaba.reduce(
      (sum, t) => sum + (!this.blocked[t] ? (p[t] || 0) * 2 : 0),
      0
    );

    if (totalUnits > 0) {
      const unitValue = remaining / totalUnits;
      for (const t of maleAsaba) {
        if (!this.blocked[t] && p[t]) {
          s[t] = (s[t] || 0) + (unitValue * 2 * p[t]!) / this.estate;
        }
      }
    }
  }

  private applyRaddIfNeeded() {
    const total = this.sum(this.shares);
    if (total >= 1) return;

    const toDistribute = 1 - total;
    const excluded: HeirType[] = ["wife", "husband"];
    const recipients = Object.entries(this.shares).filter(
      ([k]) => !excluded.includes(k as HeirType)
    );

    if (
      this.present["daughter"] === 1 &&
      this.present["son_daughter"] === 1 &&
      recipients.every(([k]) => k === "daughter" || k === "son_daughter") &&
      !this.hasOtherHeirs(["daughter", "son_daughter", "wife", "husband"])
    ) {
      this.shares["daughter"] = 3 / 4;
      this.shares["son_daughter"] = 1 / 4;
      return;
    }

    const shareSum = recipients.reduce((sum, [, v]) => sum + v, 0);
    if (shareSum > 0) {
      recipients.forEach(
        ([k, v]) =>
          (this.shares[k as HeirType]! += (v / shareSum) * toDistribute)
      );
    }
  }

  private sum(m: ShareMap): number {
    return Object.values(m).reduce((a, b) => a + (b || 0), 0);
  }

  private hasOtherHeirs(exclude: HeirType[]): boolean {
    return Object.entries(this.present).some(
      ([k, v]) => !exclude.includes(k as HeirType) && v! > 0
    );
  }

  private buildResults(): ShareResult[] {
    return Object.entries(this.shares).map(([type, share]) => ({
      type: type as HeirType,
      share: share!,
      amount: parseFloat((share! * this.estate).toFixed(2)),
    }));
  }
}
