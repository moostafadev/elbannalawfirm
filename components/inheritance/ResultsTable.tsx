import React from "react";
import {
  ShareResult,
  Heir,
  HeirType,
} from "@/helpers/inheritance-calculator/types";
import { heirOptions } from "@/helpers/inheritance-calculator/constants";
import { pluralForms } from "@/helpers/inheritance-calculator/pluralForms";

interface Props {
  results: ShareResult[];
  heirs: Heir[];
  unit: "pound" | "feddan";
  locale: string;
  translations: {
    unitPound: string;
    unitFaddan: string;
    resultsTitle: string;
    heirLabel: string;
    totalShare: string;
    individualShare: string;
    toggleTitle: string;
  };
}

const ResultsTable: React.FC<Props> = ({
  results,
  heirs,
  unit,
  locale,
  translations,
}) => {
  if (results.length === 0) return null;

  const getCount = (type: string) =>
    heirs.find((h) => h.type === type)?.count ?? 1;

  const formatUnit = (value: number, unit: string) => {
    const rounded = value.toFixed(2);
    if (unit === "pound") {
      return `${rounded} ${translations.unitPound}`;
    }
    if (unit === "feddan") {
      return `${rounded} ${translations.unitFaddan}`;
    }
    return `${rounded} ${unit}`;
  };

  const formatHeirLabel = (
    label: string,
    count: number,
    locale: string,
    type: HeirType
  ) => {
    const forms = pluralForms[type];

    if (locale === "ar" && forms?.ar) {
      if (count === 1) return forms.ar.one;
      if (count === 2) return forms.ar.two;
      if (count >= 3 && count <= 10) return `${count} ${forms.ar.few}`;
      return `${count} ${forms.ar.many}`;
    }

    let plural: string;
    if (locale === "en" && typeof forms?.en === "string") {
      plural = forms.en;
    } else if (locale === "fr" && typeof forms?.fr === "string") {
      plural = forms.fr;
    } else {
      plural = `${label}${count > 1 ? "s" : ""}`;
    }
    return `${count > 1 ? count + " " : ""}${count > 1 ? plural : label}`;
  };

  return (
    <div className="mt-6">
      <h6 className="text-xl font-semibold mb-2">
        {translations.resultsTitle}:
      </h6>
      <table className="w-full border">
        <thead>
          <tr className="text-xs sm:text-base">
            <th className="border p-2">{translations.heirLabel}</th>

            <th
              className="border p-2 cursor-pointer hover:bg-gray-100 duration-300"
              title={translations.toggleTitle}
            >
              <div className="flex items-center gap-2">
                {translations.totalShare}
              </div>
            </th>

            <th
              className="border p-2 cursor-pointer hover:bg-gray-100 duration-300"
              title={translations.toggleTitle}
            >
              <div className="flex items-center gap-2">
                {translations.individualShare}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => {
            const label = heirOptions.find(
              (opt) => opt.value === r.type
            )?.label;
            const count = getCount(r.type);
            const individualShare = r.share / count;
            const individualAmount = r.amount / count;

            return (
              <tr key={r.type} className="text-xs sm:text-base">
                <td className="border p-2">
                  <span className="block mb-1">
                    {formatHeirLabel(
                      label?.[locale] ?? "",
                      count,
                      locale,
                      r.type
                    )}
                  </span>
                  {r.share !== 1 && r.fraction.includes("/") && (
                    <span className="inline-flex flex-col items-center text-sm sm:text-base font-semibold text-black leading-tight">
                      <span className="border-b-2 border-black px-[4px]">
                        {r.fraction.split("/")[0]}
                      </span>
                      <span className="px-[4px]">
                        {r.fraction.split("/")[1]}
                      </span>
                    </span>
                  )}
                </td>

                <td className="border p-2">
                  <span className="block mb-1">
                    {formatUnit(r.amount, unit)}
                  </span>
                  <span>{`${(r.share * 100).toFixed(2)}%`}</span>
                </td>

                <td className="border p-2">
                  {count > 1 ? (
                    <>
                      <span className="block mb-1">
                        {formatUnit(individualAmount, unit)}
                      </span>
                      <span>{`${(individualShare * 100).toFixed(2)}%`}</span>
                    </>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(ResultsTable);
