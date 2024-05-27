'use client'

import type { Bill } from "@/types/Bill";
import type { User } from "@/types/User";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Line } from "react-chartjs-2";
import { useLineChart } from "@/hooks/useLineChart";
import { CategoryScale, Chart, LinearScale, PointElement, LineElement, Filler, Legend, Title, Tooltip } from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface EnergyGraphCardProps {
  bills: Bill[];
  users: User[];
}

export const EnergyConsumeGraphCard = ({ bills, users }: EnergyGraphCardProps) => {
  const { renderEnergyConsumeGraph } = useLineChart()

  const { data, options } = renderEnergyConsumeGraph(users, bills)

  return (
    <Card className="w-full h-full max-h-[400px]">
      <CardHeader>
        <CardTitle>Consumo de energia</CardTitle>

        <CardDescription>
          Essa váriavel corresponde ao consumo total de energia elétrica em um mês
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full h-full max-h-[280px] relative">
        <Line data={data} options={options} />
      </CardContent>
    </Card>
  )
}