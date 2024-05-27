import type { Bill } from "../../../types/Bill";


export interface IGetMonthBillInfoRepository {
    getBillInfo(month: string, code: string): Promise<Bill | boolean>;
}