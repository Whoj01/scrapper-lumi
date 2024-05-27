import { api } from "@/lib/axios"
import axios, { type CancelTokenSource } from "axios"

let tokenGetBillsCancel: CancelTokenSource | null = null


export const useBillAPI = () => {
  const getBills = async (user_identificator?: string) => {
    if(tokenGetBillsCancel) {
      tokenGetBillsCancel.cancel("Request canceled by user")
    }

    tokenGetBillsCancel = axios.CancelToken.source()

    const { data } = await api.get(`/bills${user_identificator ? `/${user_identificator}` : ''}`).catch((err) => {
      throw new Error('Erro ao buscar faturas')
    })

    return {
      bill: data.data
    }
  }

  const downloadPdf = async (url: string, name: string) => {
    const link = document.createElement('a');
    link.href = url;

    link.download = `${name}.pdf`;
    document.body.appendChild(link);
    
    link.target = '_blank';
    link.click();
    document.body.removeChild(link);
  }

  return {
    getBills,
    downloadPdf
  }
}