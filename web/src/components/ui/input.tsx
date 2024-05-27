"use client"

import * as React from "react"

import type { User } from "@/types/User"
import { cn } from "@/lib/utils"
import { Search, X } from 'lucide-react'
import { useInput } from "@/hooks/useInput"
import Image from "next/image"
import { useUserAPI } from "@/services/user"
import Link from "next/link"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = ({ className, type, ...props }: InputProps) => {
  const inputId = React.useId()
  const inputRef = React.useRef<HTMLInputElement>(null)

  const { handleChange, handleClear, value } = useInput(inputRef)
  const { getUsers } = useUserAPI()

  const [users, setUsers] = React.useState<User[]>([])

  const handleGetUsers = async () => {
    const { user } = await getUsers(value).catch((err) => err)

    setUsers(user)
  }

  React.useEffect(() => {
    if (value === '') return
    
    handleGetUsers()
  }, [value])

  return (
    <>
      <div className={cn("group flex justify-center relative h-10 gap-2 w-10 focus-within:w-36 focus-within:px-3 focus-within:py-2 border border-input rounded-md focus-within:rounded-t-md focus-within:rounded-b-none items-center focus-within:justify-between  transition-all [&:focus-within+div]:hidden lg:w-[300px] lg:px-3 lg:py-2 lg:[&:focus-within+div]:flex lg:focus-within:w-[300px]", className)}>
        <Search data-testid="search" size={24} className="text-placeholder min-w-[24px] absolute group-focus-within:relative lg:relative" onClick={() => inputRef?.current?.focus()} />

        <input
          type={type}
          className="flex h-full w-full bg-backgroundMain opacity-0 px-3 pl-2 focus-visible:w-full focus-visible:opacity-100 text-sm ring-offset-0 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-placeholder [&:not(focus-visible):w-10] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 lg:opacity-100"
          onChange={handleChange}
          placeholder="Pesquise pelo número ou pelo nome do usuário"
          value={value}
          id={inputId}
          ref={inputRef}
          {...props}
        />

        {value.length > 0 && (
          <X data-testid="clear" size={24} className="opacity-0 text-placeholder min-w-[24px] group-focus-within:opacity-100" onClick={(e) => {
            handleClear()
            inputRef?.current?.focus()
          }}
          />
        )}

        {value.length > 0 && (
          <div className="absolute py-2 opacity-0 group-focus-within:opacity-100 top-full left-0  w-full border border-input rounded-b-md z-10 bg-cardBackground">
            <ul className="flex flex-col gap-2 items-start justify-center [&>li:not(:last-child)]:border-b">
              {users?.length > 0 && users.map((user) => (
                <Link className="w-full" href={`/usuarios/${user.code}`} key={user.id}>
                  <li 
                    key={user.id} 
                    className="flex py-2 px-2 rounded-md items-center justify-start gap-2 w-full cursor-pointer transition-all hover:brightness-95 hover:bg-cardBackground truncate text-ellipsis text-wrap break-words"
                    
                    >
                    <Image src='/defaultProfile.jpg' alt="Foto de perfil default" width={24} height={24} className="rounded-full" />

                    <p className="font-nunitoSans text-xs font-light text-text">{user.name}</p>
                  </li>
                </Link>
                
              ))}

              {(Array.isArray(users) && users?.length === 0) && (
                <li className="flex py-2 px-2 rounded-md self-center items-center justify-start gap-2 w-full cursor-pointer transition-all hover:brightness-95 hover:bg-cardBackground">
                  <p className="font-nunitoSans text-xs font-light text-text text-ellipsis">Nenhum usuário foi encontrado</p>
                </li>
              )}    
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export { Input }
