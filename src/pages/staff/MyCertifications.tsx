import PrimaryButt from "../../ui/PrimaryButt";
import SecondaryButt from "../../ui/SecondaryButt";
import Menu from "./components/Menu";
import TopMenu from "./components/TopMenu";
import { useState } from "react";

import { FiEye } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import { FiDownload } from "react-icons/fi";
import { GrCertificate } from "react-icons/gr";






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

                        {assignment.map((assign, index) => (
                          <tr key={index} className="border-t border-secondary/20 bg-white/60">
                             <td className="px-3 py-4">{assign.training}</td>
                             <td className="px-3 py-4">{assign.certNo}</td>
                             <td className="px-3 py-4">{assign.issued}</td>
                             <td className="px-3 py-4 text-xs">{assign.expires}</td>
                             <td className="px-3 py-4"><div className="py-1 px-2 rounded-sm font-bold inline-flex items-center justify-center gap-2 border border-green-600 bg-green-600/30">● {assign.status}</div></td>
                             <td className="text-left px-3 py-4"><div className="flex items-center gap-2"><GrCertificate />{assign.document}</div></td>
                             <td className="px-3 py-4"><div className="font-bold text-lg flex items-center justify-center gap-6"><FiEye className="hover:text-primary cursor-pointer" /> <FiDownload className="hover:text-primary cursor-pointer" /></div></td>
                          </tr>
                         ))}
                       </tbody>
                </table>


             </div>
          </div>
       </div>
    );
}

export default MyCertifications;