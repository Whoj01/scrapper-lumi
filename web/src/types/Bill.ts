export interface Bill {
	id: string;
	economyGD: number;
	totalValueWithoutGD: number;
	compensedEnergy: number;
	energyConsume: number;
	month: Date | string;
	price: number;
	averageEnergyConsume: number;
	pix: string;
	qrcode: string;
	pdf: string;
	userId: string;
}
