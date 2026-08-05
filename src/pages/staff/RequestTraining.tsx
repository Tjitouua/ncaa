import Menu from "./components/Menu";
import RequestTrainingPart from "./components/RequestTrainingPart";
import TopMenu from "./components/TopMenu";
import { useState } from "react";





const RequestTraining = () => {

   const [showMenu, setShowMenu] = useState(false);

   const [selectedRole, setSelectedRole] = useState<any>(null);


    return (
       <div className="w-full min-h-screen flex">
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          <div className="w-full xl:w-[82%] min-h-screen text-secondary/80 bg-secondaryy">
             <TopMenu setShowMenu={setShowMenu} title="Training Requests" />
             <RequestTrainingPart />
          </div>
       </div>
    );
}

export default RequestTraining;