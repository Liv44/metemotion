import { test } from "@playwright/test";
import { injectAxe } from "axe-playwright";
import { createHtmlReport } from "axe-html-reporter";
import * as fs from "fs";

test("@a11y audit", async ({ page }) => {
	await page.goto(process.env.PREVIEW_URL || "http://localhost:5173");
	await injectAxe(page);

	const results = await page.evaluate(() => window.axe.run());

	type Violation = {
		id: string;
		description: string;
		impact: string;
		help: string;
		helpUrl: string;
		nodes: {
			target: string[];
		}[];
	};

	await page.waitForTimeout(1000);

	/* --- Markdown --- */
	const markdown = results.violations.length
		? results.violations
				.map((v: Violation) => {
					return `### ❌ ${v.id} – ${v.description}
- Impact : **${v.impact}**
- Aide : [${v.help}](${v.helpUrl})
- Cibles : ${v.nodes.map((n: { target: string[] }) => "`" + n.target.join(", ") + "`").join(", ")}`;
				})
				.join("\n\n")
		: "✅ Aucun problème détecté par axe-core.";

	/* --- Génération du rapport HTML --- */
	createHtmlReport({
		results,
		options: {
			projectKey: "CI-a11y",
			outputDir: "results/a11y",
			reportFileName: "accessibility-report.html",
		},
	});

	fs.mkdirSync("results/a11y", { recursive: true });
	fs.writeFileSync("results/a11y/accessibility-report.md", markdown);
});
