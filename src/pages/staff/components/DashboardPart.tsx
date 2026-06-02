import { FiUsers } from "react-icons/fi";
import { MdOutlinePendingActions, MdOutlineWarningAmber } from "react-icons/md";
import { PiGraduationCap } from "react-icons/pi";
import StatCard from "../ui/StatCard";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { AiOutlineClockCircle } from "react-icons/ai";
import { TbFileCertificate } from "react-icons/tb";
import { BsFileEarmarkCheck } from "react-icons/bs";
import { GrCertificate } from "react-icons/gr";
import PrimaryButt from "../../../ui/PrimaryButt";
import { IoSettingsOutline } from "react-icons/io5";
import SecondaryButt from "../../../ui/SecondaryButt";
import CertificationsCard from "../ui/CertificationsCard";
import { useNavigate } from "react-router-dom";





const DashboardPart = () => {


    const Stats = [
        {
            icon: PiGraduationCap,
            name: "My Trainings",
            stat: 2,
            desc: "Assigned to me"
        },
        {
            icon: FaRegCircleCheck,
            name: "Completed",
            stat: 1,
            desc: "Available programs"
        },
        {
            icon: AiOutlineClockCircle,
            name: "Pending",
            stat: 1,
            desc: "Awaiting completion"
        },
        {
            icon: TbFileCertificate,
            name: "Certification Alerts",
            stat: 0,
            desc: "Missed deadlines"
        }
    ];


    const navigate = useNavigate();




    return (
        <div className="w-full min-h-screen text-secondary/90 px-2 md:px-6">
            {/* Welcome Div  */}
            <div className="flex flex-col mt-9 mb-1">
               <label className="font-bold text-xl">Welcome, Tjitouua Mapoha</label>
               <label className="text-secondary/50 text-sm">Software Developer · ICT</label>
            </div>
            {/* Stats Div  */}
            <div className="w-full grid py-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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
            {/* My Certifications  */}
            <div className="w-full py-5 px-4 flex flex-col bg-white mt-5 shadow-xs shadow-secondary/20">
                <div className="w-full flex items-center mb-4 justify-between">
                   <label className="font-bold text-lg flex items-center gap-3"><GrCertificate /> My Certifications</label>
                   <SecondaryButt onClick={() => navigate("/staff/my_certifications")} className="shadow-xs shadow-secondary/40"><IoSettingsOutline /> Manage</SecondaryButt>
                </div>
                {/* Certifications card  */}
                <CertificationsCard />
                <CertificationsCard />
            </div>
        </div>
    );
}

export default DashboardPart;