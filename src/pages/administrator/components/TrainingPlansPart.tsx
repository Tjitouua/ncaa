import { IoMdAdd } from "react-icons/io";
import { RiAddLargeLine } from "react-icons/ri";
import { LuFilter, LuUpload } from "react-icons/lu";
import PrimaryButt from "../../../ui/PrimaryButt";
import SecondaryButt from "../../../ui/SecondaryButt";
import { IoSearchSharp } from "react-icons/io5";
import { LuDownload } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";




const TrainingPlansPart = () => {



   const navigate = useNavigate();
   const { id } = useParams();
   
   const [staff, setStaff] = useState([]);
   const[roles, setRoles] = useState([]);
   const [loading, setLoading] = useState(true);

   const [searchStaff, setSearchStaff] = useState("");
   const [showFilters, setShowFilters] = useState(false);

   const [trainings, setTrainings] = useState<any[]>([]);


   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

   const startYear = 2016;
   const currentYear = new Date().getFullYear();

   const years = Array.from(
      { length: currentYear - startYear + 1 },
      (_, i) => currentYear - i
   );



   useEffect(() => {
      fetch(`http://localhost/ncaa/program/get_program_by_staff_id.php?id=${id}&year=${selectedYear}`)
      .then((res) => res.json())
      .then((data) => {
         if (data.success) {
            console.log(data.data);
            setTrainings(data.data);
         } else {
            setTrainings([]);
         }
      })
      .catch(error => console.error(error))
      .finally(() => {
         setLoading(false);
      });
   }, [id, selectedYear]);



   const totalCost = trainings.reduce(
      (total, training) => total + Number(training.total_cost || 0), 0
   );









    return (
       <div onClick={() => {setShowFilters(false);}} className="w-full min-h-screen py-2 text-secondary/90 px-2 md:px-6">
          <div className="w-full h-screen py-5 flex flex-col gap-5">

             <div className="flex flex-col">
               {/* Top Part  */}
               <div className="flex items-center justify-between border-b border-secondary/30 pb-5">
                 <div className="flex flex-col">
                    <label className="text-lg">Training Plan for {selectedYear}</label>
                    <label className="text-xs text-secondary/60">Total: <span className="font-bold text-primary">N$ {totalCost.toLocaleString("fr-FR", {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(",", ".")}</span></label>
                 </div>
                 <div className="flex items-center gap-3">
                    <SecondaryButt>
                          <LuDownload />
                          Export
                      </SecondaryButt>
                    <PrimaryButt onClick={() => navigate(`/admin/training_programs/program_add/${id}`)}>
                       <RiAddLargeLine /> Add Training
                    </PrimaryButt>
                 </div>
               </div>
             </div>


             {/* Search Part  */}
             <div className="w-full flex items-center justify-between">
                      <div className="md:w-[40vh] border border-secondary/40 rounded-sm px-3 flex items-center bg-white/80">
                         <IoSearchSharp className="text-secondary/30" />
                         <input value={searchStaff} onChange={(e) => setSearchStaff(e.target.value)} type="text" className="py-2 w-full px-2 focus:outline-none focus:ring-0 text-sm" placeholder="Search training..." />
                      </div>


                      <div className="flex gap-3 items-end">
                          <SecondaryButt><LuFilter /> Filter</SecondaryButt>
                          <div className="flex flex-col gap-1">
                             <div className="rounded-md bg-secondaryy/30 border border-secondary/30 px-3">
                                <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full py-2 text-xs cursor-pointer focus:outline-none">
                                  {years.map((year) => (
                                    <option key={year} value={year}>{year}</option>
                                  ))}
                                </select>
                             </div>
                          </div>
                      </div>
             </div>

             {/* Employees Table  */}
             <table className="w-full border text-xs border-secondary/30">
                       <thead>
                          <tr className="bg-secondary/10 border-b border-secondary/20">
                             <th className="text-left p-3">Training Name</th>
                             <th className="text-left p-3">Development Gap</th>
                             <th className="text-left p-3">Category</th>
                             <th className="text-left p-3">Training Type</th>
                             <th className="text-left p-3">Provider</th>
                             {/* <th className="text-left p-3">Location</th> */}
                             <th className="text-left p-3">Total Cost (N$)</th>
                             <th className="text-center p-3">Actions</th>
                          </tr>
                       </thead>
                       <tbody>
                         {loading ? (
                            <tr>
                                <td colSpan={7} className="text-center py-15">
                                    <p>Loading trainings...</p>
                                </td>
                            </tr>
                         ) : trainings.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center py-15">
                                    <p>No trainings available...</p>
                                </td>
                            </tr>
                         ) : (
                          trainings.map((training) => (
                          <tr key={training.id} className="border-t border-secondary/20 bg-white/60">
                             <td className="px-3 py-2">{training.training_name}</td>
                             <td className="px-3 py-2">{training.reason}</td>
                             <td className="px-3 py-2">{training.category}</td>
                             <td className="px-3 py-2">{training.training_type}</td>
                             <td className="px-3 py-2">{training.provider}</td>
                             {/* <td className="px-3 py-2">{training.location}</td> */}
                             <td className="px-3 py-2">{Number(training.total_cost).toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                             })}</td>
                             <td className="px-3 py-2 text-center">
                                 <div className="flex items-center justify-center">
                                    <button 
                                    onClick={() => navigate(`/admin/training_programs/program_details/${training.id}`)}
                                     className="flex items-center gap-2 font-bold 
                                     rounded-sm py-2 px-3 cursor-pointer hover:text-white hover:bg-primary"><FiEye /></button>
                                     <button 
                                    //  onClick={() => handleDelete(employee.id)}
                                     className="flex items-center gap-2 font-bold 
                                     rounded-sm py-2 px-3 cursor-pointer hover:text-white hover:bg-primary"><RiDeleteBin6Line /></button>
                                 </div>
                             </td>
                          </tr>
                         ))
                         )}
                       </tbody>
                    </table>
               

          </div>
       </div>
    )
}


export default TrainingPlansPart;


