import LoginForm from "../login/components/LoginForm";
import ChangePassword from "./components/ChangePassword";
import Menu from "./components/Menu";
import TopMenu from "./components/TopMenu";
import { useState } from "react";




const AdminPassword = () => {

   const [showMenu, setShowMenu] = useState(false);


    return (
       <div className="w-full min-h-screen flex">
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          <div className="w-full xl:w-[82%] min-h-screen text-secondary/80 bg-secondaryy">
             <TopMenu setShowMenu={setShowMenu} title="Change Password" />
             <div className="w-full min-h-screen py-5 px-2 md:px-6 flex flex-col md:flex-row items-start justify-between gap-5">
             <div className="w-full min-h-screen flex items-center justify-center">
                <ChangePassword />
             </div>
             </div>
          </div>
       </div>
    );
}

export default AdminPassword;