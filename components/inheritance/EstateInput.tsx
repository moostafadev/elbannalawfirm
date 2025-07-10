import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";

interface Props {
  estate: number;
  setEstate: (val: number) => void;
  unit: "pound" | "feddan";
  setUnit: (val: "pound" | "feddan") => void;
  translations: { estateLabel: string; unitPound: string; unitFaddan: string };
  locale: string;
}

const EstateInput: React.FC<Props> = ({
  estate,
  setEstate,
  unit,
  setUnit,
  translations,
  locale,
}) => {
  return (
    <div className="mb-4">
      <label className="block font-medium mb-3">
        {translations.estateLabel}:
      </label>
      <div className="flex gap-2">
        <Input
          type="number"
          value={estate === 0 ? "" : estate}
          onChange={(e) => {
            const val = e.target.value;
            if (val === "") {
              setEstate(0);
            } else {
              setEstate(Math.abs(Number(val)));
            }
          }}
          onFocus={(e) =>
            e.target.value === "0" ? (e.target.value = "") : e.target.value
          }
          className="border w-full border-primary/60 shadow-sm hover:shadow-md duration-300"
        />
        <Select
          value={unit}
          onValueChange={(e) => setUnit(e as "pound" | "feddan")}
          dir={locale === "ar" ? "rtl" : "ltr"}
        >
          <SelectTrigger className="max-w-[130px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pound">{translations.unitPound}</SelectItem>
            <SelectItem value="feddan">{translations.unitFaddan}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default React.memo(EstateInput);
