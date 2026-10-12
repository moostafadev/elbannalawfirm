"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import Heading from "@/components/Heading";
import Gender from "@/components/inheritance/Gender";
import CustomButton from "@/components/CustomButton";
import InheritanceCalculator from "@/helpers/inheritance-calculator/calculateShares";
import {
  Heir,
  HeirType,
  ShareResult,
} from "@/helpers/inheritance-calculator/types";
import EstateInput from "./EstateInput";
import HeirsGrid from "./HeirsGrid";
import ResultsTable from "./ResultsTable";
import BlockedHeirsList from "./BlockedHeirsList";
import AdBanner from "../ad/AdBanner";
import Animation from "../Animation";
import { AD_SLOTS } from "@/constants/ads";
import { useToast } from "@/hooks/use-toast";
import { toLocaleKey } from "@/lib/locale";
import { INHERITANCE_TEXTS } from "@/constants/inheritance";

type CalculatorClientProps = {
  translations: {
    title: string;
    genderLabel: string;
    male: string;
    female: string;
    estateLabel: string;
    unitPound: string;
    unitFaddan: string;
    heirsLabel: string;
    calculateButton: string;
    alive: string;
    dead: string;
    resultsTitle: string;
    heirLabel: string;
    totalShare: string;
    individualShare: string;
    toggleTitle: string;
  };
};

const CalculatorClient: React.FC<CalculatorClientProps> = React.memo(
  ({ translations }) => {
    const locale = toLocaleKey(useLocale());
    const { toast } = useToast();
    const t = INHERITANCE_TEXTS[locale];

    const [estate, setEstate] = useState<number>(0);
    const [unit, setUnit] = useState<"pound" | "feddan">("pound");
    const [deceasedGender, setDeceasedGender] = useState<"male" | "female">(
      "male",
    );
    const [heirs, setHeirs] = useState<Heir[]>([]);
    const [results, setResults] = useState<ShareResult[]>([]);
    const [blockedHeirs, setBlockedHeirs] = useState<HeirType[]>([]);

    const calculate = useCallback(() => {
      if (estate <= 0) {
        toast({ variant: "destructive", title: t.invalidEstate });
        return;
      }
      if (heirs.length === 0) {
        toast({ variant: "destructive", title: t.noHeirs });
        return;
      }

      try {
        const calc = new InheritanceCalculator(heirs, estate);
        const res = calc.calculate();
        const blocked = Object.entries(calc["blocked"])
          .filter(([, isBlocked]) => isBlocked)
          .map(([type]) => type as HeirType);
        setResults(res);
        setBlockedHeirs(blocked);
      } catch (error) {
        toast({
          variant: "destructive",
          title: error instanceof Error ? error.message : t.invalidEstate,
        });
      }
    }, [heirs, estate, t, toast]);

    const clearResultsIfExist = useCallback(() => {
      setResults((prev) => (prev.length > 0 ? [] : prev));
    }, []);

    useEffect(() => {
      clearResultsIfExist();
    }, [heirs, clearResultsIfExist]);

    useEffect(() => {
      setHeirs((prev) => {
        const withoutSpouses = prev.filter(
          (h) => h.type !== "husband" && h.type !== "wife",
        );
        const spouse: Heir =
          deceasedGender === "female"
            ? { type: "husband", count: 1 }
            : { type: "wife", count: 1 };

        const alreadyHasSpouse = prev.some((h) => h.type === spouse.type);
        return alreadyHasSpouse ? prev : [...withoutSpouses, spouse];
      });
    }, [deceasedGender]);

    return (
      <div className="mx-auto max-w-5xl p-4 py-10">
        <Heading className="mb-10">{translations.title}</Heading>

        <Gender
          deceasedGender={deceasedGender}
          setDeceasedGender={setDeceasedGender}
          locale={locale}
        />

        <EstateInput
          estate={estate}
          setEstate={setEstate}
          setUnit={setUnit}
          translations={translations}
          unit={unit}
          locale={locale}
        />

        <div className="mb-4">
          <label className="mb-3 block font-medium">
            {translations.heirsLabel}:
          </label>
          <HeirsGrid
            deceasedGender={deceasedGender}
            heirs={heirs}
            locale={locale}
            setHeirs={setHeirs}
            translations={translations}
            onHeirsChanged={clearResultsIfExist}
          />
        </div>

        <BlockedHeirsList
          blockedHeirs={blockedHeirs}
          inputHeirs={heirs}
          locale={locale}
          title={t.blockedHeirsTitle}
        />

        <Animation origin="top" animationName="animation-inheritance-item">
          <CustomButton
            size="fit"
            color="gray"
            onClick={calculate}
            className="mt-6 justify-center px-4 py-2 text-center"
          >
            {translations.calculateButton}
          </CustomButton>
        </Animation>

        <ResultsTable
          locale={locale}
          results={results}
          unit={unit}
          translations={translations}
          heirs={heirs}
        />

        <div className="mt-5">
          <AdBanner
            dataAdFormat="auto"
            dataFullWidthResponsive={true}
            dataAdSlot={AD_SLOTS.inheritanceBottom}
          />
        </div>
      </div>
    );
  },
);

CalculatorClient.displayName = "CalculatorClient";

export default CalculatorClient;
