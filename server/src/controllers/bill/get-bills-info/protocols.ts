import type { Bill } from "../../../types/Bill";

export interface IGetBillsInfoRepository {
	getBills(user_identifier?: string): Promise<Bill[] | boolean>;
}
