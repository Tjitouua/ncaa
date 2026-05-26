import { FaGraduationCap } from "react-icons/fa6";
import { MdOutlineAccessTime } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import type React from "react";



interface Props {
    name: string;
    desc: string;
    type: string;
    duration: string;
    place: string;
    program_id: string;
}




const ProgramsCard: React.FC<Props> = ( {name, desc, type, duration, place, program_id} ) => {
    return (
        <div className="px-5 py-7 bg-white shadow-xs shadow-secondary/30 flex flex-col">
            <div className="w-full flex items-center mb-5">
               <div className="p-2 flex items-center justify-center bg-secondaryy">
                  <FaGraduationCap className="text-lg" />
               </div>
            </div>
            <label className="text-sm font-bold whitespace-nowrap overflow-hidden text-ellipsis">{name}</label>
            <label className="text-xs whitespace-nowrap overflow-hidden text-ellipsis">{desc}</label>
            <div className="flex gap-2 items-center text-xs w-full mt-4 text-secondary/60 pb-4 border-b border-secondary/20">
               <label className="flex items-center gap-1"><MdOutlineAccessTime />{duration}</label>
               <label className="font-bold">·</label>
               <label>{place}</label>
            </div>
            <div className="mt-4 flex items-center justify-between">
               <label className="text-xs text-secondary/60">{program_id}</label>
               <div className="flex gap-5 items-center text-sm">
                  <GrEdit className="cursor-pointer hover:text-primary" />
                  <RiDeleteBin6Line className="text-red-600 cursor-pointer hover:text-primary" />
               </div>
            </div>
        </div>
    );
}


export default ProgramsCard;