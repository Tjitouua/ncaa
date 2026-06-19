import { useNavigate, useParams } from "react-router-dom";
import Menu from "./components/Menu";
import TopMenu from "./components/TopMenu";
import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import TrainingInfo from "./components/TrainingInfo";
import AssigneeInfo from "./components/AssigneeInfo";




const AssignmentDetails = () => {

   const [showMenu, setShowMenu] = useState(false);
   const navigate = useNavigate();
   const { id } = useParams();
   const [trainingInfoList, setTrainingInfoList] = useState<any>(null);


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
             <div className="px-2 md:px-6 flex flex-col gap-6 py-6 min-h-screen">
           {/* Top Div  */}
           <div className="w-full flex items-center justify-between">
               <label onClick={() => navigate(-1)} className="text-sm font-bold items-center flex gap-3 cursor-pointer"><IoArrowBack /> Back</label>
               <div className={`text-xs font-bold py-1 px-5 ${getStatusColor(trainingInfoList?.status)}`}>
                  <label>{trainingInfoList?.status}</label>
               </div>
           </div>

           {/* <Middle Div  */}
           <div className="w-full flex items-start gap-5 justify-between">
              <TrainingInfo />
              <AssigneeInfo />
           </div>

        </div>
          </div>
       </div>
    );
}

export default AssignmentDetails;