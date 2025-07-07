import React from "react";
import { Heir, HeirType } from "@/helpers/inheritance-calculator/types";
import { heirOptions } from "@/helpers/inheritance-calculator/constants";

interface Props {
  blockedHeirs: HeirType[];
  inputHeirs: Heir[];
  locale: string;
}

const BlockedHeirsList: React.FC<Props> = ({
  blockedHeirs,
  inputHeirs,
  locale,
}) => {
  if (blockedHeirs.length === 0) return null;

  const presentHeirTypes = inputHeirs.map((h) => h.type);
  const blockedPresent = blockedHeirs.filter((t) =>
    presentHeirTypes.includes(t)
  );

  if (blockedPresent.length === 0) return null;

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-3">الورثة المحجوبون:</h3>
      <ul className="list-disc list-inside">
        {blockedPresent.map((type) => {
          const label = heirOptions.find((opt) => opt.value === type)?.label;
          return <li key={type}>{label?.[locale] ?? type}</li>;
        })}
      </ul>
    </div>
  );
};

export default BlockedHeirsList;
