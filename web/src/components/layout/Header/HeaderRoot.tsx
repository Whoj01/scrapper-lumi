export const HeaderRoot = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="flex justify-between items-center w-full h-[56px]">
      {children}
    </header>
  )
}