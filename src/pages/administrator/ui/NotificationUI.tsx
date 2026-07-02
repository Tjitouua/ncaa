import type React from "react";

interface Props {
    title: string;
    desc: string;
    date: string;
    onClick?: () => void;
}



const NotificationUI: React.FC<Props> = ({ title, desc, date, onClick }) => {
    return (
        <div onClick={onClick} className="group flex flex-col gap-1 bg-secondary/5 text-secondary/70 py-3 px-4 cursor-pointer hover:bg-primary/70 hover:text-white">
            <label className="font-bold">{title}</label>
            <label>{desc}</label>
            <label className="text-secondary/50 group-hover:text-white">{date}</label>
        </div>
    )
}

export default NotificationUI;

// New training assigned 
// You have been assigned Fire Safety Training. Complete it before 15 August 2026. 
// 2026-06-29, 8:16:24 AM 