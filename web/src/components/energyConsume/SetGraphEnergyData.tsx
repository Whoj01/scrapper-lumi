'use client'

import type { ChartType } from "@/types/ChartType";
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

interface SetGraphEnergyDataProps {
  chartType: ChartType;
  changeDataType: (type: ChartType) => void;
}

export const SetGraphEnergyData = ({ changeDataType, chartType }: SetGraphEnergyDataProps) => {
  return (
    <Card className="flex-grow">
      <CardHeader>
        <CardTitle>
          Dados do Gráfico
        </CardTitle>

        <CardDescription>
          Clique para selecionar o tipo de dados desejado!
        </CardDescription>

        <CardContent className="space-y-3 px-0 py-0">
          <div className="flex items-center justify-between">
            <p className="font-nunitoSans font-light text-sm text-placeholder">Consumo de energia elétrica</p>

            <Button data-testid="consume" className="font-nunitoSans font-bold text-sm text-cardBackground h-6" onClick={() => changeDataType({ type: 'consume' })}>
              {chartType.type === "consume" ? "Selecionado" : "Ver dados"}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-nunitoSans font-light text-sm text-placeholder">Energia compensada</p>

            <Button data-testid="compensed" className="font-nunitoSans font-bold text-sm text-cardBackground h-6" onClick={() => changeDataType({ type: 'compensed' })}>
              {chartType.type === "compensed" ? "Selecionado" : "Ver dados"}
            </Button>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  )
}