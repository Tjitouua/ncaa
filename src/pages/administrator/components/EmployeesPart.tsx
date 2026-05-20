import { IoMdAdd } from "react-icons/io";
import { RiAddLargeLine } from "react-icons/ri";
import { LuUpload } from "react-icons/lu";
import PrimaryButt from "../../../ui/PrimaryButt";
import SecondaryButt from "../../../ui/SecondaryButt";
import { IoSearchSharp } from "react-icons/io5";
import { LuDownload } from "react-icons/lu";




const EmployeesPart = () => {
    return (
       <div className="w-full min-h-screen py-2 text-secondary/90 px-2 md:px-6">
          <div className="w-full h-screen  py-5">

             <div className="flex flex-col">
               {/* Top Part  */}
               <div className="flex items-center justify-between border-b border-secondary/40 pb-5">
                 <div className="flex flex-col">
                    <label className="text-lg">Staff Directory</label>
                    <label className="text-xs text-secondary/60">7 employees registered</label>
                 </div>
                 <div className="flex items-center gap-3">
                    <SecondaryButt>
                          <LuDownload />
                          Export
                      </SecondaryButt>
                    <PrimaryButt>
                       <RiAddLargeLine /> Add Employee
                    </PrimaryButt>
                 </div>
               </div>
               {/* Names  */}
                <div className="w-full py-5 flex flex-col">
                    <div className="w-full flex items-center justify-between">
                      <div className="border border-secondary/40 rounded-sm px-3 flex items-center bg-white">
                       <IoSearchSharp />
                       <input type="text" className="py-2 px-2 focus:outline-none focus:ring-0 text-sm" placeholder="Search staff..." />
                      </div>
                      <SecondaryButt>
                        <LuUpload /> Import CSV
                      </SecondaryButt>
                    </div>
                </div>
             </div>

          </div>
       </div>
    )
}


export default EmployeesPart;