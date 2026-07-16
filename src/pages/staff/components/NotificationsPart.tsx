import { FaCheck } from "react-icons/fa";
import NotificationUI from "../ui/NotificationUI";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";




const NotificationsPart = () => {


    const navigate = useNavigate();
    const [showUnread, setShowUnread] = useState(true);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [notifications2, setNotifications2] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [notifCount, setNotifCount] = useState(0);
    const emailRef = useRef<string | null>(null);



    const markAsRead = async (email: string) => {
        await fetch("http://localhost/ncaa/staff/mark_notification_read.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });
    };


    // Not read 
    useEffect(() => {

        const checkSession = async () => {
            const res = await fetch("http://localhost/ncaa/login/session.php", {
                method: "GET",
                credentials: "include"
            });

            const data = await res.json();

            if (!data.success) {
               navigate("/");
               return;
            }

            // await markAsRead(data.user.email);

            emailRef.current = data.user.email;

            fetchNotifications(data.user.email);
        }

        const fetchNotifications = async (email: string) => {
            try {
                const response = await fetch(
                    "http://localhost/ncaa/staff/unread_notifications.php",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email }),
                    }
                );

                const data = await response.json();

                if (data.success) {
                    setNotifications(data.data);
                    setNotifCount(data.data.length);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        checkSession();

    }, []);






    // Read 
    useEffect(() => {

        const checkSession = async () => {
            const res = await fetch("http://localhost/ncaa/login/session.php", {
                method: "GET",
                credentials: "include"
            });

            const data = await res.json();

            if (!data.success) {
               navigate("/");
               return;
            }

            fetchNotifications2(data.user.email);
        }

        const fetchNotifications2 = async (email) => {
            try {
                const response = await fetch(
                    "http://localhost/ncaa/staff/read_notifications.php",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email }),
                    }
                );

                const data = await response.json();

                if (data.success) {
                    setNotifications2(data.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        checkSession();

    }, []);





    useEffect(() => {
        return () => {
            if (emailRef.current) {
                markAsRead(emailRef.current);
            }
        }
    }, []);







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
                    <label onClick={() => setShowUnread(true)} className={`cursor-pointer ${showUnread ? "text-primary underline underline-offset-4 decoration-2" : "hover:underline"}`}>Unread ({notifCount})</label>
                    <label onClick={() => setShowUnread(false)} className={`cursor-pointer ${!showUnread ? "text-primary underline underline-offset-4 decoration-2" : "hover:underline"}`}>All</label>
                </div>
                <label className="text-primary flex items-center gap-2 cursor-pointer hover:underline"><FaCheck /> Mark all as read</label>
            </div>
            {/* Notification Div  */}
            {showUnread ? (
            <>
            <div className="flex text-xs text-secondary/50 flex-col gap-2">
               {/* <label className="mb-3">Today</label> */}
               {loading ? (
                  <div className="flex flex-col items-center justify-center gap-1 bg-secondary/5 text-secondary/70 py-6 px-4">
                     <label>Loading notifications...</label>
                  </div>
               ) : notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-1 bg-secondary/5 text-secondary/70 py-6 px-4">
                      <label>No unread notifications</label>
                  </div>
               ) : (
               notifications.map((notification) => (
               <NotificationUI 
                  key = {notification.id}
                  title = {notification.title}
                  desc = {notification.message}
                  date = {notification.sent_date}
                  onClick = {() => navigate(`/staff/assignment_details/${notification.training_id}`)}
               />
               ))
               )}
            </div>
            </>
            ) : (   
            <>
            <div className="flex text-xs text-secondary/50 flex-col gap-2">
               {/* <label className="mb-3">Today</label> */}
               {loading ? (
                    <div className="flex flex-col items-center justify-center gap-1 bg-secondary/5 text-secondary/70 py-6 px-4">
                        <label>Loading notifications...</label>
                    </div>
               ) : notifications2.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-1 bg-secondary/5 text-secondary/70 py-6 px-4">
                        <label>No notifications yet</label>
                    </div>
               ) : (
               notifications2.map((notification) => (
               <NotificationUI 
                  key = {notification.id}
                  title = {notification.title}
                  desc = {notification.message}
                  date = {notification.sent_date}
                  onClick = {() => navigate(`/staff/assignment_details/${notification.training_id}`)}
               />
               ))
               )}
            </div>
            </>
            )}






        </div>
    )
}

export default NotificationsPart;








    // const notifications2 = [
    //     {
    //         title: "New training assigned", 
    //         desc: "You have been assigned Fire Safety Training. Complete it before 15 August 2026.",
    //         date: "2026-06-29, 8:16:24 AM "
    //     },
    //     {
    //         title: "New training assigned", 
    //         desc: "You have been assigned Fire Safety Training. Complete it before 15 August 2026.",
    //         date: "2026-06-29, 8:16:24 AM "
    //     },
    //     {
    //         title: "New training assigned", 
    //         desc: "You have been assigned Fire Safety Training. Complete it before 15 August 2026.",
    //         date: "2026-06-29, 8:16:24 AM "
    //     },
    //     {
    //         title: "New training assigned", 
    //         desc: "You have been assigned Fire Safety Training. Complete it before 15 August 2026.",
    //         date: "2026-06-29, 8:16:24 AM "
    //     },
    // ];






    
    // useEffect(() => {

    //     const handleLeave = () => {
    //         if (emailRef.current) {
    //             const payload = JSON.stringify({ email: emailRef.current });
    
    //             navigator.sendBeacon(
    //                 "http://localhost/ncaa/staff/mark_notification_read.php",
    //                 payload
    //             );
    //         }
    //     };
    
    //     return () => {
    //         handleLeave();
    //     };
    
    // }, []);