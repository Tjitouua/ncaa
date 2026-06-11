import PrimaryButt from "../../../ui/PrimaryButt";
import { IoSearchSharp } from "react-icons/io5";
import { LuDownload } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";





const TrainingHistoryPart = () => {

   const navigate = useNavigate();
   
  
   const [assignments, setAssignments] = useState([]);
   const [loading, setLoading] = useState(true);
   
   const getNextStatus = (current) => {
      if (current === "Pending") return "Completed";
      if (current === "Completed") return "Overdue";
      if (current === "Overdue") return "Pending";
      return "Pending";
   }


   const getStatusColor = (status) => {
      if (status === "Pending") return "bg-orange-200";
      if (status === "Completed") return "bg-green-200";
      if (status === "Overdue") return "bg-red-200";
      return "bg-grey-200";
   }

   
   

   useEffect(() => {
       fetch("http://localhost/ncaa/assign/get_assignments.php")
       .then((response) => response.json())
       .then((data) => {
          if (data.success) {
             setAssignments(data.data);
          }
       })
       .catch((error) => {
          console.error("Error fetching assignments", error);
       })
       .finally(() => {
           setLoading(false);
       });
   }, []);




   // Button 
   const cycleStatus = async (assign) => {
      
         const next = getNextStatus(assign.status);

         try {
            const res = await fetch ("http://localhost/ncaa/assign/update_assignment_status.php", {
               method: "POST",
               headers: {
                  "Content-Type": "application/json"
               },
               body: JSON.stringify({
                  id: assign.id,
                  status: next
               })
            });

            const data = await res.json();

            if (data.success) {
               setAssignments((prev) => 
                  prev.map((a) => 
                     a.id === assign.id ? { ...a, status: next } : a
                  )
               );
            } else {
               console.error(data.message);
            }
         } catch (error) {
            console.error("Error updating status: ", error);
         }
   }









    return (
       <div className="w-full min-h-screen py-2 text-secondary/90 px-2 md:px-6">
          <div className="w-full h-screen  py-5">

             <div className="flex flex-col">
               {/* Top Part  */}
               <div className="flex items-center justify-between border-b border-secondary/30 pb-5">
                 <div className="flex flex-col">
                    <label className="text-lg">Training Records</label>
                    <label className="text-xs text-secondary/60">12 records found</label>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="w-[20vh] rounded-md bg-white border border-secondary/30 px-3">
                      <select className="w-full py-2 text-xs cursor-pointer focus:outline-none">
                        <option>All status</option>
                        <option>Completed</option>
                        <option>Pending</option>
                        <option>Overdue</option>
                      </select>
                   </div>
                 </div>
               </div>
               {/* Names  */}
                <div className="w-full py-5 flex flex-col gap-5">
                    <div className="w-full flex items-center justify-between">
                      <div className="md:w-[40vh] border border-secondary/40 rounded-sm px-3 flex items-center bg-white/80">
                       <IoSearchSharp className="text-secondary/30" />
                       <input type="text" className="py-2 w-full px-2 focus:outline-none focus:ring-0 text-sm" placeholder="Search training..." />
                      </div>
                      <PrimaryButt>
                          <LuDownload />
                          Export CSV
                      </PrimaryButt>
                    </div>
                    {/* Employees Table  */}
                    <table className="w-full mt-1 border text-xs border-secondary/30">
                       <thead>
                          <tr className="bg-secondary/10 border-b border-secondary/20">
                             <th className="text-left p-3">Employee</th>
                             <th className="text-left p-3">Training</th>
                             <th className="text-left p-3">Duration</th>
                             <th className="text-left p-3">Assigned</th>
                             <th className="text-left p-3">Deadline</th>
                             <th className="text-left p-3">Status</th>
                             <th className="text-right p-3">Action</th>
                          </tr>
                       </thead>
                       <tbody>

                       {loading ? (
                          <tr>
                             <td colSpan={5} className="text-center py-5 text-secondary/60">
                                Loading assignments...
                             </td>
                          </tr>
                       ) : assignments.length === 0 ? (
                          <tr>
                             <td colSpan={5} className="text-center py-5 text-secondary/60">
                                No assignments available.
                             </td>
                          </tr>
                       ) : (     
                        assignments.map((assign, index) => (
                           // const effectiveStatus = getEffectiveStatus(assign);
                          <tr key = {index} className="border-t border-secondary/20 bg-white/60">
                             <td className="px-3 py-3">{assign.first_name} {assign.last_name}</td>
                             <td className="px-3 py-3">{assign.training_name}</td>
                             <td className="px-3 py-3">{assign.duration}</td>
                             <td className="px-3 py-3">{assign.date_assigned}</td>
                             <td className="px-3 py-3">{assign.deadline}</td>
                             <td className="px-3 py-3">
                                  <div className={`p-1 ${getStatusColor(assign.status)} rounded-xs font-bold flex items-center justify-center w-20`}>
                                    {assign.status}
                                  </div></td>
                             <td className="px-3 text-right py-3">
                                <button 
                                onClick={() => cycleStatus(assign)}
                                className="px-3 py-2 cursor-pointer border border-secondary/30 bg-white hover:bg-secondaryy 
                                text-xs font-bold rounded-md">Mark {getNextStatus(assign.status)}</button>
                             </td>
                          </tr>
                        ))
                        )}
                       
                       </tbody>
                    </table>
                    
                </div>
             </div>

          </div>
       </div>
    )
}


export default TrainingHistoryPart;













   
   // const assignments = [
   //    {
   //       employee: "Petrus Hamukwaya",
   //       duration: "2 weeks",
   //       training: "Dangerous Goods Handling",
   //       assigned: "2026-05-22",
   //       deadline: "2026-07-21",
   //       status: "Completed"
   //    },
   //    {
   //        employee: "Johannes Kavela",
   //        duration: "2 weeks",
   //        training: "Human Factors in Aviation",
   //        assigned: "2026-04-22",
   //        deadline: "2026-06-21",
   //        status: "Completed"
   //     },
   //     {
   //        employee: "Nangula Iitula",
   //        duration: "2 weeks",
   //        training: "Aerodrome Inspection Procedures",
   //        assigned: "2026-04-07",
   //        deadline: "2026-06-06",
   //        status: "Completed"
   //     },
   //     {
   //        employee: "Tangeni Shipanga",
   //        duration: "2 weeks",
   //        training: "Human Factors in Aviation",
   //        assigned: "2026-03-28",
   //        deadline: "2026-05-27",
   //        status: "Completed"
   //     },
   //     {
   //        employee: "Hilma Nambahu",
   //        duration: "2 weeks",
   //        training: "Aviation Security (AVSEC)",
   //        assigned: "2026-03-13",
   //        deadline: "2026-05-12",
   //        status: "Completed"
   //     },
   //     {
   //        employee: "David Haufiku",
   //        duration: "2 weeks",
   //        training: "ICAO Aviation English Proficiency",
   //        assigned: "2026-02-26",
   //        deadline: "2026-04-27",
   //        status: "Completed"
   //     },
   //     {
   //        employee: "Maria Nghipundjwa",
   //        duration: "2 weeks",
   //        training: "Aerodrome Inspection Procedures",
   //        assigned: "2026-02-11",
   //        deadline: "2026-04-12",
   //        status: "Completed"
   //     },
   //     {
   //        employee: "Selma Amukwaya",
   //        duration: "2 weeks",
   //        training: "Dangerous Goods Handling",
   //        assigned: "2026-01-27",
   //        deadline: "2026-03-28",
   //        status: "Completed"
   //     },
   // ]




// className="w-full border text-xs border-secondary/30 