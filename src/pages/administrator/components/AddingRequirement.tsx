import { ImCross } from "react-icons/im";
import Inputs from "../../../ui/Inputs";
import PrimaryButt from "../../../ui/PrimaryButt";
import { RiAddLargeLine } from "react-icons/ri";
import SelectInputs from "../../../ui/SelectInputs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DetailsInput from "../ui/DetailsInput";





interface Props {
    setShowAddRequirement: React.Dispatch<React.SetStateAction<boolean>>;
    selectedRole: any;
}





const AddingRequirement: React.FC<Props> = ({ setShowAddRequirement, selectedRole }) => {


  const navigate = useNavigate();
  const [program, setProgram] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
     program: "",
     type: "",
  });

  const [errors, setErrors] = useState<any>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value})
  };


  const validate = () => {
    const newErrors: any = {};

    Object.keys(form).forEach((key) => {
       if(!form[key as keyof typeof form]) {
         newErrors[key] = "This field is required";
       }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };






  const handleSubmit = async () => {
     if(!validate()) return;


     const requirementData = {
      role_id: selectedRole.id,
      program_id: form.program,
      type: form.type
    };


     try {
       const response = await fetch(
         "http://localhost/ncaa/roles/create_requirement.php",
         {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify(requirementData),
         }
       );

       const data = await response.json();

       if (data.success) {
         alert("Requirement added successfully");
         setShowAddRequirement(false);
         window.location.reload();
       } else {
         alert(data.message);
       }
     } catch (error) {
       console.error(error);
       alert("Failed to connect to server");
     }
  }






  

  useEffect(() => {
    fetch("http://localhost/ncaa/program/get_programs.php")
    .then((response) => response.json())
    .then((data) => {
        if(data.success) {
            setProgram(data.data);
        }
    })
    .catch((error) => {
        console.error("Error fetching programs");
    })
    .finally(() => {
        setLoading(false);
    });
  }, []);



    



    return (
        <div onClick={() => setShowAddRequirement(false)} className="w-full h-[90vh] px-15 overflow-y-auto pb-30 backdrop-blur-sm bg-black/70 flex flex-col items-end z-20 gap-5 fixed py-5 left-7">
            <div className="w-1/2 lg:w-3/4 font-extrabold text-white flex justify-end"><ImCross onClick={() => setShowAddRequirement(false)} className="cursor-pointer hover:text-secondaryy" /></div>

            <div className="w-full flex justify-center mt-5">
            <div onClick={(e) => e.stopPropagation()} className="w-full md:w-4/6 lg:w-1/4 bg-white flex lg:ml-10 flex-col">
                {/* Top part  */}
                <div className="p-5 bg-primaryy w-full">
                   <div className="w-35 h-20 bg-[url('/images/ncaa-logo.png')] bg-center bg-cover"></div>
                </div>
                {/* Form  */}
                <div className="p-5 pb-10 bg-white flex flex-col gap-3">
                    <label className="font-bold">{selectedRole?.role || "No role selected"}</label>
                    <label className="text-xs -mt-3 mb-1 text-secondary/40">Define requirements for the role</label>
                    <Inputs 
                      label = "Role"
                      name = "role"
                      value={selectedRole?.role || ""}
                      placeholder = "Enter role"
                      disabled={true}
                    />
                    <SelectInputs
                      label = "Training Program"
                      name = "program"
                      value = {form.program}
                      onChange={handleChange}
                      error = {errors.program}
                    >
                      <option value="">Select Training</option>
                     {program.map((program) => (
                      <option key={program.id} value={program.id}>{program.training_name}</option>
                     ))}
                    </SelectInputs>
                    <SelectInputs
                      label ="Requirement Type"
                      name = "type"
                      value = {form.type}
                      onChange={handleChange}
                      error = {errors.type}
                    >
                       <option value="">Select Type</option>
                       <option value="Mandatory">Mandatory (must be completed)</option>
                       <option value="Recommended">Recommended (suggested)</option>
                    </SelectInputs>
                    <PrimaryButt onClick={handleSubmit}><RiAddLargeLine /> Add Requirement</PrimaryButt>
                </div>
            </div>
            </div>

        </div>
    );
}

export default AddingRequirement;