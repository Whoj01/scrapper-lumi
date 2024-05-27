import prismaClient from "../../../api/prismaClient";
export class PrismaGetMonthBillInfoRepository {
    async getBillInfo(month, code) {
        const bill = await prismaClient.bill.findFirst({
            where: {
                month,
                AND: {
                    User: {
                        code,
                    }
                }
            },
        });
        return bill;
    }
}
