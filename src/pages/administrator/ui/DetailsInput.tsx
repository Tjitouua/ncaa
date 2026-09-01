import type React from "react";


interface Props {
    label: string;
    name?: string;
    value?: string;
    className?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    disabled?: boolean;
}



const DetailsInput: React.FC<Props> = ({ label, name, value, className="", onChange, disabled=false }) => {
    return (
        <div className="flex flex-col text-sm">
           <label className="text-secondary/50">{label}</label>
           <input name={name} disabled={disabled} onChange={onChange} value={value} className={`w-full text-xs py-1 text-secondary/80 font-bold rounded-md focus:py-2 focus:px-3 focus:mt-2 focus:outline-secondary/30 ${className}`} placeholder="e.g. John Doe" type="text" />
        </div>
    );
}

export default DetailsInput;