import type { User } from "@/types/User"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { LineChartIcon } from "lucide-react"

interface UserWithMostConsumeCardProps {
  title: string
  text: string
  user?: User
  value?: string
  textInfo: string
  className?: string
  classNameCard?: string
}

export const UserInfoCard = ({ text, textInfo, title, user, value, className, classNameCard }: UserWithMostConsumeCardProps) => {
  return (
    <Card className={cn("flex-grow", classNameCard)}>
      <CardHeader>
        <CardTitle>
          {title}
        </CardTitle>

        <CardDescription>
          {text}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col items-center justify-center gap-3">

          {user && (
            <div className="flex items-center justify-start w-full gap-3 md:gap-1">
              <Image src='/defaultProfile.jpg' alt="Foto de perfil default" width={24} height={24} className="rounded-full" />
              <div className="flex flex-wrap items-center justify-start gap-0 md:justify-between w-full">
                <p className="text-xs font-light font-nunitoSans text-label truncate">{user?.name}</p>

                <p className="text-xs font-light font-nunitoSans text-label">#{user.code}</p>
              </div>

            </div>
          )}

          {value && <p className={cn(
            "font-nunitoSans font-normal text-base",
            className
          )}>
            {value}
          </p>}

          <div className="flex flex-wrap items-center justify-between w-full">
            <p className="font-nunitoSans font-normal text-base text-placeholder">
              {textInfo}
            </p>

            <LineChartIcon size={24} className={cn('', className)} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}