import DashboardPart from "./components/DashboardPart";
import Menu from "./components/Menu";
import TopMenu from "./components/TopMenu";
import { useState } from "react";




const Dashboard = () => {

   const [showMenu, setShowMenu] = useState(false);


    return (
       <div className="w-full h-screen flex">
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          <div className="w-full xl:w-[82%] min-h-screen overflow-y-auto text-secondary/80 bg-secondaryy">
             <TopMenu setShowMenu={setShowMenu} title="Dashboard" />
             <DashboardPart />
          </div>
       </div>
    );
}

export default Dashboard;