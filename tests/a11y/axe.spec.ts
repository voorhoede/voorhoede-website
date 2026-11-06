import { AxeBuilder } from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { pages } from './pages';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const FAIL_ON_IMPACT = ['critical', 'serious', 'moderate'];

/**
 * Report-only by default: violations are logged and attached to the report,
 * but don't fail the test. Set A11Y_STRICT=1 to fail on FAIL_ON_IMPACT.
 */
const strict = process.env.A11Y_STRICT === '1';

for (const path of pages) {
  test(`a11y ${path}`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status(), `${path} did not load, update tests/a11y/pages.ts`).toBe(200);

    const results = await new AxeBuilder({ page })
      .withTags(WCAG_TAGS)
      // injected by `nuxt dev`, not part of the site
      .exclude('#nuxt-devtools-container')
      .analyze();

    await test.info().attach('axe-violations.json', {
      body: JSON.stringify(results.violations, null, 2),
      contentType: 'application/json',
    });

    const summary = results.violations.map(
      (v) =>
        `[${v.impact}] ${v.id}: ${v.help} (${v.nodes.length}x)` +
        v.nodes.map((n) => `\n    ${n.target.join(' ')}`).join(''),
    );
    if (summary.length) {
      console.log(`${path}\n  ${summary.join('\n  ')}`);
    }

    if (strict) {
      const failing = results.violations
        .filter((v) => FAIL_ON_IMPACT.includes(v.impact ?? ''))
        .map((v) => `[${v.id}] ${v.help} (${v.nodes.length}x)`);
      expect(failing).toEqual([]);
    }
  });
}
