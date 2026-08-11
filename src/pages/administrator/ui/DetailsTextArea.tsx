import type React from "react";


interface Props {
    label: string;
    name?: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    className: string;
    // type?: string;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
}


const TextAreaInputs: React.FC<Props> = ({ label, name, value, onChange, className, placeholder, error, disabled = false, }) => {
    return (
        <div className="text-xs flex flex-col gap-1">
            <label className="font-bold">{label}</label>
            <textarea name={name} value={value} onChange={onChange} rows={4} disabled={disabled} className={`rounded-sm font-semibold py-2 px-3 placeholder:font-normal focus:outline-none focus:ring-0 ${className}`} placeholder={placeholder}>

            </textarea>
            <label className="text-red-600">{error}</label>
        </div>
    )
}

export default TextAreaInputs;