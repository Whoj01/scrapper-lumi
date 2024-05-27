'use client'

import type { Bill } from "@/types/Bill";
import type { User } from "@/types/User";
import { useState } from "react";
import { ToggleMonth } from "./ToggleMonth";
import { CardsInfoMonth } from "./CardsInfoMonth";

interface UserContainerProps {
    user: User
    bills: Bill[]
}

export const UserContainer: React.FC<UserContainerProps> = ({ user, bills }) => {
    const [selectedBill, setSelectedBill] = useState<Bill>(bills[0]) 

    const handleSelectDate = (bill: Bill) => {
        setSelectedBill((state) => {
            if (state.id === bill.id) {
                return state
            }

            return bill
        })
    }

    return (
        <section className="flex flex-col gap-3 w-full h-full">
            <h2 className="font-roboto font-bold text-lg text-title">
                {user.name} - #{user.code}
            </h2>

            <div className="flex flex-col gap-5">
                <h3 className="font-roboto font-bold text-lg text-title">
                    faturas
                </h3>

                <ToggleMonth bills={bills} selectedBill={selectedBill} setSelectBill={handleSelectDate} />

                <CardsInfoMonth bill={selectedBill} />
            </div>
        </section>
    )
}