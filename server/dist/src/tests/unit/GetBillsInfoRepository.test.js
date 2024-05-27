import { expect, describe, it, vi } from "vitest";
import { randomUUID } from "node:crypto";
import prismaClient from "../../api/prismaClient";
import z from "zod";
import { PrismaGetBillsInfoRepository, } from "../../repositories/bill/get-bills-info/prisma-get-bills-info";
import { schemaBill } from "../../types/Zod/schemaBill";
describe("Prisma get bills info", () => {
    const mockedBill = {
        id: randomUUID(),
        economyGD: 0,
        totalValueWithoutGD: 0,
        compensedEnergy: 0,
        energyConsume: 0,
        month: new Date("2021-01-01T00:00:00.000Z"),
        price: 0,
        ContributionMun: 0,
        EnergyElectricKW: 0,
        EnergyElectricValue: 0,
        EnergySCEEEKW: 0,
        EnergySCEEEValue: 0,
        averageEnergyConsume: 0,
        pix: "",
        qrcode: "",
        pdfKey: "",
        qrcodeKey: "",
        pdf: "",
        userId: randomUUID() || null,
    };
    const searchParam = {
        user_identifier: "mocked name",
    };
    const callPrisma = {
        where: {
            User: {
                code: "",
            },
        },
    };
    it("given no user_identifier should get all bills and parse successfully", async () => {
        //ajeitar
        const instanceBill = {
            ...mockedBill,
            userId: randomUUID(),
        };
        const mockedFindMany = {};
        const mockedSchema = z.array(schemaBill);
        vi.spyOn(prismaClient.bill, "findMany").mockResolvedValue([instanceBill]);
        vi.spyOn(mockedSchema, "safeParse").mockReturnValueOnce({
            data: [instanceBill],
            success: true,
        });
        //atuar
        const user = await new PrismaGetBillsInfoRepository().getBills();
        //afirmar
        expect(user).toEqual([instanceBill]);
        expect(prismaClient.bill.findMany).toHaveBeenCalledWith(mockedFindMany);
    });
    it("given a valid string number user_identifier should get all bills of this user and parse successfully", async () => {
        //ajeitar
        const instanceBill = {
            ...mockedBill,
            userId: randomUUID(),
        };
        const instanceSearch = {
            user_identifier: "18775564",
        };
        const mockedFindMany = {
            where: {
                User: {
                    code: {
                        contains: instanceSearch.user_identifier,
                    },
                },
            },
            orderBy: {
                month: "asc",
            },
        };
        const mockedSchema = z.array(schemaBill);
        vi.spyOn(prismaClient.bill, "findMany").mockResolvedValue([instanceBill]);
        vi.spyOn(mockedSchema, "safeParse").mockReturnValueOnce({
            data: [instanceBill],
            success: true,
        });
        //atuar
        const user = await new PrismaGetBillsInfoRepository().getBills(instanceSearch.user_identifier);
        //afirmar
        expect(user).toEqual([instanceBill]);
        expect(prismaClient.bill.findMany).toHaveBeenCalledWith(mockedFindMany);
    });
    it("given a invalid string number user_identifier should get all bills of this user and parse successfully", async () => {
        //ajeitar
        const instanceBill = {
            ...mockedBill,
            userId: randomUUID(),
        };
        const instanceSearch = {
            user_identifier: "mocked name",
        };
        const mockedFindMany = {
            where: {
                User: {
                    name: {
                        contains: instanceSearch.user_identifier,
                        mode: "insensitive",
                    },
                },
            },
            orderBy: {
                month: "desc",
            },
        };
        const mockedSchema = z.array(schemaBill);
        vi.spyOn(prismaClient.bill, "findMany").mockResolvedValue([instanceBill]);
        vi.spyOn(mockedSchema, "safeParse").mockReturnValueOnce({
            data: [instanceBill],
            success: true,
        });
        //atuar
        const user = await new PrismaGetBillsInfoRepository().getBills(instanceSearch.user_identifier);
        //afirmar
        expect(user).toEqual([instanceBill]);
        expect(prismaClient.bill.findMany).toHaveBeenCalledWith(mockedFindMany);
    });
    it("given a valid string number user_identifier should on parse error return false", async () => {
        //ajeitar
        const instanceBill = {
            ...mockedBill,
        };
        const instanceSearch = {
            user_identifier: "18775564",
        };
        const mockedFindMany = {
            where: {
                User: {
                    code: {
                        contains: instanceSearch.user_identifier,
                    },
                },
            },
            orderBy: {
                month: "asc",
            },
        };
        const mockedSchema = z.array(schemaBill);
        vi.spyOn(prismaClient.bill, "findMany").mockResolvedValue([instanceBill]);
        vi.spyOn(mockedSchema, "safeParse").mockReturnValueOnce({
            error: new z.ZodError([
                {
                    message: "Invalid input",
                    path: [],
                    code: z.ZodIssueCode.invalid_type,
                    expected: "string",
                    received: "string",
                },
            ]),
            success: false,
        });
        //atuar
        const user = await new PrismaGetBillsInfoRepository().getBills(instanceSearch.user_identifier);
        //afirmar
        expect(user).toEqual([instanceBill]);
        expect(prismaClient.bill.findMany).toHaveBeenCalledWith(mockedFindMany);
    });
    it("given a invalid string number user_identifier should on parse error return false", async () => {
        //ajeitar
        const instanceBill = {
            ...mockedBill,
        };
        const instanceSearch = {
            user_identifier: "mocked name",
        };
        const mockedFindMany = {
            where: {
                User: {
                    name: {
                        contains: instanceSearch.user_identifier,
                        mode: "insensitive",
                    },
                },
            },
            orderBy: {
                month: "desc",
            },
        };
        const mockedSchema = z.array(schemaBill);
        vi.spyOn(prismaClient.bill, "findMany").mockResolvedValue([instanceBill]);
        vi.spyOn(mockedSchema, "safeParse").mockReturnValueOnce({
            error: new z.ZodError([
                {
                    message: "Invalid input",
                    path: [],
                    code: z.ZodIssueCode.invalid_type,
                    expected: "string",
                    received: "string",
                },
            ]),
            success: false,
        });
        //atuar
        const user = await new PrismaGetBillsInfoRepository().getBills(instanceSearch.user_identifier);
        //afirmar
        expect(user).toEqual([instanceBill]);
        expect(prismaClient.bill.findMany).toHaveBeenCalledWith(mockedFindMany);
    });
    it("given no user_identifier should on parse error return false", async () => {
        //ajeitar
        const instanceBill = {
            ...mockedBill,
            id: "invalid uuid",
        };
        const mockedFindMany = {};
        const mockedSchema = z.array(schemaBill);
        vi.spyOn(prismaClient.bill, "findMany").mockResolvedValue([instanceBill]);
        vi.spyOn(mockedSchema, "safeParse").mockReturnValueOnce({
            error: new z.ZodError([
                {
                    message: "Invalid input",
                    path: [],
                    code: z.ZodIssueCode.invalid_type,
                    expected: "string",
                    received: "string",
                },
            ]),
            success: false,
        });
        //atuar
        const user = await new PrismaGetBillsInfoRepository().getBills();
        //afirmar
        expect(user).toEqual(false);
        expect(prismaClient.bill.findMany).toHaveBeenCalledWith(mockedFindMany);
    });
    it("Given a valid search string but fail on parse should return false", async () => {
        //ajeitar
        const instanceBill = {
            ...mockedBill,
            id: "invalid uuid",
        };
        const instanceSearch = {
            user_identifier: "mocked name",
        };
        const mockedFindMany = {
            where: {
                User: {
                    name: {
                        contains: instanceSearch.user_identifier,
                        mode: "insensitive",
                    },
                },
            },
            orderBy: {
                month: "desc",
            },
        };
        const mockedSchema = z.array(schemaBill);
        vi.spyOn(prismaClient.bill, "findMany").mockResolvedValue([instanceBill]);
        vi.spyOn(mockedSchema, "safeParse").mockReturnValueOnce({
            error: new z.ZodError([
                {
                    message: "Invalid input",
                    path: [],
                    code: z.ZodIssueCode.invalid_type,
                    expected: "string",
                    received: "string",
                },
            ]),
            success: false,
        });
        //atuar
        const user = await new PrismaGetBillsInfoRepository().getBills(instanceSearch.user_identifier);
        //afirmar
        expect(user).toEqual(false);
        expect(prismaClient.bill.findMany).toHaveBeenCalledWith(mockedFindMany);
    });
    it("Given a valid search string number but fail on parse should return false", async () => {
        //ajeitar
        const instanceBill = {
            ...mockedBill,
            id: "invalid uuid",
        };
        const instanceSearch = {
            user_identifier: "18775564",
        };
        const mockedFindMany = {
            where: {
                User: {
                    code: {
                        contains: instanceSearch.user_identifier,
                    },
                },
            },
            orderBy: {
                month: "asc",
            },
        };
        const mockedSchema = z.array(schemaBill);
        vi.spyOn(prismaClient.bill, "findMany").mockResolvedValue([instanceBill]);
        vi.spyOn(mockedSchema, "safeParse").mockReturnValueOnce({
            error: new z.ZodError([
                {
                    message: "Invalid input",
                    path: [],
                    code: z.ZodIssueCode.invalid_type,
                    expected: "string",
                    received: "string",
                },
            ]),
            success: false,
        });
        //atuar
        const user = await new PrismaGetBillsInfoRepository().getBills(instanceSearch.user_identifier);
        //afirmar
        expect(user).toEqual(false);
        expect(prismaClient.bill.findMany).toHaveBeenCalledWith(mockedFindMany);
    });
});
