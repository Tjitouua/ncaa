import PrimaryButt from "../../ui/PrimaryButt";
import Menu from "./components/Menu";
import TopMenu from "./components/TopMenu";
import { useState } from "react";
import { RiAddLargeLine } from "react-icons/ri";
import ProgramsCard from "./ui/ProgramsCard";




const Programs = () => {

   const [showMenu, setShowMenu] = useState(false);


   const programsList = [
      {
         name: "ICAO Aviation English Proficiency",
         desc: "Mandatory language proficiency for ATCs.",
         type: "Mandatory",
         duration: "4 weeks",
         place: "Internal",
         program_id: "TRN-001"
      },
      {
         name: "Human Factors in Aviation",
         desc: "CRM and safety culture.",
         type: "Mandatory",
         duration: "3 Months",
         place: "Internal",
         program_id: "TRN-002"
      },
      {
         name: "Aerodrome Inspection Procedures",
         desc: "Field inspection methodology.",
         type: "Mandatory",
         duration: "4 weeks",
         place: "Internal",
         program_id: "TRN-003"
      },
      {
         name: "Dangerous Goods Handling",
         desc: "IATA DGR compliance training.",
         type: "Mandatory",
         duration: "2 weeks",
         place: "Internal",
         program_id: "TRN-004"
      },
      {
         name: "Air Traffic Safety Management",
         desc: "Risk assessment and aviation safety oversight.",
         type: "Mandatory",
         duration: "6 weeks",
         place: "Internal",
         program_id: "TRN-005"
      },
      {
         name: "Aviation Security Awareness",
         desc: "Basic AVSEC principles and airport security compliance.",
         type: "Mandatory",
         duration: "2 weeks",
         place: "Internal",
         program_id: "TRN-006"
      },
      {
         name: "Fire and Rescue Operations",
         desc: "Aircraft emergency response and rescue coordination.",
         type: "Mandatory",
         duration: "1 Month",
         place: "Internal",
         program_id: "TRN-007"
      },
      {
         name: "Search and Rescue Coordination",
         desc: "Emergency coordination procedures for missing aircraft.",
         type: "Mandatory",
         duration: "3 weeks",
         place: "External",
         program_id: "TRN-008"
      },
      {
         name: "ICAO Aviation English Proficiency",
         desc: "Mandatory language proficiency for ATCs.",
         type: "Mandatory",
         duration: "4 weeks",
         place: "Internal",
         program_id: "TRN-001"
      },
      {
         name: "Human Factors in Aviation",
         desc: "CRM and safety culture.",
         type: "Mandatory",
         duration: "3 Months",
         place: "Internal",
         program_id: "TRN-002"
      },
      {
         name: "Aerodrome Inspection Procedures",
         desc: "Field inspection methodology.",
         type: "Mandatory",
         duration: "4 weeks",
         place: "Internal",
         program_id: "TRN-003"
      },
      {
         name: "Dangerous Goods Handling",
         desc: "IATA DGR compliance training.",
         type: "Mandatory",
         duration: "2 weeks",
         place: "Internal",
         program_id: "TRN-004"
      }
   ]


    return (
       <div className="w-full min-h-screen flex">
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          <div className="w-full xl:w-[82%] min-h-screen text-secondary/80 bg-secondaryy">
             <TopMenu setShowMenu={setShowMenu} title="Training Programs" />

             <div className="w-full min-h-screen flex flex-col gap-3 py-6 px-2 md:px-6">
                 {/* Top Part  */}
                 <div className="w-full flex items-start justify-between">
                    <div className="flex flex-col">
                       <label className="text-lg">All Programs</label>
                       <label className="text-xs text-secondary/60">6 programs</label>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="pr-3 border border-secondary/50 rounded-md">
                          <select className="py-2 text-sm flex px-3 focus:outline-none cursor-pointer">
                              <option>All categories</option>
                              <option>Mandatory</option>
                              <option>Optional</option>
                          </select>
                       </div>
                       <PrimaryButt><RiAddLargeLine /> Add Training</PrimaryButt>
                    </div>
                 </div>
                 {/* Programs  */}
                 <div className="w-full grid items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-3">
                   {programsList.map((program, index) => (
                    <ProgramsCard 
                       key = {index}
                       name = {program.name}
                       desc = {program.desc}
                       type = {program.type}
                       duration = {program.duration}
                       place = {program.place}
                       program_id = {program.program_id}
                    />
                   ))}
                 </div>
             </div>

          </div>
       </div>
    );
}

export default Programs;