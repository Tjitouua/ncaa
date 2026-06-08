import { FaGraduationCap } from "react-icons/fa6";
import { MdOutlineAccessTime } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import type React from "react";
import { useNavigate } from "react-router-dom";
import { PiGraduationCap } from "react-icons/pi";



interface Props {
   id: number,
   training_name: string;
   description: string;
   category: string;
   duration: string;
   provider: string;
   training_code: string;
   onDelete: (id: number) => void;
}





const ProgramsCard: React.FC<Props> = ( {id, training_name, description, category, duration, provider, training_code, onDelete} ) => {



   const navigate = useNavigate();




    return (
        <div className="px-5 py-7 bg-white shadow-xs shadow-secondary/30 flex flex-col">
            <div className="w-full flex items-center mb-5">
               <div className="p-2 flex items-center justify-center bg-secondaryy">
                  <FaGraduationCap className="text-lg" />
               </div>
            </div>
            <label className="text-sm font-bold whitespace-nowrap overflow-hidden text-ellipsis">{training_name}</label>
            <label className="text-xs whitespace-nowrap overflow-hidden text-ellipsis">{description}</label>
            <div className="flex gap-2 items-center justify-between text-xs w-full mt-4 text-secondary/60 pb-4 border-b border-secondary/20">
               <label className="flex items-center gap-2"><MdOutlineAccessTime />{duration}</label>
               <label className="font-bold">·</label>
               <label className="flex items-center gap-2"><PiGraduationCap />{provider}</label>
            </div>
            <div className="mt-4 flex items-center justify-between">
               <label className="text-xs text-secondary/60">{training_code}</label>
               <div className="flex gap-5 items-center text-sm">
                  <GrEdit onClick={() => navigate(`/admin/training_programs/program_details/${id}`)} className="cursor-pointer hover:text-primary" />
                  <RiDeleteBin6Line onClick={() => onDelete(id)} className="text-red-600 cursor-pointer hover:text-primary" />
               </div>
            </div>
        </div>
    );
}


export default ProgramsCard;