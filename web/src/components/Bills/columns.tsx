"use client"

import type { Bill } from "@/types/Bill"
import type { ColumnDef } from "@tanstack/react-table"
import { useBillAPI } from "@/services/bill";
import dayjs from "dayjs"
import 'dayjs/locale/pt-br';
import { Download, QrCode } from "lucide-react";

dayjs.locale('pt-br');

export type BillWithUserInfo = Bill & {
  user_name: string
  user_code: string
}

interface GetColumnsProps {
  setQRcodeModal: (bill: Pick<Bill, 'qrcode' | 'pix'>, isOpen: boolean) => void
}

const { downloadPdf } = useBillAPI()

export const getColumns = ({ setQRcodeModal }: GetColumnsProps): ColumnDef<BillWithUserInfo>[] =>
  [
    {
      accessorKey: "user_name",
      header: () => {
        return <p className="font-nunitoSans font-semibold text-base text-green-500">Nome do usuário</p>
      },
      cell: ({ row }) => {
        return (
          <p className="font-nunitoSans font-light text-xs text-green-900">{row.original.user_name}</p>
        )
      },
    },
    {
      accessorKey: "user_code",
      header: () => {
        return <p className="font-nunitoSans font-semibold text-base text-green-500">Código do usuário</p>
      },
      cell: ({ row }) => {
        return (
          <p className="font-nunitoSans font-light text-xs text-green-900">#{row.original.user_code}</p>
        )
      },
    },
    {
      accessorKey: "month",
      header: () => {
        return <p className="font-nunitoSans font-semibold text-base text-green-500">Mês</p>
      },
      cell: ({ row }) => {
        const formatedDate = dayjs(row.original.month).format('MMM/YY')

        return (
          <p className="font-nunitoSans font-light text-xs text-green-900">{formatedDate}</p>
        )
      },
    },
    {
      accessorKey: 'price',
      header: () => {
        return <p className="font-nunitoSans font-semibold text-base text-green-500">Preço</p>
      },
      cell: ({ row }) => {
        return (
          <p className="font-nunitoSans font-light text-xs text-green-900">R${row.original.price}</p>
        )
      },
    },
    {
      id: "actions",
      header: () => {
        return <p className="font-nunitoSans font-semibold text-base text-green-500 text-end">Ações</p>
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-end gap-3 w-full">
            <QrCode size={16} className="text-buttonBackground hover:-translate-y-[2px] hover:brightness-50 transition-all cursor-pointer" onClick={() => setQRcodeModal({
              pix: row.original.pix,
              qrcode: row.original.qrcode
            }, true
            )} />

            <Download size={16} className="text-buttonBackground hover:-translate-y-[2px] hover:brightness-50 transition-all cursor-pointer"
              onClick={() => downloadPdf(row.original.pdf, `${row.original.user_name}-${dayjs(row.original.month).format('MMM/YY')}`)}
            />
          </div>
        )
      }
    },
  ]
