import type { Bill } from "@/types/Bill"
import Image from "next/image"
import { Button } from "../ui/button"
import { Check, Clipboard, X } from "lucide-react"
import { useCallback, useState } from "react"
import { Skeleton } from "../ui/skeleton"

interface ModalSeeQRCodeProps {
  bill: Pick<Bill, 'qrcode' | 'pix'>
  handleCloseModal: () => void
}

export const ModalSeeQRCode = ({ bill: { pix, qrcode }, handleCloseModal }: ModalSeeQRCodeProps) => {
  const [clicked, setClicked] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)

  const copyToClipboard = useCallback(() => {
    setClicked((state) => true)

    navigator.clipboard.writeText(pix);

    setTimeout(() => {
      setClicked((state) => false)
    }, 2000)
  }, [pix]);

  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center min-h-screen px-3 py-3">
      <div className="bg-background max-w-[320px] w-full max-h-[320px] shadow-lg px-3 py-3 flex flex-col items-start justify-start rounded-lg gap-3">
        <div className="flex items-center justify-between w-full">
          <p className="font-nunitoSans font-bold text-green-500">QRcode</p>
          <X size={20} className=" text-buttonBackground hover:brightness-75 hover:-translate-y-[2px] transition-all cursor-pointer" onClick={handleCloseModal} />
        </div>

        <Image src={qrcode} alt="QRcode da fatura" width={150} height={150} className={`${loaded ? 'opacity-100 visible relative' : 'opacity-0 invisible absolute'} self-center`} onLoadingComplete={() => setLoaded(true)} />

        {!loaded && (
          <Skeleton className="w-[150px] h-[150px] self-center" />
        )}

        <div className="flex items-center w-full h-[40px] justify-between gap-3">
          <div className="flex items-center max-w-[240px] flex-grow h-[40px] bg-cardBackground border rounded-sm gap-2 border-text px-2 py-1 flex-shrink">
            <p className="font-nunitoSans font-light text-xs text-green-400 truncate">{pix}</p>
          </div>

          <Button onClick={copyToClipboard} className={`${clicked ? 'bg-green-100 hover:bg-green-100' : 'bg-cardBackground hover:bg-cardBackground'}  min-w-8 min-h-8  border flex-grow border-text flex justify-center items-center hover:brightness-90 transition-all px-0 py-0`}>
            {clicked && <Check size={16} className="text-cardBackground" />}

            {!clicked && <Clipboard size={16} className="text-green-300" />}
          </Button>
        </div>
      </div>
    </div>
  )
}