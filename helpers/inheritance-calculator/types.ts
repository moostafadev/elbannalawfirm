export type HeirType =
  | "husband"
  | "wife"
  | "father"
  | "mother"
  | "son"
  | "daughter"
  | "son_son"
  | "son_daughter"
  | "full_brother"
  | "full_sister"
  | "paternal_brother"
  | "paternal_sister"
  | "maternal_brother"
  | "maternal_sister"
  | "grandfather"
  | "maternal_grandmother"
  | "paternal_grandmother"
  | "full_uncle"
  | "paternal_uncle"
  | "son_of_full_uncle"
  | "son_of_paternal_uncle"
  | "son_of_full_brother"
  | "son_of_paternal_brother";

export interface Heir {
  type: HeirType;
  count: number;
}

export interface ShareResult {
  type: HeirType;
  share: number;
  amount: number;
}
