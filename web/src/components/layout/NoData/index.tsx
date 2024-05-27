import { Frown } from "lucide-react";
import type React from "react";

export const NoData: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-3">
          <p className="font-nunitoSans font-bold text-xl text-green-500">
            Parece que não existe dados para serem exibidos, por favor tente novamente mais tarde.
          </p>

          <Frown size={24} />
        </div>
    )
}