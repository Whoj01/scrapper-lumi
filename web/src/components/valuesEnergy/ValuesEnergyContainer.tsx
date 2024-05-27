'use client'

import type { Bill } from "@/types/Bill";
import type { ChartType } from "@/types/ChartType";
import type { User } from "@/types/User";
import { useState } from "react";
import { ValueEconomyGDGraphCard } from "./ValueEconomyGDGraph";
import { ValueTotalWithoutGDGraphCard } from "./ValueTotalWithoutGDGraph";
import { SetGraphValueData } from "./SetGraphValueData";
import { UserInfoCard } from "../ui/UserInfoCard";
import { useBill } from "@/hooks/useBill";

interface ValuesEnergyContainerProps {
  bills: Bill[];
  users: User[];
}

export const ValuesEnergyContainer = ({ bills, users }: ValuesEnergyContainerProps) => {
  const { getMostEconomyGD, getMostValueWithoutGD } = useBill()
  const [chartType, setChartType] = useState<ChartType>({ type: 'EconomyGD' })

  const changeDataType = (type: ChartType) => {
    setChartType(type)
  }

  const { highestAverageEnergyConsumed, percentageAverageEnergy, userWithHighestAverage } = getMostEconomyGD(users, bills)

  const { highestValueWithoutGD, percentageValueWithoutGD, userWithHighestValueWithoutGD } = getMostValueWithoutGD(users, bills)

  return (
    <div className="flex flex-wrap w-full h-full md:max-h-[750px] items-start justify-start gap-3 pb-4">
      <div className="flex items-start flex-wrap justify-start gap-3 w-full md:flex-nowrap flex-grow self-stretch">
        {chartType.type === 'EconomyGD' && <ValueEconomyGDGraphCard bills={bills} users={users} />}

        {chartType.type === 'valueWithoutGD' && <ValueTotalWithoutGDGraphCard bills={bills} users={users} />}

        <div className="flex flex-col gap-3 w-full self-stretch">
          <SetGraphValueData chartType={chartType} changeDataType={changeDataType} />

          {userWithHighestAverage && <UserInfoCard title="Maior economia GD"
            user={userWithHighestAverage}
            text="usuário que mais economizou energia com GD"
            textInfo={`${percentageAverageEnergy.toFixed(2)}% a mais que os outros usuários`}
            value={`R$${highestAverageEnergyConsumed}`}
            className="text-green-100"
          />}
        </div>

        <div className="w-full">
          {userWithHighestValueWithoutGD && <UserInfoCard
            title="Maior valor sem GD"
            text="usuário que mais gastou sem economia GD"
            textInfo={`${percentageValueWithoutGD.toFixed(2)}% a mais que os outros usuários`}
            user={userWithHighestValueWithoutGD}
            value={`R$${highestValueWithoutGD}`}
            className="text-red-500"
          />}
        </div>
      </div>  
    </div>
  )
}