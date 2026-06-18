import type { ReactNode } from "react";
import { LuUpload } from "react-icons/lu";



interface Props {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}




const SecondaryButt: React.FC<Props> = ({ children, className, onClick }) => {
    return (
        <button onClick={onClick} className={`cursor-pointer py-[11px] px-4 rounded-sm
         bg-white flex gap-2 items-center justify-center hover:bg-primary/70 
         text-xs font-bold hover:bg-secondary/20 ${className}`}>
            {children}
        </button>
    )
}

export default SecondaryButt;