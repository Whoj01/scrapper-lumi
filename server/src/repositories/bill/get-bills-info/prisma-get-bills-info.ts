import moment from "moment";
import prismaClient from "../../../api/prismaClient";
import type { Bill } from "../../../types/Bill";
import type { IGetBillsInfoRepository } from "../../../controllers/bill/get-bills-info/protocols";
import z from "zod";
import { schemaBill } from "../../../types/Zod/schemaBill";

export class PrismaGetBillsInfoRepository implements IGetBillsInfoRepository {
	async getBills(
		user_identifier?: string | undefined,
	): Promise<boolean | Bill[]> {
		if (user_identifier) {
			const isNotCode = Number.isNaN(Number(user_identifier));

			if (isNotCode) {
				const billsOfUser = await prismaClient.bill.findMany({
					where: {
						User: {
							name: {
								contains: user_identifier,
								mode: "insensitive",
							},
						},
					},
					orderBy: {
						month: "desc",
					},
				});

				const parsedBillsOfUser = z.array(schemaBill).safeParse(billsOfUser);

				if (parsedBillsOfUser.success) {
					return billsOfUser;
				}

				return false;
			}

			const billsOfUser: Bill[] = await prismaClient.bill.findMany({
				where: {
					User: {
						code: {
							contains: user_identifier,
						},
					},
				},
				orderBy: {
					month: "asc",
				},
			});

			const parsedBillsOfUser = z.array(schemaBill).safeParse(billsOfUser);

			if (parsedBillsOfUser.success) {
				return billsOfUser;
			}

			return false;
		}

		const allBills = await prismaClient.bill.findMany({});

		const parsedBillsOfUser = z.array(schemaBill).safeParse(allBills);

		if (parsedBillsOfUser.success) {
			return allBills;
		}

		return false;
	}
}
