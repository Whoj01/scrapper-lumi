export interface Bill {
	id: string;
	economyGD: number;
	totalValueWithoutGD: number;
	compensedEnergy: number;
	energyConsume: number;
	month: Date;
	price: number;
	averageEnergyConsume: number;
	pix: string | null;
	qrcode: string | null;
	pdf: string;
	qrcodeKey: string;
	pdfKey: string | null;
	userId: string | null;
	ContributionMun: number;
	EnergyElectricKW: number;
	EnergyElectricValue: number;
	EnergySCEEEKW: number;
	EnergySCEEEValue: number;
}
