import { describe, expect, it } from "vitest";
import { getReadingTime } from "@/lib/reading-time";

describe("getReadingTime", () => {
  it("returns at least one minute for empty content", () => {
    expect(getReadingTime([])).toBe("1 min read");
    expect(getReadingTime(null)).toBe("1 min read");
  });

  it("counts words in nested document nodes", () => {
    const document = [
      {
        children: [{ text: "one two three" }, { text: "four five" }],
      },
      { text: "six" },
    ];

    expect(getReadingTime(document)).toBe("1 min read");
  });

  it("rounds longer content to the nearest minute", () => {
    const text = Array.from({ length: 301 }, (_, index) => `word${index}`).join(" ");

    expect(getReadingTime([{ text }])).toBe("2 min read");
  });
});
