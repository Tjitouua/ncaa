import EmployeesPart from "./components/EmployeesPart";
import Menu from "./components/Menu";
import TopMenu from "./components/TopMenu";
import { useState } from "react";
import TrainingMatrixPart from "./components/TrainingMatrixPart";
import AddingRole from "./components/AddingRole";
import AddingRequirement from "./components/AddingRequirement";




const TrainingMatrix = () => {

   const [showMenu, setShowMenu] = useState(false);
   const [showAddRole, setShowAddRole] = useState(false);
   const [showAddRequirement, setShowAddRequirement] = useState(false);

   const [selectedRole, setSelectedRole] = useState<any>(null);


    return (
       <div className="w-full min-h-screen flex">
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          <div className="w-full xl:w-[82%] min-h-screen text-secondary/80 bg-secondaryy">
             <TopMenu setShowMenu={setShowMenu} title="Training Matrix" />
             {showAddRequirement && (
              <AddingRequirement setShowAddRequirement={setShowAddRequirement} selectedRole={selectedRole} />
             )}
             {showAddRole && (
               <AddingRole setShowAddRole={setShowAddRole} />
             )}
             <TrainingMatrixPart 
                 setShowAddRole={setShowAddRole} 
                 setShowAddRequirement={setShowAddRequirement} 
                 selectedRole={selectedRole} 
                 setSelectedRole={setSelectedRole} 
             />
          </div>
       </div>
    );
}

export default TrainingMatrix;