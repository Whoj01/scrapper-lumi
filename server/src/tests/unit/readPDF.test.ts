import { expect, describe, it, vi } from "vitest";
import { PdfReader } from "pdfreader";
import * as readPDF from "../../helpers/readPDF";

const pdfReaderReturn = {
	consumoEnergiaEletrica: 51.007,
	energiaCompensada: 1.007,
	valorTotalsemGD: 745.26,
	economiaGD: 620,
	nome: "PLIM TELECOMUNICACOES LTDA ME",
	codigoCliente: "7005400387",
	ContributionMun: 0,
	EnergyElectricKW: 0,
	EnergyElectricValue: 0,
	EnergySCEEEKW: 0,
	EnergySCEEEValue: 0,
	mes: "JUN/23",
	mediaConsumo: 0,
	totalPrice: 125.26,
	pathToPdf: "../../data/3000055479-06-2023.pdf",
};

describe("readPDF suit test", () => {
	it("given path to pdf should return data", async () => {
		//ajeitar
		const expectedValue = { ...pdfReaderReturn };

		vi.spyOn(PdfReader.prototype, "parseFileItems").mockImplementationOnce(
			(pathToPdf, itemHandler) => {
				itemHandler(null, null);
			},
		);

		vi.spyOn(readPDF, "readPDF").mockResolvedValueOnce(expectedValue);

		//atuar
		const returnResponse = await readPDF.readPDF(expectedValue.pathToPdf);

		//afirmar
		expect(returnResponse).toEqual(expectedValue);
		expect(readPDF.readPDF).toHaveBeenCalledWith(expectedValue.pathToPdf);
	});
});
