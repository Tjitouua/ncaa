import PrimaryButt from "../../ui/PrimaryButt";
import Menu from "./components/Menu";
import TopMenu from "./components/TopMenu";
import { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";







const MyTrainingHistory = () => {

   const [showMenu, setShowMenu] = useState(false);
   const [assignments, setAssignments] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);
   const navigate = useNavigate();
   const [email, setEmail] = useState("");
   const [selectedStatus, setSelectedStatus] = useState("All Statuses");





   const filteredAssignments = selectedStatus === "All Statuses"
         ? assignments
         : assignments.filter((assign) => assign.status === selectedStatus);



   


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
         };
   
         setEmail(data.user.email);
         fetchAssignments(data.user.email, selectedStatus);
      };






      const fetchAssignments = async (email: string, status: string) => {
            try {
            const response = await fetch(
               "http://localhost/ncaa/staff/my_assignments.php",
               {
                  method: "POST",
                  headers: {
                     "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ email, status }),
               }
            );

            const data = await response.json();

            if (data.success) {
               setAssignments(data.data);
            }

         } catch (err) {
            console.error(err);
         } finally {
            setLoading(false);
         }
      };
      

      checkSession();
        
   }, []);



   const getStatusColor = (status: string) => {
       if (status === "Pending") return "bg-orange-300";
       if (status === "Completed") return "bg-green-300";
       if (status === "Rejected") return "bg-red-200";
       return "bg-grey-200";
   };




   const handleExport = () => {
      window.open(
         `http://localhost/ncaa/staff/export_my_training_histrory.php?email=${encodeURIComponent(email)}&status=${encodeURIComponent(selectedStatus)}`,
         "_blank"
      );
   };








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
                       <label className="text-xs text-secondary/60">{assignments.length} records found</label>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="pr-3 border border-secondary/50 rounded-md">
                          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="py-2 text-sm flex px-3 focus:outline-none cursor-pointer">
                              <option>All Statuses</option>
                              <option>Completed</option>
                              <option>Pending</option>
                              <option>Rejected</option>
                          </select>
                       </div>
                       <PrimaryButt onClick={handleExport}><FiDownload /> Export CSV</PrimaryButt>
                    </div>
                 </div>
                 {/* Training Records Table  */}
                 <table className="w-full mt-2 border text-xs border-secondary/30">
                       <thead>
                          <tr className="bg-secondary/10 border-b border-secondary/20">
                             <th className="text-left p-3">Training</th>
                             <th className="text-left p-3">Development Gap</th>
                             <th className="text-left p-3">Provider</th>
                             <th className="text-left p-3">Year</th>
                             <th className="text-left p-3">Quarter</th>
                             <th className="text-left p-3">Region</th>
                             <th className="text-left p-3">Total Cost</th>
                             <th className="text-right p-3">Status</th>
                          </tr>
                       </thead>
                       <tbody>

                        {loading ? (
                           <tr>
                              <td colSpan={6} className="py-5 text-center">Loading assignments...</td>
                           </tr>
                        ) : filteredAssignments.length === 0 ? (
                           <tr>
                              <td colSpan={6} className="text-center py-5">No training assignments found</td>
                           </tr>
                        ) : (

                        filteredAssignments.map((assign) => (
                          <tr key={assign.id} onClick={() => navigate(`/staff/assignment_details/${assign.id}`)} className="border-t cursor-pointer hover:bg-white/20 border-secondary/20 bg-white/60">
                             <td className="px-3 py-3">{assign.training_name}</td>
                             <td className="px-3 py-3">{assign.reason}</td>
                             <td className="px-3 py-3">{assign.provider}</td>
                             <td className="px-3 py-3">{assign.year}</td>
                             <td className="px-3 py-3">{assign.quarter}</td>
                             <td className="px-3 py-3">{assign.region}</td>
                             <td className="px-3 py-3">{assign.total_cost}</td>
                             <td className="px-3 text-right py-3">
                                <div className={`w-fit px-3 py-1 ${getStatusColor(assign.status)} rounded-xs font-bold inline-flex items-center justify-center`}>
                                   {assign.status}
                                </div>
                              </td>
                          </tr>
                         ))
                         )}
                       </tbody>
                 </table>
             </div>
          </div>
       </div>
    );
}

export default MyTrainingHistory;




// const assignment = [
//    {
//       employee: "Petrus Hamukwaya",
//       department: "Air Navigation",
//       training: "Dangerous Goods Handling",
//       assigned: "2026-05-22",
//       deadline: "2026-07-21",
//       status: "Pending"
//    },
//    {
//        employee: "Petrus Hamukwaya",
//        department: "Air Navigation",
//        training: "ICAO Aviation English Proficiency",
//        assigned: "2026-05-22",
//        deadline: "2026-07-21",
//        status: "Completed"
//     },
// ];