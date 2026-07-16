import { FiUsers } from "react-icons/fi";
import type StaffCompliance from "../StaffCompliance"
import { PiCertificateBold, PiGraduationCap } from "react-icons/pi";
import { MdOutlinePendingActions, MdOutlineWarningAmber } from "react-icons/md";
import { TbFileCertificate } from "react-icons/tb";
import StatCard from "../ui/StatCard";
import { BsFileEarmarkCheck } from "react-icons/bs";
import { IoAlarmOutline } from "react-icons/io5";
import { FaRegFileAlt } from "react-icons/fa";
import ComplianceRoles from "../ui/ComplianceRoles";
import ComplianceRequirements from "../ui/ComplianceRequirements";





const StaffCompliancePart = () => {




    
    const Stats = [
        {
            icon: BsFileEarmarkCheck,
            name: "Compliance rate",
            stat: 240,
            desc: "Training currently underway"
        },
        {
            icon: IoAlarmOutline,
            name: "Expired trainings",
            stat: 14,
            desc: "Require timely attention"
        },
        {
            icon: FaRegFileAlt,
            name: "Active assignments",
            stat: 150,
            desc: "Training currently underway"
        },
        {
            icon: PiCertificateBold,
            name: "Valid certificates",
            stat: 6,
            desc: "Verified employee certifications"
        },
    ]





    return (
       <div className="w-full min-h-screen py-2 text-secondary/90 px-2 md:px-6">
           <div className="w-full flex flex-col py-5 gap-2">

               {/* Top Part  */}
               <div className="w-full flex flex-col">
                    <label className="text-lg">Staff Compliance</label>
                    <label className="text-xs text-secondary/60">Pick a role on the left, then track each member's progress on the right.</label>
               </div>

               {/* Stats Part  */}
               <div className="w-full grid py-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {Stats.map((stat, index) => (
                 <StatCard
                   key = {index}
                   icon = {stat.icon}
                   name = {stat.name}
                   stat = {stat.stat}
                   desc = {stat.desc}
                 />
                ))}
               </div>

               {/* Main Part  */}
               <div className="w-full min-h-screen flex flex-col lg:flex-row items-start justify-between gap-5">
                 <ComplianceRoles />
                 <ComplianceRequirements />
               </div>
               
           </div>
       </div>
    );
}

export default StaffCompliancePart;