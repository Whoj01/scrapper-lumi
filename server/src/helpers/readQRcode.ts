import qrcode from "jsqr";
import fs from "node:fs";
import Jimp from "jimp";
import { logger } from "../libs/logger";

export const readQRcode = async (pathToQR: string) => {
	const data = fs.readFileSync(pathToQR);

	const image = await Jimp.read(data);

	const imageData = {
		data: new Uint8ClampedArray(image.bitmap.data),
		width: image.bitmap.width,
		height: image.bitmap.height,
	};

	const decodedQR = qrcode(imageData.data, imageData.width, imageData.height);

	if (!decodedQR) {
		logger.error("QRcode não foi decodificado.");
	}

	return decodedQR?.data;
};
