import { randomUUID } from "node:crypto";
import { expect, describe, it, vi } from "vitest";
import { GetUserByIdentifierController } from "../../controllers/user/get-user-by-identifier/get-user-by-identifier";
import type { IGetUserByIdentifierRepository } from "../../controllers/user/get-user-by-identifier/protocols";
import { errorRequest, successesRequest } from "../../responses/responses";

describe("Prisma get user by identifier controller suit Test", () => {
	const mockedUser = {
		id: randomUUID(),
		name: "mocked name",
		code: "mocked code",
	};

	it("Given a valid search should return users", async () => {
		//ajeitar
		const instanceUser = {
			...mockedUser,
		};

		const mockedReturn = {
			statusCode: 200,
			body: {
				msg: "Usuários encontrados",
				data: [instanceUser],
				ok: true,
				status: 200,
			},
		};

		const mockedSearch = {
			user_identifier: "mocked name",
		};

		const mockGetUserByIdentifierRepository: IGetUserByIdentifierRepository = {
			findUser: vi.fn().mockReturnValue([instanceUser]),
		};

		//atuar
		const users = await new GetUserByIdentifierController(
			mockGetUserByIdentifierRepository,
		).handle({ params: mockedSearch });

		//afirmar
		expect(users).toEqual(mockedReturn);
		expect(mockGetUserByIdentifierRepository.findUser).toHaveBeenCalledWith(
			mockedSearch,
		);
		expect(Array.isArray([instanceUser])).toBe(true);
	});

	it("Not given a search should return all users", async () => {
		//ajeitar
		const instanceUser = {
			...mockedUser,
		};

		const mockedReturn = successesRequest("Usuários encontrados", 200, [
			instanceUser,
		]);

		const mockedSearch = undefined;

		const mockGetUserByIdentifierRepository: IGetUserByIdentifierRepository = {
			findUser: vi.fn().mockReturnValue([instanceUser]),
		};

		//atuar
		const users = await new GetUserByIdentifierController(
			mockGetUserByIdentifierRepository,
		).handle({ params: mockedSearch });

		//afirmar
		expect(users).toEqual(mockedReturn);
	});

	it("Not given a search but no users found should return empty array", async () => {
		//ajeitar
		const mockedReturn = {
			statusCode: 200,
			body: {
				msg: "Nenhum usuário foi encontrado",
				data: [],
				ok: true,
				status: 200,
			},
		};

		const mockedSearch = undefined;

		const mockGetUserByIdentifierRepository: IGetUserByIdentifierRepository = {
			findUser: vi.fn().mockReturnValue([]),
		};

		//atuar
		const users = await new GetUserByIdentifierController(
			mockGetUserByIdentifierRepository,
		).handle({ params: mockedSearch });

		//afirmar
		expect(users).toEqual(mockedReturn);
	});

	it("Not given a search but the response is false should return error request", async () => {
		const mockedReturn = {
			statusCode: 417,
			body: {
				msg: "Ocorreu um erro ao buscar os usuários",
				ok: false,
				status: 417,
			},
		};

		const mockedSearch = undefined;

		const mockGetUserByIdentifierRepository: IGetUserByIdentifierRepository = {
			findUser: vi.fn().mockReturnValue(false),
		};

		//atuar
		const users = await new GetUserByIdentifierController(
			mockGetUserByIdentifierRepository,
		).handle({ params: mockedSearch });

		//afirmar
		expect(users).toEqual(mockedReturn);
		expect(mockGetUserByIdentifierRepository.findUser).toHaveBeenCalledWith();
		expect(mockGetUserByIdentifierRepository.findUser).toHaveReturnedWith(
			false,
		);
		expect(Array.isArray(false)).toBe(false);
	});

	it("Given a invalid return of findUser should return error request", async () => {
		const mockedReturn = {
			statusCode: 500,
			body: {
				msg: "Não foi possivel realizar a busca",
				ok: false,
				status: 500,
			},
		};

		const mockedSearch = undefined;

		const mockGetUserByIdentifierRepository: IGetUserByIdentifierRepository = {
			findUser: vi.fn().mockReturnValue(true),
		};

		//atuar
		const users = await new GetUserByIdentifierController(
			mockGetUserByIdentifierRepository,
		).handle({ params: mockedSearch });

		//afirmar
		expect(users).toEqual(mockedReturn);
		expect(mockGetUserByIdentifierRepository.findUser).toHaveBeenCalledWith();
		expect(mockGetUserByIdentifierRepository.findUser).toHaveReturnedWith(true);
		expect(Array.isArray(true)).toBe(false);
	});

	it("Given a valid search but the response is false should return error request", async () => {
		//ajeitar
		const mockedReturn = {
			statusCode: 417,
			body: {
				msg: "Ocorreu um erro ao buscar os usuários",
				ok: false,
				status: 417,
			},
		};

		const mockedSearch = {
			user_identifier: "mocked name",
		};

		const mockGetUserByIdentifierRepository: IGetUserByIdentifierRepository = {
			findUser: vi.fn().mockReturnValue(false),
		};

		//atuar
		const users = await new GetUserByIdentifierController(
			mockGetUserByIdentifierRepository,
		).handle({ params: mockedSearch });

		//afirmar
		expect(users).toEqual(mockedReturn);
		expect(mockGetUserByIdentifierRepository.findUser).toHaveBeenCalledWith(
			mockedSearch,
		);
		expect(mockGetUserByIdentifierRepository.findUser).toHaveReturnedWith(
			false,
		);
		expect(Array.isArray(false)).toBe(false);
	});

	it("Given a valid search but no users found should return empty array", async () => {
		const mockedReturn = {
			statusCode: 200,
			body: {
				msg: "Nenhum usuário foi encontrado",
				data: [],
				ok: true,
				status: 200,
			},
		};

		const mockGetUserByIdentifierRepository: IGetUserByIdentifierRepository = {
			findUser: vi.fn().mockReturnValue([]),
		};

		//atuar
		const users = await new GetUserByIdentifierController(
			mockGetUserByIdentifierRepository,
		).handle({ params: null });

		//afirmar
		expect(users).toEqual(mockedReturn);
		expect(mockGetUserByIdentifierRepository.findUser).toHaveBeenCalledWith();
		expect(Array.isArray([])).toBe(true);
	});

	it("Given a valid search but the response is false should return error request", async () => {
		//ajeitar
		const mockedReturn = {
			statusCode: 417,
			body: {
				msg: "Ocorreu um erro ao buscar os usuários",
				ok: false,
				status: 417,
			},
		};

		const mockedSearch = {
			user_identifier: "mocked name",
		};

		const mockGetUserByIdentifierRepository: IGetUserByIdentifierRepository = {
			findUser: vi.fn().mockReturnValue(false),
		};

		//atuar
		const users = await new GetUserByIdentifierController(
			mockGetUserByIdentifierRepository,
		).handle({ params: mockedSearch });

		//afirmar
		expect(users).toEqual(mockedReturn);
		expect(mockGetUserByIdentifierRepository.findUser).toHaveBeenCalledWith(
			mockedSearch,
		);
		expect(mockGetUserByIdentifierRepository.findUser).toHaveReturnedWith(
			false,
		);
		expect(Array.isArray(false)).toBe(false);
	});

	it("Given a valid search but no users found should return empty array", async () => {
		const mockedReturn = {
			statusCode: 200,
			body: {
				msg: "Nenhum usuário foi encontrado",
				data: [],
				ok: true,
				status: 200,
			},
		};

		const mockedSearch = {
			user_identifier: "mocked name",
		};

		const mockGetUserByIdentifierRepository: IGetUserByIdentifierRepository = {
			findUser: vi.fn().mockReturnValue([]),
		};

		//atuar
		const users = await new GetUserByIdentifierController(
			mockGetUserByIdentifierRepository,
		).handle({ params: mockedSearch });

		//afirmar
		expect(users).toEqual(mockedReturn);
		expect(mockGetUserByIdentifierRepository.findUser).toHaveBeenCalledWith(
			mockedSearch,
		);
		expect(Array.isArray([])).toBe(true);
	});

	it("should return error response if getBills throws", async () => {
		const mockedSearch = {
			user_identifier: "any_id",
		};

		const mockGetUserByIdentifierRepository: IGetUserByIdentifierRepository = {
			findUser: vi.fn().mockRejectedValue(new Error()),
		};

		const GetUserByIdentifierControllerMock = new GetUserByIdentifierController(
			mockGetUserByIdentifierRepository,
		);

		const response = await GetUserByIdentifierControllerMock.handle({
			params: { user_identifier: mockedSearch.user_identifier },
		});

		expect(response).toEqual(errorRequest("Ocorreu um erro interno", 500));
	});
});
