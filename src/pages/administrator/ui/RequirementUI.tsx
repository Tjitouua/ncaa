import { FaRegClock } from "react-icons/fa";
import SecondaryButt from "../../../ui/SecondaryButt";
import { FiEye } from "react-icons/fi";
import type React from "react";




interface Props {
   first_name: string;
   last_name: string;
   email: string;
   department: string;
}





const RequirementUI: React.FC<Props> = ({ first_name, last_name, email, department }) => {
    return (
        <div className="px-4 py-4 pt-6 bg-white flex flex-col shadow-sm gap-5 shadow-secondary/30">

           {/* Top Part  */}
           <div className="w-full flex items-center justify-between">
               {/* Left side  */}
               <div className="flex items-center gap-2">
                   <div className="rounded-full p-3 border border-secondary/40 font-bold">
                      <label>TM</label>
                   </div>
                   <div className="flex flex-col">
                      <label className="text-sm font-bold">{first_name} {last_name}</label>
                      <label className="text-xs">{email}</label>
                   </div>
               </div>
               {/* Right side  */}
               <div className="rounded-full bg-primary/80 p-1">
                  <div className="rounded-full p-3 bg-white">
                      <label className="text-xs font-sm font-bold">40%</label>
                  </div>
               </div>
           </div>

           {/* Middle Part  */}
           <div className="w-full flex items-cetner text-xs text-secondary/60 justify-between py-2 px-3 font-semibold bg-secondary/10">
              <label><span className="mr-2">2</span> Incomplete</label>
              <label>{department}</label>
           </div>

           {/* Trainings Part  */}
           <div className="w-full flex flex-col gap-3 pb-5 border-b border-secondary/20">
              {/* Card  */}
               <div className="w-full px-3 py-1 flex items-center gap-4 bg-orange-100 border border-orange-300">
                   <FaRegClock className="text-orange-600 text-lg" />
                   <div className="w-full flex flex-col">
                      <div className="w-full flex items-center justify-between">
                         <label className="text-xs font-bold">Data Protection & Privacy</label>
                         <label className="ml-5 text-xs font-bold text-red-600">#REQ</label>
                      </div>
                      <label className="text-[10px] font-bold text-orange-600">Pending</label>
                   </div>
               </div>
               {/* Card  */}
               <div className="w-full px-3 py-1 flex items-center gap-4 bg-orange-100 border border-orange-300">
                   <FaRegClock className="text-orange-600 text-lg" />
                   <div className="w-full flex flex-col">
                      <div className="w-full flex items-center justify-between">
                         <label className="text-xs font-bold">Data Protection & Privacy</label>
                         <label className="ml-5 text-xs font-bold text-red-600">#REQ</label>
                      </div>
                      <label className="text-[10px] font-bold text-orange-600">Pending</label>
                   </div>
               </div>
           </div>

           {/* Button  */}
           <div className="w-full flex justify-end">
             <SecondaryButt><FiEye /> View History</SecondaryButt>
           </div>

        </div>
    );
}

export default RequirementUI;