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
import { RxCrossCircled } from "react-icons/rx";



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
   const [showAddCertificate, setShowAddCertificate] = useState(false);

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





   // Submitting certificate 
   const handleSubmitCertificate = async () => {
      if (!id) {
         alert("Missing training id");
         return;
      }

      if (!issuedDate || !expiryDate || !certificateFile) {
        alert("Please fill all required fields");
        return;
      }

      const formData = new FormData();

      formData.append("training_id", id);
      formData.append("certificate_no", certificateNo);
      formData.append("issued_date", issuedDate);
      formData.append("expiry_date", expiryDate);
      formData.append("file", certificateFile);

      try {
         setLoading(true);

         const res = await fetch(
            "http://localhost/ncaa/staff/insert_certificate_admin.php",
            {
               method: "POST",
               credentials: "include",
               body: formData
            }
         );

         const data = await res.json();

         if(data.success) {
            alert("Certificated uploaded successfully");

            setCertificateNo("");
            setIssuedDate("");
            setExpiryDate("");
            setCertificateFile(null);
            setShowAddCertificate(false);

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
   }








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
            label: "Departments",
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
           {!hasCertificate && (
           <div className="w-full py-6 pb-6 px-5 flex flex-col gap-3 bg-white shadow-sm shadow-secondary/30">
               <div className="w-full flex items-center justify-between">
                 <label className="font-bold text-sm mb-2">Certificate</label>
                 <SecondaryButt onClick={() => setShowAddCertificate(true)} className="!border !border-secondary/30">Add Certificate</SecondaryButt>
               </div>
               <div className="w-full py-10 flex flex-col text-sm items-center justify-center text-center px-6 gap-2 rounded-md border border-dotted border-secondary/50 bg-secondaryy">
                   <HiOutlineDocumentText className="text-4xl font-bold" />
                   <label className="font-bold">Awaiting employee upload</label>
                   <label className="text-xs">The employee hasn't submitted proof of completion yet.</label>
               </div>
           </div>
           )}




           {/* Certificate  */}
           {showAddCertificate && (
           <div className="w-full py-6 pb-6 px-5 flex flex-col bg-white shadow-sm shadow-secondary/30">
              <div className="w-full flex justify-between">
                <label className="font-bold text-sm mb-2">Certificate</label>
                <RxCrossCircled onClick={() => setShowAddCertificate(false)} className="cursor-pointer hover:text-red-500" />
              </div>
              <label className="text-xs text-secondary/50 mb-3">Upload the employee's certificate for this training. Admins can upload certificates on behalf of employees, especially for historical records.</label>
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
              <PrimaryButt onClick={handleSubmitCertificate} className="mb-3">{loading ? "Submitting..." : "Submit Certificate"}</PrimaryButt>
              {/* <SecondaryButt>Cancel</SecondaryButt> */}
           </div>
           )}






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
                  <SecondaryButt className="!border !border-secondary/30"><MdOutlineCancel /> Reject</SecondaryButt>
              </div>
              <SecondaryButt onClick={cycleStatus}  className="!bg-secondaryy">Mark {getNextStatus(trainingInfoList2?.status)}</SecondaryButt>
           </div>
           )} 



        </div>
    );
}

export default AssigneeInfo;
















   // // Adding certficate to database 
   // const handleSubmitCertificate = async () => {
   //    if (!id) return alert("Missing training ID");
   //    if (!issuedDate || !expiryDate || !certificateFile) {
   //       return alert("Please fill all required fields");
   //    }

   //    const formData = new FormData();
   //    formData.append("training_id", trainingInfoList2.id);
   //    formData.append("certificate_no", certificateNo);
   //    formData.append("issued_date", issuedDate);
   //    formData.append("expiry_date", expiryDate);
   //    formData.append("file", certificateFile);

   //    try {
   //       setLoading(true);

   //       const res = await fetch("http://localhost/ncaa/staff/insert_certificate.php", {
   //          method: "POST",
   //          body: formData,
   //       });

   //       const data = await res.json();

   //       if (data.success) {
   //          alert("Certificate uploaded successfully");
   //          setCertificateNo("");
   //          setIssuedDate("");
   //          setExpiryDate("");
   //          setCertificateFile(null);

   //          // const response = await fetch(`http://localhost/ncaa/staff/get_assignment_by_id.php?id=${id}`);
   //          // const assignment = await response.json();

   //          // if (assignment.success) {
   //             // setTrainingInfoList2(assignment.data);
   //          // }
   //          window.location.reload();

   //       } else {
   //          alert(data.message || "Upload failed");
   //       }
   //    } catch (error) {
   //       console.error(error);
   //       alert("Server error");
   //    } finally {
   //       setLoading(false);
   //    }


   // };
