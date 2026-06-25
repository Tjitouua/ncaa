import type React from "react";
import { LuCalendarClock } from "react-icons/lu";


interface Props {
    training_name: string;
    expiry_date: string;
    certificate_no: string;
    status: {
        text: string,
        className: string
    };
};



const CertificationsCard: React.FC<Props> = ({ training_name, expiry_date, certificate_no, status }) => {
    return (
        <div className="w-full py-4 px-1 flex items-center justify-between">
            {/* Certicate Info  */}
            <div className="flex flex-col gap-1">
               <label className="text-sm font-bold">{training_name}</label>
               <div className="flex items-center gap-5">
                   <label className="text-xs text-secondary/60 flex items-center gap-2"><LuCalendarClock className="text-sm" /> Expires {expiry_date}</label>
                   <div className="py-1 px-2 rounded-sm bg-secondary/10 flex items-center justify-center">
                      <label className="text-xs font-light">{certificate_no}</label>
                   </div>
               </div>
            </div>
            {/* Certificate Status  */}
            <div className={`py-2 px-5 border rounded-sm flex items-center justify-center text-xs font-bold ${status.className}`}>
               <label>● {status.text.toUpperCase()}</label>
            </div>
        </div>
    );
}

export default CertificationsCard;

// border-b border-secondary/30 