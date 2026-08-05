import { RxDashboard } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { FaClockRotateLeft } from "react-icons/fa6";
import { GrCertificate } from "react-icons/gr";
import { GrNotification } from "react-icons/gr";
import { FiSend } from "react-icons/fi";



const menuItems = [
   {
      name: "Dashboard",
      path: "/staff/dashboard",
      icon: <RxDashboard />
   },
   {
      name: "My Certifications",
      path: "/staff/my_certifications",
      icon: <GrCertificate />
   },
   {
      name: "My Training History",
      path: "/staff/my_training_history",
      icon: <FaClockRotateLeft />
   },
   {
      name: "Request Training",
      path: "/staff/request_training",
      icon: <FiSend />
   },
   {
      name: "Notifications",
      path: "/staff/notifications",
      icon: <GrNotification />
   },
]



const Menu = ({ showMenu, setShowMenu }) => {
   return (
    <>
     {showMenu && (
        <div
           onClick={() => setShowMenu(false)}
           className="fixed inset-0 bg-black/30 z-40 xl:hidden"
        />
     )}

      <div className={`fixed xl:sticky top-0 shadow-sm shadow-secondary/20 left-0 w-[75%] md:w-[45%] xl:w-[18%] h-screen
       bg-white flex flex-col py-3 px-5 z-90 transition-all duration-1000
         ${showMenu ? "translate-x-0": "-translate-x-full"}
         xl:translate-x-0
       `}>
          {/* Top Part  */}
          <div className="w-full py-3 flex gap-4 text-secondary/80 justify-between border-b-2">
             {/* <div className="w-[40%] h-15 bg-[url('images/ncaa_logo2.png')] bg-cover bg-center"></div> */}
             <div className="flex flex-col">
                <label className="font-bold">NCAA</label>
                <label className="text-xs">Training Record</label>
                <label className="text-xs">Management System</label>
             </div>
             <div className="w-[40%] h-15 bg-[url('/images/ncaa_logo2.png')] bg-cover bg-center"></div>
          </div>

          {/* Menu Part  */}
          <div className="flex py-7 text-sm flex-col">
             <label className="text-xs text-secondary/60 mb-4 mt-2 ml-2">STAFF PORTAL</label>
             {menuItems.map((item, index) => (
             <NavLink 
                 key={index} 
                 to={item.path} 
                 onClick={() => setShowMenu(false)}
                 className={({ isActive }) => 
                `w-full py-2 px-2 font-bold cursor-pointer flex items-center gap-4
                 ${isActive
                    ? "bg-secondaryy"
                    : "text-secondary/80 hover:bg-secondaryy"
                 }
                `
                }>
                {item.icon}
                <label className="text-secondary/80">{item.name}</label>
             </NavLink>
             ))}
          </div>
      </div>
    </>
   );
}

export default Menu;