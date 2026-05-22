import { IoMdAdd } from "react-icons/io";
import { RiAddLargeLine } from "react-icons/ri";
import { LuUpload } from "react-icons/lu";
import PrimaryButt from "../../../ui/PrimaryButt";
import SecondaryButt from "../../../ui/SecondaryButt";
import { IoSearchSharp } from "react-icons/io5";
import { LuDownload } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";



const employees = [
   {
      id: "EMP-001",
      name: "Tangeni Shipanga",
      email: "t.shipanga@ncaa.na",
      department: "Air Navigation",
      position: "Senior Controller"
   },
   {
      id: "EMP-002",
      name: "Nangula Iitula",
      email: "n.iitula@ncaa.na",
      department: "Safety & Security",
      position: "Safety Inspector"
   },
   {
      id: "EMP-003",
      name: "Petrus Hamukwaya",
      email: "p.hamukwaya@ncaa.na",
      department: "Aerodromes",
      position: "Aerodrome Officer"
   },
   {
      id: "EMP-004",
      name: "Selma Amukwaya",
      email: "s.amukwaya@ncaa.na",
      department: "Air Navigation",
      position: "ATC Trainee"
   },
   {
      id: "EMP-005",
      name: "Johannes Kavela",
      email: "j.kavela@ncaa.na",
      department: "Flight Operations",
      position: "Operations Officer"
   },
   {
      id: "EMP-006",
      name: "Maria Nghipundjwa",
      email: "m.nghipundjwa@ncaa.na",
      department: "Safety & Security",
      position: "Security Lead"
   },
   {
      id: "EMP-007",
      name: "David Haufiku",
      email: "d.haufiku@ncaa.na",
      department: "Engineering",
      position: "Avionics Engineer"
   },
   {
      id: "EMP-008",
      name: "Hilma Nambahu",
      email: "d.haufiku@ncaa.na",
      department: "Administration",
      position: "HR Officer"
   },
]




const EmployeesPart = () => {



   const navigate = useNavigate();




    return (
       <div className="w-full min-h-screen py-2 text-secondary/90 px-2 md:px-6">
          <div className="w-full h-screen  py-5">

             <div className="flex flex-col">
               {/* Top Part  */}
               <div className="flex items-center justify-between border-b border-secondary/30 pb-5">
                 <div className="flex flex-col">
                    <label className="text-lg">Staff Directory</label>
                    <label className="text-xs text-secondary/60">7 employees registered</label>
                 </div>
                 <div className="flex items-center gap-3">
                    <SecondaryButt>
                          <LuDownload />
                          Export
                      </SecondaryButt>
                    <PrimaryButt onClick={() => navigate("/admin/employees/employee_add")}>
                       <RiAddLargeLine /> Add Employee
                    </PrimaryButt>
                 </div>
               </div>
               {/* Names  */}
                <div className="w-full py-5 flex flex-col gap-5">
                    <div className="w-full flex items-center justify-between">
                      <div className="md:w-[40vh] border border-secondary/40 rounded-sm px-3 flex items-center bg-white/80">
                       <IoSearchSharp className="text-secondary/30" />
                       <input type="text" className="py-2 w-full px-2 focus:outline-none focus:ring-0 text-sm" placeholder="Search staff..." />
                      </div>
                      <SecondaryButt>
                        <LuUpload /> Import CSV
                      </SecondaryButt>
                    </div>
                    {/* Employees Table  */}
                    <table className="w-full border text-xs border-secondary/30">
                       <thead>
                          <tr className="bg-secondary/10 border-b border-secondary/20">
                             <th className="text-left p-3">Employee ID</th>
                             <th className="text-left p-3">Full Name</th>
                             <th className="text-left p-3">Email</th>
                             <th className="text-left p-3">Department</th>
                             <th className="text-left p-3">Position</th>
                             <th className="text-left p-3">Actions</th>
                          </tr>
                       </thead>
                       <tbody>

                        {employees.map((employee, index) => (
                          <tr key={index} className="border-t border-secondary/20 bg-white/60">
                             <td className="px-3 py-2">{employee.id}</td>
                             <td className="px-3 py-2">{employee.name}</td>
                             <td className="px-3 py-2">{employee.email}</td>
                             <td className="px-3 py-2">{employee.department}</td>
                             <td className="px-3 py-2">{employee.position}</td>
                             <td className="px-3 py-2"><button 
                                                        onClick={() => navigate("/admin/employees/employee_details")}
                                                        className="flex items-center gap-2 font-bold 
                                                        rounded-sm py-2 px-3 cursor-pointer hover:text-white hover:bg-primary"><FiEye /> View</button></td>
                          </tr>
                         ))}
                       </tbody>
                    </table>
                </div>
             </div>

          </div>
       </div>
    )
}


export default EmployeesPart;