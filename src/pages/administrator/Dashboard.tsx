import Menu from "./components/Menu";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import TopMenu from "./components/TopMenu";




const Dashboard = () => {
    return (
       <div className="w-full min-h-screen flex">
          <Menu />
          <div className="w-full xl:w-[82%] min-h-screen text-secondary/80 bg-secondaryy">
             <TopMenu />
          </div>
       </div>
    );
}

export default Dashboard;