import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import Animation from "../Animation";

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
      <Animation origin="right" animationName="animation-inheritance-input">
        <label className="block font-medium mb-3">
          {translations.estateLabel}:
        </label>
      </Animation>
      <div className="flex gap-2">
        <Animation
          origin="right"
          animationName="animation-inheritance-input"
          className="w-full"
        >
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
            className="border border-primary/60 shadow-sm hover:shadow-md duration-300"
          />
        </Animation>
        <Animation
          origin="right"
          animationName="animation-inheritance-input"
          className="min-w-[130px]"
        >
          <Select
            value={unit}
            onValueChange={(e) => setUnit(e as "pound" | "feddan")}
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pound">{translations.unitPound}</SelectItem>
              <SelectItem value="feddan">{translations.unitFaddan}</SelectItem>
            </SelectContent>
          </Select>
        </Animation>
      </div>
    </div>
  );
};

export default React.memo(EstateInput);
