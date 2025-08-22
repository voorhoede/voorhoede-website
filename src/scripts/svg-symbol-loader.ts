import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { optimize } from 'svgo';
import { parseFilename } from 'ufo';

export const replaceRoot = ({ id: filename }: { id: string }) => () => ({
  root: {
    enter: (node) => {
      node.children[0].name = 'symbol';
      node.children[0].attributes = {
        id: filename.replace('.svg', ''),
        viewBox: node.children[0].attributes.viewBox,
      };
    },
  },
});

export function svgSymbolLoader() {
  return {
    name: 'svg-symbol-loader',
    enforce: 'pre',
    load(id: string) {
      if (/\.svg.+symbol/.test(id)) {
        const idPath = fileURLToPath(new URL(id, 'file://'));

        return readFile(idPath, 'utf8')
          .then((svg) => {
            const processedSvg = optimize(svg, {
              plugins: [
                {
                  name: 'replaceRoot',
                  fn: replaceRoot({ id: parseFilename(id, { strict: true }) }),
                },
              ],
            });

            return {
              code: `export default '${processedSvg.data}';`,
              map: { mappings: '' },
            };
          })
          .catch(console.error);
      }
    },
  };
}
