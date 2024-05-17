// eslint-disable-next-line no-unused-vars
export type ImageLoader = (resolverProps: {
  src: string;
  width: number;
  quality?: number;
}) => string;
