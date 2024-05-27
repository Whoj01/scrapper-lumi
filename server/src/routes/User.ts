import type { FastifyInstance } from "fastify";
import { PrismaGetUserByIdentifier } from "../repositories/user/get-user-by-identifier/prisma-get-user-by-identifier";
import { GetUserByIdentifierController } from "../controllers/user/get-user-by-identifier/get-user-by-identifier";
import type { paramsGetUserByIdentifier } from "../controllers/user/get-user-by-identifier/protocols";

export async function UserRoutes(app: FastifyInstance) {
	app.get("/users/:user_identifier", async (request, reply) => {
		const userParams = request.params as paramsGetUserByIdentifier;

		const prismaGetUserByIdentifier = new PrismaGetUserByIdentifier();

		const controllerGetUserByIdentifier = new GetUserByIdentifierController(
			prismaGetUserByIdentifier,
		);

		const { body, statusCode } = await controllerGetUserByIdentifier.handle({
			params: userParams,
		});

		reply.code(statusCode).send(body);
	});

	app.get("/users", async (request, reply) => {
		const prismaGetUserByIdentifier = new PrismaGetUserByIdentifier();

		const controllerGetUserByIdentifier = new GetUserByIdentifierController(
			prismaGetUserByIdentifier,
		);

		const { body, statusCode } = await controllerGetUserByIdentifier.handle({
			params: null,
		});

		reply.code(statusCode).send(body);
	});
}
