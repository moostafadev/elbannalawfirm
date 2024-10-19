import { FieldValues, FieldPath, ControllerRenderProps } from "react-hook-form";

export const changeDataToNumber = <TFieldValues extends FieldValues>(
  e: React.ChangeEvent<HTMLInputElement>,
  field: ControllerRenderProps<TFieldValues, FieldPath<TFieldValues>>
) => {
  const value = e.target.value;
  if (/^\d*\.?\d*$/.test(value)) {
    field.onChange(Number(value) || null);
  } else {
    field.onChange("");
  }
};
