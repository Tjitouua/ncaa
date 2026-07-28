import { IoSearchSharp } from "react-icons/io5";
import RequirementUI from "./RequirementUI";
import type React from "react";
import { useEffect, useState } from "react";


interface Props {
    selectedRole: any;
}



const ComplianceRequirements: React.FC<Props> = ({ selectedRole }) => {


    const [requirements, setRequirements] = useState([]);
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchStaff, setSearchStaff] = useState("");

    useEffect(() => {
        if(!selectedRole) return;

        setLoading(true);

        setRequirements([]);

        fetch(`http://localhost/ncaa/roles/get_requirements.php?id=${selectedRole.id}`)
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                setRequirements(data.data);
            }
        })
        .catch(err => console.log(err))
        .finally(() => {
            setLoading(false);
        });
    }, [selectedRole]);




    useEffect(() => {
        if(!selectedRole) return;

        setLoading(true);

        setStaff([]);

        fetch(`http://localhost/ncaa/roles/get_role_compliance.php?id=${selectedRole.id}`)
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                setStaff(data.data);
            }
        })
        .catch(err => console.log(err))
        .finally(() => {
            setLoading(false);
        });
    }, [selectedRole]);




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
       <div className="w-full lg:w-[70%] h-[75vh] overflow-y-auto scrollbar-thin scrollbar-secondaryy/10 flex flex-col items-start gap-2 py-6 px-5 bg-white shadow-sm shadow-secondary/30">

          {/* Top Part  */}
          <div className="w-full flex items-center justify-between py-4 px-4 bg-white shadow-sm shadow-secondary/30">
              {/* Stats Part  */}
              <div className="flex flex-col gap-2">
                 <label className="font-bold text-primary">{selectedRole?.role || "Select a role"}</label>
                 <div className="flex items-center gap-3">
                   <div className="py-1 px-3 bg-red-100 flex items-3 gap-2 text-xs text-red-700">
                       <label>{requirements.filter(r => r.type === "Mandatory").length}</label>
                       <label>Mandatory</label>
                   </div>
                   <div className="py-1 px-3 bg-green-100 flex items-3 gap-2 text-xs text-green-700">
                       <label>{requirements.filter(r => r.type === "Recommended").length}</label>
                       <label>Recommended</label>
                   </div>
                   <div className="py-1 px-3 bg-secondary/10 flex items-3 gap-2 text-xs text-secondary/80">
                       <label>{selectedRole?.members}</label>
                       <label>Staff</label>
                   </div>
                </div>
              </div>
              {/* Search Part  */}
              <div className="flex items-center text-xs gap-2 border px-3 border-secondary/30 bg-secondaryy/30 rounded-md">
                      <IoSearchSharp />
                      <input value={searchStaff} onChange={(e) => setSearchStaff(e.target.value)} className="py-3 font-bold focus:outline-none placeholder:font-normal placeholder:text-xs" type="text" placeholder="Search staff..." />
              </div>
          </div>


          {/* Staff Part  */}
          <div className="w-full py-4 grid grid-cols-1 md:grid-cols-2 gap-5">
             {loading ? (
                <div className="w-full col-span-full py-20 flex items-center justify-center">
                   <label>Staff loading...</label>
                </div>
             ) : filteredStaff.length === 0 ? (
                <div className="w-full col-span-full py-20 flex items-center justify-center">
                  <label>No staff available...</label>
                </div>
             ) : ( filteredStaff.map((staff) => (
              <RequirementUI 
                 key={staff.id}
                 first_name={staff.first_name}
                 last_name={staff.last_name}
                 email={staff.email}
                 department={staff.department.length > 20 ? staff.department.substring(0, 20) + "..." : staff.department}
                 trainings={staff.trainings}
              />
             ))
             )}
          </div>

       </div>
    );
}


export default ComplianceRequirements;








// const staff = [
//     {
//         first_name: "Tjitouua",
//         last_name: "Mapoha",
//         email: "mapohaT@ncaa.na",
//         department: "ICTP"
//     },
//     {
//         first_name: "Nahas",
//         last_name: "Angula",
//         email: "nhangulaT@ncaa.na",
//         department: "Administration"
//     }
// ]