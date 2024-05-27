import moment from "moment";
import { errorRequest, successesRequest } from "../../../responses/responses";
import type { Bill } from "../../../types/Bill";
import type { HttpResponse, HttpResquest, IController } from "../../protocols";
import type { IGetMonthBillInfoRepository } from "./protocols";
import { HttpStatusCode } from "../../../types/HTTPResponses";

export class GetMonthBillInfoController implements IController {
	constructor(
		private readonly getMonthBillInfoRepository: IGetMonthBillInfoRepository,
	) {}

	async handle(
		httpResquest: HttpResquest<{ month: string, code: string }>,
	): Promise<HttpResponse<Bill[]>> {
		try {
			const { month, code } = httpResquest.params!;

            if (!month || !code) {
                return errorRequest("Request enviada com falta de campos", HttpStatusCode.BAD_REQUEST);
            }

            const bill = await this.getMonthBillInfoRepository.getBillInfo(moment.utc(month.replace('-', '/'), "MM/YYYY").startOf('day').toISOString(), code);

            if (bill) return successesRequest("Conta encontrada", HttpStatusCode.OK, bill);
            
            if (!bill) return successesRequest("Nenhuma conta encontrada", HttpStatusCode.OK, bill);

			return errorRequest("Ocorreu um erro ao buscar a conta", HttpStatusCode.EXPECTATION_FAILED);
		} catch (error) {
			return errorRequest("Ocorreu um erro interno", HttpStatusCode.INTERNAL_SERVER_ERROR);
		}
	}
}
