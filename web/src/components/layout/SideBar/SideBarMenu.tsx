export const SideBarMenu = ({ children }: { children: React.ReactNode }) => {
  return (
    <menu className="flex flex-col w-full gap-6 items-start justify-center">
      {children}
    </menu>
  )
}