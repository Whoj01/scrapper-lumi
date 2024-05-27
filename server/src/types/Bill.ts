export interface Bill {
	id: string;
	economyGD: number;
	totalValueWithoutGD: number;
	compensedEnergy: number;
	energyConsume: number;
	month: Date;
	price: number;
	averageEnergyConsume: number;
	pix: string;
	qrcode: string;
	pdf: string;
	qrcodeKey: string;
	pdfKey: string;
	userId: string | null;
	ContributionMun: number;
	EnergyElectricKW: number;
	EnergyElectricValue: number;
	EnergySCEEEKW: number;
	EnergySCEEEValue: number;
}
