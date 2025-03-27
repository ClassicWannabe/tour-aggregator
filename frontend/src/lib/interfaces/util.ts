export type ExtractStrings<T> = T extends string
  ? T
  : T extends Record<string, unknown>
    ? ExtractStrings<T[keyof T]>
    : T extends (...args: any[]) => any
      ? ExtractStrings<ReturnType<T>>
      : never
