// Egyptian Inheritance Law

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
    const daughterCount = find("daughter")?.count || 0;
    const hasChildren = this.hasChildren();
    const hasGrandfather = !!find("grandfather");
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
          if (hasFather || hasGrandfather || hasSon || hasFullSibling)
            blocked.push(heir.type);
          break;
        case "paternal_uncle":
          if (hasFather || hasGrandfather || hasSon || hasFullSibling)
            blocked.push(heir.type);
          break;
        case "son_of_full_uncle":
        case "son_of_paternal_uncle":
          if (hasFather || hasGrandfather || hasSon || hasFullSibling)
            blocked.push(heir.type);
          break;
        case "son_of_full_brother":
          if (hasSon || hasFullSibling) blocked.push(heir.type);
          break;
        case "son_of_paternal_brother":
          if (hasSon || hasFullSibling) blocked.push(heir.type);
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

      if (hasChildren || siblingCount >= 2) {
        shares.mother = 1 / 6;
      } else {
        shares.mother = 1 / 3;
      }
    }

    const maternalGrandmother = find("maternal_grandmother");
    const paternalGrandmother = find("paternal_grandmother");
    if (maternalGrandmother && !mother) shares.maternal_grandmother = 1 / 6;
    if (
      paternalGrandmother &&
      !mother &&
      !find("father") &&
      !find("grandfather")
    )
      shares.paternal_grandmother = 1 / 6;

    const father = find("father");
    const grandfather = find("grandfather");
    if (father && hasChildren) shares.father = 1 / 6;
    else if (!father && grandfather && hasChildren) shares.grandfather = 1 / 6;

    const daughters = find("daughter");
    const sons = find("son");
    if (daughters && !sons) {
      if (daughters.count === 1) shares.daughter = 1 / 2;
      if (daughters.count > 1) shares.daughter = 2 / 3;
    }

    const sonDaughters = find("son_daughter");
    const sonSons = find("son_son");
    if (!sons && !daughters && sonDaughters && !sonSons) {
      if (sonDaughters.count === 1) shares.son_daughter = 1 / 2;
      if (sonDaughters.count > 1) shares.son_daughter = 2 / 3;
    }

    return shares;
  }

  private distributeFixedShares() {
    for (const heir of this.heirs) {
      if (this.blockedTypes.includes(heir.type)) continue;
      const share = this.fixedShares[heir.type] ?? 0;
      if (share > 0) {
        const amount =
          this.totalEstate *
          share *
          ("son_daughter" === heir.type || "daughter" === heir.type
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
      (sum, h) => sum + h.count * (["son", "son_son"].includes(h.type) ? 2 : 1),
      0
    );
    if (units === 0) return;
    const unitValue = remaining / units;

    for (const h of active) {
      const factor = ["son", "son_son"].includes(h.type) ? 2 : 1;
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
    const hasSon = this.heirs.some((h) => h.type === "son");
    if (father && !this.blockedTypes.includes("father") && !hasSon) {
      this.results.push({
        type: "father",
        share: remaining / this.totalEstate,
        amount: parseFloat(remaining.toFixed(2)),
      });
    }
  }

  private distributeGrandfatherAsaba(remaining: number) {
    const grandfather = this.heirs.find((h) => h.type === "grandfather");
    const hasSon = this.heirs.some((h) => h.type === "son");
    if (grandfather && !this.blockedTypes.includes("grandfather") && !hasSon) {
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
      (r) => !["husband", "wife", "father", "mother"].includes(r.type)
    );
    const totalShare = eligible.reduce((sum, r) => sum + r.share, 0);
    for (const r of eligible) {
      const extra = (r.share / totalShare) * remaining;
      r.amount += parseFloat(extra.toFixed(2));
    }
  }

  public calculateShares(): ShareResult[] {
    this.distributeFixedShares();
    const totalFixed = this.results.reduce((sum, r) => sum + r.amount, 0);
    const remaining = this.totalEstate - totalFixed;

    if (remaining > 0) {
      const hasAsaba = this.heirs.some(
        (h) =>
          ["son", "daughter", "son_son", "son_daughter"].includes(h.type) &&
          !this.blockedTypes.includes(h.type)
      );
      if (hasAsaba) this.distributeAsaba(remaining);
      else if (this.heirs.find((h) => h.type === "father"))
        this.distributeFatherAsaba(remaining);
      else if (this.heirs.find((h) => h.type === "grandfather"))
        this.distributeGrandfatherAsaba(remaining);
      else if (
        this.heirs.some((h) =>
          [
            "full_brother",
            "paternal_brother",
            "full_sister",
            "paternal_sister",
          ].includes(h.type)
        )
      )
        this.distributeOtherAsaba(remaining);
      else this.distributeRadd(remaining);
    }

    return this.results;
  }
}
