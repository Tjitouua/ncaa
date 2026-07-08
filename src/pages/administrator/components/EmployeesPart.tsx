import { IoMdAdd } from "react-icons/io";
import { RiAddLargeLine } from "react-icons/ri";
import { LuUpload } from "react-icons/lu";
import PrimaryButt from "../../../ui/PrimaryButt";
import SecondaryButt from "../../../ui/SecondaryButt";
import { IoSearchSharp } from "react-icons/io5";
import { LuDownload } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";




const EmployeesPart = () => {



   const navigate = useNavigate();
   
   const [staff, setStaff] = useState([]);
   const [loading, setLoading] = useState(true);

   const [searchStaff, setSearchStaff] = useState("");


   useEffect(() => {
      fetch("http://localhost/ncaa/staff/get_staff.php")
      .then((response) => response.json())
      .then((data) => {
         if(data.success) {
            setStaff(data.data);
         }
      })
      .catch((error) => {
         console.error("Error fetching Staff: ", error);
      })
      .finally(() => {
         setLoading(false);
      });
   }, []);




   

   // Delete 
   const handleDelete = (id) => {
       if (!window.confirm("Are you sure you want to delete this staff?")) return;

       fetch("http://localhost/ncaa/staff/delete_staff.php", {
          method: "POST",
          headers: {
             "Content-Type": "application/json"
          },
          body: JSON.stringify({ id }),
       })
        .then((res) => res.json())
        .then((data) => {
           if (data.success) {
             setStaff((prev) => prev.filter((emp) => emp.id !== id));
           } else {
              alert(data.message || "Failed to delete");
           }
        })
        .catch((err) => {
            console.error("Delete error", err);
        }); 
   };




   // Exporting 
   const handleExport = () => {
       window.open(
          "http://localhost/ncaa/staff/export_staff.php"
       );
   };





   // Filtering (Searching) 
   const filteredStaff = staff.filter((employee) => {
       const search = searchStaff.toLowerCase().trim();

       return (
          employee.staff_id?.toLowerCase().includes(search) ||
          employee.first_name?.toLowerCase().includes(search) ||
          employee.last_name?.toLowerCase().includes(search) ||
          employee.gender?.toLowerCase().includes(search) ||
          employee.email?.toLowerCase().includes(search) ||
          employee.dob?.toLowerCase().includes(search) ||
          employee.national_id?.toLowerCase().includes(search) ||
          employee.phone_no?.toLowerCase().includes(search) ||
          employee.city?.toLowerCase().includes(search) ||
          employee.address?.toLowerCase().includes(search) ||
          employee.postal_address?.toLowerCase().includes(search) ||
          employee.department?.toLowerCase().includes(search) ||
          employee.role?.toLowerCase().includes(search) ||
          employee.employment_type?.toLowerCase().includes(search) ||
          employee.doj?.toLowerCase().includes(search) ||
          employee.employment_status?.toLowerCase().includes(search) ||
          `${employee.first_name} ${employee.last_name}`.toLowerCase().includes(search)
       );
   });




    return (
       <div className="w-full min-h-screen py-2 text-secondary/90 px-2 md:px-6">
          <div className="w-full h-screen  py-5">

             <div className="flex flex-col">
               {/* Top Part  */}
               <div className="flex items-center justify-between border-b border-secondary/30 pb-5">
                 <div className="flex flex-col">
                    <label className="text-lg">Staff Directory</label>
                    <label className="text-xs text-secondary/60">{filteredStaff.length} employee (s) registered</label>
                 </div>
                 <div className="flex items-center gap-3">
                    <SecondaryButt onClick={handleExport}>
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
                       <input value={searchStaff} onChange={(e) => setSearchStaff(e.target.value)} type="text" className="py-2 w-full px-2 focus:outline-none focus:ring-0 text-sm" placeholder="Search staff..." />
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
                             <th className="text-center p-3">Actions</th>
                          </tr>
                       </thead>
                       <tbody>
                       {loading ? (
                           <tr>
                              <td colSpan={6} className="text-center py-15 text-secondary/60">
                                 <p>Loading staff...</p>
                              </td>
                           </tr>
                       ) : filteredStaff.length === 0 ? (
                             <tr>
                                <td colSpan={6} className="text-center py-15 text-secondary/60">
                                   No employees available.
                                </td>
                             </tr>
                       ) : (
                        filteredStaff.map((employee, index) => (
                          <tr key={employee.id} className="border-t border-secondary/20 bg-white/60">
                             <td className="px-3 py-2">{employee.staff_id}</td>
                             <td className="px-3 py-2">{employee.first_name} {employee.last_name}</td>
                             <td className="px-3 py-2">{employee.email}</td>
                             <td className="px-3 py-2">{employee.department}</td>
                             <td className="px-3 py-2">{employee.role}</td>
                             <td className="px-3 py-2 text-center">
                                 <div className="flex items-center justify-center">
                                    <button 
                                     onClick={() => navigate(`/admin/employees/employee_details/${employee.id}`)}
                                     className="flex items-center gap-2 font-bold 
                                     rounded-sm py-2 px-3 cursor-pointer hover:text-white hover:bg-primary"><FiEye /></button>
                                     <button 
                                     onClick={() => handleDelete(employee.id)}
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

          </div>
       </div>
    )
}


export default EmployeesPart;
















// const employees = [
//    {
//       id: "EMP-001",
//       name: "Titouua Mapoha",
//       email: "t.mapoha@ncaa.na",
//       department: "ICT",
//       position: "Software Developer"
//    },
//    {
//       id: "EMP-002",
//       name: "Tangeni Shipanga",
//       email: "t.shipanga@ncaa.na",
//       department: "Air Navigation",
//       position: "Senior Controller"
//    },
//    {
//       id: "EMP-003",
//       name: "Nangula Iitula",
//       email: "n.iitula@ncaa.na",
//       department: "Safety & Security",
//       position: "Safety Inspector"
//    },
//    {
//       id: "EMP-004",
//       name: "Petrus Hamukwaya",
//       email: "p.hamukwaya@ncaa.na",
//       department: "Aerodromes",
//       position: "Aerodrome Officer"
//    },
//    {
//       id: "EMP-005",
//       name: "Selma Amukwaya",
//       email: "s.amukwaya@ncaa.na",
//       department: "Air Navigation",
//       position: "ATC Trainee"
//    },
//    {
//       id: "EMP-006",
//       name: "Johannes Kavela",
//       email: "j.kavela@ncaa.na",
//       department: "Flight Operations",
//       position: "Operations Officer"
//    },
//    {
//       id: "EMP-007",
//       name: "Maria Nghipundjwa",
//       email: "m.nghipundjwa@ncaa.na",
//       department: "Safety & Security",
//       position: "Security Lead"
//    },
//    {
//       id: "EMP-008",
//       name: "David Haufiku",
//       email: "d.haufiku@ncaa.na",
//       department: "Engineering",
//       position: "Avionics Engineer"
//    },
//    {
//       id: "EMP-009",
//       name: "Hilma Nambahu",
//       email: "d.haufiku@ncaa.na",
//       department: "Administration",
//       position: "HR Officer"
//    },
// ]
