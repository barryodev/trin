import { expect, test } from "@playwright/test";

test.describe("Video Responsive Sizing", () => {
  test("Video element adapts responsively between mobile and desktop", async ({
    page,
  }) => {
    // Mobile viewport (e.g. mobile screen: 412px wide)
    await page.setViewportSize({ width: 412, height: 924 });
    await page.goto("/posts/chroma-clack-the-good-the-bad-and-the-ugly");

    const video = page.locator("article video").first();
    await expect(video).toBeVisible();

    const videoBoxMobile = await video.boundingBox();
    const container = page.locator("article").first();
    const containerBoxMobile = await container.boundingBox();

    expect(videoBoxMobile).not.toBeNull();
    expect(containerBoxMobile).not.toBeNull();

    // On mobile, video should span full width of the container column (not 30% of it)
    expect(videoBoxMobile!.width).toBeGreaterThan(300);
    expect(Math.abs(videoBoxMobile!.width - containerBoxMobile!.width)).toBeLessThan(
      10,
    );

    // Desktop viewport (e.g. 1280px wide)
    await page.setViewportSize({ width: 1280, height: 800 });
    const videoBoxDesktop = await video.boundingBox();
    const containerBoxDesktop = await container.boundingBox();

    expect(videoBoxDesktop).not.toBeNull();
    expect(containerBoxDesktop).not.toBeNull();

    // On desktop, video width is 30% of the container
    const widthRatio = videoBoxDesktop!.width / containerBoxDesktop!.width;
    expect(widthRatio).toBeCloseTo(0.3, 1);
  });
});
