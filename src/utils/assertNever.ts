export const assertNever = (value: never, message?: string) => {
  throw new Error(message ?? `Illegal value: ${value}`);
};
