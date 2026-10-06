export const isPrismaUniqueError = (error: unknown): boolean =>
  typeof error === "object" &&
  error !== null &&
  "code" in error &&
  (error as { code: string }).code === "P2002";
