import prismaClient from "../../../api/prismaClient";
import type {
	IGetUserByIdentifierRepository,
	paramsGetUserByIdentifier,
} from "../../../controllers/user/get-user-by-identifier/protocols";
import type { User } from "../../../types/User";
import z from "zod";

const schema = z.object({
	code: z.string(),
	id: z.string().uuid(),
	name: z.string(),
});

export class PrismaGetUserByIdentifier
	implements IGetUserByIdentifierRepository
{
	async findUser(user?: paramsGetUserByIdentifier): Promise<User[] | boolean> {
		if (user?.user_identifier) {
			const isNotCode = Number.isNaN(Number(user?.user_identifier));

			if (isNotCode) {
				const searchUser = await prismaClient.user.findMany({
					where: {
						name: {
							contains: user.user_identifier,
							mode: "insensitive",
						},
					},
					select: {
						code: true,
						id: true,
						name: true,
					},
				});

				const validatedSearchUser = z.array(schema).safeParse(searchUser);

				if (validatedSearchUser.success) {
					return searchUser;
				}

				return false;
			}

			const searchUser = await prismaClient.user.findMany({
				where: {
					code: {
						contains: user.user_identifier,
					},
				},
				select: {
					code: true,
					id: true,
					name: true,
				},
			});

			const validatedSearchUser = z.array(schema).safeParse(searchUser);

			if (validatedSearchUser.success) {
				return searchUser;
			}

			return false;
		}

		const searchUser = await prismaClient.user.findMany({
			select: {
				code: true,
				id: true,
				name: true,
			},
		});

		const validatedSearchUser = z.array(schema).safeParse(searchUser);

		if (validatedSearchUser.success) {
			return searchUser;
		}

		return false;
	}
}
