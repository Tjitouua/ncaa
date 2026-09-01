import type React from "react";
import { BsFillCalendarDateFill } from "react-icons/bs";


interface Props {
    icon: React.ElementType;
    label: string;
    value: string;
};


const TrainingInfoUi: React.FC<Props> = ( {icon: Icon, label, value} ) => {
    return (
        <div className="flex gap-5 items-end">
            {/* <Icon className="text-xl"/> */}
            <div className="flex flex-col text-xs">
                <label className="text-secondary/50">{label}</label>
                <label className="font-bold">{value}</label>
            </div>
        </div>
    );
}

export default TrainingInfoUi;