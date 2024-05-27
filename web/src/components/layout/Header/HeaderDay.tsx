import dayjs from "dayjs"
import { Calendar } from 'lucide-react'

export const HeaderDay = () => {
  const date = dayjs().format("DD/MM/YY")

  return (
    <div className="flex justify-between items-center gap-4">
      <Calendar data-testid="calendar" size={16} className="text-green-500" />

      <p className="font-bold font-roboto text-base text-green-500">
        {date}
      </p>
    </div>
  )
}