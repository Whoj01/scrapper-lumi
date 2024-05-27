import Fastify, { type FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import type { AddressInfo } from "node:net";
import dotenv from "dotenv";
import { logger } from "./libs/logger";
import { UserRoutes } from "./routes/User";
import { BillsRoutes } from "./routes/Bills";

dotenv.config();

const server: FastifyInstance = Fastify({});

const PORT = process.env.PORT || 8000;

server.register(cors, {
	origin: "*",
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
});

server.register(UserRoutes);
server.register(BillsRoutes);

const start = async () => {
	try {
		await server.listen({ port: PORT as number, host: '0.0.0.0' });

		const address = server.server.address() as AddressInfo;

		logger.info(`Server listening at ${address.address}:${PORT}`);
	} catch (err) {
		console.log(err)
		logger.error("Error starting server", err as Error);
		server.log.error(err);
		process.exit(1);
	}
};

start();
