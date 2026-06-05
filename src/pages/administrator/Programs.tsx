import PrimaryButt from "../../ui/PrimaryButt";
import Menu from "./components/Menu";
import TopMenu from "./components/TopMenu";
import { useEffect, useState } from "react";
import { RiAddLargeLine } from "react-icons/ri";
import ProgramsCard from "./ui/ProgramsCard";
import { useNavigate, useNavigation } from "react-router-dom";




const Programs = () => {

   const [showMenu, setShowMenu] = useState(false);
   const [programs, setPrograms] = useState([]);
   const [loading, setLoading] = useState(true);

   const navigate = useNavigate();


   useEffect(() => {
      fetch("http://localhost/ncaa/program/get_programs.php")
      .then((response) => response.json())
      .then((data) => {
         if (data.success) {
            setPrograms(data.data);
         }
      })
      .catch((error) => {
         console.error("Error fetching programs: ", error);
      })
      .finally(() => {
         setLoading(false);
      });
   }, []);


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
                       <label className="text-xs text-secondary/60">{programs.length} program (s)</label>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="pr-3 border border-secondary/50 rounded-md">
                          <select className="py-2 text-sm flex px-3 focus:outline-none cursor-pointer">
                              <option>All categories</option>
                              <option>Mandatory</option>
                              <option>Optional</option>
                          </select>
                       </div>
                       <PrimaryButt onClick={() => navigate("/admin/training_programs/program_add")}><RiAddLargeLine /> Add Training</PrimaryButt>
                    </div>
                 </div>
                 {/* Programs  */}
                 <div className="w-full grid items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-3">
                  {loading ? (
                     <p>Loading programs...</p>
                  ) : programs.length === 0 ? (
                       <div className="w-full items-center justify-center py-20">
                           <p className="text-secondary/60">No training programs available.</p>
                       </div>
                  ) : (
                   programs.map((program) => (
                    <ProgramsCard 
                       key = {program.id}
                       training_name = {program.training_name}
                       description = {program.description}
                       category = {program.category}
                       duration = {program.duration}
                       provider = {program.trainer}
                       training_code = {program.training_code}
                    />
                   ))
                  )}
                 </div>
             </div>

          </div>
       </div>
    );
}

export default Programs;

