import { useState } from "react";
import Menu from "./components/Menu";
import TopMenu from "./components/TopMenu";





const Dashboard2 = () => {

   const [showMenu, setShowMenu] = useState(false);


    return (
       <div className="w-full min-h-screen flex">
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          <div className="w-full xl:w-[82%] min-h-screen text-secondary/80 bg-secondaryy">
             <TopMenu setShowMenu={setShowMenu} title="My Dashboard" />
          </div>
       </div>
    );
}

export default Dashboard2;