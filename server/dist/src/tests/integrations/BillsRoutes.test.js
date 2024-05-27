import { expect, describe, it, vi } from "vitest";
import fastify from "fastify";
import { successesRequest } from "../../responses/responses";
import prismaClient from "../../api/prismaClient";
import { randomUUID } from "node:crypto";
import { BillsRoutes } from "../../routes/Bills";
describe("Users routes suit test", () => {
    const mockFastify = fastify();
    const mockBill = {
        id: randomUUID(),
        economyGD: 0,
        totalValueWithoutGD: 0,
        compensedEnergy: 0,
        energyConsume: 0,
        ContributionMun: 0,
        EnergyElectricKW: 0,
        EnergyElectricValue: 0,
        EnergySCEEEKW: 0,
        EnergySCEEEValue: 0,
        month: new Date("2021-01-01T00:00:00.000Z"),
        price: 0,
        averageEnergyConsume: 0,
        pix: "",
        qrcodeKey: "",
        pdfKey: "",
        qrcode: "",
        pdf: "",
        userId: randomUUID(),
    };
    it("Not given a params should return all bills", async () => {
        // ajeitar
        const instanceBill = {
            ...mockBill,
        };
        vi.spyOn(prismaClient.bill, "findMany").mockResolvedValue([
            instanceBill,
            instanceBill,
            instanceBill,
        ]);
        await BillsRoutes(mockFastify);
        // atuar
        const response = await mockFastify.inject({
            method: "GET",
            url: "/bills",
        });
        // afirmar
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(JSON.stringify(successesRequest("Contas encontradas", 200, [
            instanceBill,
            instanceBill,
            instanceBill,
        ]).body));
    });
    it("Given a params should return a user", async () => {
        // ajeitar
        const instanceBill = {
            ...mockBill,
        };
        const searchParams = "mocked code";
        vi.spyOn(prismaClient.bill, "findMany").mockResolvedValue([instanceBill]);
        const response = await mockFastify.inject({
            method: "GET",
            url: `/bills/${searchParams}`,
        });
        // atuar
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(JSON.stringify(successesRequest("Contas encontradas", 200, [instanceBill]).body));
    });
});
