import fs from "node:fs";
import path, { dirname } from "node:path";
import { Readable } from "node:stream";
import moment from "moment";
import type { UploadS3Return } from "../types/UploadS3Return";
import prismaClient from "../api/prismaClient";
import { uploadImageToS3, uploadPDFToS3 } from "../api/awsS3/uploadToAws";
import { extractQRcode } from "../helpers/extractQRcode";
import { readQRcode } from "../helpers/readQRcode";
import { logger } from "../libs/logger";
import { transformPDFToImage } from "../helpers/transformPDFToImage";
import { readPDF } from "../helpers/readPDF";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

moment.locale("pt");

(async () => {
	try {
		const usersAlreadyInDatabase: {
			[key: string]: { alreadyOnDatabase: boolean; id: string };
		} = {
			"BRONYER TOZATTI FERREIRA": {
				alreadyOnDatabase: false,
				id: "",
			},
			"NORTE MINAS SERVICOS GERAIS E": {
				alreadyOnDatabase: false,
				id: "",
			},
			"PLIM TELECOMUNICACOES LTDA ME": {
				alreadyOnDatabase: false,
				id: "",
			},
		};
	
		const pathToPDFs = path.resolve(__dirname, "..", "data");
		const allPDFs = fs.readdirSync(pathToPDFs);
	
		async function* getPDFs(allPDFs: string[]) {
			for (const pdf of allPDFs) {
				const PDF_info = readPDF(path.resolve(__dirname, "..", "data", pdf));
	
				yield PDF_info;
			}
		}
	
		const pdfStream = Readable.from(getPDFs(allPDFs));
	
		pdfStream.on("data", async (chunk) => {
			if (!usersAlreadyInDatabase[chunk.nome].alreadyOnDatabase) {
				usersAlreadyInDatabase[chunk.nome].alreadyOnDatabase = true;
	
				let createdUser: { id: string } | null = null;
	
				try {
					createdUser = await prismaClient.user.create({
						data: {
							code: chunk.codigoCliente,
							name: chunk.nome,
						},
						select: {
							id: true,
						},
					});
				} catch (error: any | unknown) {
					if (error?.meta?.modelName === "User") {
						logger.error("Usuário já cadastrado usuário");

					} else {
						logger.error("Erro ao criar usuário");
					}
				}
	
				if (!createdUser?.id) {
					createdUser = await prismaClient.user.findUnique({
						where: {
							code: chunk.codigoCliente,
						},
						select: {
							id: true,
						},
					});
				}
	
				const { aws_key, finalPath } = await uploadPDFToS3(chunk.pathToPdf) as UploadS3Return;

				const pdfToJpg = await transformPDFToImage(finalPath);

				const extractQRcodeFromPDF = await extractQRcode(pdfToJpg);

				const qrcodeInfo = await readQRcode(extractQRcodeFromPDF);

				let uploadedQRcode: UploadS3Return | undefined;

				if (qrcodeInfo) {
					uploadedQRcode = await uploadImageToS3(extractQRcodeFromPDF);
				}	

				try {
					const createdBill = await prismaClient.bill.create({
						data: {
							averageEnergyConsume: chunk.mediaConsumo,
							compensedEnergy: chunk.energiaCompensada,
							economyGD: chunk.economiaGD,
							energyConsume: chunk.consumoEnergiaEletrica,
							month: moment(chunk.mes, "MMM/YY").toISOString(),
							pdf: finalPath,
							ContributionMun: chunk.ContributionMun,
							EnergyElectricKW: chunk.EnergyEletricKW,
							EnergyElectricValue: chunk.EnergyEletricValue,
							EnergySCEEEKW: chunk.EnergySCEEEKW,
							EnergySCEEEValue: chunk.EnergySCEEEValue,
							pdfKey: aws_key,
							price: chunk.totalPrice,
							pix: qrcodeInfo ?? "",
							qrcode: uploadedQRcode?.finalPath ?? "",
							qrcodeKey: uploadedQRcode?.aws_key ?? "",
							totalValueWithoutGD: chunk.valorTotalsemGD,
							userId: createdUser?.id,
						},
					});
				} catch (error) {
					console.log(error)
				}
				
	
				usersAlreadyInDatabase[chunk.nome].id = createdUser?.id || "";
	
				try {
					fs.unlinkSync(pdfToJpg);
				} catch (error) {
					logger.info("Erro ao pdf em jpg arquivo", error)
				}
	
				try {
					fs.unlinkSync(extractQRcodeFromPDF);
				} catch (error) {
					logger.info("Erro ao deletar qrcode em jpg arquivo", error)
				}
	
				logger.info("Informações cadastradas com sucesso", createdUser?.id);
			} else {
				let findUser: { id: string } | null = null;
	
				if (!usersAlreadyInDatabase[chunk.nome].id) {
					findUser = await prismaClient.user.findUnique({
						where: {
							code: chunk.codigoCliente,
						},
						select: {
							id: true,
						},
					});
				}
				const { aws_key, finalPath } = await uploadPDFToS3(chunk.pathToPdf) as UploadS3Return;
	
				const pdfToJpg = await transformPDFToImage(finalPath);
	
				const extractQRcodeFromPDF = await extractQRcode(pdfToJpg);
	
				const qrcodeInfo = await readQRcode(extractQRcodeFromPDF) as string;

				let uploadedQRcode: UploadS3Return | undefined;

				if (qrcodeInfo) {
					uploadedQRcode = await uploadImageToS3(extractQRcodeFromPDF) as UploadS3Return;
				}
	
				try {
					await prismaClient.bill.create({
						data: {
							averageEnergyConsume: chunk.mediaConsumo,
							compensedEnergy: chunk.energiaCompensada,
							economyGD: chunk.economiaGD,
							ContributionMun: chunk.ContributionMun,
							EnergyElectricKW: chunk.EnergyEletricKW,
							EnergyElectricValue: chunk.EnergyEletricValue,
							EnergySCEEEKW: chunk.EnergySCEEEKW,
							EnergySCEEEValue: chunk.EnergySCEEEValue,
							energyConsume: chunk.consumoEnergiaEletrica,
							month: moment(chunk.mes, "MMM/YY").toISOString(),
							pdf: finalPath,
							pdfKey: aws_key,
							price: chunk.totalPrice,
							pix: qrcodeInfo ?? "",
							qrcode: uploadedQRcode?.finalPath ?? "",
							qrcodeKey: uploadedQRcode?.aws_key ?? "",
							totalValueWithoutGD: chunk.valorTotalsemGD,
							userId: findUser?.id ?? usersAlreadyInDatabase[chunk.nome].id,
						},
					});
					
				} catch (error) {
					console.log(chunk)
					console.log(error)
				}

				try {
					fs.unlinkSync(pdfToJpg);
				} catch (error) {
					logger.info("Erro ao pdf em jpg arquivo", error)
				}
	
				try {
					fs.unlinkSync(extractQRcodeFromPDF);
				} catch (error) {
					logger.info("Erro ao deletar qrcode em jpg arquivo", error)
				}
	
				logger.info("Novas informacoes cadastradas com sucesso");
			}
		});
	
		pdfStream.on("end", async () => {
			logger.info("Processamento de dados finalizado");
		});
	}
	catch (error) {
		console.log(error)
	}
	
})();
