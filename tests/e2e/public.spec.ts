import { expect, test } from "@playwright/test";

test("homepage renders the primary navigation", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: "@barryodev" })).toBeVisible();
  await expect(page.getByRole("navigation")).toContainText("Posts");
});

test("public navigation pages render", async ({ page }) => {
  await page.goto("/posts");
  await expect(page.getByRole("heading", { name: "Posts", level: 1 })).toBeVisible();
  await expect(
    page.locator('main a[href^="/posts/"]').first(),
  ).toBeVisible();

  await page.getByRole("link", { name: "Projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole("heading", { name: "Projects", level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { level: 3 }).first()).toBeVisible();

  await page.getByRole("link", { name: "Playlists" }).click();
  await expect(page).toHaveURL(/\/playlists$/);
  await expect(page.getByRole("heading", { name: "Playlists", level: 1 })).toBeVisible();
  await expect(page.locator('iframe[src*="open.spotify.com"]').first()).toBeVisible();
});

test("the first post on the posts page opens its detail page", async ({ page }) => {
  await page.goto("/posts");

  const firstPost = page.locator('main a[href^="/posts/"]').first();
  const title = await firstPost.getByRole("heading", { level: 2 }).innerText();

  await firstPost.click();

  await expect(page).toHaveURL(/\/posts\/[^/]+$/);
  await expect(page.getByRole("heading", { level: 1, name: title })).toBeVisible();
});

test("post detail page 404s for a missing slug", async ({ page }) => {
  const response = await page.goto("/posts/does-not-exist");

  expect(response?.status()).toBe(404);
});
