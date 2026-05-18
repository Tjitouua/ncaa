import { useEffect, useRef, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";


const TopMenu = ({ setShowMenu, title = "Dashboard" }) => {

    const navigate = useNavigate();


    // Logout 
    const [showPopup, setShowPop] = useState(false);

    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(
                popupRef.current &&
                !popupRef.current.contains(event.target)
            ) {
                setShowPop(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
           document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);


    // Notifications 
    const [showPopup2, setShowPop2] = useState(false);

    const popupRef2 = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(
                popupRef.current &&
                !popupRef.current.contains(event.target)
            ) {
                setShowPop2(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
           document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);



    return (
        <div ref={popupRef} className="sticky top-0 w-full py-3 bg-white shadow-xs shadow-secondary/20 border-l border-l-secondaryy flex px-2 md:px-6 justify-between items-center">
            {/* Name  */}
            <div className="flex items-center gap-5">
                <MdOutlineSpaceDashboard 
                 onClick={() => setShowMenu(true)}
                 className="font-bold text-xl flex xl:hidden" />
                <label className="font-bold text-xl">{title}</label>
            </div>

            <div className="flex items-center gap-3">
                {/* Notifications  */}
                <div onClick={() => setShowPop2(!showPopup2)} className="flex gap-1 items-center px-1 rounded-lg cursor-pointer hover:bg-secondaryy">
                   <IoNotificationsOutline className="font-bold text-xl" />
                   <div className="h-8">
                     <div className="text-white flex items-center -ml-1 justify-center w-4 p-1 h-4 rounded-full bg-red-600 hover:bg-secondary/30">
                       <label className="text-[10px] font-bold">1</label>
                     </div>
                   </div>
                </div>

                {/* User  */}
                <div onClick={() => setShowPop(!showPopup)} className="flex items-center gap-3 cursor-pointer hover:bg-secondary/20 px-1 py-[2px] pr-2 rounded-full">
                    <div className="bg-secondaryy p-2 rounded-full">
                       <label className="text-md font-bold">AD</label>
                    </div>
                    <div className="text-xs flex flex-col">
                        <label className="font-bold">Administrator</label>
                        <label className="-mt-[2px]">Admin</label>
                    </div>
                </div>
            </div>


            {/* Pop Ups  */}
            <div className="right-7 z-50 fixed top-15 flex items-start justify-end">

               {/* Notifications  */}
               {showPopup2 && (
               <div className="flex flex-col min-w-75 bg-white shadow-sm shadow-black/30 rounded-lg">
                   <div className="w-full py-3 px-3 flex items-center justify-between border-b border-secondaryy">
                      <label className="font-bold">Notifications</label>
                      <div className="">
                        <label className="text-xs hover:underline cursor-pointer">View all</label>
                      </div>
                   </div>
                   <div className="w-full py-2 px-3 flex flex-col items-start border-t border-secondaryy">
                      <label className="font-bold">Certification expiring soon</label>
                      <label className="text-xs hover:underline">AVSEC-2024-042 expires in 20 days.</label>
                      <label className="text-[10px]">5/19/2026</label>
                   </div>
                   <div className="w-full py-2 px-3 flex flex-col items-start border-t border-secondaryy">
                      <label className="font-bold">Certification expiring soon</label>
                      <label className="text-xs hover:underline">AVSEC-2024-042 expires in 10 days.</label>
                      <label className="text-[10px]">5/19/2026</label>
                   </div>
               </div>
               )}

               {/* Logout  */}
               {showPopup && (
               <div className="flex flex-col min-w-50 bg-white shadow-sm shadow-black/30 rounded-lg">
                  <div className="flex py-3 px-3 flex-col border-b border-secondaryy">
                    <label className="font-bold text-sm">Administrator</label>
                    <label className="text-xs">admin • Admin</label>
                  </div>
                  <div className="flex px-2 py-1 gap-3">
                     <button onClick={() => navigate("/")} className="w-full py-2 px-2 justify-start flex gap-3 rounded-sm items-center hover:bg-secondaryy cursor-pointer hover:text-red-600"><MdOutlineLogout /> Sign out</button>
                  </div>
               </div>
               )}


            </div>

        </div>
    )
}

export default TopMenu;