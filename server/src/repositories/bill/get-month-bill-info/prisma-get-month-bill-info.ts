import { z } from "zod";
import prismaClient from "../../../api/prismaClient";
import type { IGetMonthBillInfoRepository } from "../../../controllers/bill/get-month-bill-info/protocols";
import type { Bill } from "../../../types/Bill";
import { schemaBill } from "../../../types/Zod/schemaBill";

export class PrismaGetMonthBillInfoRepository implements IGetMonthBillInfoRepository {
    async getBillInfo(month: string, code: string): Promise<Bill | boolean> {
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

        return bill as Bill;
    }
}