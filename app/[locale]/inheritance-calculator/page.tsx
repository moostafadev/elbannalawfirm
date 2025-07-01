"use client";

import CustomButton from "@/components/CustomButton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InheritanceCalculator from "@/helpers/inheritance-calculator/calculateShares";
import { heirOptions } from "@/helpers/inheritance-calculator/constants";
import {
  Heir,
  HeirType,
  ShareResult,
} from "@/helpers/inheritance-calculator/types";
import { Minus, Plus } from "lucide-react";
import { useLocale } from "next-intl";
import React, { useState } from "react";

const Page = () => {
  const locale = useLocale();
  const [estate, setEstate] = useState<number>(0);
  const [unit, setUnit] = useState<"جنيه" | "فدان">("جنيه");
  const [heirs, setHeirs] = useState<Heir[]>([]);
  const [results, setResults] = useState<ShareResult[]>([]);

  const addHeir = (type: HeirType) => {
    if (
      (type === "husband" && heirs.some((h) => h.type === "wife")) ||
      (type === "wife" && heirs.some((h) => h.type === "husband"))
    ) {
      alert("لا يمكن إضافة الزوج والزوجة معًا في نفس الحالة.");
      return;
    }

    setHeirs((prev) => {
      const existing = prev.find((h) => h.type === type);
      if (existing) {
        return prev.map((h) =>
          h.type === type ? { ...h, count: h.count + 1 } : h
        );
      }
      return [...prev, { type, count: 1 }];
    });
  };

  const removeHeir = (type: HeirType) => {
    setHeirs((prev) =>
      prev
        .map((h) =>
          h.type === type ? { ...h, count: Math.max(0, h.count - 1) } : h
        )
        .filter((h) => h.count > 0)
    );
  };

  const calculate = () => {
    if (estate <= 0) {
      alert("الرجاء إدخال قيمة تركة صحيحة.");
      return;
    }

    const calc = new InheritanceCalculator(heirs, estate);
    const res = calc.calculateShares();
    setResults(res);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 py-10">
      <h1 className="text-2xl font-bold mb-4 text-center">أحسب ميراثك</h1>

      <div className="mb-4">
        <label className="block font-medium mb-1">قيمة التركة:</label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={estate}
            onChange={(e) => setEstate(Number(e.target.value))}
            className="w-full border"
          />
          <Select
            value={unit}
            onValueChange={(e) => setUnit(e as "جنيه" | "فدان")}
            dir="rtl"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="جنيه">جنيه</SelectItem>
              <SelectItem value="فدان">فدان</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">أضف الورثة:</label>
        <div className="grid grid-cols-2 gap-2">
          {heirOptions.map((opt) => (
            <div
              key={opt.value}
              className="flex items-center justify-between bg-primary/10 border-2 border-primary rounded-lg p-2"
            >
              <span>{opt.label[locale]}</span>
              <div className="flex gap-4 bg-white items-center rounded-lg overflow-hidden">
                <CustomButton
                  onClick={() => addHeir(opt.value)}
                  size="fit"
                  color="yellow"
                >
                  <Plus size={16} />
                </CustomButton>
                <p>{heirs.find((h) => h.type === opt.value)?.count ?? 0}</p>
                <CustomButton
                  onClick={() => removeHeir(opt.value)}
                  size="fit"
                  color="red"
                >
                  <Minus size={16} />
                </CustomButton>
              </div>
            </div>
          ))}
        </div>

        {heirs.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">الورثة الحاليون:</h3>
            <ul className="list-disc list-inside">
              {heirs.map((h) => {
                const label = heirOptions.find(
                  (opt) => opt.value === h.type
                )?.label;
                return (
                  <li key={h.type}>
                    {label?.[locale]}: {h.count}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <CustomButton
        size="full"
        color="gray"
        onClick={calculate}
        className="text-center justify-center"
      >
        احسب الأنصبة
      </CustomButton>

      {results.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">النتائج:</h2>
          <table className="w-full text-right border">
            <thead>
              <tr>
                <th className="border p-2">الوارث</th>
                <th className="border p-2">النصيب النسبي</th>
                <th className="border p-2">القيمة {unit}</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => {
                const label = heirOptions.find(
                  (opt) => opt.value === r.type
                )?.label;
                return (
                  <tr key={r.type}>
                    <td className="border p-2">{label?.[locale]}</td>
                    <td className="border p-2">
                      {(r.share * 100).toFixed(2)}%
                    </td>
                    <td className="border p-2">
                      {unit === "جنيه"
                        ? r.amount.toFixed(2) + " جنيه"
                        : r.amount.toFixed(2) + " فدان"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Page;
