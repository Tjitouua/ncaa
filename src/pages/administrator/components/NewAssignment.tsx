import { LuUsers } from "react-icons/lu";
import { BsFileEarmarkCheck } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import PrimaryButt from "../../../ui/PrimaryButt";




const NewAssignment = () => {



    const staff = [
        {
           name: "Tangeni Shipanga",
           position: "Senior Controller",
           department: "Air Navigation"
        },
        {
            name: "Tangeni Shipanga",
            position: "Senior Controller",
            department: "Air Navigation"
         },
        {
            name: "Tangeni Shipanga",
            position: "Senior Controller",
            department: "Air Navigation"
         },
         {
            name: "Tangeni Shipanga",
            position: "Senior Controller",
            department: "Air Navigation"
         },
         {
            name: "Tangeni Shipanga",
            position: "Senior Controller",
            department: "Air Navigation"
         },
    ]




    return (
        <div className="w-[35%] py-6 pb-8 px-5 flex flex-col gap-2 min-h-[86vh] bg-white shadow-sm shadow-secondary/30">
            <label className="font-bold text-lg flex items-center gap-3"><BsFileEarmarkCheck /> New Assignment</label>
            <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-secondary/60">Filter staff by department</label>

                <div className="w-full rounded-md bg-secondaryy/30 border border-secondary/30 px-3">
                    <select className="w-full py-2 text-xs cursor-pointer focus:outline-none">
                        <option>All departments</option>
                        <option>Air Navigation</option>
                        <option>Safety & Security</option>
                        <option>Aerodromes</option>
                        <option>Flight Operations</option>
                        <option>Engineering</option>
                        <option>Administration</option>
                    </select>
                </div>

                <div className="w-full flex flex-col gap-1 py-2">
                    <div className="flex w-full items-center justify-between py-1">
                       <div className="flex items-center gap-2">
                          <LuUsers className="text-xs font-bold text-secondary/60" />
                          <label className="text-xs font-bold text-secondary/60">Employees (0)</label>
                       </div>
                       <label className="text-xs cursor-pointer hover:underline text-primary">Select all</label>
                    </div>
                    <div className="w-full flex items-center text-xs gap-2 border px-3 border-secondary/30 bg-secondaryy/30 rounded-md">
                      <IoSearchSharp />
                      <input className="py-3 w-full font-bold focus:outline-none placeholder:font-normal placeholder:text-xs" type="text" placeholder="Search staff by name..." />
                    </div>
                    <div className="w-full flex flex-col scrollbar-thin scrollbar-secondaryy/10 mt-2 h-[26vh] overflow-y-scroll rounded-md border border-secondary/30 overflow-hidden">
                        {staff.map((staff, index) => (
                        <div className="w-full py-2 gap-5 flex px-3 items-center cursor-pointer hover:bg-secondaryy/60">
                            <input type="checkbox" />
                            <div className="flex flex-col">
                               <label className="text-sm font-bold">{staff.name}</label>
                               <label className="text-xs">{staff.position} · {staff.department}</label>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>

                <div className="w-full flex flex-col">
                    <label className="text-xs font-bold text-secondary/60">Training Program</label>
                    <div className="w-full rounded-md mt-2 bg-secondaryy/30 border border-secondary/30 px-3">
                      <select className="w-full py-2 text-xs cursor-pointer focus:outline-none">
                        <option>All departments</option>
                        <option>Air Navigation</option>
                        <option>Safety & Security</option>
                        <option>Aerodromes</option>
                        <option>Flight Operations</option>
                        <option>Engineering</option>
                        <option>Administration</option>
                      </select>
                    </div>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    <div className="flex flex-col gap-1">
                        <label className="font-bold text-xs text-secondary/60">Date Assigned</label>
                        <input type="date" className="text-xs border border-secondary/30 rounded-md p-3" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="font-bold text-xs text-secondary/60">Deadline</label>
                        <input type="date" className="text-xs border border-secondary/30 rounded-md p-3" />
                    </div>
                </div>

                <PrimaryButt className="mt-2">Assign to Employees</PrimaryButt>

            </div>
        </div>
    );
}

export default NewAssignment;