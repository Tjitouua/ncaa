import { useState } from "react";
import TopMenu from "./components/TopMenu";
import Menu from "./components/Menu";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import Inputs from "./ui/Inputs";
import PrimaryButt from "../../ui/PrimaryButt";
import { RiAddLargeLine } from "react-icons/ri";




const EmployeeAdd = () => {

   const [showMenu, setShowMenu] = useState(false);

   const navigate = useNavigate();



    return (
       <div className="w-full min-h-screen flex">
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          <div className="w-full xl:w-[82%] min-h-screen text-secondary/80 bg-secondaryy">
             <TopMenu setShowMenu={setShowMenu} title="Employees" />
             <div className="w-full min-h-screen flex flex-col gap-3 px-2 py-8 md:px-6">
                <label onClick={() => navigate("/admin/employees")}><IoArrowBack className="cursor-pointer hover:text-primary" /></label>



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
                      <label className="font-bold">Add New Employee</label>
                      <label className="text-xs mb-3 text-secondary/40">Register a new employee in the system.</label>
                      <div className="w-full pb-7 py-2 gap-4 text-secondary/60 grid grid-cols-1 sm:grid-cols-2">
                          <Inputs
                            label="Employee ID"
                            placeholder="Enter the employee ID"
                            error="Please enter the employee ID"
                          />
                          <Inputs
                            label="Full Name"
                            placeholder="Enter employee full name"
                            error="Please enter the employee full name"
                          />
                          <Inputs
                            label="Email"
                            placeholder="Enter employee email"
                            error="Please enter the employee email"
                          />
                          <Inputs
                            label="Position"
                            placeholder="Enter the employee position"
                            error="Please enter the employee position"
                          />
                          <Inputs
                            label="Department"
                            placeholder="Enter the employee department"
                            error="Please enter the employee department"
                          />
                          <Inputs
                            label="Trainings"
                            placeholder="Enter the employee trainings"
                            error="Please enter the employee trainings"
                          />
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

export default EmployeeAdd;