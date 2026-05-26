import { useState } from "react";
import TopMenu from "./components/TopMenu";
import Menu from "./components/Menu";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import Inputs from "./ui/Inputs";
import PrimaryButt from "../../ui/PrimaryButt";
import { RiAddLargeLine } from "react-icons/ri";




const ProgramAdd = () => {

   const [showMenu, setShowMenu] = useState(false);

   const navigate = useNavigate();



    return (
       <div className="w-full min-h-screen flex">
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          <div className="w-full xl:w-[82%] min-h-screen text-secondary/80 bg-secondaryy">
             <TopMenu setShowMenu={setShowMenu} title="Employees" />
             <div className="w-full min-h-screen flex flex-col gap-3 px-2 py-8 md:px-6">
                <label onClick={() => navigate("/admin/training_programs")}><IoArrowBack className="cursor-pointer hover:text-primary" /></label>



             {/* Form  */}
             <div className="w-full py-3 min-h-screen flex items-start justify-center">
                <div className="w-full md:w-2/4 flex flex-col bg-white shadow-md shadow-black/30">
                {/* <div className="w-full bg-secondaryy"><label onClick={() => navigate("/admin/employees")}><IoArrowBack className="cursor-pointer hover:text-primary" /></label></div> */}
                  {/* Top Part  */}
                   <div className="w-full py-5 px-5 bg-primaryy">
                      <div className="w-35 h-20 bg-[url('/images/ncaa-logo.png')] bg-center bg-cover"></div>
                   </div>
                   {/* Form (WHite Part) */}
                   <div className="bg-white flex flex-col py-5 pb-10 px-5">
                      <label className="font-bold">Add Training Program</label>
                      <label className="text-xs mb-3 text-secondary/40">Register a new program in the system.</label>
                      <div className="w-full pb-7 py-2 gap-4 text-secondary/60 grid grid-cols-1 sm:grid-cols-2">
                          <Inputs
                            label="Training Name"
                            placeholder="Enter the program name"
                            error="Please enter the program name"
                          />
                          <Inputs
                            label="Description"
                            placeholder="Enter training description"
                            error="Please enter the training description"
                          />
                          <Inputs
                            label="Duration"
                            placeholder="Enter duration"
                            error="Please enter the duration of the training"
                          />
                          <Inputs
                            label="Category"
                            placeholder="Enter the category of the training"
                            error="Please enter the category of the training"
                          />
                          <Inputs
                            label="Provider"
                            placeholder="Enter the provider of the training"
                            error="Please enter the provider of the training"
                          />
                          {/* <Inputs
                            label="Trainings"
                            placeholder="Enter the employee trainings"
                            error="Please enter the employee trainings"
                          /> */}
                      </div>
                      <PrimaryButt className="w-full"><RiAddLargeLine /> Add Employee</PrimaryButt>
                   </div>
                </div>
             </div>




             </div>
          </div>
       </div>
    );
}

export default ProgramAdd;