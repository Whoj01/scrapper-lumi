import { Menu } from "lucide-react";

export const SideBarRoot = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="group px-3 py-3 md:py-8 md:px-8  bg-green-900 transition-all hover:bg-backgroundMain md:bg-backgroundMain">
      <Menu size={24} className="peer self-start text-background md:hidden" />

      <aside className="flex flex-col  fixed z-20 inset-0 group-hover:w-40 group-hover:visible group-hover:opacity-100 opacity-0 invisible justify-start items-center gap-6 py-12 w-12  px-2 md:group-hover:px-8 min-h-screen bg-green-900 rounded-r-3xl transition-all md:visible md:opacity-100 md:group-hover:w-[250px] md:w-20">
        {children}
      </aside>

      <div className="fixed inset-0 bg-black  z-10 opacity-0 invisible group-hover:visible group-hover:opacity-50 pointer-events-none md:group-hover:hidden"/>
    </div>
  );
};