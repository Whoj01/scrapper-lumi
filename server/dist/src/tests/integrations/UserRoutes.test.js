import { expect, describe, it, vi } from "vitest";
import fastify from "fastify";
import { successesRequest } from "../../responses/responses";
import { UserRoutes } from "../../routes/User";
import prismaClient from "../../api/prismaClient";
import { randomUUID } from "crypto";
describe("Users routes suit test", () => {
    const mockFastify = fastify();
    const mockUser = {
        id: randomUUID(),
        name: "mocked name",
        code: "mocked code",
    };
    it("Not given a params should return all users", async () => {
        // ajeitar
        const instanceUser = {
            ...mockUser,
        };
        vi.spyOn(prismaClient.user, "findMany").mockResolvedValue([
            instanceUser,
            instanceUser,
            instanceUser,
        ]);
        await UserRoutes(mockFastify);
        // atuar
        const response = await mockFastify.inject({
            method: "GET",
            url: "/users",
        });
        // afirmar
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(JSON.stringify(successesRequest("Usuários encontrados", 200, [
            instanceUser,
            instanceUser,
            instanceUser,
        ]).body));
    });
    it("Given a params should return a user", async () => {
        // ajeitar
        const instanceUser = {
            ...mockUser,
        };
        const searchParams = "mocked code";
        vi.spyOn(prismaClient.user, "findMany").mockResolvedValue([instanceUser]);
        const response = await mockFastify.inject({
            method: "GET",
            url: `/users/${searchParams}`,
        });
        // atuar
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(JSON.stringify(successesRequest("Usuários encontrados", 200, [instanceUser]).body));
    });
});
