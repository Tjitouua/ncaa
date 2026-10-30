import StatCard from "../ui/StatCard";
import { FiUsers } from "react-icons/fi";
import { PiGraduationCap } from "react-icons/pi";
import { useEffect, useState } from "react";
import DepartmentsGraph from "../ui/DepartmentsGraph";
import DivisionsGraph from "../ui/DivisionsGraph";
import AAGraph from "../ui/AAGraph";
import FunctionGraph from "../ui/FunctionGraph";
import CategoryGraph from "../ui/CategoryGraph";
import QuarterGraph from "../ui/QuarterGraph";
import TrainingTypeGraph from "../ui/TrainingTypeGraph";
import MethodGraph from "../ui/MethodGraph";
import RegionGraph from "../ui/RegionGraph";
import CostsGraph from "../ui/CostsGraph";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { CgSandClock } from "react-icons/cg";
import { useNavigate } from "react-router-dom";



interface Dash {
    id: number;
    first_name: string;
    last_name: string;
    role: string;
    email: string;
    department: string;
    division: string;
    position: string;
}




const DashboardPart = () => {

   const [stats, setStats] = useState<any>(null);
   const navigate = useNavigate();
   const [user, setUser] = useState<Dash | null>(null);
   

    useEffect(() => {
        fetch("http://localhost/ncaa/dashboard/admin.php")
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setStats(data.stats);
            }
        });
    }, []);




    useEffect(() => {
        const checkSession = async () => {
            const res = await fetch("http://localhost/ncaa/login/session.php", {
                method: "POST",
                credentials: "include"
            });

            const data = await res.json();

            if (!data.success) {
                navigate("/");
            } else {
                setUser(data.user);
            }
        };

        checkSession();
    }, []);


    if (!user) return <div>Loading...</div>


    const displayRole = user.role === "admin"
          ? "Administrator"
          : user.role === "hr"
          ? "Human Resources"
          : user.role;



    const Stats = [
        {
            icon: FiUsers,
            name: "Employees",
            stat: stats?.employees ?? 0,
            desc: "Registered staff"
        },
        {
            icon: PiGraduationCap,
            name: "Trainings",
            stat: stats?.trainings ?? 0,
            desc: "Available programs"
        },
        // {
        //     icon: FiUsers,
        //     name: "Completed",
        //     stat: 160,
        //     desc: "Finished trainings"
        // },
        {
            icon: FaRegMoneyBillAlt,
            name: "Total Cost",
            stat: `N$ ${Number(stats?.total_cost ?? 0).toLocaleString("fr-FR", {
                   minimumFractionDigits: 2,
                   })}`,
            desc: "Overall training cost"
        },
        {
            icon: RxCross2,
            name: "Not Approved",
            stat: stats?.not_approved ?? 0,
            desc: "Training requests declined"
        },
        {
            icon: CgSandClock,
            name: "Pending",
            stat: stats?.pending ?? 0,
            desc: "Expiring or expired"
        },
    ]





     return (
        <div className="w-full min-h-screen text-secondary/90 px-2 md:px-6">
            {/* Welcome Div  */}
            <div className="flex flex-col mt-9 mb-1">
               <label className="font-bold text-xl">Welcome back, {displayRole}</label>
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
                <FunctionGraph />
                <DepartmentsGraph />
                <DivisionsGraph />
                <AAGraph />
                <CategoryGraph />
                <QuarterGraph />
                <TrainingTypeGraph />
                <MethodGraph />
                <RegionGraph />
                <CostsGraph />
            </div>
        </div>
     );
}

export default DashboardPart;