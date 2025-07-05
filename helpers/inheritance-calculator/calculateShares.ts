// Egyptian Inheritance Law - FIXED

import { Heir, HeirType, ShareResult } from "./types";

export default class InheritanceCalculator {
  private heirs: Heir[];
  private totalEstate: number;
  private results: ShareResult[] = [];
  private blockedTypes: HeirType[] = [];
  private fixedShares: Partial<Record<HeirType, number>> = {};

  constructor(heirs: Heir[], totalEstate: number) {
    this.validateSpouseExclusivity(heirs);
    this.heirs = heirs;
    this.totalEstate = totalEstate;
    this.blockedTypes = this.calculateBlockedHeirs();
    const hasChildren = this.hasChildren();
    this.fixedShares = this.calculateFixedShares(hasChildren);
  }

  private validateSpouseExclusivity(heirs: Heir[]) {
    const hasHusband = heirs.some((h) => h.type === "husband");
    const hasWife = heirs.some((h) => h.type === "wife");
    if (hasHusband && hasWife) {
      throw new Error("لا يمكن أن يوجد زوج وزوجة في نفس الحالة الشرعية.");
    }
  }

  private hasChildren(): boolean {
    return this.heirs.some((h) =>
      ["son", "daughter", "son_son", "son_daughter"].includes(h.type)
    );
  }

  private calculateBlockedHeirs(): HeirType[] {
    const blocked: HeirType[] = [];
    const find = (type: HeirType) => this.heirs.find((h) => h.type === type);

    const hasFather = !!find("father");
    const hasFullSibling = !!find("full_brother") || !!find("full_sister");
    const hasSon = !!find("son");
    const hasDaughter = !!find("daughter");
    const hasGrandfather = !!find("grandfather");
    const daughterCount = find("daughter")?.count || 0;
    const hasChildren = this.hasChildren();
    const hasSonSon = !!find("son_son");

    for (const heir of this.heirs) {
      switch (heir.type) {
        case "full_brother":
        case "full_sister":
          if (hasFather || hasSon) blocked.push(heir.type);
          break;
        case "paternal_brother":
        case "paternal_sister":
          if (hasFather || hasFullSibling || hasSon) blocked.push(heir.type);
          break;
        case "maternal_brother":
        case "maternal_sister":
          if (hasChildren || hasFather || hasGrandfather)
            blocked.push(heir.type);
          break;
        case "son_son":
          if (hasSon) blocked.push(heir.type);
          break;
        case "son_daughter":
          if (hasSon || daughterCount >= 2 || (hasDaughter && hasSonSon))
            blocked.push(heir.type);
          break;
        case "grandfather":
          if (hasFather) blocked.push(heir.type);
          break;
        case "paternal_grandmother":
        case "maternal_grandmother":
          if (find("mother")) blocked.push(heir.type);
          break;
        case "full_uncle":
        case "paternal_uncle":
          if (hasFather || hasGrandfather || hasSon || hasFullSibling)
            blocked.push(heir.type);
          break;
        case "son_of_full_uncle":
        case "son_of_paternal_uncle":
        case "son_of_full_brother":
        case "son_of_paternal_brother":
          if (
            hasFather ||
            hasGrandfather ||
            hasSon ||
            hasFullSibling ||
            find("full_uncle") ||
            find("paternal_uncle") ||
            find("paternal_brother")
          )
            blocked.push(heir.type);
          break;
      }
    }

    return blocked;
  }

  private calculateFixedShares(
    hasChildren: boolean
  ): Partial<Record<HeirType, number>> {
    const shares: Partial<Record<HeirType, number>> = {};
    const find = (type: HeirType) => this.heirs.find((h) => h.type === type);

    if (find("wife")) shares.wife = hasChildren ? 1 / 8 : 1 / 4;
    if (find("husband")) shares.husband = hasChildren ? 1 / 4 : 1 / 2;

    const maternalSiblings = this.heirs.filter((h) =>
      ["maternal_brother", "maternal_sister"].includes(h.type)
    );
    const maternalCount = maternalSiblings.reduce((sum, h) => sum + h.count, 0);
    if (maternalCount === 1)
      maternalSiblings.forEach((s) => (shares[s.type] = 1 / 6));
    else if (maternalCount > 1)
      maternalSiblings.forEach((s) => (shares[s.type] = 1 / 3 / maternalCount));

    const mother = find("mother");
    if (mother) {
      const siblingCount = this.heirs
        .filter((h) =>
          [
            "full_brother",
            "full_sister",
            "maternal_brother",
            "maternal_sister",
            "paternal_brother",
            "paternal_sister",
          ].includes(h.type)
        )
        .reduce((sum, h) => sum + h.count, 0);

      shares.mother = hasChildren || siblingCount >= 2 ? 1 / 6 : 1 / 3;
    }

    if (find("maternal_grandmother") && !mother)
      shares.maternal_grandmother = 1 / 6;
    if (
      find("paternal_grandmother") &&
      !mother &&
      !find("father") &&
      !find("grandfather")
    )
      shares.paternal_grandmother = 1 / 6;

    if (find("father") && hasChildren) shares.father = 1 / 6;
    else if (!find("father") && find("grandfather") && hasChildren)
      shares.grandfather = 1 / 6;

    const daughters = find("daughter");
    const sons = find("son");
    if (daughters && !sons) {
      if (daughters.count === 1) shares.daughter = 1 / 2;
      else if (daughters.count > 1) shares.daughter = 2 / 3;
    }

    const sonDaughters = find("son_daughter");
    const sonSons = find("son_son");
    if (!sons && !daughters && sonDaughters && !sonSons) {
      if (sonDaughters.count === 1) shares.son_daughter = 1 / 2;
      else if (sonDaughters.count > 1) shares.son_daughter = 2 / 3;
    }

    return shares;
  }

  private distributeFixedShares() {
    const daughters = this.heirs.find((h) => h.type === "daughter");
    const sons = this.heirs.find((h) => h.type === "son");
    const sonDaughters = this.heirs.find((h) => h.type === "son_daughter");
    const sonSons = this.heirs.find((h) => h.type === "son_son");

    const hasDaughter = !!daughters;

    for (const heir of this.heirs) {
      if (this.blockedTypes.includes(heir.type)) continue;

      let share = this.fixedShares[heir.type] ?? 0;

      if (
        heir.type === "son_daughter" &&
        hasDaughter &&
        daughters!.count === 1 &&
        heir.count === 1
      ) {
        share = 1 / 4;
      }

      if (
        heir.type === "daughter" &&
        daughters?.count === 1 &&
        sonDaughters?.count === 1
      ) {
        share = 3 / 4;
      }

      if (
        heir.type === "son_son" &&
        daughters?.count === 1 &&
        sons === undefined &&
        sonSons?.count === 1
      ) {
        share = 1 / 4;
      }

      if (
        heir.type === "daughter" &&
        daughters?.count === 1 &&
        sons === undefined &&
        sonSons?.count === 1
      ) {
        share = 1 / 2;
      }

      if (
        heir.type === "son_son" &&
        daughters?.count === 1 &&
        sons === undefined &&
        sonSons?.count === 1
      ) {
        share = 1 / 2;
      }

      if (
        ["full_sister", "paternal_sister"].includes(heir.type) &&
        daughters?.count === 1 &&
        !this.blockedTypes.includes(heir.type)
      ) {
        share = 1 / 2;
      }

      if (
        ["full_brother", "paternal_brother"].includes(heir.type) &&
        daughters?.count === 1 &&
        !sons &&
        !this.blockedTypes.includes(heir.type)
      ) {
        share = 1 / 2;
      }

      if (share > 0) {
        const amount =
          this.totalEstate *
          share *
          ([
            "son_daughter",
            "daughter",
            "son_son",
            "full_sister",
            "paternal_sister",
          ].includes(heir.type)
            ? 1
            : heir.count);
        this.results.push({
          type: heir.type,
          share: share,
          amount: parseFloat(amount.toFixed(2)),
        });
      }
    }
  }

  private distributeAsaba(remaining: number) {
    const heirs = ["son", "daughter", "son_son", "son_daughter"] as HeirType[];
    const active = this.heirs.filter(
      (h) => heirs.includes(h.type) && !this.blockedTypes.includes(h.type)
    );
    const units = active.reduce(
      (sum, h) =>
        sum + h.count * (h.type === "son" || h.type === "son_son" ? 2 : 1),
      0
    );
    if (units === 0) return;
    const unitValue = remaining / units;

    for (const h of active) {
      const factor = h.type === "son" || h.type === "son_son" ? 2 : 1;
      const amount = unitValue * factor * h.count;
      this.results.push({
        type: h.type,
        share: amount / this.totalEstate,
        amount: parseFloat(amount.toFixed(2)),
      });
    }
  }

  private distributeFatherAsaba(remaining: number) {
    const father = this.heirs.find((h) => h.type === "father");
    if (father && !this.blockedTypes.includes("father")) {
      this.results.push({
        type: "father",
        share: remaining / this.totalEstate,
        amount: parseFloat(remaining.toFixed(2)),
      });
    }
  }

  private distributeGrandfatherAsaba(remaining: number) {
    const grandfather = this.heirs.find((h) => h.type === "grandfather");
    if (grandfather && !this.blockedTypes.includes("grandfather")) {
      this.results.push({
        type: "grandfather",
        share: remaining / this.totalEstate,
        amount: parseFloat(remaining.toFixed(2)),
      });
    }
  }

  private distributeOtherAsaba(remaining: number) {
    const candidates = this.heirs.filter(
      (h) =>
        [
          "full_brother",
          "paternal_brother",
          "full_sister",
          "paternal_sister",
          "son_of_full_uncle",
          "son_of_paternal_uncle",
          "son_of_full_brother",
          "son_of_paternal_brother",
        ].includes(h.type) && !this.blockedTypes.includes(h.type)
    );
    const units = candidates.reduce(
      (sum, h) =>
        sum +
        h.count *
          (["full_brother", "paternal_brother"].includes(h.type) ? 2 : 1),
      0
    );
    if (units === 0) return;
    const unitValue = remaining / units;
    for (const h of candidates) {
      const factor = ["full_brother", "paternal_brother"].includes(h.type)
        ? 2
        : 1;
      const amount = unitValue * factor * h.count;
      this.results.push({
        type: h.type,
        share: amount / this.totalEstate,
        amount: parseFloat(amount.toFixed(2)),
      });
    }
  }

  private distributeRadd(remaining: number) {
    const eligible = this.results.filter(
      (r) => !["husband", "wife"].includes(r.type)
    );
    const totalShare = eligible.reduce((sum, r) => sum + r.share, 0);
    for (const r of eligible) {
      const extra = (r.share / totalShare) * remaining;
      r.amount += parseFloat(extra.toFixed(2));
      r.share = r.amount / this.totalEstate;
    }
  }

  private isEligibleForAsabaWith(): boolean {
    const hasDaughter = this.heirs.some((h) => h.type === "daughter");
    const hasSister = this.heirs.some((h) =>
      ["full_sister", "paternal_sister"].includes(h.type)
    );
    return hasDaughter && hasSister;
  }

  private distributeAsabaWith(remaining: number) {
    const sisters = this.heirs.filter(
      (h) =>
        ["full_sister", "paternal_sister"].includes(h.type) &&
        !this.blockedTypes.includes(h.type)
    );
    const units = sisters.reduce((sum, s) => sum + s.count, 0);
    if (units === 0) return;
    const unitValue = remaining / units;
    for (const h of sisters) {
      const amount = unitValue * h.count;
      this.results.push({
        type: h.type,
        share: amount / this.totalEstate,
        amount: parseFloat(amount.toFixed(2)),
      });
    }
  }

  public calculateShares(): ShareResult[] {
    const unblockedHeirs = this.heirs.filter(
      (h) => !this.blockedTypes.includes(h.type)
    );

    if (unblockedHeirs.length === 1) {
      this.results.push({
        type: unblockedHeirs[0].type,
        share: 1,
        amount: this.totalEstate,
      });
      return this.results;
    }

    this.distributeFixedShares();
    const totalFixed = this.results.reduce((sum, r) => sum + r.amount, 0);
    const remaining = this.totalEstate - totalFixed;

    if (remaining > 0) {
      const hasSonsOrDaughters = this.heirs.some((h) =>
        ["son", "daughter"].includes(h.type)
      );
      const hasGrandchildren = this.heirs.some((h) =>
        ["son_son", "son_daughter"].includes(h.type)
      );

      if (hasSonsOrDaughters || hasGrandchildren) {
        this.distributeAsaba(remaining);
      } else if (this.isEligibleForAsabaWith()) {
        this.distributeAsabaWith(remaining);
      } else if (this.heirs.find((h) => h.type === "father")) {
        this.distributeFatherAsaba(remaining);
      } else if (this.heirs.find((h) => h.type === "grandfather")) {
        this.distributeGrandfatherAsaba(remaining);
      } else if (
        this.heirs.some((h) =>
          [
            "full_brother",
            "paternal_brother",
            "full_sister",
            "paternal_sister",
            "son_of_full_uncle",
            "son_of_paternal_uncle",
            "son_of_full_brother",
            "son_of_paternal_brother",
          ].includes(h.type)
        )
      ) {
        this.distributeOtherAsaba(remaining);
      } else if (
        this.results.some((r) => !["husband", "wife"].includes(r.type))
      ) {
        this.distributeRadd(remaining);
      } else {
        const spouse = this.results.find((r) =>
          ["husband", "wife"].includes(r.type)
        );
        if (spouse) {
          spouse.amount += remaining;
          spouse.share = spouse.amount / this.totalEstate;
        }
      }
    }

    return this.results;
  }
}
