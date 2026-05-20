import type { ReactNode } from "react";
import { RiAddLargeLine } from "react-icons/ri";


interface Props {
    children: ReactNode;
}


const PrimaryButt: React.FC<Props> = ({ children }) => {
    return (
        <button className="cursor-pointer py-[11px] px-4 
        rounded-sm bg-primary flex gap-2 items-center 
        hover:bg-primary/70 text-xs font-bold text-white">
            {children}
        </button>
    )
}

export default PrimaryButt;