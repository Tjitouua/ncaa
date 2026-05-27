import type React from "react";


interface Props {
    label: string;
    value?: string;
    className?: string;
}



const DetailsInput: React.FC<Props> = ({ label, value, className="" }) => {
    return (
        <div className="flex flex-col text-sm">
           <label className="text-secondary/50">{label}</label>
           <input value={value} className={`w-full py-1 font-bold rounded-md focus:py-2 focus:px-3 focus:mt-2 focus:outline-secondary/30 ${className}`} placeholder="e.g. John Doe" type="text" />
        </div>
    );
}

export default DetailsInput;