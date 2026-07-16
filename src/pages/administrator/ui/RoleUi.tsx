import type React from "react";
import type { IconType } from "react-icons";
import { BsFillPersonVcardFill, BsFillRouterFill } from "react-icons/bs";
import { FaPlaneDeparture, FaWrench } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa6";
import { HiBuildingOffice2, HiComputerDesktop } from "react-icons/hi2";
import { RiComputerFill } from "react-icons/ri";
import { SiSpringsecurity } from "react-icons/si";


interface Props {
    role: string;
    number: number;
    department: string
    selected?: boolean;
    onClick?: () => void;
}



const departmentConfig: Record<string, { icon: IconType; color: string }> = {
    "ICTP": {
        icon: RiComputerFill,
        color: "text-primary"
    },
    "Airworthiness (AIR)": {
        icon: FaWrench,
        color: "text-purple-800"
    },
    "Aviation Security (AvSec)": {
        icon: SiSpringsecurity,
        color: "text-red-800"
    },
    "Air Navigation Services Safety Oversight (ANSSO)": {
        icon: BsFillRouterFill,
        color: "text-pink-800"
    },
    "Flight Operations (OPS)": {
        icon: FaPlaneDeparture,
        color: "text-orange-800"
    },
    "Finance and Administration": {
        icon: FaBriefcase,
        color: "text-purple-800"
    },
    "Aerodromes and Ground Aids (AGA)": {
        icon: HiBuildingOffice2,
        color: "text-green-800"
    },
    "Human Resources": {
        icon: BsFillPersonVcardFill,
        color: "text-yellow-800"
    },
};



const RoleUi:React.FC<Props> = ({ role, number, department, selected, onClick }) => {

    const departmentData = departmentConfig[department] || {
        icon: HiBuildingOffice2,
        color: "text-gray-500"
    };

    const Icon = departmentData.icon;

    return (
        <div onClick={onClick} className={`w-full ${selected ? "bg-primary/10 border border-primary" : ""} flex items-center rounded-md py-3 px-2 justify-between cursor-pointer hover:bg-primary/5`}>
            <div className="flex items-center gap-4 text-xs font-bold">
                <Icon className={`${departmentData.color} text-sm`} />
                <label>{role}</label>
            </div>
            <div className="rounded-full py-[1px] px-2 border border-secondary/70 text-xs font-bols">{number}</div>
        </div>
    );
}

export default RoleUi;