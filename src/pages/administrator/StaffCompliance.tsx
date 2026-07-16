import EmployeesPart from "./components/EmployeesPart";
import Menu from "./components/Menu";
import StaffCompliancePart from "./components/StaffCompliancePart";
import TopMenu from "./components/TopMenu";
import { useState } from "react";




const StaffCompliance = () => {

   const [showMenu, setShowMenu] = useState(false);


    return (
       <div className="w-full min-h-screen flex">
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          <div className="w-full xl:w-[82%] min-h-screen text-secondary/80 bg-secondaryy">
             <TopMenu setShowMenu={setShowMenu} title="Staff Compliance" />
             <StaffCompliancePart />
          </div>
       </div>
    );
}

export default StaffCompliance;