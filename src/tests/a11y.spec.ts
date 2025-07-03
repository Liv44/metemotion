import { test, expect } from "@playwright/test";
import { injectAxe } from "axe-playwright";

test.describe("@a11y core accessibility checks", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(process.env.PREVIEW_URL || "http://localhost:5173");
		await injectAxe(page);
	});

	test("Focus is visible when using keyboard", async ({ page }) => {
		await page.keyboard.press("Tab");

		const active = await page.evaluate(
			() => document.activeElement?.className
		);
		expect(active).toContain("skip-to-content");

		const hasKeyboardClass = await page.evaluate(() =>
			document.body.classList.contains("keyboard-mode")
		);
		expect(hasKeyboardClass).toBe(true);
	});

	test("Page has one h1 and no heading level skips", async ({ page }) => {
		const headings = await page.$$eval("h1, h2, h3, h4, h5, h6", els =>
			els.map(el => el.tagName.toLowerCase())
		);

		const h1Count = headings.filter(tag => tag === "h1").length;
		expect(h1Count).toBe(1);

		const headingLevels = headings.map(h => Number(h[1]));
		for (let i = 0; i < headingLevels.length - 1; i++) {
			const current = headingLevels[i];
			const next = headingLevels[i + 1];
			expect(next - current).toBeLessThanOrEqual(1);
		}
	});

	test("Form fields are labelled and keyboard accessible", async ({
		page,
	}) => {
		const emailInput = page.locator('input[type="email"]');
		await expect(emailInput).toHaveAttribute("aria-label", /email/i);
		await expect(emailInput).toBeVisible();
		await emailInput.focus();
		await expect(emailInput).toBeFocused();
	});
});
