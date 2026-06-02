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
             <div className="w-full min-h-screen text-secondary/90 px-2 md:px-6">
                 {/* Welcome Div  */}
            <div className="flex flex-col mt-9 mb-1">
               <label className="font-bold text-xl">Welcome, Tjitouua Mapoha</label>
               <label className="text-secondary/50 text-sm">Software Developer · ICT</label>
            </div>
             </div>
          </div>
       </div>
    );
}

export default Dashboard2;