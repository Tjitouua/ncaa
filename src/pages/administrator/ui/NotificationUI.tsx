import type React from "react";

interface Props {
    title: string;
    desc: string;
    date: string;
}



const NotificationUI: React.FC<Props> = ({ title, desc, date }) => {
    return (
        <div className="flex flex-col gap-1 bg-secondary/5 text-secondary/70 py-3 px-4">
            <label className="font-bold">{title}</label>
            <label>{desc}</label>
            <label className="text-secondary/50">{date}</label>
        </div>
    )
}

export default NotificationUI;

// New training assigned 
// You have been assigned Fire Safety Training. Complete it before 15 August 2026. 
// 2026-06-29, 8:16:24 AM 