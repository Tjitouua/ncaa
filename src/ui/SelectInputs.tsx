import type { FC } from "react";
import type React from "react";


interface Props {
    label: string;
    name: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    error?: string;
    children: React.ReactNode;
}



const SelectInputs: React.FC<Props> = ({ label, name, value, onChange, error, children }) => {
    return (
      <div className="text-xs flex flex-col gap-1">
        <label className="font-bold">{label}</label>
        <div className="rounded-sm px-3 border border-secondary/40">
          <select name={name} value={value} onChange={onChange} className="w-full py-2 h-full focus:outline-none focus:ring-0 cursor-pointer">
              {children}
          </select>
        </div>
        <label className="text-red-600">{error}</label>
      </div>
    );
}

export default SelectInputs;


// Please select employee department 