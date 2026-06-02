import { RiAddLargeLine } from "react-icons/ri";
import PrimaryButt from "../../ui/PrimaryButt";
import Menu from "./components/Menu";
import TopMenu from "./components/TopMenu";
import { useState } from "react";
import { FiDownload } from "react-icons/fi";




const assignment = [
    {
       employee: "Petrus Hamukwaya",
       department: "Air Navigation",
       training: "Dangerous Goods Handling",
       assigned: "2026-05-22",
       deadline: "2026-07-21",
       status: "Pending"
    },
    {
        employee: "Petrus Hamukwaya",
        department: "Air Navigation",
        training: "ICAO Aviation English Proficiency",
        assigned: "2026-05-22",
        deadline: "2026-07-21",
        status: "Completed"
     },
 ];




const MyTrainingHistory = () => {

   const [showMenu, setShowMenu] = useState(false);


    return (
       <div className="w-full min-h-screen flex">
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          <div className="w-full xl:w-[82%] min-h-screen text-secondary/80 bg-secondaryy">
             <TopMenu setShowMenu={setShowMenu} title="Training History" />
             <div className="w-full min-h-screen flex flex-col gap-3 py-6 px-2 md:px-6">
                  {/* Top Part  */}
                 <div className="w-full flex items-start justify-between">
                    <div className="flex flex-col">
                       <label className="text-lg">All Training Records</label>
                       <label className="text-xs text-secondary/60">2 records found</label>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="pr-3 border border-secondary/50 rounded-md">
                          <select className="py-2 text-sm flex px-3 focus:outline-none cursor-pointer">
                              <option>All Statuses</option>
                              <option>Completed</option>
                              <option>Pending</option>
                              <option>Overdue</option>
                          </select>
                       </div>
                       <PrimaryButt><FiDownload /> Export CSV</PrimaryButt>
                    </div>
                 </div>
                 {/* Training Records Table  */}
                 <table className="w-full mt-2 border text-xs border-secondary/30">
                       <thead>
                          <tr className="bg-secondary/10 border-b border-secondary/20">
                             <th className="text-left p-3">Employee</th>
                             <th className="text-left p-3">Department</th>
                             <th className="text-left p-3">Training</th>
                             <th className="text-left p-3">Assigned</th>
                             <th className="text-left p-3">Deadline</th>
                             <th className="text-left p-3">Status</th>
                          </tr>
                       </thead>
                       <tbody>

                        {assignment.map((assign, index) => (
                          <tr key={index} className="border-t border-secondary/20 bg-white/60">
                             <td className="px-3 py-3">{assign.employee}</td>
                             <td className="px-3 py-3">{assign.department}</td>
                             <td className="px-3 py-3">{assign.training}</td>
                             <td className="px-3 py-3">{assign.assigned}</td>
                             <td className="px-3 py-3">{assign.deadline}</td>
                             <td className="px-3 py-3">{assign.status}</td>
                          </tr>
                         ))}
                       </tbody>
                 </table>
             </div>
          </div>
       </div>
    );
}

export default MyTrainingHistory;