import { expect, test } from "@playwright/test";

test.describe("Post body card", () => {
  test("title sits over the art while meta and body sit in a solid card on mobile", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 412, height: 924 });
    await page.goto("/posts/grappling-with-the-fire-hose");

    const card = page.getByTestId("post-card");
    await expect(card).toBeVisible();

    // Title is outside the card so the artwork shows behind it
    const title = page.getByRole("heading", { level: 1 });
    await expect(title).toBeVisible();
    await expect(card.getByRole("heading", { level: 1 })).toHaveCount(0);

    // Meta line and prose body are inside the card
    await expect(card.getByText(/min read/i)).toBeVisible();
    await expect(card.locator(".prose-post")).toBeVisible();

    // Card background is near-opaque
    const bg = await card.evaluate((el) => getComputedStyle(el).backgroundColor);
    const hasAlpha = bg.includes("/") || bg.startsWith("rgba");
    const alpha = hasAlpha ? Number(bg.match(/([\d.]+)\s*\)$/)?.[1]) : 1;
    expect(alpha).toBeGreaterThanOrEqual(0.85);
  });
});
