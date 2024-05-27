export const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col justify-start items-center gap-6 py-4  px-3 md:px-8 w-full min-h-screen bg-backgroundMain transition-all">
      {children}
    </main>
  )
}