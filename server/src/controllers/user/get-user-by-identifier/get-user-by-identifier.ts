import { errorRequest, successesRequest } from "../../../responses/responses";
import type { User } from "../../../types/User";
import type { HttpResponse, HttpResquest, IController } from "../../protocols";
import type {
	IGetUserByIdentifierRepository,
	paramsGetUserByIdentifier,
} from "./protocols";

export class GetUserByIdentifierController implements IController {
	constructor(
		private readonly getUserByIdentifierRepository: IGetUserByIdentifierRepository,
	) {}

	async handle(
		httpResquest: HttpResquest<paramsGetUserByIdentifier | null>,
	): Promise<HttpResponse<User[]>> {
		try {
			const params = httpResquest?.params?.user_identifier;

			if (params) {
				const users = await this.getUserByIdentifierRepository.findUser({
					user_identifier: params,
				});

				if (Array.isArray(users) && users.length > 0) {
					return successesRequest("Usuários encontrados", 200, users);
				}

				if (Array.isArray(users) && users.length <= 0) {
					return successesRequest("Nenhum usuário foi encontrado", 200, users);
				}

				if (users === false) {
					return errorRequest("Ocorreu um erro ao buscar os usuários", 417);
				}
			}

			const users = await this.getUserByIdentifierRepository.findUser();

			if (Array.isArray(users) && users.length > 0) {
				return successesRequest("Usuários encontrados", 200, users);
			}

			if (Array.isArray(users) && users.length <= 0) {
				return successesRequest("Nenhum usuário foi encontrado", 200, users);
			}

			if (users === false) {
				return errorRequest("Ocorreu um erro ao buscar os usuários", 417);
			}

			return errorRequest("Não foi possivel realizar a busca", 500);
		} catch (error) {
			console.log(error);
			return errorRequest("Ocorreu um erro interno", 500);
		}
	}
}
