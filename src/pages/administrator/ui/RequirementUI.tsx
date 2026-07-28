import { FaRegClock } from "react-icons/fa";
import SecondaryButt from "../../../ui/SecondaryButt";
import { FiAlertCircle, FiEye } from "react-icons/fi";
import type React from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdRemoveCircleOutline } from "react-icons/md";





interface Props {
   first_name: string;
   last_name: string;
   email: string;
   department: string;
   trainings: any[];
}





const RequirementUI: React.FC<Props> = ({ first_name, last_name, email, department, trainings }) => {




   const incompleteCount  = trainings.filter(
      (training) => training.status !== "Completed"
   ).length;



   const completedCount = trainings.filter(
      (training) => training.status === "Completed"
   ).length;




   const compliancePercentage = trainings.length > 0
       ? Math.round((completedCount / trainings.length) * 100)
       : 0;




   const getStatusStyles = (status: string) => {
      switch (status) {
         case "Completed":
            return {
               card: "bg-green-100 border border-green-300",
               icon: "text-green-600",
               text: "text-green-600",
               Icon: FaRegCircleCheck
            };

            case "Pending":
            return {
               card: "bg-orange-100 border border-orange-200",
               icon: "text-orange-600",
               text: "text-orange-600",
               Icon: FaRegClock
            };

            case "Overdue":
            return {
               card: "bg-red-100 border border-red-300",
               icon: "text-red-600",
               text: "text-red-600",
               Icon: FiAlertCircle
            };

            default:
            return {
               card: "bg-gray-100 border border-gray-300",
               icon: "text-gray-600",
               text: "text-gray-600",
               Icon: MdRemoveCircleOutline
            };
      }
   }



   


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
               <div className="rounded-full p-1" style={{background: `conic-gradient(#2563eb ${compliancePercentage}%, #e5e7eb ${compliancePercentage}%)`}}>
                  <div className="rounded-full p-3 bg-white">
                      <label className="text-xs font-sm font-bold">{compliancePercentage}%</label>
                  </div>
               </div>
           </div>

           {/* Middle Part  */}
           <div className="w-full flex items-cetner text-xs text-secondary/60 justify-between py-2 px-3 font-semibold bg-secondary/10">
              <label><span className="mr-2">{incompleteCount}</span> Incomplete</label>
              <label>{department}</label>
           </div>

           {/* Trainings Part  */}
           <div className="w-full flex flex-col gap-3 pb-5 border-b border-secondary/20">
              {trainings.map((training) => {
               const styles = getStatusStyles(training.status);
               const Icon = styles.Icon;
               return (
               <div key={training.id} className={`w-full px-3 py-1 flex items-center gap-4 ${styles.card}`}>
                   <Icon className={`${styles.icon} text-lg`} />
                   <div className="w-full flex flex-col">
                      <div className="w-full flex items-center justify-between">
                         <label className="text-xs font-bold">{training.training}</label>
                         <label className={`ml-5 text-xs font-bold ${training.type === "Mandatory" ? "text-red-600" : "text-orange-400"}`}>#{training.type === "Mandatory" ? "REQ" : "REC"}</label>
                      </div>
                      <label className={`text-[10px] font-bold ${styles.text}`}>{training.status}</label>
                   </div>
               </div>
                );
              })}
           </div>

           {/* Button  */}
           <div className="w-full flex justify-end">
             <SecondaryButt><FiEye /> View History</SecondaryButt>
           </div>

        </div>
    );
}

export default RequirementUI;








// const training = [
//    {
//       training: "First Aid & CPR",
//       status: "Pending",
//       type: "REQ"
//    },
//    {
//       training: "Cyber Security in Aviation",
//       status: "Completed",
//       type: "REQ"
//    },
//    {
//       training: "Data Protection & Privacy",
//       status: "Pending",
//       type: "REC"
//    }
// ]