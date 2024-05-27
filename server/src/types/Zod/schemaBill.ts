import { z } from "zod";

export const schemaBill = z.object({
	id: z.string().uuid(),
	economyGD: z.number(),
	totalValueWithoutGD: z.number(),
	compensedEnergy: z.number(),
	energyConsume: z.number(),
	month: z.date(),
	price: z.number(),
	averageEnergyConsume: z.number(),
	pix: z.string(),
	qrcode: z.string(),
	pdf: z.string(),
	userId: z.string().uuid(),
});