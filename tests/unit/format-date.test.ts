import { describe, expect, it } from "vitest";
import { formatDate } from "@/lib/format-date";

describe("formatDate", () => {
  it("formats an ISO date as a long US date", () => {
    expect(formatDate("2026-06-01")).toBe("June 1, 2026");
  });

  it("keeps date-only values anchored to their calendar day", () => {
    expect(formatDate("2026-12-31")).toBe("December 31, 2026");
  });
});
