import { IoLocationOutline } from "react-icons/io5";
import { MdDateRange, MdOutlineAccessTime, MdOutlineCancel } from "react-icons/md";
import TrainingInfoUi from "../ui/TrainingInfoUi";
import { FiUser } from "react-icons/fi";
import { LiaBuildingSolid } from "react-icons/lia";
import { PiGraduationCap } from "react-icons/pi";
import PrimaryButt from "../../../ui/PrimaryButt";
import SecondaryButt from "../../../ui/SecondaryButt";
import CertificateUi from "../ui/CertificateUi";
import { LuDownload } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import { MdOutlineFindReplace } from "react-icons/md";
import { TbZoomReplace } from "react-icons/tb";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { HiOutlineDocumentText } from "react-icons/hi2";



interface Props {
   setShowCertificate: React.Dispatch<React.SetStateAction<boolean>>
}




const RequestAssigneeInfo = ({ setShowCertificate }: Props) => {

   const { id } = useParams();
   const [trainingInfoList2, setTrainingInfoList2] = useState<any>({});

   const [certificateNo, setCertificateNo] = useState("");
   const [issuedDate, setIssuedDate] = useState("");
   const [expiryDate, setExpiryDate] = useState("");
   const [certificateFile, setCertificateFile] = useState<File | null>(null);
   const [loading, setLoading] = useState(false);

   const hasCertificate = trainingInfoList2?.certificate_no && trainingInfoList2?.file;



  
//    Updating the status of the training 
   const getNextStatus = (current: string) => {
    if (current === "Pending") return "Completed";
    if (current === "Completed") return "Overdue";
    if (current === "Overdue") return "Pending";
    return "Pending";
   }



   const cycleStatus = async (assign) => {
       if (!trainingInfoList2?.id) return;

       const next = getNextStatus(trainingInfoList2.status);

       try {
          const res = await fetch("http://localhost/ncaa/assign/update_assignment_status.php", {
             method: "POST",
             headers: {
                "Content-Type": "application/json"
             },
             body: JSON.stringify({
                id: trainingInfoList2.id,
                status: next
             })
          });

          const data = await res.json();

          if (data.success) {
             setTrainingInfoList2((prev: any) => ({
                ...prev,
                status: next
             }));
             window.location.reload();
          } else {
             alert(data.message || "Failed to update status");
          } 
       } catch (error) {
          console.error("Error updating status: ", error);
       }
   };








   //   Fetching training data 
      useEffect(() => {
         fetch(`http://localhost/ncaa/program/admin_get_request_by_id.php?id=${id}`)
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


   //  Assignee Info 
    const assigneeList = [
        {
          icon: FiUser,
          label: "Employee",
          value: `${trainingInfoList2?.first_name ?? ""} ${trainingInfoList2?.last_name ?? ""}`
        },
        {
            icon: LiaBuildingSolid,
            label: "Departments",
            value: trainingInfoList2?.department
        },
        {
            icon: PiGraduationCap,
            label: "Position",
            value: trainingInfoList2?.role
        },
        {
              icon: MdDateRange,
              label: "Assigned on",
              value: new Date(trainingInfoList2?.assigned_date).toLocaleDateString("en-GB", {
                 day: "numeric",
                 month: "long",
                 year: "numeric"
              })
        }
    ];





   //  Certificate Info 
    const certificate = [
        {
            label: "Cert No.",
            value: trainingInfoList2?.certificate_no
        },
        {
            label: "File",
            value: trainingInfoList2?.file?.split("_").pop()            
        },
        {
            label: "Expiry",
            value: trainingInfoList2?.expiry_date
        }
    ]





    return (
        <div className="w-full lg:w-3/10 flex flex-col gap-5">

            {/* Assignee  */}
           <div className="w-full py-6 pb-8 px-5 flex flex-col gap-4 bg-white shadow-sm shadow-secondary/30">
              <label className="font-bold text-sm mb-2">Assignee</label>
              {assigneeList.map((training, index) => (
                      <TrainingInfoUi 
                        key = {index}
                        icon = {training.icon}
                        label = {training.label}
                        value = {training.value}
                      />
                    ))}
           </div>



           {/* Certificate not there message  */}
           {/* {!hasCertificate && (
           <div className="w-full py-6 pb-6 px-5 flex flex-col gap-3 bg-white shadow-sm shadow-secondary/30">
               <label className="font-bold text-sm mb-2">Certificate</label>
               <div className="w-full py-10 flex flex-col text-sm items-center justify-center text-center px-6 gap-2 rounded-md border border-dotted border-secondary/50 bg-secondaryy">
                   <HiOutlineDocumentText className="text-4xl font-bold" />
                   <label className="font-bold">Awaiting employee upload</label>
                   <label className="text-xs">The employee hasn't submitted proof of completion yet.</label>
               </div>
           </div>
           )} */}





           {/* Submitted Certificated  */}
           
           <div className="w-full py-25 px-5 flex flex-col bg-white shadow-sm shadow-secondary/30">
              {/* <label className="font-bold text-sm mb-2">Certificate</label> */}
              <div className="bg-secondaryy w-full px-1 flex flex-col gap-1">
              </div>
              <div className="w-full mt-5 mb-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <SecondaryButt onClick={() => setShowCertificate(true)} className="!border !border-secondary/30"><FiEye /> View</SecondaryButt>
                  <SecondaryButt className="!border !border-secondary/30"><MdOutlineCancel /> Reject</SecondaryButt>
              </div>
              {/* <SecondaryButt onClick={cycleStatus}  className="!bg-secondaryy">Mark {getNextStatus(trainingInfoList2?.status)}</SecondaryButt> */}
           </div>
           



        </div>
    );
}

export default RequestAssigneeInfo;



{/* <div className="w-full mt-5 mb-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <SecondaryButt onClick={() => setShowCertificate(true)} className="!border !border-secondary/30"><FiEye /> View</SecondaryButt>
                  <SecondaryButt className="!border !border-secondary/30"><MdOutlineCancel /> Reject</SecondaryButt>
              </div>
              <SecondaryButt onClick={cycleStatus}  className="!bg-secondaryy">Mark {getNextStatus(trainingInfoList2?.status)}</SecondaryButt> */}
