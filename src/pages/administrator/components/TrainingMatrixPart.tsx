import { LuDownload } from "react-icons/lu"
import SecondaryButt from "../../../ui/SecondaryButt"
import PrimaryButt from "../../../ui/PrimaryButt"
import { useNavigate } from "react-router-dom"
import { RiAddLargeLine } from "react-icons/ri"
import { FiUserCheck } from "react-icons/fi"
import Roles from "../ui/Roles"
import Requirements from "../ui/Requirements"
import type React from "react"



interface Props {
    setShowAddRole: React.Dispatch<React.SetStateAction<boolean>>;
}



const TrainingMatrixPart: React.FC<Props> = ({ setShowAddRole }) => {

    const navigate = useNavigate();




    return (
        <div className="w-full min-h-screen py-2 text-secondary/90 px-2 md:px-6">
            <div className="w-full py-5">




              <div className="flex flex-col">

                {/* Top Part  */}
                <div className="flex items-center justify-between pb-5">
                 <div className="flex flex-col">
                    <label className="text-lg">Training Matrix</label>
                    <label className="text-xs text-secondary/60">Define mandatory and recommended training requirements per role.</label>
                 </div>
                 <div className="flex items-center gap-3">
                    <SecondaryButt>
                          <FiUserCheck />
                          Staff Compliance
                    </SecondaryButt>
                    <PrimaryButt onClick={() => setShowAddRole(true)}>
                       <RiAddLargeLine /> Add Role
                    </PrimaryButt>
                 </div>
                </div>



                {/* Main Part  */}
                <div className="w-full min-h-screen flex flex-col lg:flex-row items-start justify-between gap-5">
                    <Roles />
                    <Requirements />
                </div>



               </div>







            </div>
        </div>
    );
}

export default TrainingMatrixPart;












 {/* Second Top Part  */}
                {/* <div className="w-full flex items-center gap-10 py-4 px-5 bg-white shadow-sm shadow-secondary/30">
                    Roles 
                    <div className="w-1/6 flex flex-col gap-1">
                     <label className="font-bold text-xs text-secondary/60">Role</label>
                     <div className="w-full rounded-md bg-secondaryy/30 border border-secondary/30 px-3">
                       <select className="w-full py-2 text-xs cursor-pointer focus:outline-none">
                           <option>Software Developer</option>
                       </select>
                     </div>
                    </div>

                    Requirements 
                    <div className="w-1/6 flex flex-col gap-1">
                     <label className="font-bold text-xs text-secondary/60">Requirement Role</label>
                     <div className="w-full rounded-md bg-secondaryy/30 border border-secondary/30 px-3">
                       <select className="w-full py-2 text-xs cursor-pointer focus:outline-none">
                           <option>Mandatory</option>
                           <option>Recommended</option>
                       </select>
                     </div>
                    </div>
                </div>  */}