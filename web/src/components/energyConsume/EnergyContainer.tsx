'use client'

import type { Bill } from "@/types/Bill";
import type { User } from "@/types/User";
import type { ChartType } from "@/types/ChartType";
import { useState } from "react";
import { EnergyConsumeGraphCard } from "./EnergyConsumeGraphCard"
import { SetGraphEnergyData } from "./SetGraphEnergyData"
import { EnergyConpensatedGraphCard } from "./EnergyConpensatedGraphCard";
import { useBill } from "@/hooks/useBill";
import { UserInfoCard } from "../ui/UserInfoCard";

interface EnergyGraphCardProps {
  bills: Bill[];
  users: User[];
}

export const EnergyContainer = ({ bills, users }: EnergyGraphCardProps) => {
  const [chartType, setChartType] = useState<ChartType>({ type: "consume" })
  const { getMostConsumerUser, getMostCompensetedUser, getMostAverageConsumerUser } = useBill()

  const changeDataType = (type: ChartType) => {
    setChartType(type)
  }

  const { mostConsumerUser, percentageMoreConsumed } = getMostConsumerUser(users, bills)

  const { mostCompensatedUser, percentageMoreCompensated, totalEnergyCompensated } = getMostCompensetedUser(users, bills)

  const { highestAverageEnergyConsumed, userWithHighestAverage, percentageAverageEnergy } = getMostAverageConsumerUser(users, bills)

  return (
    <div className="flex flex-wrap w-full h-full md:max-h-[750px] items-start justify-start gap-3">
      <div className="flex items-start flex-wrap justify-start gap-3 w-full md:flex-nowrap flex-grow self-stretch">
        {chartType.type === "consume" && <EnergyConsumeGraphCard bills={bills} users={users} />}

        {chartType.type === "compensed" && <EnergyConpensatedGraphCard bills={bills} users={users} />}

        <div className="flex flex-col flex-grow gap-3 w-full self-stretch">
          <SetGraphEnergyData chartType={chartType} changeDataType={changeDataType} />

          {mostConsumerUser && <UserInfoCard
            title="Maior consumo de Energia"
            text="O usuário com maior consumo de energia."
            user={mostConsumerUser}
            textInfo={`${percentageMoreConsumed.toFixed(2)}% a mais que os outros usuários`}
            className="text-red-500"
          />}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 max-w-full w-full md:flex-nowrap">
        {mostCompensatedUser && <UserInfoCard
          title="Maior energia compensada"
          text="O usuário com maior total energia compensada."
          user={mostCompensatedUser}
          textInfo={`${percentageMoreCompensated.toFixed(2)}% a mais que os outros usuários`}
          value={`${totalEnergyCompensated.toFixed(2)} kWh`}
          className="text-green-100"
          classNameCard="flex flex-col justify-beetween"
        />}

        {userWithHighestAverage && <UserInfoCard
          title="Maior média de consumo de energia"
          text="O usuário com maior média de energia consumida."
          user={userWithHighestAverage}
          textInfo={`${percentageAverageEnergy.toFixed(2)}% a mais que os outros usuários`}
          value={`${highestAverageEnergyConsumed} kWh`}
          className="text-red-500"
        />}
      </div>
    </div>
  )
}