import { UserInfoCard } from "@/components/ui/UserInfoCard";
import type { Bill } from "@/types/Bill";
import dayjs from "dayjs";

interface CardsInfoMonthProps {
    bill: Bill;
}

export const CardsInfoMonth: React.FC<CardsInfoMonthProps> = ({ bill }) => {
    return (
        <div className="flex flex-wrap gap-3 justify-start items-center flex-grow">
            <UserInfoCard title="Preço da fatura"
                text={"Valor total da fatura de energia elétrica."}
                textInfo={`Valor da fatura de ${dayjs(bill.month).locale('pt-BR').format('MMM/YY')}`}
                value={`R$${bill.price.toFixed(2)}`}
                className="text-red-300"
            />



            <UserInfoCard title="Economia GD"
                text="Variável correspondente a Energia compensada GD."
                textInfo={`Economia GD na fatura de ${dayjs(bill.month).locale('pt-BR').format('MMM/YY')}`}
                value={`R$${bill.economyGD.toFixed(2)}`}
                className="text-green-100"
            />

            <UserInfoCard title="Valor total sem GD"
                text={"Váriavel correspondente a a soma dos valores da energia elétrica, Energia SCEE s/ICMS e Contribuição pública municipal."}
                textInfo={`Valor total sem GD na fatura de ${dayjs(bill.month).locale('pt-BR').format('MMM/YY')}`}
                value={`R$${bill.totalValueWithoutGD.toFixed(2)}`}
                className="text-red-300"
            />

            <UserInfoCard title="Energia compensada GD"
                text={'Variável correspondente a Energia compensada GD em kWh.'}
                textInfo={`Economia GD na fatura de ${dayjs(bill.month).locale('pt-BR').format('MMM/YY')}`}
                value={`${bill.compensedEnergy.toFixed(2)} kWh`}
                className="text-green-100"
            />
            
            <UserInfoCard title="Consumo de energia"
                text={"Variável correspondente a soma de energia consumida e Energia SCEE s/ICMS."}
                textInfo={`Consumo de Energia elétrica na fatura de ${dayjs(bill.month).locale('pt-BR').format('MMM/YY')}`}
                value={`${bill.energyConsume} kWh`}
                className="text-red-300"
            />

            <UserInfoCard title="Média de consumo de energia"
                text={'Variável correspondente a quantidade de dias no mês sendo dividido pela quantidade de energia consumida.'}
                textInfo={`Média de consumo na fatura de ${dayjs(bill.month).locale('pt-BR').format('MMM/YY')}`}
                value={`${bill.averageEnergyConsume} kWh`}
                className="text-green-100"
            />
        </div>
    )
}