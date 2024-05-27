'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Error() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-1 max-w-[300px]">
      <h1 className="text-3xl font-roboto font-bold text-title">Ops, esta página não foi encontrada</h1>
      <p className="font-nunitoSans text-green-500 text-lg">Parece que você se perdeu... Tente voltar para a página anterior ou acessar a home.</p>

      <div className="flex items-center justify-start gap-3 self-start">
        <Button className=" h-5" onClick={() => router.back()}>
          Voltar
        </Button>

        <Button className="h-5" onClick={() => router.push('/')}>
          Ir para a home
        </Button>
      </div>
    </div>
  )
}