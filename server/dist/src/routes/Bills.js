import { PrismaGetBillsInfoRepository } from "../repositories/bill/get-bills-info/prisma-get-bills-info";
import { GetBillsInfoController } from "../controllers/bill/get-bills-info/get-bills-info";
import { GetMonthBillInfoController } from "../controllers/bill/get-month-bill-info/get-month-bill-info";
import { PrismaGetMonthBillInfoRepository } from "../repositories/bill/get-month-bill-info/prisma-get-month-bill-info";
export async function BillsRoutes(app) {
    app.get("/bills/:user_identifier", async (request, reply) => {
        const userParams = request.params.user_identifier;
        const prismaGetBillsRepository = new PrismaGetBillsInfoRepository();
        const controllerGetBillsInfo = new GetBillsInfoController(prismaGetBillsRepository);
        const { body, statusCode } = await controllerGetBillsInfo.handle({
            params: { user_identificator: userParams },
        });
        reply.code(statusCode).send(body);
    });
    app.get("/bills", async (request, reply) => {
        const prismaGetBillsRepository = new PrismaGetBillsInfoRepository();
        const controllerGetBillsInfo = new GetBillsInfoController(prismaGetBillsRepository);
        const { body, statusCode } = await controllerGetBillsInfo.handle({
            params: { user_identificator: undefined },
        });
        reply.code(statusCode).send(body);
    });
    app.get("/bill/:month/:code", async (request, reply) => {
        const prismaGetMonthBillInfoRepository = new PrismaGetMonthBillInfoRepository();
        const controllerGetMonthBillInfo = new GetMonthBillInfoController(prismaGetMonthBillInfoRepository);
        const { body, statusCode } = await controllerGetMonthBillInfo.handle({
            params: {
                month: request.params.month,
                code: request.params.code
            },
        });
        reply.code(statusCode).send(body);
    });
}
