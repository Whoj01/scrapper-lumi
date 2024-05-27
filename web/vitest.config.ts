import { defineConfig, configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [
    tsconfigPaths(),
		react()
  ],
	test: {
		environment: "jsdom",
		mockReset: false,
		restoreMocks: false,
		clearMocks: false,
		coverage: {
			exclude: [
				...(configDefaults.coverage
					.exclude as keyof typeof configDefaults.coverage.exclude),
				"**/User.ts",
				"**/ChartType.ts",
				"**/Bill.ts",
				"**/protocols/**",
				"**/controllers/protocols.ts",
				"**/controllers/**/protocols.ts",
				"**/index.*",
			],
		},
	},
});
