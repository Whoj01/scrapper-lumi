import path, { dirname } from "node:path";
import fs from "node:fs";
import ILovePDFApi from "@ilovepdf/ilovepdf-nodejs";
import type PdfJpgTask from "@ilovepdf/ilovepdf-js-core/tasks/PdfJpgTask";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const instance = new ILovePDFApi(
	process.env.ILOVEPDF_API_KEY ?? "",
	process.env.ILOVEPDF_SECRET_KEY ?? "",
);

export const transformPDFToImage = async (pathToPdf: string) => {
	const pathToSave = path.resolve(
		__dirname,
		"..",
		"temp",
		"imgs",
		`pdf-${Date.now()}.jpg`,
	);

	const task = instance.newTask("pdfjpg") as PdfJpgTask;
	
	await task
		.start()
		.then(() => {
			return task.addFile(pathToPdf);
		})
		.then(() => {
			return task.process({ pdfjpg_mode: "pages" });
		})
		.then(() => {
			return task.download();
		})
		.then((data) => {
			fs.writeFileSync(pathToSave, data);
		})
		.catch((err) => {
			throw new Error("O ilovepdf chegou ao limite de conversões");
		});

	return pathToSave;
};
