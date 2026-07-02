import { FaCheck } from "react-icons/fa";
import NotificationUI from "../ui/NotificationUI";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";




const NotificationsPart = () => {


    const navigate = useNavigate();
    const [showUnread, setShowUnread] = useState(true);
    const [activeTab, setActiveTab] = useState("New Upload");

    const [newUpload, setNewUpload] = useState([]);
    const [trainingOverdue, setTrainingOverdue] = useState([]);
    const [certificateExpiring, setCertificateExpiring] = useState([]);
    const [expiredCertificate, setExpiredCertificate] = useState([]);
    const [all, setAll] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notifCount, setNotifCount] = useState(0);

    // const [counts, setCounts] = useState({newUpload: 0, expiring: 0, expired: 0, overdue: 0, all: 0});

    const prevTabRef = useRef(activeTab);





    const markTabAsRead = async (tab) => {
         let url = "";

         switch (tab) {
            case "New Upload":
                url = "http://localhost/ncaa/notifications/admin/mark_new_upload_read.php";
                break;

            case "Certification Expiring":
                url = "http://localhost/ncaa/notifications/admin/mark_certificate_expiring_read.php";
                break;

            case "Expired Certification":
                url = "http://localhost/ncaa/notifications/admin/mark_expired_certificate_read.php";
                break;

            case "Overdue Training":
                url = "http://localhost/ncaa/notifications/admin/mark_training_overdue_read.php";
                break;

            // case "All":
            //     url = "http://localhost/ncaa/notifications/admin/all.php";
            //     break;

            default:
                return; 
         }

         await fetch(url, { method: "POST" });
    }



    useEffect(() => {
        const prevTab = prevTabRef.current;
        const currentTab = activeTab;

        if (prevTab !== currentTab) {
            markTabAsRead(prevTab);
        }

        prevTabRef.current = currentTab;

    }, [activeTab]);



    // New Upload 
    useEffect(() => {
        fetch("http://localhost/ncaa/notifications/admin/new_upload.php")
        .then((response) => response.json())
        .then((data) => {
            if(data.success) {
                setNewUpload(data.data);
                // setNotifCount(data.data.length);
            }
        })
        .catch((error) => {
            console.error("Error fetching new upload notifications: ", error);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);




    // Training Overdue 
    useEffect(() => {
        fetch("http://localhost/ncaa/notifications/admin/training_overdue.php")
        .then((response) => response.json())
        .then((data) => {
            if(data.success) {
                setTrainingOverdue(data.data);
                // setNotifCount(data.data.length);
            }
        })
        .catch((error) => {
            console.error("Error fetching new upload notifications: ", error);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);




    // Certification Expiring 
    useEffect(() => {
        fetch("http://localhost/ncaa/notifications/admin/certificate_expiring.php")
        .then((response) => response.json())
        .then((data) => {
            if(data.success) {
                setCertificateExpiring(data.data);
                // setNotifCount(data.data.length);
            }
        })
        .catch((error) => {
            console.error("Error fetching certification expiring notifications: ", error);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);




    // Expired Certification 
    useEffect(() => {
        fetch("http://localhost/ncaa/notifications/admin/expired_certificate.php")
        .then((response) => response.json())
        .then((data) => {
            if(data.success) {
                setExpiredCertificate(data.data);
                // setNotifCount(data.data.length);
            }
        })
        .catch((error) => {
            console.error("Error fetching expired certification notifications: ", error);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);





    // All 
    useEffect(() => {
        fetch("http://localhost/ncaa/notifications/admin/all.php")
        .then((response) => response.json())
        .then((data) => {
            if(data.success) {
                setAll(data.data);
                // setNotifCount(data.data.length);
            }
        })
        .catch((error) => {
            console.error("Error fetching all read notifications: ", error);
        })
        .finally(() => {
            setLoading(false);
        });
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
                <div className="flex items-center gap-8 flex-wrap">
                    {/* <label onClick={() => setActiveTab("unread")} className={`cursor-pointer ${activeTab === "unread" ? "text-primary underline underline-offset-4 decoration-2" : "hover:underline"}`}>Unread (3)</label> */}
                    <label onClick={() => setActiveTab("New Upload")} className={`cursor-pointer ${activeTab === "New Upload" ? "text-primary underline underline-offset-4 decoration-2" : "hover:underline"}`}>New Upload ({newUpload.length})</label>
                    <label onClick={() => setActiveTab("Certification Expiring")} className={`cursor-pointer ${activeTab === "Certification Expiring" ? "text-primary underline underline-offset-4 decoration-2" : "hover:underline"}`}>Certification Expiring ({certificateExpiring.length})</label>
                    <label onClick={() => setActiveTab("Expired Certification")} className={`cursor-pointer ${activeTab === "Expired Certification" ? "text-primary underline underline-offset-4 decoration-2" : "hover:underline"}`}>Expired Certifications ({expiredCertificate.length})</label>
                    <label onClick={() => setActiveTab("Overdue Training")} className={`cursor-pointer ${activeTab === "Overdue Training" ? "text-primary underline underline-offset-4 decoration-2" : "hover:underline"}`}>Overdue Training ({trainingOverdue.length})</label>
                    <label onClick={() => setActiveTab("All")} className={`cursor-pointer ${activeTab === "All" ? "text-primary underline underline-offset-4 decoration-2" : "hover:underline"}`}>All</label>
                </div>
                {/* <label className="text-primary flex items-center gap-2 cursor-pointer hover:underline"><FaCheck /> Mark all as read</label> */}
            </div>
            {/* Notification Div  */}
            
            

            {/* New Upload  */}
            {(activeTab === "New Upload") && (
            <div className="flex text-xs text-secondary/50 flex-col gap-2">
               {loading ? (
                  <div className="flex items-center justify-center flex-col gap-1 bg-secondary/5 text-secondary/70 py-7 px-4">
                     <label>Loading notifications...</label>
                  </div>
               ) : newUpload.length === 0 ? (
                  <div className="flex items-center justify-center flex-col gap-1 bg-secondary/5 text-secondary/70 py-7 px-4">
                     <label>No notifications available</label>
                  </div>
               ) : (
               newUpload.map((notification) => (
               <NotificationUI 
                  key = {notification.id}
                  title = {notification.title}
                  desc = {notification.message}
                  date = {notification.sent_date}
                  onClick = {() => navigate(`/admin/training_details/${notification.training_id}`)}
               />
               ))
               )}
            </div>
            )}




          {/* Certification Expiring  */}
           {(activeTab === "Certification Expiring") && (
            <div className="flex text-xs text-secondary/50 flex-col gap-2">
               {loading ? (
                  <div className="flex items-center justify-center flex-col gap-1 bg-secondary/5 text-secondary/70 py-7 px-4">
                     <label>Loading notifications...</label>
                  </div>
               ) : certificateExpiring.length === 0 ? (
                  <div className="flex items-center justify-center flex-col gap-1 bg-secondary/5 text-secondary/70 py-7 px-4">
                     <label>No notifications available</label>
                  </div>
               ) : (
               certificateExpiring.map((notification) => (
               <NotificationUI 
                  key = {notification.id}
                  title = {notification.title}
                  desc = {notification.message}
                  date = {notification.sent_date}
                  onClick = {() => navigate(`/admin/training_details/${notification.training_id}`)}
               />
               ))
               )}
            </div>
            )}




           {/* Expired Certification  */}
           {(activeTab === "Expired Certification") && (
            <div className="flex text-xs text-secondary/50 flex-col gap-2">
               {loading ? (
                  <div className="flex items-center justify-center flex-col gap-1 bg-secondary/5 text-secondary/70 py-7 px-4">
                     <label>Loading notifications...</label>
                  </div>
               ) : expiredCertificate.length === 0 ? (
                  <div className="flex items-center justify-center flex-col gap-1 bg-secondary/5 text-secondary/70 py-7 px-4">
                     <label>No notifications available</label>
                  </div>
               ) : (
               expiredCertificate.map((notification) => (
               <NotificationUI 
                  key = {notification.id}
                  title = {notification.title}
                  desc = {notification.message}
                  date = {notification.sent_date}
                  onClick = {() => navigate(`/admin/training_details/${notification.training_id}`)}
               />
               ))
               )}
            </div>
            )}





          {/* Overdue Training  */}
           {(activeTab === "Overdue Training") && (
            <div className="flex text-xs text-secondary/50 flex-col gap-2">
               {loading ? (
                  <div className="flex items-center justify-center flex-col gap-1 bg-secondary/5 text-secondary/70 py-7 px-4">
                     <label>Loading notifications...</label>
                  </div>
               ) : trainingOverdue.length === 0 ? (
                  <div className="flex items-center justify-center flex-col gap-1 bg-secondary/5 text-secondary/70 py-7 px-4">
                     <label>No notifications available</label>
                  </div>
               ) : (
               trainingOverdue.map((notification) => (
               <NotificationUI 
                  key = {notification.id}
                  title = {notification.title}
                  desc = {notification.message}
                  date = {notification.sent_date}
                  onClick = {() => navigate(`/admin/training_details/${notification.training_id}`)}
               />
               ))
               )}
            </div>
            )}




            {/* All  */}
            {(activeTab === "All") && (
            <div className="flex text-xs text-secondary/50 flex-col gap-2">
               {loading ? (
                  <div className="flex items-center justify-center flex-col gap-1 bg-secondary/5 text-secondary/70 py-7 px-4">
                     <label>Loading notifications...</label>
                  </div>
               ) : all.length === 0 ? (
                  <div className="flex items-center justify-center flex-col gap-1 bg-secondary/5 text-secondary/70 py-7 px-4">
                     <label>No notifications available</label>
                  </div>
               ) : (
               all.map((notification) => (
               <NotificationUI 
                  key = {notification.id}
                  title = {notification.title}
                  desc = {notification.message}
                  date = {notification.sent_date}
                  onClick = {() => navigate(`/admin/training_details/${notification.training_id}`)}
               />
               ))
               )}
            </div>
            )}






        </div>
    )
}

export default NotificationsPart;











{/* <div className="flex text-xs text-secondary/50 flex-col gap-2">
               {notifications2.map((notification, index) => (
               <NotificationUI 
                  key = {index}
                  title = {notification.title}
                  desc = {notification.desc}
                  date = {notification.date}
               />
               ))}
            </div> */}












            // const notifications = [
            //     {
            //         title: "New Certification Upload", 
            //         desc: "Michael Brown has uploaded a certificate for Working at Heights. Please review and verify the document.",
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