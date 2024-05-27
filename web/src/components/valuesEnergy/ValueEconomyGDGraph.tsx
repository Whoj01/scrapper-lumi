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

interface ValueEconomyGDGraphCardProps {
  bills: Bill[];
  users: User[];
}

export const ValueEconomyGDGraphCard = ({ bills, users }: ValueEconomyGDGraphCardProps) => {
  const { renderEconomyGDGraph } = useLineChart()

  const { data, options } = renderEconomyGDGraph(users, bills)

  return (
    <Card className="w-full h-full max-h-[450px]">
      <CardHeader>
        <CardTitle>Economia GD</CardTitle>

        <CardDescription>
          Essa váriavel corresponde ao valor economizado com a geração distribuída
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full h-full max-h-[280px] relative">
        <Line data={data} options={options} />
      </CardContent>
    </Card>
  )
}