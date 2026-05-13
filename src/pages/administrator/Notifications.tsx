import Menu from "./components/Menu";
import TopMenu from "./components/TopMenu";
import { useState } from "react";




const Notifications = () => {

   const [showMenu, setShowMenu] = useState(false);


    return (
       <div className="w-full min-h-screen flex">
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          <div className="w-full xl:w-[82%] min-h-screen text-secondary/80 bg-secondaryy">
             <TopMenu setShowMenu={setShowMenu} title="Notifications" />
          </div>
       </div>
    );
}

export default Notifications;