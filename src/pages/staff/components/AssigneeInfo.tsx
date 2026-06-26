import { IoLocationOutline } from "react-icons/io5";
import { MdDateRange, MdOutlineAccessTime } from "react-icons/md";
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



interface Props {
   setShowCertificate: React.Dispatch<React.SetStateAction<boolean>>
}




const AssigneeInfo = ({ setShowCertificate }: Props) => {

   const { id } = useParams();
   const [trainingInfoList2, setTrainingInfoList2] = useState<any>({});

   const [certificateNo, setCertificateNo] = useState("");
   const [issuedDate, setIssuedDate] = useState("");
   const [expiryDate, setExpiryDate] = useState("");
   const [certificateFile, setCertificateFile] = useState<File | null>(null);
   const [loading, setLoading] = useState(false);

   const hasCertificate = trainingInfoList2?.certificate_no && trainingInfoList2?.file;


   // Adding certficate to database 
   const handleSubmitCertificate = async () => {
      if (!id) return alert("Missing training ID");
      if (!issuedDate || !expiryDate || !certificateFile) {
         return alert("Please fill all required fields");
      }

      const formData = new FormData();
      formData.append("training_id", trainingInfoList2.id);
      formData.append("certificate_no", certificateNo);
      formData.append("issued_date", issuedDate);
      formData.append("expiry_date", expiryDate);
      formData.append("file", certificateFile);

      try {
         setLoading(true);

         const res = await fetch("http://localhost/ncaa/staff/insert_certificate.php", {
            method: "POST",
            credentials: "include",
            body: formData,
         });

         const data = await res.json();

         if (data.success) {
            alert("Certificate uploaded successfully");
            setCertificateNo("");
            setIssuedDate("");
            setExpiryDate("");
            setCertificateFile(null);

            // const response = await fetch(`http://localhost/ncaa/staff/get_assignment_by_id.php?id=${id}`);
            // const assignment = await response.json();

            // if (assignment.success) {
               // setTrainingInfoList2(assignment.data);
            // }
            window.location.reload();

         } else {
            alert(data.message || "Upload failed");
         }
      } catch (error) {
         console.error(error);
         alert("Server error");
      } finally {
         setLoading(false);
      }


   };













   //   Fetching training data 
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


   //  Assignee Info 
    const assigneeList = [
        {
          icon: FiUser,
          label: "Employee",
          value: `${trainingInfoList2?.first_name ?? ""} ${trainingInfoList2?.last_name ?? ""}`
        },
        {
            icon: LiaBuildingSolid,
            label: "Department",
            value: trainingInfoList2?.department
        },
        {
            icon: PiGraduationCap,
            label: "Position",
            value: trainingInfoList2?.position
        },
        {
              icon: MdDateRange,
              label: "Assigned on",
              value: trainingInfoList2?.date_assigned
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
        <div className="w-full md:w-3/10 flex flex-col gap-5">

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




           {/* Certificate  */}
           {!hasCertificate && (
           <div className="w-full py-6 pb-6 px-5 flex flex-col bg-white shadow-sm shadow-secondary/30">
              <label className="font-bold text-sm mb-2">Certificate</label>
              <label className="text-xs text-secondary/50 mb-3">Once you complete this training, upload your certificate here. An admin will review it and mark the training as completed.</label>
              {/* Certificate No  */}
              <div className="w-full flex flex-col gap-2 mb-3">
                 <label className="text-xs font-bold text-secondary/80">Certificate No</label>
                 <input value={certificateNo} onChange={(e) => setCertificateNo(e.target.value)} type="text" className="py-2 px-2 rounded-sm border border-secondary/40 text-xs focus:border-none" placeholder="Auto-generated if empty" />
              </div>
              {/* Dates  */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                 <div className="w-full flex flex-col gap-2">
                   <label className="text-xs font-bold text-secondary/80">Issued</label>
                   <input value={issuedDate} onChange={(e) => setIssuedDate(e.target.value)} type="date" className="py-2 px-2 rounded-sm border border-secondary/40 text-xs focus:border-none" />
                 </div>
                 <div className="w-full flex flex-col gap-2">
                   <label className="text-xs font-bold text-secondary/80">Expiry *</label>
                   <input value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} type="date" className="py-2 px-2 rounded-sm border border-secondary/40 text-xs focus:border-none" />
                 </div>
              </div>
              {/* Certificate File  */}
              <div className="w-full flex flex-col gap-2 mb-1">
                 <label className="text-xs font-bold text-secondary/80">Certificate File *</label>
                 <input onChange={(e) => setCertificateFile(e.target.files ? e.target.files[0] : null)} type="file" className="py-2 px-2 rounded-sm border border-secondary/40 text-xs focus:border-none" />
              </div>
              <label className="text-[11px] text-secondary/50 mb-5">No file selected - max 5 MB</label>
              <PrimaryButt className="mb-3" onClick={handleSubmitCertificate}>{loading ? "Submitting..." : "Submit Replacement"}</PrimaryButt>
              {/* <SecondaryButt>Cancel</SecondaryButt> */}
           </div>
           )}




           {/* Update Certificate  */}
           <div className="w-full hidden py-6 pb-6 px-5 flex flex-col bg-white shadow-sm shadow-secondary/30">
              <label className="font-bold text-sm mb-2">Certificate</label>
              <label className="text-xs text-secondary/50 mb-3">Need to update your certificate? Upload a new one here to replace the existing certificate. An admin will review it and update your training status.</label>
              {/* Certificate No  */}
              <div className="w-full flex flex-col gap-2 mb-3">
                 <label className="text-xs font-bold text-secondary/80">Certificate No</label>
                 <input type="text" className="py-2 px-2 rounded-sm border border-secondary/40 text-xs focus:border-none" placeholder="Auto-generated if empty" />
              </div>
              {/* Dates  */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                 <div className="w-full flex flex-col gap-2">
                   <label className="text-xs font-bold text-secondary/80">Issued</label>
                   <input type="date" className="py-2 px-2 rounded-sm border border-secondary/40 text-xs focus:border-none" />
                 </div>
                 <div className="w-full flex flex-col gap-2">
                   <label className="text-xs font-bold text-secondary/80">Expiry *</label>
                   <input type="date" className="py-2 px-2 rounded-sm border border-secondary/40 text-xs focus:border-none" />
                 </div>
              </div>
              {/* Certificate File  */}
              <div className="w-full flex flex-col gap-2 mb-1">
                 <label className="text-xs font-bold text-secondary/80">Certificate File *</label>
                 <input type="file" className="py-2 px-2 rounded-sm border border-secondary/40 text-xs focus:border-none" />
              </div>
              <label className="text-[11px] text-secondary/50 mb-5">No file selected - max 5 MB</label>
              <PrimaryButt className="mb-3">Submit Replacement</PrimaryButt>
              <SecondaryButt>Cancel</SecondaryButt>
           </div>





           {/* Submitted Certificated  */}
           {hasCertificate && (
           <div className="w-full py-6 pb-8 px-5 flex flex-col bg-white shadow-sm shadow-secondary/30">
              <label className="font-bold text-sm mb-2">Certificate</label>
              <div className="bg-secondaryy w-full px-1 flex flex-col gap-1">
                {certificate.map((certificate, index) => (
                 <CertificateUi 
                    key = {index}
                    label = {certificate.label}
                    value = {certificate.value}
                 />
                ))}
              </div>
              <div className="w-full mt-5 mb-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <SecondaryButt onClick={() => setShowCertificate(true)} className="!border !border-secondary/30"><FiEye /> View</SecondaryButt>
                  {/* <SecondaryButt className="!border !border-secondary/30"><LuDownload /> Download
                  </SecondaryButt> */}
                  <SecondaryButt className="!border !border-secondary/30"><TbZoomReplace /> Replace</SecondaryButt>
              </div>
              
           </div>
           )} 





        </div>
    );
}

export default AssigneeInfo;