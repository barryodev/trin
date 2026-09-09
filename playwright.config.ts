import { defineConfig, devices } from "@playwright/test";

const keystaticEnv = {
  NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER:
    process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER ?? "barryodev",
  NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO:
    process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO ?? "trin",
  KEYSTATIC_GITHUB_CLIENT_ID: process.env.KEYSTATIC_GITHUB_CLIENT_ID ?? "dummy",
  KEYSTATIC_GITHUB_CLIENT_SECRET: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET ?? "dummy",
  KEYSTATIC_SECRET: process.env.KEYSTATIC_SECRET ?? "dummy",
};

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run build && npm run start",
    env: keystaticEnv,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    url: "http://127.0.0.1:3000",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
