import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";


const TopMenu = ({ setShowMenu }) => {
    return (
        <div className="w-full py-3 bg-white border-l border-l-secondaryy flex px-6 justify-between items-center">
            {/* Name  */}
            <div className="flex items-center gap-5">
                <MdOutlineSpaceDashboard 
                 onClick={() => setShowMenu(true)}
                 className="font-bold text-xl flex xl:hidden" />
                <label className="font-bold text-xl">Dashboard</label>
            </div>

            <div className="flex items-center gap-3">
                {/* Notifications  */}
                <div className="flex gap-1 items-center px-1 rounded-lg cursor-pointer hover:bg-secondaryy">
                   <IoNotificationsOutline className="font-bold text-xl" />
                   <div className="h-8">
                     <div className="text-white flex items-center -ml-1 justify-center w-4 p-1 h-4 rounded-full bg-red-600 hover:bg-secondary/30">
                       <label className="text-[10px] font-bold">1</label>
                     </div>
                   </div>
                </div>

                {/* User  */}
                <div className="flex items-center gap-3 cursor-pointer hover:bg-secondary/20 px-1 py-[2px] pr-2 rounded-full">
                    <div className="bg-secondaryy p-2 rounded-full">
                       <label className="text-md font-bold">AD</label>
                    </div>
                    <div className="text-xs flex flex-col">
                        <label className="font-bold">Administrator</label>
                        <label className="-mt-[2px]">Admin</label>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TopMenu;