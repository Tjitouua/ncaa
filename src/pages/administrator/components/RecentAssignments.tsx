import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

 



const RecentAssignments = () => {





   const navigate = useNavigate();

   const [assignments, setAssignments] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      fetch("http://localhost/ncaa/assign/get_assignments.php")
      .then((response) => response.json())
      .then((data) => {
          if (data.success) {
             setAssignments(data.data);
          }
      })
      .catch((error) => {
          console.error("Error fetching Assignments: ", error);
      })
      .finally(() => {
          setLoading(false);
      });
   }, []);







    return (
       <div className="w-full md:w-[65%] py-6 flex flex-col min-h-[86vh] bg-white px-5 pb-8 shadow-sm shadow-secondary/30">
          <label className="font-bold text-lg">Recent Assignments</label>
          <label className="text-xs text-secondary/60">Latest Training assignments accross the organisation</label>

          {/* Employees Table  */}
          <table className="w-full mt-5 border text-xs border-secondary/30">
                       <thead>
                          <tr className="bg-secondary/10 border-b border-secondary/20">
                             <th className="text-left p-3">Employee</th>
                             <th className="text-left p-3">Training</th>
                             <th className="text-left p-3">Year</th>
                             <th className="text-left p-3">Quarter</th>
                             <th className="text-left p-3">Status</th>
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
                              <td colSpan={5} className="text-center py-15 text-secondary/60">
                                 No assignments available.
                              </td>
                           </tr>
                        ) : (
                        assignments.slice(0, 11).map((assign, index) => (
                          <tr key={assign.id} className="border-t border-secondary/20 bg-white/60">
                             <td className="px-3 py-3">{assign.first_name} {assign.last_name}</td>
                             <td className="px-3 py-3">{assign.training_name}</td>
                             <td className="px-3 py-3">{assign.year}</td>
                             <td className="px-3 py-3">{Number(assign.quarter) === 1 ? "First (1)" : Number(assign.quarter) === 2 ? "Second (2)" : Number(assign.quarter) === 3 ? "Third (3)" : Number(assign.quarter) === 4 ? "Fourth (4)" : ""}</td>
                             <td className="px-3 py-3">{assign.status}</td>
                          </tr>
                        ))
                       )}
                       </tbody>
                    </table>

       </div>
    );
} 

export default RecentAssignments;







// const assignment = [
//     {
//        employee: "Petrus Hamukwaya",
//        training: "Dangerous Goods Handling",
//        assigned: "2026-05-22",
//        deadline: "2026-07-21",
//        status: "Completed"
//     },
//     {
//         employee: "Johannes Kavela",
//         training: "Human Factors in Aviation",
//         assigned: "2026-04-22",
//         deadline: "2026-06-21",
//         status: "Completed"
//      },
//      {
//         employee: "Nangula Iitula",
//         training: "Aerodrome Inspection Procedures",
//         assigned: "2026-04-07",
//         deadline: "2026-06-06",
//         status: "Completed"
//      },
//      {
//         employee: "Tangeni Shipanga",
//         training: "Human Factors in Aviation",
//         assigned: "2026-03-28",
//         deadline: "2026-05-27",
//         status: "Completed"
//      },
//      {
//         employee: "Hilma Nambahu",
//         training: "Aviation Security (AVSEC)",
//         assigned: "2026-03-13",
//         deadline: "2026-05-12",
//         status: "Completed"
//      },
//      {
//         employee: "David Haufiku",
//         training: "ICAO Aviation English Proficiency",
//         assigned: "2026-02-26",
//         deadline: "2026-04-27",
//         status: "Completed"
//      },
//      {
//         employee: "Maria Nghipundjwa",
//         training: "Aerodrome Inspection Procedures",
//         assigned: "2026-02-11",
//         deadline: "2026-04-12",
//         status: "Completed"
//      },
//      {
//         employee: "Selma Amukwaya",
//         training: "Dangerous Goods Handling",
//         assigned: "2026-01-27",
//         deadline: "2026-03-28",
//         status: "Completed"
//      },
//  ]