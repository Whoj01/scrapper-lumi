"use client"

import  {
  type ColumnDef,
  type ColumnFiltersState,
  getFilteredRowModel,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    }
  })


  return (
    <div className="flex flex-col w-full gap-2"> 
        <div className="flex justify-start w-full">
              <Input
                placeholder="Pesquise por nome ou código"
                className="max-w-72 bg-backgroundMain"
                value={(table.getColumn('user_code')?.getFilterValue() as string) || (table.getColumn('user_name')?.getFilterValue() as string) || ''}
                onChange={(event) => {
                  if (Number(event.target.value.replace('#', ''))) {
                    table.getColumn("user_code")?.setFilterValue(event.target.value)
                  }
      
                  else table.getColumn("user_name")?.setFilterValue(event.target.value)
                  

                  if (event.target.value === '') {
                    table.getColumn("user_name")?.setFilterValue('')
                    table.getColumn("user_code")?.setFilterValue('')
                  }
                }
              }
              />
        </div>

      <div className="rounded-md border w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody >
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, i) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={i % 2 === 0 ? '' : 'bg-green-50/40 hover:brightness-90'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                { (table.getColumn('user_name')?.getFilterValue() as string || table.getColumn('user_name')?.getFilterValue() as string) && 'Nenhuma conta encontrada com esta pesquisa' }

                { (!table.getColumn('user_name')?.getFilterValue() && !table.getColumn('user_code')?.getFilterValue()) && 'Nenhuma conta para mostrar' }
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between space-x-2 py-4 px-3 self-start">
          <p className="font-nunitoSans font-medium text-sm text-green-500">
            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
          </p>
          <div className="flex items-center justify-center gap-2">
            <ChevronLeft
              size={16} onClick={() => table.previousPage()}
              className={`${!table.getCanPreviousPage() ? 'text-buttonBackground/15 cursor-not-allowed hover:brightness-50 pointer-events-none' : ' text-buttonBackground hover:brightness-90'} transition-all cursor-pointer`}
            />

            {Array.from({ length: table.getPageCount() }).map((_, i) => (
              <p key={i} onClick={() => table.setPageIndex(i)} className={`${table.getState().pagination.pageIndex === i ? 'bg-label/30' : 'bg-transparent'} px-2 rounded-sm cursor-pointer hover:brightness-75 hover:bg-label/30 transition-all font-nunitoSans font-medium text-sm text-green-500`}>
                {i + 1}
              </p>
            ))}
            <ChevronRight size={16} onClick={() => table.nextPage()}
              className={`${!table.getCanNextPage() ? 'text-buttonBackground/15 cursor-not-allowed hover:brightness-50 pointer-events-none' : ' text-buttonBackground hover:brightness-90'} transition-all cursor-pointer`} />
          </div>

          <p className="font-nunitoSans font-medium text-sm text-green-500">
            Total de {data.length} contas
          </p>
        </div>
      </div>
    </div>
  )
}
