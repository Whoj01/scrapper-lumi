'use client'

import type { Bill } from "@/types/Bill";
import type { User } from "@/types/User";
import { DataTable } from "./DataTable";
import { useBill } from "@/hooks/useBill";
import { getColumns } from "./columns";
import { ModalSeeQRCode } from "./ModalSeeQRCode";
import { useQRcode } from "@/hooks/useQRcode";

interface BillContainerProps {
  bills: Bill[];
  users: User[];
}

export const BillContainer = ({ bills, users }: BillContainerProps) => {
  const { handleOpenQRcodeModal, QRcodeModal, handleCloseQRcodeModal } = useQRcode()
  const { linkBillsAndUsers } = useBill()

  const billsWithUserInfo = linkBillsAndUsers(users, bills).map(bill => ({
    ...bill,
    user_name: bill.user?.name ?? '',
    user_code: bill.user?.code ?? '',
  }))

  const columns = getColumns({ setQRcodeModal: handleOpenQRcodeModal })

  return (
    <div className="flex flex-col w-full h-full items-start justify-start gap-3">
      <h2 className="font-roboto font-bold text-3xl text-title">
        Faturas
      </h2>

      <DataTable data={billsWithUserInfo} columns={columns} />

      {QRcodeModal?.isOpen && <ModalSeeQRCode bill={QRcodeModal.bill} handleCloseModal={handleCloseQRcodeModal} />}
    </div>
  )
}