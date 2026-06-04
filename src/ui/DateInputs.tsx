import type React from "react";



interface Props {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}



const DateInputs: React.FC<Props> = ({ label, name, value, onChange, error }) => {
    return (
        <div className="text-xs flex flex-col gap-1">
           <label className="font-bold">{label}</label>
           <div className="rounded-sm px-3 border border-secondary/40">
             <input name={name} value={value} onChange={onChange} type="date" className="w-full h-full py-2 focus:outline-none" />
           </div>
           <label className="text-red-600">{error}</label>
       </div>
    );
}

export default DateInputs;