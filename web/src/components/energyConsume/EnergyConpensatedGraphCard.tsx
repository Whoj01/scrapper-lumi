'use client'

import type { Bill } from "@/types/Bill";
import type { User } from "@/types/User";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Line } from "react-chartjs-2";
import { useLineChart } from "@/hooks/useLineChart";
import { CategoryScale, Chart, LinearScale, PointElement, LineElement, Filler, Legend, Title, Tooltip } from 'chart.js';
import { ModalSeeQRCode } from "../Bills/ModalSeeQRCode";

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

export const EnergyConpensatedGraphCard = ({ bills, users }: EnergyGraphCardProps) => {
  const { renderCompensetedEnergyGraph } = useLineChart()

  const { data, options } = renderCompensetedEnergyGraph(users, bills)

  return (
    <Card className="w-full h-full max-h-[400px]">
      <CardHeader>
        <CardTitle>Energia compensada</CardTitle>

        <CardDescription>
          Essa váriavel corresponde ao valor total de energia compensada em um mês
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full h-full max-h-[280px] relative">
        <Line data={data} options={options} />
      </CardContent>
    </Card>
  )
}