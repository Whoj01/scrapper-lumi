"use client"

import type { Bill } from "@/types/Bill"
import React from "react"

interface QRCodeModalBill {
  isOpen: boolean
  bill: Pick<Bill, 'qrcode' | 'pix'>
}

export const useQRcode = () => {
  const [QRcodeModal, setQRcodeModal] = React.useState<QRCodeModalBill>()

  const handleOpenQRcodeModal = (bill: Pick<Bill, 'qrcode' | 'pix'>, isOpen: boolean) => {
    setQRcodeModal({
      bill,
      isOpen
    })
  }

  const handleCloseQRcodeModal = () => {
    setQRcodeModal({
      bill: {} as Bill,
      isOpen: false
    })
  }

  return {
    QRcodeModal,
    handleOpenQRcodeModal,
    handleCloseQRcodeModal
  }
}