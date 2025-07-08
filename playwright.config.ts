import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "src/tests",
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
});
