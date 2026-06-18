import { useNavigate } from "react-router-dom";
import Menu from "./components/Menu";
import TopMenu from "./components/TopMenu";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import TrainingInfo from "./components/TrainingInfo";
import AssigneeInfo from "./components/AssigneeInfo";




const AssignmentDetails = () => {

   const [showMenu, setShowMenu] = useState(false);
   const navigate = useNavigate();


    return (
       <div className="w-full min-h-screen flex">
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          <div className="w-full xl:w-[82%] min-h-screen text-secondary/80 bg-secondaryy">
             <TopMenu setShowMenu={setShowMenu} title="Assignment Details" />
             <div className="px-2 md:px-6 flex flex-col gap-8 py-8 min-h-screen">
           {/* Top Div  */}
           <div className="w-full flex items-center justify-between">
               <label onClick={() => navigate(-1)} className="text-sm font-bold items-center flex gap-3 cursor-pointer"><IoArrowBack /> Back</label>
               <div className=" text-xs font-bold py-1 px-5 bg-orange-300">
                  <label>Pending</label>
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