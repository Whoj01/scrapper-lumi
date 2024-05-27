import { errorRequest, successesRequest } from "../../../responses/responses";
import type { Bill } from "../../../types/Bill";
import type { HttpResponse, HttpResquest, IController } from "../../protocols";
import type { IGetBillsInfoRepository } from "./protocols";

export class GetBillsInfoController implements IController {
	constructor(
		private readonly getBillsInfoRepository: IGetBillsInfoRepository,
	) {}

	async handle(
		httpResquest: HttpResquest<{ user_identificator?: string }>,
	): Promise<HttpResponse<Bill[]>> {
		try {
			const user_identificator = httpResquest.params?.user_identificator;

			if (user_identificator) {
				const bills =
					await this.getBillsInfoRepository.getBills(user_identificator);

				if (Array.isArray(bills) && bills.length > 0) {
					return successesRequest("Contas encontradas", 200, bills);
				}

				if (Array.isArray(bills) && bills.length <= 0) {
					return successesRequest("Nenhuma conta encontrada", 200, bills);
				}

				if (bills === false) {
					return errorRequest("Ocorreu um erro ao buscar as contas", 417);
				}
			}

			const bills = await this.getBillsInfoRepository.getBills();

			if (Array.isArray(bills) && bills.length > 0) {
				return successesRequest("Contas encontradas", 200, bills);
			}

			if (Array.isArray(bills) && bills.length <= 0) {
				return successesRequest("Nenhuma conta encontrada", 200, bills);
			}

			return errorRequest("Ocorreu um erro ao buscar as contas", 417);
		} catch (error) {
			return errorRequest("Ocorreu um erro interno", 500);
		}
	}
}
