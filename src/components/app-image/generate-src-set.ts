import type { ImageLoader } from "./types";

const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
const imageSizes = [16, 32, 48, 64, 96, 128, 256, 384];
const allSizes = [...deviceSizes, ...imageSizes].sort((a, b) => a - b);

export function generateSrcSet({
  loader,
  src,
  width,
  quality,
  sizes,
}: {
  loader: ImageLoader;
  src: string;
  width: number;
  quality: number;
  sizes?: string;
}) {
  const { widths, kind } = getWidths(width, sizes);

  return widths
    .map(
      (width, index) =>
        `${loader({ src, width, quality })} ${kind === "w" ? width : index + 1}${kind}`
    )
    .join(", ");
}

function getWidths(width: number, sizes: string | undefined) {
  if (sizes) {
    // Find all the viewport percentage lengths
    const percentSizes = [...sizes.matchAll(/(^|\s)(1?\d?\d)vw/g)].map((captureGroups) =>
      parseInt(captureGroups[2], 10)
    );
    if (percentSizes.length) {
      const smallestRatio = Math.min(...percentSizes) * 0.01;
      return {
        widths: allSizes.filter((size) => size >= deviceSizes[0] * smallestRatio),
        kind: "w",
      };
    }
    return { widths: allSizes, kind: "w" };
  }

  return { widths: [width, width * 2], kind: "x" };
}
