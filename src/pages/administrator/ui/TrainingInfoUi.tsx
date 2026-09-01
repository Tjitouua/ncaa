import type React from "react";
import { BsFillCalendarDateFill } from "react-icons/bs";


interface Props {
    icon: React.ElementType;
    label: string;
    value: string;
    valueClassName?: string; 
};


const TrainingInfoUi: React.FC<Props> = ( {icon: Icon, label, value, valueClassName=""} ) => {
    return (
        <div className="flex gap-3 items-center">
            {/* <Icon className="text-md"/> */}
            <div className="flex flex-col text-xs">
                <label className="text-secondary/50">{label}</label>
                <label className={`font-bold ${valueClassName || "text-secondary/60"}`}>{value}</label>
            </div>
        </div>
    );
}

export default TrainingInfoUi;