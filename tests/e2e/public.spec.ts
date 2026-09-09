import { expect, test } from "@playwright/test";

test("homepage renders the primary navigation and post list", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: "@barryodev" })).toBeVisible();
  await expect(page.getByRole("navigation")).toContainText("Posts");
  await expect(
    page.getByRole("link", { name: "Quis Nostrud Exercitation Ullamco" }),
  ).toBeVisible();
});

test("public navigation pages render", async ({ page }) => {
  await page.goto("/posts");
  await expect(page.getByRole("heading", { name: "Posts" })).toBeVisible();

  await page.getByRole("link", { name: "Projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();
  await expect(page.getByText("Project One")).toBeVisible();

  await page.getByRole("link", { name: "Playlists" }).click();
  await expect(page).toHaveURL(/\/playlists$/);
  await expect(page.getByRole("heading", { name: "Playlists" })).toBeVisible();
  await expect(page.getByText("Deep Focus")).toBeVisible();
});

test("post detail page renders content", async ({ page }) => {
  await page.goto("/posts/lorem-ipsum-five");

  await expect(
    page.getByRole("heading", { name: "Quis Nostrud Exercitation Ullamco" }),
  ).toBeVisible();
  await expect(page.getByText("Et harum quidem rerum facilis est")).toBeVisible();
});

test("keystatic admin route loads locally", async ({ page }) => {
  await page.goto("/keystatic");

  await expect(page).toHaveURL(/\/keystatic/);
  await expect(
    page
      .getByRole("button", { name: "Log in with GitHub" })
      .or(page.getByText("Posts").first()),
  ).toBeVisible();
});
