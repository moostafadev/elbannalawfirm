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
    heirs.forEach(
      (h) => (this.present[h.type] = (this.present[h.type] || 0) + h.count)
    );
  }

  public calculate(): ShareResult[] {
    this.shares = {};
    this.ensureNoSpouseConflict();
    this.determineBlocks();
    this.calculateFixedShares();
    this.applyAwlIfNeeded();
    const remaining = this.estate * (1 - this.sum(this.shares));
    if (remaining > 0) this.allocateAsaba(remaining);
    this.applyRaddIfNeeded();
    return this.buildResults();
  }

  private ensureNoSpouseConflict() {
    if (this.present["husband"] && this.present["wife"])
      throw new Error("لا يمكن وجود زوج وزوجة معًا.");
  }

  private determineBlocks() {
    const p = this.present;
    const b = this.blocked;

    const hasParentOrKids = !!p["father"] || !!p["son"] || !!p["daughter"];
    if (hasParentOrKids) {
      [
        "full_brother",
        "full_sister",
        "paternal_brother",
        "paternal_sister",
      ].forEach((t) => (b[t as HeirType] = true));
    }

    if (p["mother"]) {
      ["paternal_grandmother", "maternal_grandmother"].forEach(
        (t) => (b[t as HeirType] = true)
      );
    }

    if (p["father"]) {
      b["grandfather"] = true;
    }

    if (p["full_uncle"] || p["paternal_uncle"]) {
      [
        "son_of_full_uncle",
        "son_of_paternal_uncle",
        "son_of_full_brother",
        "son_of_paternal_brother",
      ].forEach((t) => (b[t as HeirType] = true));
    }
  }

  private calculateFixedShares() {
    const p = this.present;
    const s = this.shares;
    const hasChild = !!p["son"] || !!p["daughter"];

    if (p["wife"]) s["wife"] = (hasChild ? 1 / 8 : 1 / 4) * p["wife"];
    if (p["husband"]) s["husband"] = hasChild ? 1 / 4 : 1 / 2;

    if (p["mother"]) {
      const sib =
        (p["full_brother"] || 0) +
        (p["full_sister"] || 0) +
        (p["paternal_brother"] || 0) +
        (p["paternal_sister"] || 0);
      s["mother"] = hasChild || sib >= 2 ? 1 / 6 : 1 / 3;
    }

    if (p["father"] && hasChild) s["father"] = 1 / 6;
    else if (p["grandfather"] && hasChild && !this.blocked["grandfather"]) {
      s["grandfather"] = 1 / 6;
    }

    if (!p["son"] && p["daughter"]) {
      const d = p["daughter"];
      s["daughter"] = d === 1 ? 1 / 2 : 2 / 3;
    }

    ["full_sister", "paternal_sister"].forEach((type) => {
      const cnt = p[type as HeirType] || 0;
      if (
        cnt &&
        !this.blocked[type as HeirType] &&
        !p["daughter"] &&
        !p["son"] &&
        !(p["full_brother"] || p["paternal_brother"])
      ) {
        s[type as HeirType] = cnt === 1 ? 1 / 2 : 2 / 3;
      }
    });

    if (!p["mother"] && p["maternal_grandmother"])
      s["maternal_grandmother"] = 1 / 6;
    if (
      !p["mother"] &&
      !p["father"] &&
      !p["grandfather"] &&
      p["paternal_grandmother"]
    )
      s["paternal_grandmother"] = 1 / 6;
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

    if (
      p["daughter"] &&
      !p["son"] &&
      (p["full_sister"] || p["paternal_sister"])
    ) {
      const sisters: [HeirType, number][] = [];
      if (p["full_sister"] && !this.blocked["full_sister"])
        sisters.push(["full_sister", p["full_sister"]]);
      if (p["paternal_sister"] && !this.blocked["paternal_sister"])
        sisters.push(["paternal_sister", p["paternal_sister"]]);

      if (sisters.length > 0) {
        const daughterUnits = p["daughter"] * 2;
        const sisterUnits = sisters.reduce((sum, [, c]) => sum + c, 0);
        const totalUnits = daughterUnits + sisterUnits;
        const unitValue = remaining / totalUnits;

        for (const [type, count] of sisters) {
          s[type] = (s[type] || 0) + (unitValue * count) / this.estate;
        }
        return;
      }
    }

    if (p["son"] || p["daughter"]) {
      const units = (p["son"] || 0) * 2 + (p["daughter"] || 0);
      const unitValue = remaining / units;
      if (p["son"] && !s["son"])
        s["son"] = (unitValue * 2 * p["son"]) / this.estate;
      if (p["daughter"])
        s["daughter"] =
          (s["daughter"] || 0) + (unitValue * p["daughter"]) / this.estate;
      return;
    }

    if (
      p["full_brother"] &&
      p["full_sister"] &&
      !this.blocked["full_brother"]
    ) {
      const units = p["full_brother"] * 2 + p["full_sister"];
      const unitValue = remaining / units;
      if (p["full_brother"])
        s["full_brother"] = (unitValue * 2 * p["full_brother"]) / this.estate;
      if (p["full_sister"])
        s["full_sister"] =
          (s["full_sister"] || 0) +
          (unitValue * p["full_sister"]) / this.estate;
      return;
    }

    if (
      p["paternal_brother"] &&
      p["paternal_sister"] &&
      !this.blocked["paternal_brother"]
    ) {
      const units = p["paternal_brother"] * 2 + p["paternal_sister"];
      const unitValue = remaining / units;
      if (p["paternal_brother"])
        s["paternal_brother"] =
          (unitValue * 2 * p["paternal_brother"]) / this.estate;
      if (p["paternal_sister"])
        s["paternal_sister"] =
          (s["paternal_sister"] || 0) +
          (unitValue * p["paternal_sister"]) / this.estate;
      return;
    }

    if (p["father"] && !this.blocked["father"] && !s["father"]) {
      s["father"] = (s["father"] || 0) + remaining / this.estate;
      return;
    }

    if (
      p["grandfather"] &&
      !p["father"] &&
      !this.blocked["grandfather"] &&
      !s["grandfather"]
    ) {
      s["grandfather"] = (s["grandfather"] || 0) + remaining / this.estate;
      return;
    }

    const brothers = (p["full_brother"] || 0) + (p["paternal_brother"] || 0);
    const sisters = (p["full_sister"] || 0) + (p["paternal_sister"] || 0);
    if (brothers || sisters) {
      const units = brothers * 2 + sisters;
      const value = remaining / units;
      if (p["full_brother"])
        s["full_brother"] = (value * 2 * p["full_brother"]) / this.estate;
      if (p["paternal_brother"])
        s["paternal_brother"] =
          (value * 2 * p["paternal_brother"]) / this.estate;
      if (p["full_sister"])
        s["full_sister"] =
          (s["full_sister"] || 0) + (value * p["full_sister"]) / this.estate;
      if (p["paternal_sister"])
        s["paternal_sister"] =
          (s["paternal_sister"] || 0) +
          (value * p["paternal_sister"]) / this.estate;
      return;
    }

    const uncles = (p["full_uncle"] || 0) + (p["paternal_uncle"] || 0);
    const sonsOf =
      (p["son_of_full_uncle"] || 0) +
      (p["son_of_paternal_uncle"] || 0) +
      (p["son_of_full_brother"] || 0) +
      (p["son_of_paternal_brother"] || 0);
    const units = uncles * 2 + sonsOf;
    if (units) {
      const value = remaining / units;
      if (p["full_uncle"])
        s["full_uncle"] = (value * 2 * p["full_uncle"]) / this.estate;
      if (p["paternal_uncle"])
        s["paternal_uncle"] = (value * 2 * p["paternal_uncle"]) / this.estate;
      if (p["son_of_full_uncle"])
        s["son_of_full_uncle"] = (value * p["son_of_full_uncle"]) / this.estate;
      if (p["son_of_paternal_uncle"])
        s["son_of_paternal_uncle"] =
          (value * p["son_of_paternal_uncle"]) / this.estate;
      if (p["son_of_full_brother"])
        s["son_of_full_brother"] =
          (value * p["son_of_full_brother"]) / this.estate;
      if (p["son_of_paternal_brother"])
        s["son_of_paternal_brother"] =
          (value * p["son_of_paternal_brother"]) / this.estate;
    }
  }

  private applyRaddIfNeeded() {
    const totalShare = this.sum(this.shares);
    if (totalShare < 1) {
      const nonSpouse: HeirType[] = ["wife", "husband"];
      const toShare = 1 - totalShare;
      const recipients = Object.entries(this.shares).filter(
        ([t]) => !nonSpouse.includes(t as HeirType)
      );
      const total = recipients.reduce((a, [, v]) => a + v, 0);
      recipients.forEach(
        ([t, v]) => (this.shares[t as HeirType]! += (v / total) * toShare)
      );
    }
  }

  private sum(m: ShareMap) {
    return Object.values(m).reduce((a, b) => a + (b || 0), 0);
  }

  private buildResults(): ShareResult[] {
    return Object.entries(this.shares).map(([t, sh]) => ({
      type: t as HeirType,
      share: sh!,
      amount: parseFloat((sh! * this.estate).toFixed(2)),
    }));
  }
}
