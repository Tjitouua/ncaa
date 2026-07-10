import { ImCross } from "react-icons/im";
import Inputs from "../../../ui/Inputs";
import PrimaryButt from "../../../ui/PrimaryButt";
import { RiAddLargeLine } from "react-icons/ri";
import SelectInputs from "../../../ui/SelectInputs";
import React, { useState } from "react";




interface Props {
    setShowAddRole: React.Dispatch<React.SetStateAction<boolean>>;
}





const AddingRole: React.FC<Props> = ({ setShowAddRole }) => {

    



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
                      placeholder = "Enter role"
                    />
                    <Inputs
                      label = "Department"
                      placeholder = "Enter the department"
                    />
                    <div className="text-xs flex flex-col gap-1">
                       <label className="font-bold">Description</label>
                       <textarea className="rounded-sm font-semibold py-2 px-3 placeholder:font-normal h-20 focus:outline-none focus:ring-0 border border-secondary/40" type="textarea" placeholder="Enter role description" />
                       <label className="text-red-600 hidden">Please enter desc</label>
                    </div>
                    <SelectInputs
                      label ="Status"
                    >
                       <option>Active</option>
                       <option>Inactive</option>
                    </SelectInputs>
                    <PrimaryButt><RiAddLargeLine /> Add Role</PrimaryButt>
                </div>
            </div>
            </div>

        </div>
    );
}

export default AddingRole;