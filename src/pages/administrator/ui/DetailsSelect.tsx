import type React from "react";


interface Props {
    label: string;
    name?: string;
    value?: string;
    className?: string;
    children: React.ReactNode;
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}



const DetailsSelect: React.FC<Props> = ({ label, name, value, className="", children, onChange }) => {
    return (
        <div className="flex flex-col text-sm">
           <label className="text-secondary/50">{label}</label>
           <select 
           name={name}
           onChange={onChange}
           value={value} 
           className={`w-full py-1 text-xs cursor-pointer font-bold rounded-md focus:py-2 focus:px-3 focus:mt-2 focus:outline-secondary/30 ${className}`}
           >
               {children}
           </select>
        </div>
    );
}

export default DetailsSelect;