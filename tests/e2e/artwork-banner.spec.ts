import { expect, test } from "@playwright/test";

test.describe("Artwork Banner and Attribution", () => {
  test("renders side banners framing content on desktop viewport", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const leftBanner = page.locator('img[src*="twisted-dreams-left-banner.webp"]');
    await expect(leftBanner).toBeVisible();

    const rightBanner = page.locator('img[src*="twisted-dreams-right-banner.webp"]');
    await expect(rightBanner).toBeVisible();

    const mobileBg = page.locator('img[src*="twistingdreams-mobile.webp"]');
    await expect(mobileBg).toBeHidden();

    // Verify framing: left banner is to the left of container, right banner is to the right
    const leftBox = await leftBanner.boundingBox();
    const rightBox = await rightBanner.boundingBox();
    const contentBox = await page.locator("main > div").first().boundingBox();

    expect(leftBox).not.toBeNull();
    expect(rightBox).not.toBeNull();
    expect(contentBox).not.toBeNull();

    expect(leftBox!.x).toBeLessThan(contentBox!.x);
    expect(rightBox!.x).toBeGreaterThan(contentBox!.x);
  });

  test("renders mobile background on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 412, height: 924 });
    await page.goto("/");

    const leftBanner = page.locator('img[src*="twisted-dreams-left-banner.webp"]');
    await expect(leftBanner).toBeHidden();

    const rightBanner = page.locator('img[src*="twisted-dreams-right-banner.webp"]');
    await expect(rightBanner).toBeHidden();

    const mobileBg = page.locator('img[src*="twistingdreams-mobile.webp"]');
    await expect(mobileBg).toBeVisible();
  });

  test("footer contains artwork attribution line with required links", async ({
    page,
  }) => {
    await page.goto("/");

    const footer = page.locator("footer");
    await expect(footer).toBeVisible();

    const footerWorkLink = footer.getByRole("link", { name: "Twisting Dreams" });
    await expect(footerWorkLink).toHaveAttribute(
      "href",
      "https://denungeherrholm.smugmug.com/Posters/i-Mtpv56d/A",
    );

    const footerArtistLink = footer.getByRole("link", { name: "Kim Diaz Holm" });
    await expect(footerArtistLink).toHaveAttribute(
      "href",
      "https://www.patreon.com/c/kimholm/about",
    );

    const footerCcLink = footer.getByRole("link", { name: "CC BY 4.0" });
    await expect(footerCcLink).toHaveAttribute(
      "href",
      "https://creativecommons.org/licenses/by/4.0/",
    );
    await expect(footerCcLink).toHaveAttribute("target", "_blank");
    await expect(footerCcLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});
