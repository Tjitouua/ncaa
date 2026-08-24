import { useNavigate, useParams } from "react-router-dom";
import Menu from "./components/Menu";
import TopMenu from "./components/TopMenu";
import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import PrimaryButt from "../../ui/PrimaryButt";
import { GrEdit } from "react-icons/gr";
import DetailsInput from "./ui/DetailsInput";
import SecondaryButt from "../../ui/SecondaryButt";
import DetailsSelect from "./ui/DetailsSelect";
import DetailsDate from "./ui/DetailsDate";




const EmployeeDetails = () => {

   const [showMenu, setShowMenu] = useState(false);

   const navigate = useNavigate();
   const { id } = useParams();


   const [employee, setEmployee] = useState<any>(null);
   const [trainings, setTrainings] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);


   useEffect(() => {
      fetch(`http://localhost/ncaa/staff/get_staff_by_id.php?id=${id}`)
      .then(res => res.json())
      .then(data => {
         if (data.success) {
             setEmployee(data.data);
         }
      });
   }, [id]);



   useEffect(() => {
      fetch(`http://localhost/ncaa/staff/get_trainings_by_staff_id.php?id=${id}`)
      .then(res => res.json())
      .then(data => {
         if (data.success) {
            setTrainings(data.data);
         } else {
            setTrainings([]);
         }
      })
      .catch((error) => {
         console.error("Error fetching trainings: ", error);
         setTrainings([]);
      })
      .finally(() => {
         setLoading(false);
      });
   }, [id]);



   const handleChange = (e: any) => {
       setEmployee({
         ...employee,
         [e.target.name]: e.target.value
       });
   };


   const handleUpdate = async () => {
      try {
         const res = await fetch("http://localhost/ncaa/staff/update_staff.php", {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
         });

         const data = await res.json();

         if (data.success) {
            alert("Staff updated successfully");
         } else {
            alert(data.message);
         }

      } catch (err) {
          alert("Server error");
      }
   };



   if (!employee) return <p className="p-5">Loading...</p>




   const getStatusColor = (status) => {
      if (status === "Pending") return "bg-orange-300";
      if (status === "Completed") return "bg-green-200";
      if (status === "Overdue") return "bg-red-200";
      return "bg-grey-200";
   }








  



    return (
       <div className="w-full min-h-screen flex">
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          <div className="w-full xl:w-[82%] min-h-screen text-secondary/80 bg-secondaryy">
             <TopMenu setShowMenu={setShowMenu} title="Employees" />
 
             <div className="w-full min-h-screen items-center flex flex-col gap-3 px-2 md:px-6 py-8">
                <div className="w-full"><label onClick={() => navigate("/admin/employees")}><IoArrowBack className="cursor-pointer hover:text-primary" /></label></div>
                {/* Employee Profile Div  */}
                <div className="w-4/5 min-h-screen flex flex-col gap-4 py-3">
                {/* <div className="w-full mb-2"><label onClick={() => navigate("/admin/employees")}><IoArrowBack className="cursor-pointer hover:text-primary" /></label></div> */}

                    {/* Top Part  */}
                    <div className="w-full py-3 px-7 flex gap-8 bg-white shadow-xs shadow-black/10  items-center">
                         <div className="rounded-full w-25 h-25 bg-secondaryy flex items-center justify-center text-4xl font-bold"><label>{employee.first_name.charAt(0).toUpperCase()}{employee.last_name.charAt(0).toUpperCase()}</label></div>
                         <div className="p-2 flex flex-col gap-1">
                             <label className="font-bold">{employee.first_name} {employee.last_name}</label>
                             <label className="text-secondary/50 -mt-1">{employee.role} · {employee.department}</label>
                             <label className="text-xs">{employee.email}</label>
                         </div>
                    </div>

                  {/* <div className="grid items-start grid-cols-1 md:grid-cols-2 gap-5"> */}
                    {/* Personal Information  */}
                    <div className="py-3 pb-1 px-7 bg-white shadow-xs shadow-black/10 ">
                        <div className="flex items-center justify-between pb-4 border-b border-secondary/40">
                           <label className="font-bold">Personal Information</label>
                           <PrimaryButt onClick={handleUpdate}>Edit <GrEdit /></PrimaryButt>
                        </div>
                        <div className="w-full py-2">
                           <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                              <DetailsInput label="Employee ID" name="staff_id" onChange={handleChange} value={employee.staff_id || ""}/>
                              <DetailsInput label="First Name" name="first_name" onChange={handleChange} value={employee.first_name || ""}/>
                              <DetailsInput label="Last Name" name="last_name" onChange={handleChange} value={employee.last_name || ""}/>
                              <DetailsSelect label="Gender" name="gender" onChange={handleChange} value={employee.gender || ""}>
                                  <option value="">Select Gender</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                              </DetailsSelect>
                              <DetailsInput label="Email Address" name="email" onChange={handleChange} value={employee.email || ""}/>
                              <DetailsDate label="DOB" name="dob" onChange={handleChange} value={employee.dob || ""}/>
                              <DetailsInput label="National ID" name="national_id" onChange={handleChange} value={employee.national_id || ""}/>
                              <DetailsInput label="Phone Number" name="phone_no" onChange={handleChange} value={employee.phone_no || ""}/>
                              <DetailsInput label="User Role" name="role" onChange={handleChange} value={employee.role || ""}/>
                              <DetailsSelect label="Department" name="department" onChange={handleChange} value={employee.department || ""}>
                                 <option value="">Select Department</option>
                                 <option value="Airworthiness (AIR)">Airworthiness (AIR)</option>
                                 <option value="Flight Operations (OPS)">Flight Operations (OPS)</option>
                                 <option value="Personnel Licensing (PEL)">Personnel Licensing (PEL)</option>
                                 <option value="Aerodromes and Ground Aids (AGA)">Aerodromes and Ground Aids (AGA)</option>
                                 <option value="Aviation Security (AvSec)">Aviation Security (AvSec)</option>
                                 <option value="Air Navigation Services Safety Oversight (ANSSO)">Air Navigation Services Safety Oversight (ANSSO)</option>
                                 <option value="Safety Promotion and Quality (SPG)">Safety Promotion and Quality (SPG)</option>
                                 <option value="Compliance and Regulatory Risk (CRR)">Compliance and Regulatory Risk (CRR)</option>
                                 <option value="Finance and Administration">Finance and Administration</option>
                                 <option value="Human Resources">Human Resources</option>
                                 <option value="Procurement">Procurement</option>
                                 <option value="Legal">Legal</option>
                                 <option value="ICTP">ICTP</option>
                              </DetailsSelect>
                              <DetailsSelect label="Employment Type" name="employment_type" onChange={handleChange} value={employee.employment_type || ""}>
                                  <option value="">Select employment type</option>
                                  <option value="Permanent">Permanent</option>
                                  <option value="Temporary">Temporary</option>
                              </DetailsSelect>
                              <DetailsDate label="Date of Joining" name="doj" onChange={handleChange} value={employee.doj || ""}/>
                              <DetailsSelect label="Employment Status" name="employment_status" onChange={handleChange} value={employee.employment_status || ""}>
                                  <option value="">Select employment status</option>
                                  <option value="Active">Active</option>
                                  <option value="Inactive">Inactive</option>
                                  <option value="Suspended">Suspended</option>
                              </DetailsSelect>
                              <DetailsInput label="City" name="city" onChange={handleChange} value={employee.city || ""}/>
                              <DetailsSelect label="Disadvantaged" name="disadvantaged" onChange={handleChange} value={employee.disadvantaged || ""}>
                                  <option value="">Disadvantaged</option>
                                  <option value="Yes">Yes</option>
                                  <option value="No">No</option>
                              </DetailsSelect>
                              <DetailsSelect label="Disability" name="disability" onChange={handleChange} value={employee.disability || ""}>
                                  <option value="">Disability</option>
                                  <option value="Yes">Yes</option>
                                  <option value="No">No</option>
                              </DetailsSelect>
                           </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                    {/* Address  */}
                    {/* <div className="py-3 pb-1 px-7 bg-white shadow-xs shadow-black/10 ">
                        <div className="flex items-center justify-between pb-4 border-b border-secondary/40">
                           <label className="font-bold">Address</label>
                           <SecondaryButt onClick={handleUpdate} className="!bg-secondary/30">Edit <GrEdit /></SecondaryButt>
                        </div>
                        <div className="w-full py-2">
                           <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                              <DetailsInput label="City" name="city" onChange={handleChange} value={employee.city || ""}/>
                              <DetailsInput label="Address" name="address" onChange={handleChange} value={employee.address || ""}/>
                              <DetailsInput label="Postal Code" name="postal_address" onChange={handleChange} value={employee.postal_address || ""}/>
                           </div>
                        </div>
                    </div> */}
                    {/* Training History  */}
                    <div className="w-full py-3 pb-5 px-7 bg-white shadow-xs shadow-black/10 ">
                        <div className="flex items-center justify-between pb-4 border-b border-secondary/40">
                           <label className="font-bold">Training Plan</label>
                           <div className="rounded-md bg-secondaryy/30 border border-secondary/30 px-3">
                             <select  className="w-full py-2 text-xs cursor-pointer focus:outline-none">
                                <option value="">2026</option>
                                <option>2016</option>
                                <option>2017</option>
                                <option>2018</option>
                                <option>2019</option>
                                <option>2020</option>
                                <option>2021</option>
                                <option>2022</option>
                                <option>2023</option>
                                <option>2024</option>
                                <option>2025</option>
                             </select>
                           </div>
                           {/* <SecondaryButt className="!bg-secondary/30">Edit <GrEdit /></SecondaryButt> */}
                        </div>
                        <div className="w-full flex flex-col gap-2 py-1">
                           {loading ? (
                              <div className="w-full flex items-center justify-center py-7 text-secondary/60">
                                  <label>Loading trainings...</label>
                              </div>
                           ) : trainings.length === 0 ? (
                              <div className="w-full flex items-center justify-center py-7 text-secondary/60">
                                 <label>No trainings found</label>
                              </div>
                           ) : (
                            trainings.map((training) => (
                            <div key={training.id} onClick={() => navigate(`/admin/training_details/${training.id}`)} className="w-full text-secondary/60 py-2 flex items-center justify-between cursor-pointer hover:px-2 hover:bg-secondaryy">
                                <label className="text-xs font-bold">{training.training_name}</label>
                                <div className={`py-2 flex items-center justify-center px-3 ${getStatusColor(training.status)} text-secondary font-bold rounded-md`}>
                                    <label className="text-xs">{training.status}</label>
                                </div>
                            </div>
                            ))
                            )}
                        </div>
                    </div>
                   {/* </div> */}
                  </div>
                </div>

             </div>


          </div>
       </div>
    );
}

export default EmployeeDetails;


// bg-[url('/images/spillo.jpg')] bg-center bg-cover 




{/* <img src="/images/spillo.jpg" className="w-full h-full" />  */}
// shadow-xs shadow-black/30 