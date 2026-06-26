import Menu from "./components/Menu";
import TopMenu from "./components/TopMenu";
import { useState } from "react";




const NotificationsStaff = () => {

   const [showMenu, setShowMenu] = useState(false);


    return (
       <div className="w-full min-h-screen flex">
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          <div className="w-full xl:w-[82%] min-h-screen text-secondary/80 bg-secondaryy">
             <TopMenu setShowMenu={setShowMenu} title="Notifications" />
             <div className="w-full min-h-screen flex flex-col gap-3 py-6 px-2 md:px-6 bg-red-400">

             </div>
          </div>
       </div>
    );
}

export default NotificationsStaff;