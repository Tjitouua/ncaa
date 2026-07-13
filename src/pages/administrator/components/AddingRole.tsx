import { ImCross } from "react-icons/im";
import Inputs from "../../../ui/Inputs";
import PrimaryButt from "../../../ui/PrimaryButt";
import { RiAddLargeLine } from "react-icons/ri";
import SelectInputs from "../../../ui/SelectInputs";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";




interface Props {
    setShowAddRole: React.Dispatch<React.SetStateAction<boolean>>;
}





const AddingRole: React.FC<Props> = ({ setShowAddRole }) => {


  const navigate = useNavigate();


  const [form, setForm] = useState({
     department: "",
     role: "",
     desc: "",
     status: ""
  });


  const [errors, setErrors] = useState<any>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

     try {
       const response = await fetch(
        "http://localhost/ncaa/roles/add_role.php",
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
          alert("Role added successfully");
          setShowAddRole(false);
          window.location.reload();
       } else {
          alert(data.message);
       }
     } catch (error) {
       console.error(error);
       alert("Failed to connect to server");
     }
  }


    



    return (
        <div onClick={() => setShowAddRole(false)} className="w-full h-[90vh] px-15 overflow-y-auto pb-30 backdrop-blur-sm bg-black/70 flex flex-col items-end z-20 gap-5 fixed py-5 left-7">
            <div className="w-1/2 lg:w-3/4 font-extrabold text-white flex justify-end"><ImCross onClick={() => setShowAddRole(false)} className="cursor-pointer hover:text-secondaryy" /></div>

            <div className="w-full flex justify-center mt-5">
            <div onClick={(e) => e.stopPropagation()} className="w-full md:w-4/6 lg:w-1/4 bg-white flex lg:ml-10 flex-col">
                {/* Top part  */}
                <div className="p-5 bg-primaryy w-full">
                   <div className="w-35 h-20 bg-[url('/images/ncaa-logo.png')] bg-center bg-cover"></div>
                </div>
                {/* Form  */}
                <div className="p-5 pb-8 bg-white flex flex-col gap-3">
                    <Inputs 
                      label = "Role"
                      name = "role"
                      value = {form.role}
                      onChange={handleChange}
                      error = {errors.role}
                      placeholder = "Enter role"
                    />
                    <SelectInputs
                      label = "Department"
                      name = "department"
                      value = {form.department}
                      onChange={handleChange}
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
                    <div className="text-xs flex flex-col gap-1">
                       <label className="font-bold">Description</label>
                       <textarea name="desc" value={form.desc} onChange={handleChange} className="rounded-sm font-semibold py-2 px-3 placeholder:font-normal h-20 focus:outline-none focus:ring-0 border border-secondary/40" placeholder="Enter role description" />
                       <label className="text-red-600">{errors.desc}</label>
                    </div>
                    <SelectInputs
                      label ="Status"
                      name = "status"
                      value = {form.status}
                      onChange={handleChange}
                      error = {errors.status}
                    >
                       <option value="">Select Status</option>
                       <option value="Active">Active</option>
                       <option value="Inactive">Inactive</option>
                    </SelectInputs>
                    <PrimaryButt onClick={handleSubmit}><RiAddLargeLine /> Add Role</PrimaryButt>
                </div>
            </div>
            </div>

        </div>
    );
}

export default AddingRole;