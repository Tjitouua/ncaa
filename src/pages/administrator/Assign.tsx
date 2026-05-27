import Menu from "./components/Menu";
import TopMenu from "./components/TopMenu";
import { useState } from "react";




const Assign = () => {

   const [showMenu, setShowMenu] = useState(false);


    return (
       <div className="w-full min-h-screen flex">
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          <div className="w-full xl:w-[82%] min-h-screen text-secondary/80 bg-secondaryy">
             <TopMenu setShowMenu={setShowMenu} title="Assign Training" />
             <div className="w-full min-h-screen bg-red-400 px-2 md:px-6">

             </div>
          </div>
       </div>
    );
}

export default Assign;