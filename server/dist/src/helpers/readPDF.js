import { fileURLToPath } from "node:url";
import { logger } from "../libs/logger";
import { dirname } from "node:path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const flushRows = (rows) => {
    rows.length = 0;
};
const rows = [];
export const readPDF = (pathToPdf) => new Promise((resolve, reject) => {
    const informationNeeded = {
        month: {
            value: "",
        },
        mediaConsumo: {
            value: "",
        },
        consumoEnergiaEletrica: {
            value: "",
        },
        EnergiaEletrica: {
            value: "",
        },
        EnergiaEletricaKW: {
            value: "",
        },
        EnergiaSCEEE: {
            value: "",
        },
        EnergiaSCEEEKW: {
            value: "",
        },
        energiaCompensada: {
            value: "",
        },
        contribMunicipal: {
            value: "",
        },
        valorTotalsemGD: {
            value: "",
        },
        economiaGD: {
            value: "",
        },
        nome: {
            value: "",
        },
        codigoCliente: {
            value: "",
        },
        totalPrice: {
            value: "",
        },
    };
    const pdfName = pathToPdf.split("/")[pathToPdf.split("/").length - 1];
    import('pdfreader').then((pdfreader) => {
        new pdfreader.PdfReader({}).parseFileItems(pathToPdf, (err, item) => {
            if (err) {
                logger.error("Erro ao ler pdf", err);
                reject(err);
            }
            else if (!item) {
                logger.warn(`PDF ${pdfName} lido com sucesso!}`);
                informationNeeded.consumoEnergiaEletrica.value = String(Number(informationNeeded.EnergiaEletricaKW.value) +
                    Number(informationNeeded.EnergiaSCEEEKW.value));
                informationNeeded.valorTotalsemGD.value = Number(+informationNeeded.EnergiaEletrica.value +
                    +informationNeeded.EnergiaSCEEE.value +
                    +informationNeeded.contribMunicipal.value)
                    .toFixed(2)
                    .toString();
                resolve({
                    consumoEnergiaEletrica: Number(informationNeeded.consumoEnergiaEletrica.value),
                    energiaCompensada: Number(informationNeeded.energiaCompensada.value),
                    valorTotalsemGD: Number(informationNeeded.valorTotalsemGD.value),
                    economiaGD: Number(informationNeeded.economiaGD.value),
                    mediaConsumo: Number(informationNeeded.mediaConsumo.value),
                    nome: informationNeeded.nome.value,
                    codigoCliente: informationNeeded.codigoCliente.value,
                    mes: informationNeeded.month.value,
                    EnergySCEEEValue: Number(informationNeeded.EnergiaSCEEE.value),
                    EnergySCEEEKW: Number(informationNeeded.EnergiaSCEEEKW.value),
                    ContributionMun: Number(informationNeeded.contribMunicipal.value),
                    EnergyEletricValue: Number(informationNeeded.EnergiaEletrica.value),
                    EnergyEletricKW: Number(informationNeeded.EnergiaEletricaKW.value),
                    totalPrice: Number(informationNeeded.totalPrice.value),
                    pathToPdf,
                });
                flushRows(rows);
            }
            else if (item.text) {
                if (rows.length <= 0) {
                    rows.push({
                        key: item.y,
                        text: item.text,
                    });
                }
                // se o item.y for igual a algum item.y do array rows, então concatena o texto
                if (rows.length > 0 && rows.some((row) => row.key === item.y)) {
                    // concatenando com um espaço a mais para tratamento da string adiante
                    rows.find((row) => row.key === item.y).text += `  ${item.text}`;
                }
                else {
                    rows.push({
                        key: item.y,
                        text: item.text,
                    });
                }
                // Nesse map, eu estou pegando o texto de cada linha e transformando em um array de strings e concatenando as palavras com hífen.
                // Exemplo: "Nº DO CLIENTE" => "Nº-DO-CLIENTE"
                rows.map((row, index) => {
                    let tempString = "";
                    row.text.split(" ").map((text, index) => {
                        if (index === 0 && text !== "") {
                            tempString = text;
                        }
                        // Nesse if, eu estou verificando se o texto atual é diferente de vazio e se o texto anterior é diferente de vazio, se for, concatena com hífen.
                        // para juntar as palavras e não se perderem no próximo split.
                        else if (index > 0 &&
                            text !== "" &&
                            row.text.split(" ")[index - 1] !== "") {
                            tempString += `-${text}`;
                        }
                        // Nesse else if, eu estou verificando se o texto atual é diferente de vazio e se o texto anterior é vazio, se for, concatena com espaço.
                        // Se tornando a outra palavra do texto.
                        else if (index > 0 &&
                            text !== "" &&
                            row.text.split(" ")[index - 1] === "") {
                            tempString += ` ${text}`;
                        }
                    });
                    if (tempString.includes("Energia-Elétrica") &&
                        tempString.split(" ")[1] === "kWh") {
                        const energiaEletricaValue = tempString
                            .split(" ")[4]
                            ?.replace(",", ".");
                        const energiaEletricaKW = tempString
                            .split(" ")[2]
                            ?.replace(",", "");
                        informationNeeded.EnergiaEletrica.value = energiaEletricaValue;
                        informationNeeded.EnergiaEletricaKW.value = energiaEletricaKW;
                    }
                    if (tempString.includes("DÉBITO-AUTOMÁTICO") &&
                        row.key === 50.541) {
                        const formatedName = rows[index + 1]?.text.replaceAll("-", " ");
                        informationNeeded.nome.value = formatedName;
                    }
                    if (tempString.includes("Energia-SCEE-s/-ICMS")) {
                        const energiaSCEEEKW = tempString.split(" ")[2]?.replace(".", "");
                        const energiaSCEEEValue = tempString
                            .split(" ")[4]
                            ?.replace(",", ".");
                        informationNeeded.EnergiaSCEEE.value = energiaSCEEEValue;
                        informationNeeded.EnergiaSCEEEKW.value = energiaSCEEEKW;
                    }
                    if (tempString.includes("Histórico-de-Consumo")) {
                        const monthMedia = rows[index + 2]?.text
                            ?.split(" ")
                            ?.filter((text) => text !== "")[2]
                            ?.replace(",", ".");
                        const month = rows[index + 2]?.text
                            ?.split(" ")
                            ?.filter((text) => text !== "")[0];
                        informationNeeded.mediaConsumo.value = monthMedia;
                        informationNeeded.month.value = month;
                    }
                    if (tempString.includes("TOTAL")) {
                        const priceOfMonth = tempString.split(" ")[1]?.replace(",", ".");
                        informationNeeded.totalPrice.value = priceOfMonth;
                    }
                    if (tempString.includes("Energia-compensada-GD-I")) {
                        const economiaGDValue = tempString
                            .split(" ")[4]
                            ?.replace(",", ".")
                            ?.replace("-", "");
                        const energiaCompensadaValue = tempString
                            .split(" ")[2]
                            ?.replace(".", "");
                        informationNeeded.economiaGD.value = economiaGDValue;
                        informationNeeded.energiaCompensada.value =
                            energiaCompensadaValue;
                    }
                    if (tempString.includes("Contrib-Ilum-Publica-Municipal")) {
                        const contribMunicipalValue = tempString
                            .split(" ")[1]
                            ?.replace(",", ".");
                        informationNeeded.contribMunicipal.value = contribMunicipalValue;
                    }
                    if (row.key === 3.103 &&
                        !row.text.includes("NnNnWwNwNnWnNnNnWwWnNwNnNnNnWwWwNnNnNnWwWwNnNnNnWwWwNnWnNnNwNwW")) {
                        const formatedName = row?.text.split("-").join(" ");
                        informationNeeded.nome.value = formatedName;
                    }
                    if (tempString.includes("Nº-DO-CLIENTE")) {
                        const findRelativeIndex = tempString
                            .trim()
                            .split(" ")
                            .findIndex((text) => text === "Nº-DO-CLIENTE");
                        informationNeeded.codigoCliente.value = rows[index + 1]?.text
                            .trim()
                            .split(" ")[findRelativeIndex];
                    }
                });
            }
        });
    });
});
