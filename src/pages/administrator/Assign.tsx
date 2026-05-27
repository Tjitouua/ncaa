import Menu from "./components/Menu";
import RecentAssignments from "./components/RecentAssignments";
import TopMenu from "./components/TopMenu";
import { useState } from "react";




const Assign = () => {

   const [showMenu, setShowMenu] = useState(false);


    return (
       <div className="w-full min-h-screen flex">
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          <div className="w-full xl:w-[82%] min-h-screen text-secondary/80 bg-secondaryy">
             <TopMenu setShowMenu={setShowMenu} title="Assign Training" />
             <div className="w-full min-h-screen py-8 px-2 md:px-6 flex items-start justify-between gap-5">
                 {/* New Assignment Div  */}
                 <div className="w-[35%] py-5 h-[80vh] bg-white shadow-sm shadow-secondary/30">

                 </div>
                 {/* Recent Assignments Div  */}
                 <RecentAssignments />
             </div>
          </div>
       </div>
    );
}

export default Assign;