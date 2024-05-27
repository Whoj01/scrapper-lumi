import { BillContainer } from "@/components/Bills/BillContainer"
import { useBillAPI } from "@/services/bill"
import { useUserAPI } from "@/services/user"
import { Frown } from "lucide-react"
import { NoData } from "../layout/NoData"
import { UserContainer } from "./UserContainer"

export default async function UserPage({ code }: { code: string }) {
  const { getUsers } = useUserAPI()
  const { getBills } = useBillAPI()

  const { user } = await getUsers(code).catch((err) => {
    return err
  })
  const { bill } = await getBills(code).catch((err) => {
    return err
  })

  console.log(code)

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
      
      {(user?.length > 0 && bill?.length > 0) && <UserContainer bills={bill} user={user[0]} />}
    </>
  )
}