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
    const locale = useLocale();

    const [estate, setEstate] = useState<number>(0);
    const [unit, setUnit] = useState<"pound" | "feddan">("pound");
    const [deceasedGender, setDeceasedGender] = useState<"male" | "female">(
      "male"
    );
    const [heirs, setHeirs] = useState<Heir[]>([]);
    const [results, setResults] = useState<ShareResult[]>([]);
    const [blockedHeirs, setBlockedHeirs] = useState<HeirType[]>([]);

    const addHeir = useCallback((type: HeirType) => {
      setHeirs((prev) => {
        const existing = prev.find((h) => h.type === type);
        if (existing) {
          return prev.map((h) =>
            h.type === type ? { ...h, count: h.count + 1 } : h
          );
        }
        return [...prev, { type, count: 1 }];
      });
    }, []);

    const removeHeir = useCallback((type: HeirType) => {
      setHeirs((prev) =>
        prev
          .map((h) =>
            h.type === type ? { ...h, count: Math.max(0, h.count - 1) } : h
          )
          .filter((h) => h.count > 0)
      );
    }, []);

    const calculate = useCallback(() => {
      if (estate <= 0) {
        alert("الرجاء إدخال قيمة تركة صحيحة.");
        return;
      }
      if (heirs.length === 0) {
        alert("الرجاء إضافة ورثة قبل الحساب.");
        return;
      }
      const calc = new InheritanceCalculator(heirs, estate);
      const res = calc.calculate();
      const blocked = Object.entries(calc["blocked"])
        .filter(([, isBlocked]) => isBlocked)
        .map(([type]) => type as HeirType);
      setResults(res);
      setBlockedHeirs(blocked);
    }, [heirs, estate]);

    useEffect(() => {
      setHeirs((prev) => {
        const withoutSpouses = prev.filter(
          (h) => h.type !== "husband" && h.type !== "wife"
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
      <div className="max-w-5xl mx-auto p-4 py-10">
        <Heading className="mb-10">{translations.title}</Heading>

        <Gender
          deceasedGender={deceasedGender}
          setDeceasedGender={setDeceasedGender}
          locale={locale}
        />

        {/* Estate input */}
        <EstateInput
          estate={estate}
          setEstate={setEstate}
          setUnit={setUnit}
          translations={translations}
          unit={unit}
          locale={locale}
        />

        {/* Heir selection */}
        <div className="mb-4">
          <label className="block font-medium mb-3">
            {translations.heirsLabel}:
          </label>
          <HeirsGrid
            addHeir={addHeir}
            deceasedGender={deceasedGender}
            heirs={heirs}
            locale={locale}
            removeHeir={removeHeir}
            setHeirs={setHeirs}
            translations={translations}
          />
        </div>

        <BlockedHeirsList
          blockedHeirs={blockedHeirs}
          inputHeirs={heirs}
          locale={locale}
        />

        <CustomButton
          size="fit"
          color="gray"
          onClick={calculate}
          className="text-center justify-center mt-6"
        >
          {translations.calculateButton}
        </CustomButton>

        <ResultsTable
          locale={locale}
          results={results}
          unit={unit}
          translations={translations}
          heirs={heirs}
        />
      </div>
    );
  }
);

CalculatorClient.displayName = "CalculatorClient";

export default CalculatorClient;
