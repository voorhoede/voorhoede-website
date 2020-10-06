/*
 * @nuxt/svg-sprite doesn't work in IE.
 * This plugin fixes that.
 * See issue: https://github.com/nuxt-community/svg-sprite-module/issues/42
**/

export default async function () {
  const svg4everybody = await import('svg4everybody').then(module => module.default)
  svg4everybody()
}
