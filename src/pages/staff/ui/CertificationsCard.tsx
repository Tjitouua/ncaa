import { LuCalendarClock } from "react-icons/lu";



const CertificationsCard = () => {
    return (
        <div className="w-full py-4 px-1 flex border-b border-secondary/30 items-center justify-between">
            {/* Certicate Info  */}
            <div className="flex flex-col gap-1">
               <label className="text-sm font-bold">Runway Safety & Incursion Prevention</label>
               <div className="flex items-center gap-5">
                   <label className="text-xs text-secondary/60 flex items-center gap-2"><LuCalendarClock className="text-sm" /> Expires 2026-07-17</label>
                   <div className="py-1 px-2 rounded-sm bg-secondary/10 flex items-center justify-center">
                      <label className="text-xs font-light">RWY-2024-077</label>
                   </div>
               </div>
            </div>
            {/* Certificate Status  */}
            <div className="py-2 px-5 border border-green-600 rounded-sm flex items-center justify-center bg-green-400/10 text-xs font-bold">
               <label>● VALID</label>
            </div>
        </div>
    );
}

export default CertificationsCard;