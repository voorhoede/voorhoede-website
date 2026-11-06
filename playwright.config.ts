import { defineConfig, devices } from "@playwright/test";

/**
 * Accessibility tests run against a local Nuxt dev server by default.
 * Set A11Y_BASE_URL to test against another server (e.g. a preview deploy);
 * in that case no local server is started.
 */
const externalBaseUrl = process.env.A11Y_BASE_URL;
const baseURL = externalBaseUrl ?? "http://localhost:3000";

export default defineConfig({
  testDir: "./tests",
  outputDir: "./tmp/playwright-results/",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // the dev server compiles pages on first request, so allow some slack
  timeout: 60_000,
  reporter: "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: externalBaseUrl
    ? undefined
    : {
        command: "npm run dev",
        url: `${baseURL}/nl/`,
        reuseExistingServer: true,
        timeout: 180_000,
      },
});
