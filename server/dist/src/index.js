import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { logger } from "./libs/logger";
import { UserRoutes } from "./routes/User";
import { BillsRoutes } from "./routes/Bills";
dotenv.config();
const server = Fastify({});
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
        await server.listen({ port: PORT, host: '0.0.0.0' });
        const address = server.server.address();
        logger.info(`Server listening at ${address.address}:${PORT}`);
    }
    catch (err) {
        console.log(err);
        logger.error("Error starting server", err);
        server.log.error(err);
        process.exit(1);
    }
};
start();
