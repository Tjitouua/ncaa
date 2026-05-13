import Menu from "./components/Menu";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import TopMenu from "./components/TopMenu";
import { useState } from "react";




const Dashboard = () => {

   const [showMenu, setShowMenu] = useState(false);


    return (
       <div className="w-full min-h-screen flex">
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          <div className="w-full xl:w-[82%] min-h-screen text-secondary/80 bg-secondaryy">
             <TopMenu setShowMenu={setShowMenu} />
          </div>
       </div>
    );
}

export default Dashboard;