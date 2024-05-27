import { expect, describe, it, vi } from "vitest";
import { randomUUID } from "node:crypto";
import prismaClient from "../../api/prismaClient";
import { PrismaGetUserByIdentifier } from "../../repositories/user/get-user-by-identifier/prisma-get-user-by-identifier";
import z from "zod";

describe("Prisma get user by identifier repository suit Test", () => {
	const mockedUser = {
		id: randomUUID(),
		name: "mocked name",
		code: "mocked code",
	};

	const searchParam = {
		user_identifier: "mocked name",
	};

	const callPrisma = {
		where: {
			name: {
				contains: searchParam.user_identifier,
				mode: "insensitive",
			},
		},
		select: {
			code: true,
			id: true,
			name: true,
		},
	};

	it("given a user with invalid string number should search by his name", async () => {
		//ajeitar
		const instanceUser = {
			...mockedUser,
		};
		const instaceSearch = {
			user_identifier: "mocked name",
		};
		const mockedFindMany = {
			...callPrisma,
		};

		vi.spyOn(prismaClient.user, "findMany").mockResolvedValue([instanceUser]);

		vi.spyOn(Number, "isNaN").mockReturnValue(true);

		//atuar
		const user = await new PrismaGetUserByIdentifier().findUser(instaceSearch);

		//afirmar
		expect(user).toEqual([instanceUser]);
		expect(Number.isNaN).toHaveBeenCalled();
		expect(Number.isNaN).toHaveReturnedWith(true);
		expect(prismaClient.user.findMany).toHaveBeenCalledWith(mockedFindMany);
	});

	it("given a user with valid string number should search by his code", async () => {
		const instanceUser = {
			...mockedUser,
		};

		const instaceSearch = {
			user_identifier: "18775564",
		};

		const mockedFindMany = {
			...callPrisma,
			where: {
				code: {
					contains: instaceSearch.user_identifier,
				},
			},
		};

		vi.spyOn(prismaClient.user, "findMany").mockResolvedValue([instanceUser]);

		vi.spyOn(Number, "isNaN").mockReturnValue(false);

		//atuar
		const user = await new PrismaGetUserByIdentifier().findUser(instaceSearch);

		//afirmar
		expect(user).toEqual([instanceUser]);
		expect(Number.isNaN).toHaveBeenCalled();
		expect(Number.isNaN).toHaveReturnedWith(false);
		expect(prismaClient.user.findMany).toHaveBeenCalledWith(mockedFindMany);
	});

	it("Not given a search but fail on parse, should return false", async () => {
		const instanceUser = {
			...mockedUser,
			id: "invalid uuid",
		};

		const instaceSearch = undefined;

		const mockedFindMany = {
			select: {
				code: true,
				id: true,
				name: true,
			},
		};

		vi.spyOn(prismaClient.user, "findMany").mockResolvedValue([instanceUser]);

		vi.spyOn(Number, "isNaN").mockReturnValue(true);

		//atuar
		const user = await new PrismaGetUserByIdentifier().findUser(instaceSearch);

		//afirmar
		expect(user).toEqual(false);
		expect(Number.isNaN).not.toHaveBeenCalled();
		expect(prismaClient.user.findMany).toHaveBeenCalledWith(mockedFindMany);
	});

	it("given a null user should return all users", async () => {
		const instanceUser = {
			...mockedUser,
		};

		const instaceSearch = null;

		const mockedFindMany = {
			select: {
				code: true,
				id: true,
				name: true,
			},
		};

		vi.spyOn(prismaClient.user, "findMany").mockResolvedValue([instanceUser]);

		vi.spyOn(Number, "isNaN").mockReturnValue(true);

		//atuar
		const user = await new PrismaGetUserByIdentifier().findUser();

		//afirmar
		expect(user).toEqual([instanceUser]);
		expect(Number.isNaN).not.toHaveBeenCalled();
		expect(prismaClient.user.findMany).toHaveBeenCalledWith(mockedFindMany);
	});

	it("given a null user and no users in database should return empty array", async () => {
		const instanceUser = {
			...mockedUser,
		};

		const instaceSearch = null;

		const mockedFindMany = {
			select: {
				code: true,
				id: true,
				name: true,
			},
		};

		vi.spyOn(prismaClient.user, "findMany").mockResolvedValue([]);

		vi.spyOn(Number, "isNaN").mockReturnValue(true);

		//atuar
		const user = await new PrismaGetUserByIdentifier().findUser();

		//afirmar
		expect(user).toEqual([]);
		expect(Number.isNaN).not.toHaveBeenCalled();
		expect(prismaClient.user.findMany).toHaveBeenCalledWith(mockedFindMany);
	});

	it("should return false if user is not parsed", async () => {
		const instanceUser = {
			...mockedUser,
			id: "invalid uuid",
		};

		const instaceSearch = {
			user_identifier: "18775564",
		};

		const mockedFindMany = {
			...callPrisma,
			where: {
				code: {
					contains: instaceSearch.user_identifier,
				},
			},
		};

		const objectSchema = z.array(
			z.object({
				id: z.string().uuid(),
				name: z.string(),
				code: z.string(),
			}),
		);

		vi.spyOn(objectSchema, "safeParse").mockReturnValueOnce({
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

		vi.spyOn(prismaClient.user, "findMany").mockResolvedValue([instanceUser]);

		vi.spyOn(Number, "isNaN").mockReturnValue(false);

		//atuar
		const user = await new PrismaGetUserByIdentifier().findUser(instaceSearch);

		//afirmar
		expect(user).toEqual(false);
		expect(Number.isNaN).toHaveBeenCalled();
		expect(Number.isNaN).toHaveReturnedWith(false);
		expect(prismaClient.user.findMany).toHaveBeenCalledWith(mockedFindMany);
	});

	it("Given a valid search number string but fail on parse should return false", async () => {
		const instanceUser = {
			...mockedUser,
			id: "invalid uuid",
		};

		const instaceSearch = {
			user_identifier: "18775564",
		};

		const mockedFindMany = {
			...callPrisma,
			where: {
				code: {
					contains: instaceSearch.user_identifier,
				},
			},
		};

		const objectSchema = z.array(
			z.object({
				id: z.string().uuid(),
				name: z.string(),
				code: z.string(),
			}),
		);

		vi.spyOn(objectSchema, "safeParse").mockReturnValueOnce({
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

		vi.spyOn(prismaClient.user, "findMany").mockResolvedValue([instanceUser]);

		vi.spyOn(Number, "isNaN").mockReturnValue(false);

		//atuar
		const user = await new PrismaGetUserByIdentifier().findUser(instaceSearch);

		//afirmar
		expect(user).toEqual(false);
		expect(Number.isNaN).toHaveBeenCalled();
		expect(Number.isNaN).toHaveReturnedWith(false);
		expect(prismaClient.user.findMany).toHaveBeenCalledWith(mockedFindMany);
	});

	it("Given a valid search string but fail on parse should return false", async () => {
		const instanceUser = {
			...mockedUser,
			id: "invalid uuid",
		};

		const instaceSearch = {
			user_identifier: "mocked name",
		};

		const mockedFindMany = {
			...callPrisma,
		};

		const objectSchema = z.array(
			z.object({
				id: z.string().uuid(),
				name: z.string(),
				code: z.string(),
			}),
		);

		vi.spyOn(objectSchema, "safeParse").mockReturnValueOnce({
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

		vi.spyOn(prismaClient.user, "findMany").mockResolvedValue([instanceUser]);

		vi.spyOn(Number, "isNaN").mockReturnValue(true);

		//atuar
		const user = await new PrismaGetUserByIdentifier().findUser(instaceSearch);

		//afirmar
		expect(user).toEqual(false);
		expect(Number.isNaN).toHaveBeenCalled();
		expect(Number.isNaN).toHaveReturnedWith(true);
		expect(prismaClient.user.findMany).toHaveBeenCalledWith(mockedFindMany);
	});
});
