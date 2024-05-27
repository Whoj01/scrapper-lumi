import { BillContainer } from "@/components/Bills/BillContainer"
import { useBillAPI } from "@/services/bill"
import { useUserAPI } from "@/services/user"
import { Frown } from "lucide-react"
import { NoData } from "../layout/NoData"

export default async function BillsPage() {
  const { getUsers } = useUserAPI()
  const { getBills } = useBillAPI()

  const { user } = await getUsers().catch((err) => {
    return err
  })
  const { bill } = await getBills().catch((err) => {
    return err
  })

  return (
    <>
      {(user?.length <= 0 || bill?.length <= 0) && <NoData />}

      {!user && (
        <div className="flex flex-col justify-center items-center gap-3">
          <p className="font-nunitoSans font-bold text-xl text-green-500">
            Ocorreu um erro ao carregar os dados dos usuários, por favor tente novamente mais tarde.
          </p>

          <Frown size={24} />
        </div>
      )}

      {!bill && (
        <div className="flex flex-col justify-center items-center gap-3">

          <p className="font-nunitoSans font-bold text-xl text-green-500">
            Ocorreu um erro ao carregar os dados das faturas, por favor tente novamente mais tarde.
          </p>

          <Frown size={24} />
        </div>
      )}
      
      {(user?.length > 0 && bill?.length > 0) && <BillContainer bills={bill} users={user} />}
    </>
  )
}