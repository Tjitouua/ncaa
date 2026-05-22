import { useNavigate } from "react-router-dom";
import Menu from "./components/Menu";
import TopMenu from "./components/TopMenu";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import PrimaryButt from "../../ui/PrimaryButt";
import { GrEdit } from "react-icons/gr";
import DetailsInput from "./ui/DetailsInput";
import SecondaryButt from "../../ui/SecondaryButt";




const EmployeeDetails = () => {

   const [showMenu, setShowMenu] = useState(false);

   const navigate = useNavigate();

   const training = [
     {
       name: "ICAO Aviation English Proficiency",
       state: "Completed"
     },
     {
        name: "Human Factors in Aviation",
        state: "Completed"
      },
   ];


   const employee = {
      employeeId: "EMP-001",
      firstName: "Tjitouua",
      lastName: "Mapoha",
      email: "mapohaT@ncaa.na",
      phone: "+264 81 330 1958",
      role: "Software Developer",
      department: "ICT",
      trainings: 2,
      city: "Windhoek",
      address: "Single Quaters, erf 2108",
      postalCode: "P O Box 735"
   };


    return (
       <div className="w-full min-h-screen flex">
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          <div className="w-full xl:w-[82%] min-h-screen text-secondary/80 bg-secondaryy">
             <TopMenu setShowMenu={setShowMenu} title="Employees" />
 
             <div className="w-full min-h-screen items-center flex flex-col gap-3 px-2 md:px-6 py-6">
                <div className="w-full"><label onClick={() => navigate("/admin/employees")}><IoArrowBack className="cursor-pointer hover:text-primary" /></label></div>
                {/* Employee Profile Div  */}
                <div className="w-3/4 min-h-screen flex flex-col gap-4 py-3">
                {/* <div className="w-full mb-2"><label onClick={() => navigate("/admin/employees")}><IoArrowBack className="cursor-pointer hover:text-primary" /></label></div> */}

                    {/* Top Part  */}
                    <div className="w-full py-3 px-7 flex gap-8 bg-white shadow-xs shadow-black/30  items-center">
                         <div className="rounded-full w-25 h-25 bg-[url('/images/spillo.jpg')] bg-center bg-cover"><img src="/images/spillo.jpg" className="w-full rounded-full h-full" /></div>
                         <div className="p-2 flex flex-col gap-1">
                             <label className="font-bold">Tjitouua Mapoha</label>
                             <label className="text-secondary/50 -mt-1">Software Developer · ICT</label>
                             <label className="text-xs">mapohaT@ncaa.na</label>
                         </div>
                    </div>

                  {/* <div className="grid items-start grid-cols-1 md:grid-cols-2 gap-5"> */}
                    {/* Personal Information  */}
                    <div className="py-3 pb-1 px-7 bg-white shadow-xs shadow-black/30 ">
                        <div className="flex items-center justify-between pb-4 border-b border-secondary/40">
                           <label className="font-bold">Personal Information</label>
                           <PrimaryButt>Edit <GrEdit /></PrimaryButt>
                        </div>
                        <div className="w-full py-2">
                           <div className="w-5/6 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                              <DetailsInput label="Employee ID" value={employee.employeeId}/>
                              <DetailsInput label="First Name" value={employee.firstName}/>
                              <DetailsInput label="Last Name" value={employee.lastName}/>
                              <DetailsInput label="Email Address" value={employee.email}/>
                              <DetailsInput label="Phone Number" value={employee.phone}/>
                              <DetailsInput label="User Role" value={employee.phone}/>
                              <DetailsInput label="Department" value={employee.department}/>
                              <DetailsInput label="Trainings" value={employee.trainings}/>
                           </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                    {/* Address  */}
                    <div className="py-3 pb-1 px-7 bg-white shadow-xs shadow-black/30 ">
                        <div className="flex items-center justify-between pb-4 border-b border-secondary/40">
                           <label className="font-bold">Address</label>
                           <SecondaryButt className="!bg-secondary/30">Edit <GrEdit /></SecondaryButt>
                        </div>
                        <div className="w-full py-2">
                           <div className="w-5/6 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                              <DetailsInput label="City" value={employee.city}/>
                              <DetailsInput label="Address" value={employee.address}/>
                              <DetailsInput label="Postal Code" value={employee.postalCode}/>
                           </div>
                        </div>
                    </div>
                    {/* Training History  */}
                    <div className="w-full py-3 pb-5 px-7 bg-white shadow-xs shadow-black/30 ">
                        <div className="flex items-center justify-between pb-4 border-b border-secondary/40">
                           <label className="font-bold">Training History</label>
                           {/* <SecondaryButt className="!bg-secondary/30">Edit <GrEdit /></SecondaryButt> */}
                        </div>
                        <div className="w-full flex flex-col gap-2 py-1">
                            {training.map((training, index) => (
                            <div key={index} className="w-full text-secondary/60 py-2 flex items-center justify-between">
                                <label className="text-xs font-bold">{training.name}</label>
                                <div className="py-2 flex items-center justify-center px-3 bg-green-500 text-white font-bold rounded-md">
                                    <label className="text-xs">{training.state}</label>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                   {/* </div> */}
                  </div>
                </div>

             </div>


          </div>
       </div>
    );
}

export default EmployeeDetails;




{/* <img src="/images/spillo.jpg" className="w-full h-full" />  */}
// shadow-xs shadow-black/30 