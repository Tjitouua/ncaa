import { useNavigate } from "react-router-dom";
import Menu from "./components/Menu";
import TopMenu from "./components/TopMenu";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import PrimaryButt from "../../ui/PrimaryButt";
import { GrEdit } from "react-icons/gr";
import DetailsInput from "./ui/DetailsInput";
import SecondaryButt from "../../ui/SecondaryButt";




const ProgramDetails = () => {

   const [showMenu, setShowMenu] = useState(false);

   const navigate = useNavigate();


   const program = {
      program_name: "Dangerous Goods Handling",
      program_desc: "IATA DGR compliance training.",
      duration: "5 days",
      category: "Mandatory",
      provider: "Internal",
   };


    return (
       <div className="w-full min-h-screen flex">
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          <div className="w-full xl:w-[82%] min-h-screen text-secondary/80 bg-secondaryy">
             <TopMenu setShowMenu={setShowMenu} title="Employees" />
 
             <div className="w-full min-h-screen items-center flex flex-col gap-3 px-2 md:px-6 py-8">
                <div className="w-full"><label onClick={() => navigate("/admin/training_programs")}><IoArrowBack className="cursor-pointer hover:text-primary" /></label></div>
                {/* Program Div  */}
                <div className="w-2/4 flex mt-10 flex-col gap-4 py-3">

                    <div className="pb-2 bg-white shadow-xs shadow-black/10 ">

                    <div className="w-full mb-4 py-5 px-5 bg-primaryy">
                      <div className="w-35 h-20 bg-[url('/images/ncaa-logo.png')] bg-center bg-cover"></div>
                    </div>

                        <div className="flex items-center px-6 justify-between pb-4 border-b border-secondary/40">
                           <label className="font-bold">Training Program</label>
                           <PrimaryButt>Edit <GrEdit /></PrimaryButt>
                        </div>
                        <div className="w-full py-2 px-6">
                           <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5">
                              <DetailsInput className="text-secondary/50" label="Training Name" value={program.program_name}/>
                              <DetailsInput className="text-secondary/50" label="Description" value={program.program_desc}/>
                              <DetailsInput className="text-secondary/50" label="Duration" value={program.duration}/>
                              <DetailsInput className="text-secondary/50" label="Category" value={program.category}/>
                              <DetailsInput className="text-secondary/50" label="Provider" value={program.provider}/>
                           </div>
                        </div>
                    </div>

                </div>

             </div>


          </div>
       </div>
    );
}

export default ProgramDetails;


// border border-secondary/30 py-2 px-3 mt-2

{/* <img src="/images/spillo.jpg" className="w-full h-full" />  */}
// shadow-xs shadow-black/30 