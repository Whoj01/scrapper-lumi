import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
	test: {
		mockReset: false,
		restoreMocks: false,
		clearMocks: false,
		coverage: {
			exclude: [
				...(configDefaults.coverage
					.exclude as keyof typeof configDefaults.coverage.exclude),
				"**/types/**",
				"**/protocols/**",
				"**/helpers/readPDF.*",
				"**/scripts/seedDatabase.*",
				"**/controllers/protocols.ts",
				"**/controllers/**/protocols.ts",
				"**/index.*",
			],
		},
	},
});
