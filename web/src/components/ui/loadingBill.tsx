import { Skeleton } from "./skeleton"

export const LoadingBill = () => {
  return (
    <div className="flex flex-col w-full min-h-screen items-start justify-start gap-3">
      <Skeleton className="w-40 h-12 bg-text/50" />
      <Skeleton className="w-full h-full max-h-[600px] bg-text/50" />
    </div>
  )
}