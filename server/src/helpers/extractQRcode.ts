import path, { dirname } from "node:path";
import fs from "node:fs";
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const extractQRcode = async (pathToImage: string) => {
	const outputPath = path.resolve(
		__dirname,
		"..",
		"temp",
		"imgs",
		`qrcode-${Date.now()}.jpg`,
	);

	const dataOfQRcode = await sharp(pathToImage, { failOnError: false })
		.extract({ left: 85, top: 1550, width: 144, height: 154 })
		.jpeg({ quality: 100 })
		.toBuffer();

	fs.writeFileSync(outputPath, dataOfQRcode);

	return outputPath;
};
