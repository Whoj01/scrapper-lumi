import { Skeleton } from "./skeleton"

export const LoadingHome = () => {
  return (
    <div className="flex flex-wrap w-full min-h-screen items-start justify-start gap-3">
      <div className="flex items-start flex-wrap justify-start gap-3 w-full md:flex-nowrap">
        <div className="flex flex-col gap-3 w-full h-[600px]">
          <Skeleton className="w-full flex-grow h-[300px] bg-text/50" />
          <Skeleton className="w-full flex-grow h-[300px] bg-text/50" />
        </div>

        <div className="flex flex-col gap-3 w-full h-[600px]">
          <Skeleton className="w-full flex-grow h-[300px] bg-text/50" />
          <Skeleton className="w-full flex-grow h-[300px] bg-text/50" />
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full h-[600px]">
        <Skeleton className="w-full h-[300px] bg-text/50" />
        <Skeleton className="w-full h-[300px] bg-text/50" />

      </div>

    </div>
  )
}