import type { ReactNode } from "react";




interface Props {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}




const SecondaryButt: React.FC<Props> = ({ children, className, onClick, disabled }) => {
    return (
        <button onClick={onClick} disabled={disabled} className={`cursor-pointer py-[11px] px-4 rounded-sm
         bg-white flex gap-2 items-center justify-center hover:bg-primary/70 
         text-xs font-bold hover:bg-secondary/20 ${className}`}>
            {children}
        </button>
    )
}

export default SecondaryButt;