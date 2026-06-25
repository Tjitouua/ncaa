import PrimaryButt from "../../ui/PrimaryButt";
import SecondaryButt from "../../ui/SecondaryButt";
import Menu from "./components/Menu";
import TopMenu from "./components/TopMenu";
import { useEffect, useState } from "react";

import { FiEye } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import { FiDownload } from "react-icons/fi";
import { GrCertificate } from "react-icons/gr";
import { useNavigate } from "react-router-dom";






const assignment = [
    {
       training: "Runway Safety & Incursion Prevention",
       certNo: "RWY-2024-077",
       issued: "2025-12-04",
       expires: "2026-05-18",
       status: "Valid",
       document: "icao_english_shipanga.pdf"
    },
 ]
 









const MyCertifications = () => {

   const [showMenu, setShowMenu] = useState(false);
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






    return (
       <div className="w-full min-h-screen flex">
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          <div className="w-full xl:w-[82%] min-h-screen text-secondary/80 bg-secondaryy">
             <TopMenu setShowMenu={setShowMenu} title="My Certifications" />
             <div className="w-full min-h-screen py-7 px-2 md:px-6 flex flex-col">
                 <label className="text-lg">Certificate Records</label>
                 <label className="text-xs text-secondary/40">2 active ● 0 expiring soon ● 0 expired</label>


                 {/* Certificates Table  */}
                 <table className="w-full mt-5 border text-xs border-secondary/30">
                       <thead>
                          <tr className="bg-secondary/10 border-b border-secondary/20">
                             <th className="text-left px-3 py-4">Training</th>
                             <th className="text-left px-3 py-4">Cert. No.</th>
                             <th className="text-left px-3 py-4">Issued</th>
                             <th className="text-left px-3 py-4">Expires</th>
                             <th className="text-left px-3 py-4">Status</th>
                             <th className="text-left px-3 py-4">Document</th>
                             <th className="text-center px-3 py-4">Action</th>
                          </tr>
                       </thead>
                       <tbody>

                        {loading ? (
                           <tr>
                              <td colSpan={7} className="py-5 text-center">Loading Certificates...</td>
                           </tr>
                        ): certificates.length === 0 ? (
                           <tr>
                              <td colSpan={7} className="py-5 text-center">No certificates found</td>
                           </tr>
                        ): (

                        certificates.map((certificate) => {
                           const status = getCertificateStatus(certificate.expiry_date);
                           return (
                          <tr key={certificate.id} className="border-t border-secondary/20 bg-white/60">
                             <td className="px-3 py-4">{certificate.training_name}</td>
                             <td className="px-3 py-4">{certificate.certificate_no}</td>
                             <td className="px-3 py-4">{certificate.issued_date}</td>
                             <td className="px-3 py-4 text-xs">{certificate.expiry_date}</td>
                             <td className="px-3 py-4"><div className={`py-1 px-2 rounded-sm font-bold inline-flex items-center justify-center gap-2 border ${status.className}`}>● {status.text}</div></td>
                             <td className="text-left px-3 py-4"><div className="flex items-center gap-2"><GrCertificate />{certificate.file?.split("_").pop()}</div></td>
                             <td className="px-3 py-4"><div className="font-bold text-lg flex items-center justify-center gap-6"><FiEye className="hover:text-primary cursor-pointer" /> <FiDownload className="hover:text-primary cursor-pointer" /></div></td>
                          </tr>
                          );
                          })
                         )}
                       </tbody>
                </table>


             </div>
          </div>
       </div>
    );
}

export default MyCertifications;