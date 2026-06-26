import { useNavigate, useParams } from "react-router-dom";
import Menu from "./components/Menu";
import TopMenu from "./components/TopMenu";
import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import TrainingInfo from "./components/TrainingInfo";
import AssigneeInfo from "./components/AssigneeInfo";
import { RxCross1 } from "react-icons/rx";
import { ImCross } from "react-icons/im";




const AssignmentDetails = () => {

   const [showMenu, setShowMenu] = useState(false);
   const navigate = useNavigate();
   const { id } = useParams();
   const [trainingInfoList, setTrainingInfoList] = useState<any>(null);
   const [showCertificate, setShowCertificate] = useState(false);


      useEffect(() => {
         fetch(`http://localhost/ncaa/staff/get_assignment_by_id.php?id=${id}`)
         .then(res => res.json())
         .then(data => {
            if (data.success) {
                setTrainingInfoList(data.data);
            }
         });
      }, [id]);

      const handleChange = (e: any) => {
         setTrainingInfoList({
            ...trainingInfoList,
            [e.target.name]: e.target.value
         });
      };


      const getStatusColor = (status) => {
         if (status === "Pending") return "bg-orange-300";
         if (status === "Completed") return "bg-green-300";
         if (status === "Overdue") return "bg-red-300";
         return "bg-grey-700";
      }


    return (
       <div className="w-full min-h-screen flex">
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          <div className="w-full xl:w-[82%] min-h-screen text-secondary/80 bg-secondaryy">
             <TopMenu setShowMenu={setShowMenu} title="Assignment Details" />
             <div className="px-2 md:px-6 flex flex-col gap-6 min-h-screen">
           {/* Top Div  */}
           <div className="w-full flex items-center justify-between mt-6">
               <label onClick={() => navigate(-1)} className="text-sm font-bold items-center flex gap-3 cursor-pointer"><IoArrowBack /> Back</label>
               <div className={`text-xs font-bold py-1 px-5 ${getStatusColor(trainingInfoList?.status)}`}>
                  <label>{trainingInfoList?.status}</label>
               </div>
           </div>

           {/* <Middle Div  */}
           <div className="w-full flex flex-col md:flex-row items-start gap-5 justify-between mb-6 ">
              <TrainingInfo />
              <AssigneeInfo setShowCertificate={setShowCertificate} />
           </div>

           {/* Certificate Div  */}
           {showCertificate && (
           <div onClick={() => setShowCertificate(false)} className="w-full h-screen px-15 overflow-y-auto pb-30 backdrop-blur-xs bg-black/40 flex flex-col items-end z-20 gap-5 fixed py-5 left-1 md:left-7">
              <div onClick={() => setShowCertificate(false)} className="w-full font-extrabold text-white flex justify-end"><ImCross className="cursor-pointer hover:text-secondaryy" /></div>
              <div className="w-full lg:w-6/7 flex justify-center py-5">
                  {/* Certificate  */}
                  <div className="h-250 bg-white w-full lg:w-4/5">
                     <iframe className="w-full bg-white h-full" src={`http://localhost/ncaa/staff/${encodeURI(trainingInfoList?.file || "")}`} />
                  </div>
              </div>
           </div>
           )}



          </div>
          </div>
       </div>
    );
}

export default AssignmentDetails;

// backdrop-blur-md 