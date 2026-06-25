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
import { useEffect, useState } from "react";





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






    const [user, setUser] = useState(null);
    const [certificates, setCertificates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
 
 
 
 
    useEffect(() => {
 
    const checkSession = async () => {
        const res = await fetch("http://localhost/ncaa/login/session.php", {
           method: "GET",
           credentials: "include"
        });
 
        const data = await res.json();
 
        if (!data.success) {
           navigate("/");
           return;
        }
 
        fetchCertificates(data.user.email);
    }
 
 
 
    const fetchCertificates = async (email) => {
        try {
           const response = await fetch(
             "http://localhost/ncaa/staff/my_certificates.php",
             {
                method: "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
             }
           );
 
           const data = await response.json();
 
           if (data.success) {
              setCertificates(data.data);
           }
        } catch (err) {
           console.error(err);
        } finally {
           setLoading(false);
        }
    };
 
 
    checkSession();
 
 
 
   }, []);
 
 
 
 
 
 
 
   const getCertificateStatus = (expiryDate: string) => {
       const today = new Date();
       const expiry = new Date(expiryDate);
 
       today.setHours(0, 0, 0, 0);
       expiry.setHours(0, 0, 0, 0);
 
       const diffTime = expiry.getTime() - today.getTime();
       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
 
       console.log("Expiry:", expiryDate, "Days left:", diffDays);
 
       if (diffDays < 0) {
          return {
             text: "Expired",
             className: "border-red-600 bg-red-600/30"
          };
       };
       
       if (diffDays <= 60) {
           return {
             text: "Expiring soon",
             className: "border-yellow-600 bg-yellow-600/30"
           };
       }
 
       return {
          text: "Valid",
          className: "border-green-600 bg-green-600/30"
       };
   };









    useEffect(() => {
        const checkSession = async () => {
            const res = await fetch("http://localhost/ncaa/login/session.php", {
                method: "GET",
                credentials: "include"
            });

            const data = await res.json();

            if(!data.success) {
                navigate("/");
            } else {
                setUser(data.user);
            }
        };

        checkSession();
    }, []);


    if (!user) return <div>Loading...</div>

    




    return (
        <div className="w-full min-h-screen text-secondary/90 px-2 md:px-6">
            {/* Welcome Div  */}
            <div className="flex flex-col mt-9 mb-1">
               <label className="font-bold text-xl">Welcome, {user.first_name} {user.last_name}</label>
               <label className="text-secondary/50 text-sm">{user.position} · {user.department}</label>
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
                {loading ? (
                    <div className="py-15 w-full flex items-center justify-center">
                        <label>Loading Certificates...</label>
                    </div>
                ): certificates.length === 0 ? (
                    <div className="py-15 w-full flex items-center justify-center">
                       <label>No certificates found</label>
                    </div>
                ): (
                    certificates.map((cert) => {
                        const status = getCertificateStatus(cert.expiry_date);
                          return (
                           <CertificationsCard
                                key = {cert.id}
                                training_name = {cert.training_name}
                                expiry_date = {cert.expiry_date}
                                certificate_no = {cert.certificate_no}
                                status = {status}
                           />
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default DashboardPart;




// const user = JSON.parse(localStorage.getItem("user") || "{}"); 