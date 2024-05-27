import BillsPage from "@/components/BillPage/BillPage"
import { BillContainer } from "@/components/Bills/BillContainer"
import { LoadingBill } from "@/components/ui/loadingBill"
import { useBillAPI } from "@/services/bill"
import { useUserAPI } from "@/services/user"
import { Suspense } from "react"

export default async function FaturasPage() {

  return (
    <Suspense fallback={<LoadingBill />}>
      <BillsPage />
    </Suspense>
  )
}