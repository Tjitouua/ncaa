import React, { useEffect, useState } from "react";
import TopMenu from "./components/TopMenu";
import Menu from "./components/Menu";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import Inputs from "../../ui/Inputs";
import PrimaryButt from "../../ui/PrimaryButt";
import { RiAddLargeLine } from "react-icons/ri";
import SelectInputs from "../../ui/SelectInputs";
import DateInputs from "../../ui/DateInputs";




const EmployeeAdd = () => {

   const [showMenu, setShowMenu] = useState(false);
   const [loading, setLoading] = useState(false);

   const navigate = useNavigate();
   const [roles, setRoles] = useState([]);
   

   // Getting roles from the database 
   useEffect(() => {
      fetch("http://localhost/ncaa/roles/get_roles.php")
      .then((response) => response.json())
      .then((data) => {
         if (data.success) {
            setRoles(data.data);
         }
      })
      .catch((error) => {
         console.error("Error fetching roles: ", error);
      })
      .finally(() => {
         setLoading(false);
      });
   }, []);


   const [form, setForm] = useState({
      employeeId: "",
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      dob: "",
      nationalId: "",
      phoneNo: "",
      city: "",
      address: "",
      postal: "",
      role: "",
      department: "",
      employmentType: "",
      doj: "",
      employmentStatus: "",
   });



   const [errors, setErrors] = useState<any>({});

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value})
   };


   
   const validate = () => {
      const newErrors: any = {};

      Object.keys(form).forEach((key) => {
         if (!form[key as keyof typeof form]) {
            newErrors[key] = "This field is required";
         }
      });

      setErrors(newErrors);

      return Object.keys(newErrors).length === 0;
   };



   const handleSubmit = async () => {
      if (!validate()) return;

      setLoading(true);

      try {
         const response = await fetch(
            "http://localhost/ncaa/staff/add_staff.php",
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(form),
            }
         );

         const data = await response.json();

         if (data.success) {
            alert("Staff added successfully");
            navigate("/admin/employees")
            // console.log(data);
         } else {
            alert(data.message);
         }
      } catch (error) {
        console.error(error);
        alert("Failed to connect to server")
      } finally {
         setLoading(false);
      }



      // console.log("SEND TO DATABASE:", form);
   }



    return (
       <div className="w-full min-h-screen flex">
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          <div className="w-full xl:w-[82%] min-h-screen text-secondary/80 bg-secondaryy">
             <TopMenu setShowMenu={setShowMenu} title="Employees" />
             <div className="w-full min-h-screen flex flex-col gap-3 px-2 py-4 md:px-6">
                <label onClick={() => navigate("/admin/employees")}><IoArrowBack className="cursor-pointer hover:text-primary" /></label>



             {/* Form  */}
             <div className="w-full py-3 min-h-screen flex items-start justify-center">
                <div className="w-full md:w-5/6 flex flex-col bg-white shadow-md shadow-black/30">
                {/* <div className="w-full bg-secondaryy"><label onClick={() => navigate("/admin/employees")}><IoArrowBack className="cursor-pointer hover:text-primary" /></label></div> */}
                  {/* Top Part  */}
                   <div className="w-full py-5 px-5 bg-primaryy">
                      <div className="w-35 h-20 bg-[url('/images/ncaa-logo.png')] bg-center bg-cover"></div>
                   </div>
                   {/* Form (WHite Part) */}
                   <div className="bg-white flex flex-col py-5 pb-10 px-5">
                      <label className="font-bold">Add New Employee</label>
                      <label className="text-xs mb-3 text-secondary/40">Register a new employee in the system.</label>
                      <div className="w-full pb-7 py-2 gap-4 text-secondary/60 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                          <Inputs
                            label="Employee ID"
                            name="employeeId"
                            value={form.employeeId}
                            onChange={handleChange}
                            error={errors.employeeId}
                            placeholder="Enter the employee ID"
                          />

                          <Inputs
                            label="First Name"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            error={errors.firstName}
                            placeholder="Enter employee first name"
                          />

                          <Inputs
                            label="Last Name"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            error={errors.lastName}
                            placeholder="Enter employee last name"
                          />

                          <SelectInputs
                            label = "Gender"
                            name = "gender"
                            value = {form.gender}
                            onChange = {handleChange}
                            error = {errors.gender}
                          >
                            <option value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </SelectInputs>

                          <Inputs
                            label="Email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            error={errors.email}
                            placeholder="Enter employee email"
                          />

                          <DateInputs name="dob" value={form.dob} onChange={handleChange} error={errors.dob} label="DBO" />

                          <Inputs
                            label="National ID / Passport Number"
                            name="nationalId"
                            value={form.nationalId}
                            onChange={handleChange}
                            error={errors.nationalId}
                            placeholder="Enter National ID"
                          />

                          <Inputs
                            label="Phone Number"
                            name="phoneNo"
                            value={form.phoneNo}
                            onChange={handleChange}
                            error={errors.phoneNo}
                            placeholder="Enter Phone Number"
                          />

                          <Inputs
                            label="City"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            error={errors.city}
                            placeholder="Enter city"
                          />

                          <Inputs
                            label="Address"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            error={errors.address}
                            placeholder="Enter employee residential address"
                          />

                          <Inputs
                            label="Postal Address"
                            name="postal"
                            value={form.postal}
                            onChange={handleChange}
                            error={errors.postal}
                            placeholder="Enter postal address"
                          />

                          {/* <Inputs
                            label="Role"
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            error={errors.role}
                            placeholder="Enter employee role"
                          /> */}

                          <SelectInputs
                            label="Role"
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            error={errors.role}
                          >
                             <option value="">Select role</option>
                             {roles.map((role) => (
                              <option key={role.id} value={role.role}>{role.role}</option>
                             ))}
                          </SelectInputs>

                          <SelectInputs
                             label = "Department"
                             name = "department"
                            value = {form.department}
                            onChange = {handleChange}
                            error = {errors.department}
                          >
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
                          </SelectInputs>

                          <SelectInputs
                             label = "Employment type"
                             name = "employmentType"
                             value = {form.employmentType}
                             onChange = {handleChange}
                             error = {errors.employmentType}
                          >
                             <option value="">Select employment type</option>
                             <option value="Permanent">Permanent</option>
                             <option value="Temporary">Temporary</option>
                          </SelectInputs>

                          <DateInputs name="doj" value={form.doj} onChange={handleChange} error={errors.doj} label="Date of joining" />

                          <SelectInputs
                             label = "Employment status"
                             name = "employmentStatus"
                             value = {form.employmentStatus}
                             onChange = {handleChange}
                             error = {errors.employmentStatus}
                          >
                             <option value="">Select employment status</option>
                             <option value="Active">Active</option>
                             <option value="Inactive">Inactive</option>
                             <option value="Suspended">Suspended</option>
                          </SelectInputs>

                      </div>
                      <PrimaryButt 
                      disabled={loading} 
                      onClick={handleSubmit} 
                      className="w-full">
                        {loading ? "Adding Staff ..." : (
                          <><RiAddLargeLine /> Add Employee</>
                        )}
                      </PrimaryButt>
                   </div>
                </div>
             </div>

             </div>
          </div>
       </div>
    );
}

export default EmployeeAdd;




{/* <Inputs
                            label="Profile Pic"
                            placeholder="Enter employee profile pic"
                            error="Please enter employee profile pic"
                          /> */}