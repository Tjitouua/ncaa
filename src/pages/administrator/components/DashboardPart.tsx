import StatCard from "../ui/StatCard";
import { FiUsers } from "react-icons/fi";
import { PiGraduationCap } from "react-icons/pi";
import { MdOutlinePendingActions } from "react-icons/md";
import { TbFileCertificate } from "react-icons/tb";
import { MdOutlineWarningAmber } from "react-icons/md";
import ComplianceGraph from "../ui/ComplianceGraph";
import MonthsGraph from "../ui/MonthsGraph";
import CertificationGraph from "../ui/CertificationGraph";




const DashboardPart = () => {



    const Stats = [
        {
            icon: FiUsers,
            name: "Employees",
            stat: 240,
            desc: "Registered staff"
        },
        {
            icon: PiGraduationCap,
            name: "Trainings",
            stat: 14,
            desc: "Available programs"
        },
        // {
        //     icon: FiUsers,
        //     name: "Completed",
        //     stat: 160,
        //     desc: "Finished trainings"
        // },
        {
            icon: MdOutlinePendingActions,
            name: "Pending",
            stat: 150,
            desc: "Awaiting completion"
        },
        {
            icon: MdOutlineWarningAmber,
            name: "Overdue",
            stat: 6,
            desc: "Missed deadlines"
        },
        {
            icon: TbFileCertificate,
            name: "Certification Alerts",
            stat: 43,
            desc: "Expiring or expired"
        },
    ]





     return (
        <div className="w-full min-h-screen text-secondary/90 px-2 md:px-6">
            {/* Welcome Div  */}
            <div className="flex flex-col mt-9 mb-1">
               <label className="font-bold text-xl">Welcome back, Administrator</label>
               <label className="text-secondary/50 text-sm">Overview of NCAA staff training & completion</label>
            </div>
            {/* Stats Div  */}
            <div className="w-full grid py-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
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
            {/* Graphs Div  */}
            <div className="w-full py-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ComplianceGraph />
                <MonthsGraph />
                <CertificationGraph />
            </div>
        </div>
     );
}

export default DashboardPart;