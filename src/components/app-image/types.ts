export type ImageLoader = (resolverProps: {
  src: string;
  width: number;
  quality?: number;
}) => string;
