import { IoSearchSharp } from "react-icons/io5";
import { RiAddLargeLine } from "react-icons/ri";
import PrimaryButt from "../../../ui/PrimaryButt";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProgramsCard from "../../administrator/ui/ProgramsCard";



const RequestTrainingPart = () => {

    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen py-2 text-secondary/90 px-2 md:px-6">

          <div className="w-full flex flex-col py-5 gap-2">

               {/* Top Part  */}
               <div className="w-full flex items-start justify-between border-b border-secondary/30 pb-4">
                  <div className="flex flex-col">
                    <label className="text-lg">My Requests</label>
                    <label className="text-xs text-secondary/60">Status of trainings you asked for</label>
                  </div>

                  <div className="flex items-center gap-3">
                     <div className="md:w-[30vh] border border-secondary/40 rounded-sm px-3 flex items-center bg-white/80">
                          <IoSearchSharp className="text-secondary/30" />
                          <input type="text" className="py-2 w-full px-2 focus:outline-none focus:ring-0 text-sm" placeholder="Search program..." />
                     </div>
                     <PrimaryButt onClick={() => navigate("/staff/programs/program_add")} ><RiAddLargeLine /> Request Training</PrimaryButt>
                  </div>
              </div>


              {/* Trainings Part */}
              <div className="w-full grid items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-4">
                 {programs.map((program) => (
                  <ProgramsCard 
                    key={program.id}
                    id={program.id}
                    training_name={program.training_name}
                    description={program.description}
                    category={program.category}
                    duration={program.duration}
                    provider={program.trainer}
                    training_code={program.training_code}
                    // onDelete={}
                  />
                  ))}
              </div>


          </div>

        </div>
    )
}

export default RequestTrainingPart;
