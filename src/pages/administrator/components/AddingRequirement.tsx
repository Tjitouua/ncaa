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
                    >
                     {program.map((program) => (
                      <option key={program.id} value={program.id}>{program.training_name}</option>
                     ))}
                    </SelectInputs>
                    <SelectInputs
                      label ="Requirement Type"
                      name = "status"
                    >
                       <option value="">Select Type</option>
                       <option value="Active">Mandatory (must be completed)</option>
                       <option value="Inactive">Recommended (suggested)</option>
                    </SelectInputs>
                    <PrimaryButt><RiAddLargeLine /> Add Requirement</PrimaryButt>
                </div>
            </div>
            </div>

        </div>
    );
}

export default AddingRequirement;