import type { ReactNode } from "react";
import { RiAddLargeLine } from "react-icons/ri";


interface Props {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
}


const PrimaryButt: React.FC<Props> = ({ children, onClick, className="" }) => {
    return (
        <button 
        onClick={onClick}
        className={`cursor-pointer py-[11px] px-4 
        rounded-sm bg-primary flex gap-2 items-center 
        hover:bg-primary/70 justify-center text-xs font-bold text-white ${className}`}>
            {children}
        </button>
    )
}

export default PrimaryButt;