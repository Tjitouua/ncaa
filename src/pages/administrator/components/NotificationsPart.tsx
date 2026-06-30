import { FaCheck } from "react-icons/fa";
import NotificationUI from "../ui/NotificationUI";
import { useNavigate } from "react-router-dom";
import { useState } from "react";




const NotificationsPart = () => {


    const navigate = useNavigate();
    const [showUnread, setShowUnread] = useState(true);



    const notifications = [
        {
            title: "New training assigned", 
            desc: "You have been assigned Fire Safety Training. Complete it before 15 August 2026.",
            date: "2026-06-29, 8:16:24 AM "
        },
        {
            title: "New training assigned", 
            desc: "You have been assigned Fire Safety Training. Complete it before 15 August 2026.",
            date: "2026-06-29, 8:16:24 AM "
        },
        {
            title: "New training assigned", 
            desc: "You have been assigned Fire Safety Training. Complete it before 15 August 2026.",
            date: "2026-06-29, 8:16:24 AM "
        },
    ];




    const notifications2 = [
        {
            title: "New training assigned", 
            desc: "You have been assigned Fire Safety Training. Complete it before 15 August 2026.",
            date: "2026-06-29, 8:16:24 AM "
        },
        {
            title: "New training assigned", 
            desc: "You have been assigned Fire Safety Training. Complete it before 15 August 2026.",
            date: "2026-06-29, 8:16:24 AM "
        },
        {
            title: "New training assigned", 
            desc: "You have been assigned Fire Safety Training. Complete it before 15 August 2026.",
            date: "2026-06-29, 8:16:24 AM "
        },
        {
            title: "New training assigned", 
            desc: "You have been assigned Fire Safety Training. Complete it before 15 August 2026.",
            date: "2026-06-29, 8:16:24 AM "
        },
    ];



    return (
        <div className="w-full min-h-screen flex flex-col gap-3 py-6 px-2 md:px-6">
            {/* Top Div  */}
            <div className="w-full flex flex-col">
                <label className="text-lg">Notifications</label>
                <label className="text-xs text-secondary/60">Stay updated with your latest notifications</label>
            </div>
            {/* Stats Div  */}
            <div className="flex items-center mb-4 text-xs text-secondary/50 font-bold justify-between">
                <div className="flex items-center gap-5">
                    <label onClick={() => setShowUnread(true)} className={`cursor-pointer ${showUnread ? "text-primary underline underline-offset-4 decoration-2" : "hover:underline"}`}>Unread (3)</label>
                    <label onClick={() => setShowUnread(false)} className={`cursor-pointer ${!showUnread ? "text-primary underline underline-offset-4 decoration-2" : "hover:underline"}`}>All</label>
                </div>
                <label className="text-primary flex items-center gap-2 cursor-pointer hover:underline"><FaCheck /> Mark all as read</label>
            </div>
            {/* Notification Div  */}
            {showUnread ? (
            <>
            <div className="flex text-xs text-secondary/50 flex-col gap-2">
               <label className="mb-3">Today</label>
               {notifications.map((notification, index) => (
               <NotificationUI 
                  key = {index}
                  title = {notification.title}
                  desc = {notification.desc}
                  date = {notification.date}
               />
               ))}
            </div>
            </>
            ) : (   
            <>
            <div className="flex text-xs text-secondary/50 flex-col gap-2">
               <label className="mb-3">Today</label>
               {notifications2.map((notification, index) => (
               <NotificationUI 
                  key = {index}
                  title = {notification.title}
                  desc = {notification.desc}
                  date = {notification.date}
               />
               ))}
            </div>
            </>
            )}










        </div>
    )
}

export default NotificationsPart;