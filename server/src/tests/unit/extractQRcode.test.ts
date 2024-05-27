import path from "node:path";
import { expect, describe, it, vi } from "vitest";
import fs from "node:fs";
import { extractQRcode } from "../../helpers/extractQRcode";

const extractQRcodeReturn = "src/path/image";
const bufferData = Buffer.from("mocked buffer");

describe("extractQRcode suit test", () => {
	it("given path to pdf image should return path to qrcode", async () => {
		//ajeitar
		vi.spyOn(path, "resolve").mockReturnValueOnce(extractQRcodeReturn);

		vi.mock("sharp", () => {
			const actualSharp = vi.importActual("sharp");

			const mockSharp = {
				...actualSharp,
				default: () => ({
					extract: vi.fn().mockReturnThis(),
					resize: vi.fn().mockReturnThis(),
					jpeg: vi.fn().mockReturnThis(),
					toBuffer: vi.fn().mockResolvedValue(Buffer.from("mocked buffer")),
				}),
			};

			return mockSharp;
		});

		vi.spyOn(fs, "writeFileSync").mockImplementationOnce(() => {});
		//atuar
		const returnResponse = await extractQRcode(extractQRcodeReturn);

		//afirmar
		expect(returnResponse).toEqual(extractQRcodeReturn);
		expect(fs.writeFileSync).toHaveBeenCalledWith(
			extractQRcodeReturn,
			bufferData,
		);
	});
});
