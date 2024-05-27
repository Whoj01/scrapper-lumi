import ILovePDFApi from "@ilovepdf/ilovepdf-nodejs";
import { expect, describe, it, vi } from "vitest";
import { transformPDFToImage } from "../../helpers/transformPDFToImage";
import fs from "node:fs";
import url from "node:url";
import path from "node:path";

describe("Transform PDF to Image suite test", () => {
	const pathToPDF = "https://path.pdf";
	const pathToPDFImage = "src/temp/imgs";

	it("Given path url to API call should return path to local image of the pdf", async () => {
		//ajeitar
		vi.spyOn(url, "fileURLToPath").mockResolvedValue("");
		vi.spyOn(path, "resolve").mockReturnValueOnce(pathToPDFImage);
		vi.spyOn(fs, "writeFileSync").mockImplementationOnce(() => {});
		vi.spyOn(ILovePDFApi.prototype, "newTask").mockReturnValueOnce({
			start: vi.fn().mockResolvedValue(null),
			addFile: vi.fn().mockResolvedValue(null),
			process: vi.fn().mockResolvedValue(null),
			download: vi.fn().mockResolvedValue(null),
		} as any);

		//atuar
		const returnValue = await transformPDFToImage(pathToPDF);

		//afirmar
		expect(returnValue).toBe(pathToPDFImage);
	});
});
