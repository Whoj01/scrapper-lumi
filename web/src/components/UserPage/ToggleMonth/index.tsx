import { Toggle } from "@/components/ui/toggle"
import type { Bill } from "@/types/Bill"
import dayjs from "dayjs"

interface ToggleMonthProps {
    bills: Bill[],
    selectedBill: Bill,
    setSelectBill: (bill: Bill) => void
}

export const ToggleMonth: React.FC<ToggleMonthProps> = ({ bills, setSelectBill, selectedBill }) => {
    return (
        <div className="flex flex-wrap gap-2 justify-start items-center">
                    {bills.map(bill => (
                        <Toggle 
                            key={bill.id} 
                            value={bill.id} 
                            onClick={() => setSelectBill(bill)}
                            data-state={selectedBill.id === bill.id ? 'on' : 'off'}
                            className="data-[state=on]:bg-green-300 transition-all"
                        >
                            {dayjs(bill.month).locale('pt-BR').format('MMM/YY')}
                        </Toggle>
                    ))}
        </div>
    )
}