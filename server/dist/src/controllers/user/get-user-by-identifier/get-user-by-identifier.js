import { errorRequest, successesRequest } from "../../../responses/responses";
export class GetUserByIdentifierController {
    getUserByIdentifierRepository;
    constructor(getUserByIdentifierRepository) {
        this.getUserByIdentifierRepository = getUserByIdentifierRepository;
    }
    async handle(httpResquest) {
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
        }
        catch (error) {
            console.log(error);
            return errorRequest("Ocorreu um erro interno", 500);
        }
    }
}
