import type React from "react";


interface Props {
    label: string;
    type?: string;
    placeholder: string;
    error?: string;
}


const Inputs: React.FC<Props> = ({ label, type="text", placeholder, error }) => {
    return (
        <div className="text-xs flex flex-col gap-1">
            <label className="font-bold">{label}</label>
            <input className="rounded-sm py-3 px-3 focus:outline-none focus:ring-0 border border-secondary/40" type={type} placeholder={placeholder} />
            <label className="text-red-600 hidden">{error}</label>
        </div>
    )
}

export default Inputs;