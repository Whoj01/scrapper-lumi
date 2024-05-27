import moment from "moment";
import { errorRequest, successesRequest } from "../../../responses/responses";
import { HttpStatusCode } from "../../../types/HTTPResponses";
export class GetMonthBillInfoController {
    getMonthBillInfoRepository;
    constructor(getMonthBillInfoRepository) {
        this.getMonthBillInfoRepository = getMonthBillInfoRepository;
    }
    async handle(httpResquest) {
        try {
            const { month, code } = httpResquest.params;
            if (!month || !code) {
                return errorRequest("Request enviada com falta de campos", HttpStatusCode.BAD_REQUEST);
            }
            const bill = await this.getMonthBillInfoRepository.getBillInfo(moment.utc(month.replace('-', '/'), "MM/YYYY").startOf('day').toISOString(), code);
            if (bill)
                return successesRequest("Conta encontrada", HttpStatusCode.OK, bill);
            if (!bill)
                return successesRequest("Nenhuma conta encontrada", HttpStatusCode.OK, bill);
            return errorRequest("Ocorreu um erro ao buscar a conta", HttpStatusCode.EXPECTATION_FAILED);
        }
        catch (error) {
            return errorRequest("Ocorreu um erro interno", HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }
}
