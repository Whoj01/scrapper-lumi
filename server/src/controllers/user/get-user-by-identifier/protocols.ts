import { User } from "../../../types/User";

export type paramsGetUserByIdentifier = {
	user_identifier?: string;
};

export interface IGetUserByIdentifierRepository {
	findUser(user?: paramsGetUserByIdentifier): Promise<User[] | boolean>;
}
