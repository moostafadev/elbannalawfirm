import React from "react";
import { Heir, HeirType } from "@/helpers/inheritance-calculator/types";
import { heirOptions } from "@/helpers/inheritance-calculator/constants";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import CustomButton from "../CustomButton";
import Animation from "../Animation";

interface Props {
  heirs: Heir[];
  deceasedGender: "male" | "female";
  locale: string;
  setHeirs: React.Dispatch<React.SetStateAction<Heir[]>>;
  translations: {
    alive: string;
    dead: string;
  };
  onHeirsChanged?: () => void;
}

const binaryHeirs: HeirType[] = [
  "husband",
  "father",
  "mother",
  "grandfather",
  "maternal_grandmother",
  "paternal_grandmother",
];

const HeirItem = React.memo(
  ({
    opt,
    heirCount,
    isBinary,
    maxReached,
    locale,
    alive,
    dead,
    onAdd,
    onRemove,
    onToggleAliveDead,
    exists,
  }: {
    opt: (typeof heirOptions)[number];
    heirCount: number;
    isBinary: boolean;
    maxReached: boolean;
    locale: string;
    alive: string;
    dead: string;
    onAdd: () => void;
    onRemove: () => void;
    onToggleAliveDead: (isAlive: boolean) => void;
    exists: boolean;
  }) => {
    return (
      <Animation origin="top" animationName="animation-inheritance-item">
        <div
          className={`flex flex-col gap-2 rounded-lg shadow-sm duration-300 hover:shadow-md border items-center justify-center ${
            locale === "ar" ? "p-3" : "px-1 py-2 sm:p-3"
          } ${
            heirCount > 0
              ? "border-primary/60 bg-primary/20 !shadow-md scale-[1.02]"
              : "border-primary/30"
          }`}
        >
          <Image
            src={opt.img?.src}
            alt={opt.img?.alt}
            width={100}
            height={100}
            className="w-16 lg:w-[72px]"
          />
          <p
            className={`${
              locale === "ar"
                ? "text-sm sm:text-base lg:text-lg"
                : "text-xs sm:text-sm lg:text-base"
            } font-bold text-primary`}
          >
            {opt.label[locale]}
          </p>
          <div
            className={`flex justify-between items-center ${
              locale === "ar" ? "gap-2" : "gap-1 flex-wrap"
            }`}
          >
            {isBinary ? (
              <>
                <CustomButton
                  onClick={() => onToggleAliveDead(true)}
                  size="fit"
                  color="yellow"
                  disabled={exists}
                  className={`hover:scale-100 !py-1 !px-3 ${
                    locale === "ar" ? "" : "text-xs sm:text-base"
                  }`}
                >
                  {alive}
                </CustomButton>
                <CustomButton
                  onClick={() => onToggleAliveDead(false)}
                  size="fit"
                  color="red"
                  disabled={!exists}
                  className={`border !border-red-700 hover:scale-100 !py-1 !px-3 ${
                    locale === "ar" ? "" : "text-xs sm:text-base"
                  }`}
                >
                  {dead}
                </CustomButton>
              </>
            ) : (
              <>
                <CustomButton
                  onClick={onAdd}
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
                  onClick={onRemove}
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
      </Animation>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.heirCount === nextProps.heirCount &&
      prevProps.exists === nextProps.exists
    );
  }
);

HeirItem.displayName = "HeirItem";

const HeirsGrid: React.FC<Props> = ({
  heirs,
  deceasedGender,
  locale,
  setHeirs,
  translations: { alive, dead },
  onHeirsChanged,
}) => {
  const addHeir = (type: HeirType) => {
    setHeirs((prev) => {
      const exists = prev.find((h) => h.type === type);
      if (exists) {
        return prev.map((h) =>
          h.type === type ? { ...h, count: h.count + 1 } : h
        );
      } else {
        return [...prev, { type, count: 1 }];
      }
    });
    onHeirsChanged?.();
  };

  const removeHeir = (type: HeirType) => {
    setHeirs((prev) => {
      const heir = prev.find((h) => h.type === type);
      if (!heir) return prev;
      if (heir.count <= 1) {
        return prev.filter((h) => h.type !== type);
      } else {
        return prev.map((h) =>
          h.type === type ? { ...h, count: h.count - 1 } : h
        );
      }
    });
    onHeirsChanged?.();
  };

  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ${
        locale === "ar"
          ? "gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5"
          : "gap-2 lg:gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
      }`}
    >
      {heirOptions
        .filter((opt) => {
          if (opt.value === "husband" && deceasedGender !== "female")
            return false;
          if (opt.value === "wife" && deceasedGender !== "male") return false;
          return true;
        })
        .map((opt) => {
          const heirCount = heirs.find((h) => h.type === opt.value)?.count ?? 0;
          const isBinary = binaryHeirs.includes(opt.value);
          const maxReached = opt.value === "husband" && heirCount >= 1;

          return (
            <HeirItem
              key={`${opt.value}-${heirCount}`}
              opt={opt}
              heirCount={heirCount}
              isBinary={isBinary}
              maxReached={maxReached}
              locale={locale}
              alive={alive}
              dead={dead}
              exists={heirs.some((h) => h.type === opt.value)}
              onAdd={() => addHeir(opt.value)}
              onRemove={() => removeHeir(opt.value)}
              onToggleAliveDead={(isAlive) => {
                if (isAlive && !heirs.some((h) => h.type === opt.value)) {
                  setHeirs((prev) => [...prev, { type: opt.value, count: 1 }]);
                  onHeirsChanged?.();
                } else if (!isAlive) {
                  setHeirs((prev) => prev.filter((h) => h.type !== opt.value));
                  onHeirsChanged?.();
                }
              }}
            />
          );
        })}
    </div>
  );
};

export default React.memo(HeirsGrid);
