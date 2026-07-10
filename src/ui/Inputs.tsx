import type React from "react";


interface Props {
    label: string;
    name?: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    placeholder: string;
    error?: string;
}


const Inputs: React.FC<Props> = ({ label, name, value, onChange, type="text", placeholder, error }) => {
    return (
        <div className="text-xs flex flex-col gap-1">
            <label className="font-bold">{label}</label>
            <input name={name} value={value} onChange={onChange} className="rounded-sm font-semibold py-2 px-3 placeholder:font-normal focus:outline-none focus:ring-0 border border-secondary/40" type={type} placeholder={placeholder} />
            <label className="text-red-600">{error}</label>
        </div>
    )
}

export default Inputs;