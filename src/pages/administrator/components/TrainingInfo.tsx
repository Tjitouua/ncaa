import { BsFillCalendarDateFill } from "react-icons/bs";
import TrainingInfoUi from "../ui/TrainingInfoUi";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { MdOutlineAccessTime } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { PiGraduationCap } from "react-icons/pi";
import { BiCategory } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { MdOutlineContactMail } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";



const TrainingInfo = () => {



      const { id } = useParams();
      const [trainingInfoList2, setTrainingInfoList2] = useState<any>(null);


      useEffect(() => {
         fetch(`http://localhost/ncaa/staff/get_assignment_by_id.php?id=${id}`)
         .then(res => res.json())
         .then(data => {
            if (data.success) {
                setTrainingInfoList2(data.data);
            }
         });
      }, [id]);

      const handleChange = (e: any) => {
         setTrainingInfoList2({
            ...trainingInfoList2,
            [e.target.name]: e.target.value
         });
      }




















    const trainingInfoList = [
        {
          icon: MdDateRange,
          label: "Scheduled Date",
          value: "2026-06-20"
        },
        {
            icon: MdOutlineAccessTime,
            label: "Start Time",
            value: "08:30"
        },
        {
            icon: IoLocationOutline,
            label: "Venue/Location",
            value: trainingInfoList2?.location
        },
        {
              icon: MdDateRange,
              label: "Deadline",
              value: "2026-12-31"
        }
    ];



    const trainerInfoList = [
        {
          icon: PiGraduationCap,
          label: "Provider",
          value: "ICAO Training Institude"
        },
        {
            icon: BiCategory,
            label: "Type",
            value: "External Provider"
        },
        {
            icon: FiUser,
            label: "Trainer",
            value: "Mr Natangwe Joseph"
        },
        {
            icon: MdOutlineContactMail,
            label: "Contact",
            value: trainingInfoList2?.email
        }
    ];








    return (
        <div className="w-7/10 bg-white text-secondary/70 py-6 px-6 flex flex-col shadow-sm shadow-secondary/30">
            <label className="text-xs text-secondary/50">{trainingInfoList2?.training_code}</label>
            <label className="font-bold text-lg">{trainingInfoList2?.training_name}</label>
            <label className="text-xs text-secondary/50">{trainingInfoList2?.description}</label>
            <div className="flex items-center gap-3 mt-3">
                <div className="py-1 px-3 bg-secondary/20 text-xs font-bold rounded-md">
                    <label>{trainingInfoList2?.category}</label>
                </div>
                <div className="py-1 px-3 border border-secondary/20 text-xs font-bold rounded-md">
                    <label>{trainingInfoList2?.training_type}</label>
                </div>
                <div className="py-1 px-3 border border-secondary/20 text-xs font-bold rounded-md">
                    <label>{trainingInfoList2?.duration}</label>
                </div>
            </div>
            {/* Session Schedule  */}
            <div className="w-full mt-6 flex flex-col gap-2 py-4 border-t border-t-secondary/30">
                <label className="font-bold text-sm mb-2">Session Schedule</label> 
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    {trainingInfoList.map((training, index) => (
                      <TrainingInfoUi 
                        key = {index}
                        icon = {training.icon}
                        label = {training.label}
                        value = {training.value}
                      />
                    ))}
                </div>
            </div>
            {/* Trainer / Provider  */}
            <div className="w-full mt-2 flex flex-col gap-2 py-5 border-t border-t-secondary/30">
                <label className="font-bold text-sm mb-2">Trainer / Provider</label> 
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    {trainerInfoList.map((trainer, index) => (
                      <TrainingInfoUi 
                        key = {index}
                        icon = {trainer.icon}
                        label = {trainer.label}
                        value = {trainer.value}
                      />
                    ))}
                </div>
            </div>
            {/* Notes  */}
            <div className="w-full mt-2 flex flex-col gap-2 pt-5 pb-2 border-t border-t-secondary/30">
               <label className="font-bold text-sm mb-2">Notes</label>
               <label className="text-xs">Review the training details before making changes. Updates will be reflected in the employee's training record.</label>
            </div>
        </div>
    );
}

export default TrainingInfo;