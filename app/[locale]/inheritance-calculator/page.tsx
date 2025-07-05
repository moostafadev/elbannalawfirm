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
import Image from "next/image";
import React, { useEffect, useState } from "react";

const binaryHeirs: HeirType[] = [
  "husband",
  "father",
  "mother",
  "grandfather",
  "maternal_grandmother",
  "paternal_grandmother",
];

const Page = () => {
  const locale = useLocale();
  const [estate, setEstate] = useState<number>(0);
  const [unit, setUnit] = useState<"جنيه" | "فدان">("جنيه");
  const [deceasedGender, setDeceasedGender] = useState<"ذكر" | "أنثى">("ذكر");
  const [heirs, setHeirs] = useState<Heir[]>([]);
  const [results, setResults] = useState<ShareResult[]>([]);

  const addHeir = (type: HeirType) => {
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
    if (heirs.length === 0) {
      alert("الرجاء إضافة ورثة قبل الحساب.");
      return;
    }

    const calc = new InheritanceCalculator(heirs, estate);
    const res = calc.calculateShares();
    setResults(res);
    console.log(res);
  };

  useEffect(() => {
    setHeirs((prevHeirs) => {
      const filtered = prevHeirs.filter(
        (h) => h.type !== "husband" && h.type !== "wife"
      );

      if (deceasedGender === "أنثى") {
        return [...filtered, { type: "husband", count: 1 }];
      }

      return filtered;
    });
  }, [deceasedGender]);

  return (
    <div className="max-w-5xl mx-auto p-4 py-10">
      <h1 className="text-2xl font-bold mb-4 text-center">أحسب ميراثك</h1>

      <div className="mb-4">
        <label className="block font-medium mb-1">جنس المتوفي:</label>
        <Select
          value={deceasedGender}
          onValueChange={(val) => setDeceasedGender(val as "ذكر" | "أنثى")}
          dir="rtl"
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="اختر الجنس" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ذكر">ذكر</SelectItem>
            <SelectItem value="أنثى">أنثى</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">قيمة التركة:</label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={estate}
            onChange={(e) => setEstate(Math.abs(Number(e.target.value)))}
            onFocus={(e) =>
              e.target.value === "0" ? (e.target.value = "") : e.target.value
            }
            className="w-full border"
          />
          <Select
            value={unit}
            onValueChange={(e) => setUnit(e as "جنيه" | "فدان")}
            dir="rtl"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="الوحدة" />
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {heirOptions
            .filter((opt) => {
              if (opt.value === "husband" && deceasedGender !== "أنثى")
                return false;
              if (opt.value === "wife" && deceasedGender !== "ذكر")
                return false;
              return true;
            })
            .map((opt) => {
              const heirCount =
                heirs.find((h) => h.type === opt.value)?.count ?? 0;
              const isHusband = opt.value === "husband";
              const maxReached = isHusband && heirCount >= 1;
              const isBinary = binaryHeirs.includes(opt.value);

              return (
                <div
                  className={`flex flex-col gap-2 p-3 rounded-lg shadow-sm duration-300 hover:shadow-md border items-center justify-center ${
                    heirs.find((h) => h.count > 0 && h.type === opt.value)
                      ? "border-green-600 bg-green-700/10 !shadow-md scale-[1.02]"
                      : "border-primary/30"
                  }`}
                  key={opt.value}
                >
                  <Image
                    src={opt.img?.src}
                    alt={opt.img?.alt}
                    width={100}
                    height={100}
                    className="w-16 lg:w-[72px]"
                  />
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-primary">
                    {opt.label[locale]}
                  </p>
                  <div className="flex justify-between gap-2 items-center">
                    {isBinary ? (
                      <>
                        <CustomButton
                          onClick={() => {
                            const exists = heirs.some(
                              (h) => h.type === opt.value
                            );
                            if (!exists) {
                              setHeirs((prev) => [
                                ...prev,
                                { type: opt.value, count: 1 },
                              ]);
                            }
                          }}
                          size="fit"
                          color="yellow"
                          disabled={heirs.some((h) => h.type === opt.value)}
                          className="hover:scale-100 !py-1 !px-3"
                        >
                          حي
                        </CustomButton>
                        <CustomButton
                          onClick={() => {
                            setHeirs((prev) =>
                              prev.filter((h) => h.type !== opt.value)
                            );
                          }}
                          size="fit"
                          color="red"
                          disabled={!heirs.some((h) => h.type === opt.value)}
                          className="border !border-red-700 hover:scale-100 !py-1 !px-3"
                        >
                          ميت
                        </CustomButton>
                      </>
                    ) : (
                      <>
                        <CustomButton
                          onClick={() => addHeir(opt.value)}
                          size="fit"
                          color="yellow"
                          disabled={maxReached}
                          className={`border border-primary/90 hover:scale-100 !py-1 !px-1 ${
                            maxReached ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
                        </CustomButton>
                        <p className="w-5 text-center">{heirCount}</p>
                        <CustomButton
                          onClick={() => removeHeir(opt.value)}
                          size="fit"
                          color="red"
                          className="border border-red-700 hover:scale-100 !py-1 !px-1"
                        >
                          <Minus className="w-4 h-4 lg:w-5 lg:h-5" />
                        </CustomButton>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
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
                      {r.amount.toFixed(2)} {unit}
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
