import { BsFillCalendarDateFill } from "react-icons/bs";
import TrainingInfoUi from "../ui/TrainingInfoUi";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { MdOutlineAccessTime } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { PiGraduationCap } from "react-icons/pi";
import { BiCategory } from "react-icons/bi";
import { FiPieChart, FiUser } from "react-icons/fi";
import { MdOutlineContactMail } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { VscPieChart } from "react-icons/vsc";
import { FaRegMoneyBillAlt } from "react-icons/fa";



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
            icon: VscPieChart,
            label: "Year",
            value: trainingInfoList2?.year
          },
        {
            icon: VscPieChart,
            label: "Quarter",
            value: Number(trainingInfoList2?.quarter) === 1 ? "First (1)" : Number(trainingInfoList2?.quarter) === 2 ? "Second (2)" : Number(trainingInfoList2?.quarter) === 3 ? "Third (3)" : Number(trainingInfoList2?.quarter) === 4 ? "Fourth (4)" : ""
          },
        {
          icon: MdDateRange,
          label: "Start Date",
          value: trainingInfoList2?.start_date && trainingInfoList2?.start_date !== "0000-00-00"
                ? new Date(trainingInfoList2?.start_date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                  })
                 : "TBD"
        },
        {
            icon: MdDateRange,
            label: "End Date",
            value: trainingInfoList2?.end_date && trainingInfoList2?.end_date !== "0000-00-00"
                   ? new Date(trainingInfoList2?.end_date).toLocaleDateString("en-GB", {
                     day: "numeric",
                     month: "long",
                     year: "numeric"
                     })
                     : "TBD"
        },
        {
            icon: IoLocationOutline,
            label: "Venue/Location",
            value: trainingInfoList2?.location
        },
        ,
        {
            icon: IoLocationOutline,
            label: "Method",
            value: trainingInfoList2?.method
        }
    ];



    // Cost 
    const costInfoList = [
        {
            icon: FaRegMoneyBillAlt,
            label: "Training Cost (N$)",
            value: Number(trainingInfoList2?.training_cost).toLocaleString("fr-FR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })
            .replace(",", ".")
        },
        {
            icon: FaRegMoneyBillAlt,
            label: "Accomodation (N$)",
            value: Number(trainingInfoList2?.accommodation_cost).toLocaleString("fr-FR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })
            .replace(",", ".")
        },
        {
            icon: FaRegMoneyBillAlt,
            label: "SNT Cost (N$)",
            value: Number(trainingInfoList2?.snt_cost).toLocaleString("fr-FR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })
            .replace(",", ".")
        },
        {
            icon: FaRegMoneyBillAlt,
            label: "Flight Tickets (N$)",
            value: Number(trainingInfoList2?.flight_cost).toLocaleString("fr-FR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })
            .replace(",", ".")
        },
        {
            icon: FaRegMoneyBillAlt,
            label: "Others Costs (N$)",
            value: Number(trainingInfoList2?.other_costs).toLocaleString("fr-FR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })
            .replace(",", ".")
        },
        {
            icon: FaRegMoneyBillAlt,
            label: "Total Cost (N$)",
            value: Number(trainingInfoList2?.total_cost).toLocaleString("fr-FR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })
            .replace(",", "."),
            valueClassName: "text-secondary/70"
        }
    ];


    
    // Provider 
    const trainerInfoList = [
        {
          icon: PiGraduationCap,
          label: "Provider",
          value: trainingInfoList2?.provider
        },
        {
            icon: FiUser,
            label: "Trainer",
            value: trainingInfoList2?.trainer
        },
        {
            icon: BiCategory,
            label: "Trainer status",
            value: trainingInfoList2?.trainer_status
        },
        {
            icon: MdOutlineContactMail,
            label: "Email",
            value: trainingInfoList2?.email
        },
        ,
        {
            icon: MdOutlineContactMail,
            label: "Contact",
            value: trainingInfoList2?.contact_no
        },
    ];








    return (
        <div className="w-full lg:w-7/10 bg-white text-secondary/70 py-10 px-10 flex flex-col shadow-sm shadow-secondary/30">
            <label className="text-xs text-secondary/50">{trainingInfoList2?.training_code}</label>
            <label className="font-bold text-lg">{trainingInfoList2?.training_name}</label>
            <label className="text-xs text-secondary/50">{trainingInfoList2?.training_type}</label>
            <div className="flex items-center mb-6 gap-3 mt-3">
                <div className="py-1 px-3 bg-secondary/10 text-xs font-bold rounded-md">
                    <label>{trainingInfoList2?.category}</label>
                </div>
                <div className="py-1 px-3 border border-secondary/20 text-xs font-bold rounded-md">
                    <label>{trainingInfoList2?.reason}</label>
                </div>
                <div className="py-1 px-3 bg-secondary/10 text-xs font-bold rounded-md">
                    <label>N$ {Number(trainingInfoList2?.total_cost).toLocaleString("fr-FR", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</label>
                </div>
                <div className="py-1 px-3 border border-secondary/20 text-xs font-bold rounded-md">
                    <label>{trainingInfoList2?.duration}</label>
                </div>
            </div>
            {/* Session Schedule  */}
            <div className="w-full flex flex-col pt-4 bg-secondaryy/30 px-3 border-t border-t-secondary/10">
                <label className="font-bold text-sm mb-2 underline underline-offset-2">Session Schedule</label> 
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 pb-4">
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
            {/* Cost  */}
            <div className="w-full flex flex-col pt-4 px-3 mb-3 border-t border-t-secondary/10">
                <label className="font-bold text-sm mb-2  underline underline-offset-2">Cost</label> 
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
                    {costInfoList.map((cost, index) => (
                      <TrainingInfoUi 
                        key = {index}
                        icon = {cost.icon}
                        label = {cost.label}
                        value = {cost.value}
                        valueClassName = {cost.valueClassName}
                      />
                    ))}
                </div>
            </div>
            {/* Trainer / Provider  */}
            <div className="w-full mt-2 flex flex-col bg-secondaryy/30 px-3 pt-4 border-t border-t-secondary/10">
                <label className="font-bold text-sm mb-2 underline underline-offset-2">Trainer / Provider</label> 
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 pb-4">
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
            <div className="w-full flex flex-col gap-2 pt-5 pb-2 border-t border-t-secondary/10">
               <label className="font-bold text-sm mb-2">Notes</label>
               <label className="text-xs">Review the training details before making changes. Updates will be reflected in the employee's training record.</label>
            </div>
        </div>
    );
}

export default TrainingInfo;