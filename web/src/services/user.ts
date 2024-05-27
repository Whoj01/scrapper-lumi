import { api } from "@/lib/axios"
import axios, { type CancelTokenSource } from "axios"

let tokenGetUsersCancel: CancelTokenSource | null = null

export const useUserAPI = () => {
  const getUsers = async (user_identificator?: string) => {
    if(tokenGetUsersCancel) {
      tokenGetUsersCancel.cancel("Request canceled by user")
    }

    tokenGetUsersCancel = axios.CancelToken.source()

    const { data } = await api.get(`/users${user_identificator ? `/${user_identificator.replace('#', '')}` : ''}`).catch((err) => {
      throw new Error('Erro ao buscar usuários')
    })

    return {
      user: data.data
    }
  }

  return {
    getUsers,
  }
}