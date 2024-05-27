import multer from "multer";
import sharp from "sharp";
import fs from "node:fs";
import path, { dirname } from "node:path";
import type { PutObjectCommandOutput, DeleteObjectCommandOutput, PutObjectCommandInput, DeleteObjectCommandInput } from "@aws-sdk/client-s3";
import type { UploadS3Return } from "../../types/UploadS3Return";
import { S3Client, ObjectCannedACL, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import dot from "dotenv";
import { fileURLToPath } from "node:url";

dot.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_BUCKET_REGION;

const s3 = new S3Client({
	region: bucketRegion,
	credentials: {
		accessKeyId: process.env.AWS_PUBLIC_KEY ?? "",
		secretAccessKey: process.env.AWS_SECRET_KEY ?? "",
	}
});

const upload = async (params: PutObjectCommand): Promise<PutObjectCommandOutput | unknown> => {
	try {
		const response = await s3.send(params);

		return response
	} catch (error) {
		return error;
	}
};

export const multerConfig = {
	dest: path.resolve(__dirname, "..", "..", "temp", "imgs"),
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, path.resolve(__dirname, "..", "..", "temp", "imgs"));
		},
		filename: (req, file, cb) => {
			const fileName = `${Date.now().toString()}-${file.originalname}`;
			cb(null, fileName);
		},
	}),
	limits: {
		fileSize: 3 * 1024 * 1024,
	},
};

export const uploadImageToS3 = async (photo: string) => {
	const name = `${String(Date.now())}.webp`;

	try {
		const data = await sharp(photo, { failOnError: false })
			.resize(720)
			.toFormat("webp")
			.webp({ quality: 100 })
			.toBuffer();

		const params = {
			Bucket: bucketName,
			Key: name,
			Body: data,
			ACL: ObjectCannedACL.public_read,
			ContentEncoding: "webp",
			ContentType: "image/webp",
		};

		const url = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${name}`

		const putCommand = new PutObjectCommand(params)

		const response = await upload(putCommand);

		return {
			finalPath: url,
			aws_key: name,
		};
	} catch (err) {
		deleteImage(photo);
	}
};

export const uploadPDFToS3 = async (pdfPath: string): Promise<UploadS3Return | unknown> => {
	try {
		const name = `${String(Date.now())}.pdf`;

		const fileContent = fs.readFileSync(pdfPath);

		const params = {
			Bucket: bucketName,
			Key: name,
			Body: fileContent,
			ACL: ObjectCannedACL.public_read,
			ContentType: "application/pdf",
		};

		const url = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${name}`

		const putCommand = new PutObjectCommand(params)
		const finalPath = await upload(putCommand);

		return {
			finalPath: url,
			aws_key: name,
		};
	} catch (error) {
		return error;
	}
};

export const deleteItemFromAWS = async (aws_key: string) => {
	try {
		const params: DeleteObjectCommandInput = {
			Bucket: bucketName,
			Key: aws_key,
		};

		const deleteCommand = new DeleteObjectCommand(params);

		const deletedItem: DeleteObjectCommandOutput = await s3.send(deleteCommand);

		return deletedItem;
	} catch (error) {
		return error;
	}
};

export const deleteImage = (filePath: string) => {
	fs.access(filePath, fs.constants.R_OK, (err) => {
		if (!err) {
			const pathFile = filePath;
			fs.unlink(pathFile, (err) => {});
		}
	});
};
