import type React from "react";


interface Props {
    label: string;
    name?: string;
    value?: string;
    className?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}



const DetailsDate: React.FC<Props> = ({ label, name, value, className="", onChange }) => {
    return (
        <div className="flex flex-col text-sm">
           <label className="text-secondary/50">{label}</label>
           <input name={name} onChange={onChange} value={value} className={`w-full py-1 font-bold rounded-md focus:py-2 focus:px-3 focus:mt-2 focus:outline-secondary/30 ${className}`} type="date" />
        </div>
    );
}

export default DetailsDate;