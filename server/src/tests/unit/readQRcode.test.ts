import { expect, describe, it, vi, beforeEach } from "vitest";
import fs from "node:fs";
import Jimp from "jimp";
import { readQRcode } from "../../helpers/readQRcode";
import { logger } from "../../libs/logger";

const extractQRcodeReturn = "src/path/image";
const bufferData = Buffer.from("mocked buffer");
const messageOfQRcode = "MockedData";

beforeEach(() => {
	vi.spyOn(fs, "readFileSync").mockReturnValue(bufferData);

	vi.spyOn(Jimp, "read").mockResolvedValue({
		bitmap: {
			data: Buffer.from("mocked buffer"),
			width: 100,
			height: 100,
		},
	} as any);
});

let mockJsqrData: null | { data: string } = null;

vi.mock("jsqr", () => {
	const actualJsqr = vi.importActual("jsqr");

	const mockJsqr = {
		...actualJsqr,
		default: () => mockJsqrData,
	};

	return mockJsqr;
});

describe("extractQRcode suit test", () => {
	it("given path to qrcode should return his value", async () => {
		//ajeitar
		mockJsqrData = { data: messageOfQRcode };

		//atuar
		const returnResponse = await readQRcode(extractQRcodeReturn);

		//afirmar
		expect(returnResponse).toEqual(messageOfQRcode);
		expect(fs.readFileSync).toHaveBeenCalledWith(extractQRcodeReturn);
	});

	it("given invalid qrcode should call logger error ", async () => {
		//ajeitar
		const errorMessage = "QRcode not found";

		mockJsqrData = null;

		vi.spyOn(logger, "error").mockImplementationOnce(
			vi.fn((msg: string, ...args: any[]) => {
				null;
			}),
		);

		//atuar
		const returnResponse = await readQRcode(extractQRcodeReturn);

		//afirmar
		expect(returnResponse).toBe(undefined);
		expect(fs.readFileSync).toHaveBeenCalledWith(extractQRcodeReturn);
		expect(logger.error).toHaveBeenCalledWith(errorMessage);
		expect(logger.error).toHaveBeenCalledTimes(1);
	});
});
