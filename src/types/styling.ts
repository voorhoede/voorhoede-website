export const BackgroundColor = {
  None: "none",
  PastelYellow: "pastel-yellow",
  Grey: "grey",
} as const;

export type BackgroundColorValue =
  (typeof BackgroundColor)[keyof typeof BackgroundColor];
