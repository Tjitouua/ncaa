import { IoSearchSharp } from "react-icons/io5";
import { HiComputerDesktop } from "react-icons/hi2";
import { RiComputerFill } from "react-icons/ri";
import RoleUi from "./RoleUi";
import React, { useEffect, useState } from "react";



// interface Props {
//     selectedRole: any;
//     setSelectedRole: React.Dispatch<React.SetStateAction<any>>;
// }



const ComplianceRoles = () => {

    // const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchRole, setSearchRole] = useState("");


    // const [selectedRole, setSelectedRole] = useState<number>(0);




    const roles = [
        {
            role: "Software Developer",
            number: 5,
            department: "ICTP"
        },
        {
            role: "Senior Controller",
            number: 3,
            department: "Air Navigation"
        },
        {
            role: "Safety Inspector",
            number: 2,
            department: "Safety & Security"
        },
        {
            role: "Aerodrome Office",
            number: 6,
            department: "Aerodromes"
        },
        {
            role: "Operations Officer",
            number: 3,
            department: "Flight Operations"
        },
        {
            role: "Avionics Engineer",
            number: 6,
            department: "Engineering"
        },
        {
            role: "HR Officer",
            number: 1,
            department: "Administration"
        },
        {
            role: "Secure Lead",
            number: 7,
            department: "Safety & Security"
        },
    ];







    return (
        <div className="w-full lg:w-[30%] h-[75vh] flex flex-col gap-4 items-center py-6 px-5 bg-white shadow-sm shadow-secondary/30">
            {/* Top Part  */}
            <div className="w-full flex items-center text-secondary/80 font-bold text-sm justify-between">
                <label>1. Select Role</label>
                <label className="text-secondary/50 font-semibold">4 Roles</label>
            </div>
            {/* Search  */}
            <div className="w-full flex items-center text-xs gap-2 border px-3 border-secondary/30 bg-secondaryy/30 rounded-md">
                      <IoSearchSharp />
                      <input value={searchRole} onChange={(e) => setSearchRole(e.target.value)} className="py-3 w-full font-bold focus:outline-none placeholder:font-normal placeholder:text-xs" type="text" placeholder="Search roles or staff..." />
            </div>
            {/* Roles  */}
            <div className="w-full flex flex-col">
                
                {roles.map((role, index) => (
                 <RoleUi 
                    key = {index}
                    role = {role.role}
                    number = {role.number}
                    department = {role.department}
                 />
                ))}
            </div>
        </div>
    );
}

export default ComplianceRoles;













