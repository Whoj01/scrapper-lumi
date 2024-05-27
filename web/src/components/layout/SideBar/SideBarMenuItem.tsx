'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SideBarMenuItemProps {
  children: React.ReactNode;
  href: string;
}

export const SideBarMenuItem = ({ children, href }: SideBarMenuItemProps) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <li className="w-full">
      <Link href={href} data-isactive={isActive} className="flex items-center  justify-center [&>p]:hidden w-full h-[56px] overflow-hidden font-roboto text-2xl leading-tight data-[isactive=true]:[&>*]:text-green-100  data-[isactive=false]:[&>*]:text-backgroundMain data-[isactive=false]:bg-transparent data-[isactive=false]:text-backgroundMain data-[isactive=true]:bg-divider data-[isactive=true]:text-green-100 md:justify-center md:group-hover:justify-start md:group-hover:[&>p]:inline w-100 gap-3 py-3 px-3 rounded-md transition-all cursor-pointer hover:brightness-90">
        {children}
      </Link>
    </li>
  )
}