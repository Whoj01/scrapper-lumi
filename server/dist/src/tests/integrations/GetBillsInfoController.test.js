import { randomUUID } from "crypto";
import { expect, describe, it, vi } from "vitest";
import { GetBillsInfoController } from "../../controllers/bill/get-bills-info/get-bills-info";
import { errorRequest } from "../../responses/responses";
describe("Prisma get user by identifier controller suit Test", () => {
    const mockedBill = {
        id: randomUUID(),
        economyGD: 0,
        totalValueWithoutGD: 0,
        compensedEnergy: 0,
        energyConsume: 0,
        month: new Date("2021-01-01T00:00:00.000Z"),
        price: 0,
        averageEnergyConsume: 0,
        pix: "",
        qrcode: "",
        pdf: "",
        userId: randomUUID(),
    };
    it("Not Given user_identifier should return bills without filter", async () => {
        //ajeitar
        const instanceBill = {
            ...mockedBill,
        };
        const mockedReturn = {
            statusCode: 200,
            body: {
                msg: "Contas encontradas",
                data: [instanceBill],
                ok: true,
                status: 200,
            },
        };
        const mockGetBillsInfo = {
            getBills: vi.fn().mockReturnValue([instanceBill]),
        };
        //atuar
        const users = await new GetBillsInfoController(mockGetBillsInfo).handle({
            params: undefined,
        });
        //afirmar
        expect(users).toEqual(mockedReturn);
        expect(mockGetBillsInfo.getBills).toHaveBeenCalledWith();
        expect(Array.isArray([instanceBill])).toBe(true);
    });
    it("Not Given user_identifier but no users found it should return empty array", async () => {
        //ajeitar
        const mockedReturn = {
            statusCode: 200,
            body: {
                msg: "Nenhuma conta encontrada",
                ok: true,
                data: [],
                status: 200,
            },
        };
        const mockGetBillsInfo = {
            getBills: vi.fn().mockReturnValue([]),
        };
        //atuar
        const users = await new GetBillsInfoController(mockGetBillsInfo).handle({
            params: { user_identificator: undefined },
        });
        //afirmar
        expect(users).toEqual(mockedReturn);
        expect(mockGetBillsInfo.getBills).toHaveBeenCalledWith();
        expect(mockGetBillsInfo.getBills).toHaveReturnedWith([]);
    });
    it("Given a search user_identifier should return bills of this user", async () => {
        //ajeitar
        const instanceBill = {
            ...mockedBill,
            mockedBill,
        };
        const mockedReturn = {
            statusCode: 200,
            body: {
                msg: "Contas encontradas",
                data: [instanceBill],
                ok: true,
                status: 200,
            },
        };
        const mockedSearch = "mocked name";
        const mockGetBillsInfo = {
            getBills: vi.fn().mockReturnValue([instanceBill]),
        };
        //atuar
        const users = await new GetBillsInfoController(mockGetBillsInfo).handle({
            params: { user_identificator: mockedSearch },
        });
        //afirmar
        expect(users).toEqual(mockedReturn);
        expect(mockGetBillsInfo.getBills).toHaveBeenCalledWith(mockedSearch);
    });
    it("Given a valid search but no users found should return empty array", async () => {
        //ajeitar
        const mockedReturn = {
            statusCode: 200,
            body: {
                msg: "Nenhuma conta encontrada",
                ok: true,
                data: [],
                status: 200,
            },
        };
        const mockedSearch = "mocked name";
        const mockGetBillsInfo = {
            getBills: vi.fn().mockReturnValue([]),
        };
        //atuar
        const users = await new GetBillsInfoController(mockGetBillsInfo).handle({
            params: { user_identificator: mockedSearch },
        });
        //afirmar
        expect(users).toEqual(mockedReturn);
        expect(mockGetBillsInfo.getBills).toHaveBeenCalledWith(mockedSearch);
        expect(mockGetBillsInfo.getBills).toHaveReturnedWith([]);
    });
    it("Given a valid search but the response is false should return error request", async () => {
        const mockedReturn = {
            statusCode: 417,
            body: {
                msg: "Ocorreu um erro ao buscar as contas",
                ok: false,
                status: 417,
            },
        };
        //ajeitar
        const mockedSearch = "mocked name";
        const mockGetBillsInfo = {
            getBills: vi.fn().mockReturnValue(false),
        };
        //atuar
        const users = await new GetBillsInfoController(mockGetBillsInfo).handle({
            params: { user_identificator: mockedSearch },
        });
        //afirmar
        expect(users).toEqual(mockedReturn);
        expect(mockGetBillsInfo.getBills).toHaveBeenCalledWith(mockedSearch);
        expect(mockGetBillsInfo.getBills).toHaveReturnedWith(false);
        expect(Array.isArray(false)).toBe(false);
    });
    it("not given a search but the response is false should return error request", async () => {
        const mockedReturn = {
            statusCode: 417,
            body: {
                msg: "Ocorreu um erro ao buscar as contas",
                ok: false,
                status: 417,
            },
        };
        //ajeitar
        const mockGetBillsInfo = {
            getBills: vi.fn().mockReturnValue(false),
        };
        //atuar
        const users = await new GetBillsInfoController(mockGetBillsInfo).handle({
            params: { user_identificator: undefined },
        });
        //afirmar
        expect(users).toEqual(mockedReturn);
        expect(mockGetBillsInfo.getBills).toHaveBeenCalledWith();
        expect(mockGetBillsInfo.getBills).toHaveReturnedWith(false);
        expect(Array.isArray(false)).toBe(false);
    });
    it("should return error response if getBills throws", async () => {
        const mockGetBillsInfoRepository = {
            getBills: vi.fn().mockRejectedValue(new Error()),
        };
        const billsControllerMock = new GetBillsInfoController(mockGetBillsInfoRepository);
        const response = await billsControllerMock.handle({
            params: { user_identificator: "any_id" },
        });
        expect(response).toEqual(errorRequest("Ocorreu um erro interno", 500));
        expect(mockGetBillsInfoRepository.getBills).toHaveBeenCalledWith("any_id");
    });
});
