import Menu from "./components/Menu";
import NotificationsPart from "./components/NotificationsPart";
import TopMenu from "./components/TopMenu";
import { useState } from "react";




const NotificationsStaff = () => {

   const [showMenu, setShowMenu] = useState(false);


    return (
       <div className="w-full min-h-screen flex">
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          <div className="w-full xl:w-[82%] min-h-screen text-secondary/80 bg-secondaryy">
             <TopMenu setShowMenu={setShowMenu} title="Notifications" />
             <NotificationsPart />
          </div>
       </div>
    );
}

export default NotificationsStaff;