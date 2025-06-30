"use client";

import InheritanceCalculator, {
  Heir,
  HeirType,
  ShareResult,
} from "@/helpers/calculateShares";
import React, { useState } from "react";

const heirOptions: { label: string; value: HeirType }[] = [
  { label: "الزوج", value: "husband" },
  { label: "الزوجة", value: "wife" },
  { label: "الأب", value: "father" },
  { label: "الأم", value: "mother" },
  { label: "الجد", value: "grandfather" },
  { label: "الجدة لأم", value: "maternal_grandmother" },
  { label: "الجدة لأب", value: "paternal_grandmother" },
  { label: "الابن", value: "son" },
  { label: "الابنة", value: "daughter" },
  { label: "ابن الابن", value: "son_son" },
  { label: "بنت الابن", value: "son_daughter" },
  { label: "الأخ الشقيق", value: "full_brother" },
  { label: "الأخت الشقيقة", value: "full_sister" },
  { label: "الأخ لأب", value: "paternal_brother" },
  { label: "الأخت لأب", value: "paternal_sister" },
  { label: "الأخ لأم", value: "maternal_brother" },
  { label: "الأخت لأم", value: "maternal_sister" },
  { label: "العم الشقيق", value: "full_uncle" },
  { label: "العم لأب", value: "paternal_uncle" },
  { label: "ابن العم الشقيق", value: "son_of_full_uncle" },
  { label: "ابن العم لأب", value: "son_of_paternal_uncle" },
  { label: "ابن الأخ الشقيق", value: "son_of_full_brother" },
  { label: "ابن الأخ لأب", value: "son_of_paternal_brother" },
];

const Page = () => {
  const [estate, setEstate] = useState<number>(0);
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
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">حاسبة المواريث المصرية</h1>

      <div className="mb-4">
        <label className="block font-medium mb-1">قيمة التركة (بالجنيه):</label>
        <input
          type="number"
          value={estate}
          onChange={(e) => setEstate(Number(e.target.value))}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">أضف الورثة:</label>
        <div className="grid grid-cols-2 gap-2">
          {heirOptions.map((opt) => (
            <div
              key={opt.value}
              className="flex items-center justify-between bg-gray-100 rounded p-2"
            >
              <span>{opt.label}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => addHeir(opt.value)}
                  className="px-2 py-1 bg-green-500 text-white rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeHeir(opt.value)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  -
                </button>
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
                    {label}: {h.count}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <button
        onClick={calculate}
        className="w-full bg-blue-600 text-white py-2 rounded font-bold"
      >
        احسب الأنصبة
      </button>

      {results.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">النتائج:</h2>
          <table className="w-full text-right border">
            <thead>
              <tr>
                <th className="border p-2">الوارث</th>
                <th className="border p-2">النصيب النسبي</th>
                <th className="border p-2">القيمة بالجنيه</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => {
                const label = heirOptions.find(
                  (opt) => opt.value === r.type
                )?.label;
                return (
                  <tr key={r.type}>
                    <td className="border p-2">{label}</td>
                    <td className="border p-2">
                      {(r.share * 100).toFixed(2)}%
                    </td>
                    <td className="border p-2">{r.amount.toFixed(2)} جنيه</td>
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

// inheritance-calculator
