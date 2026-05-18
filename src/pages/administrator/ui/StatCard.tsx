import type React from "react";
import type { FC } from "react";
import { FiUsers } from "react-icons/fi";

interface Props {
    icon: React.ElementType;
    name: string;
    stat: number;
    desc: string;
}

const StatCard: React.FC<Props> = ({ icon: Icon, name, stat, desc }) => {
    return (
        <div className="p-3 bg-white text-secondary/60 shadow-xs shadow-secondary/20 flex flex-col gap-1">
           {/* Top Part  */}
               <div className="flex items-center justify-start gap-4">
                  <div className="text-sm"><Icon /></div>
                  <label className="text-sm font-bold">{name}</label>
               </div>
           {/* Stat Part */}
           <label className="text-2xl font-bold text-secondary/90">{stat}</label>
           <label className="text-xs">{desc}</label>
        </div>
    )
}

export default StatCard;