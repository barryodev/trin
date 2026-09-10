import { expect, test } from "@playwright/test";

test("homepage renders the primary navigation", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: "@barryodev" })).toBeVisible();
  await expect(page.getByRole("navigation")).toContainText("Posts");
});

test("public navigation pages render", async ({ page }) => {
  await page.goto("/posts");
  await expect(page.getByRole("heading", { name: "Posts" })).toBeVisible();
  await expect(page.getByText("No posts yet")).toBeVisible();

  await page.getByRole("link", { name: "Projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();
  await expect(page.getByText("Trin", { exact: true })).toBeVisible();

  await page.getByRole("link", { name: "Playlists" }).click();
  await expect(page).toHaveURL(/\/playlists$/);
  await expect(page.getByRole("heading", { name: "Playlists" })).toBeVisible();
  await expect(page.getByText("Beats to trigger flow state")).toBeVisible();
});

test("post detail page 404s for a missing slug", async ({ page }) => {
  const response = await page.goto("/posts/does-not-exist");

  expect(response?.status()).toBe(404);
});
