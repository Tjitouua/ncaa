import PrimaryButt from "../../ui/PrimaryButt";
import Menu from "./components/Menu";
import TopMenu from "./components/TopMenu";
import { useEffect, useState } from "react";
import { RiAddLargeLine } from "react-icons/ri";
import { useNavigate, useNavigation } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import RequestsCard from "./ui/RequestsCard";
// import RequestsCard from "../staff/ui/RequestsCard";




const TrainingRequests = () => {

   const [showMenu, setShowMenu] = useState(false);
   const [programs, setPrograms] = useState([]);
   const [loading, setLoading] = useState(true);
   const [searchProgram, setSearchProgram] = useState("");
   const [selectedTab, setSelectedTab] = useState("Pending");

   const navigate = useNavigate();


   useEffect(() => {
      fetch("http://localhost/ncaa/program/get_requests.php")
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



   // Deleting 
   const handleDelete = (id) => {
       if (!window.confirm("Are you sure you want to delete this program?")) return;
       
       fetch("http://localhost/ncaa/program/delete_program.php", {
           method: "POST",
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify({ id }),
       })
       .then((res) => res.json())
       .then((data) => {
          if (data.success) {
             setPrograms((prev) => prev.filter((pro) => pro.id !== id));
          } else {
             alert(data.message || "Failed to delete");
          }
       })
       .catch ((err) => {
          console.error("Delete error", err);
       });
   };





   const tabs = [
      {
         name: "Pending",
      },
      {
         name: "Approved"
      },
      {
         name: "Rejected"
      }
   ]






   // Search Function 
   const filteredPrograms = programs.filter((training) => {
       const search = searchProgram.toLowerCase().trim();

       const matchesTab = training.request_status === selectedTab;

       const matchesSearch = 
          training.training_code?.toLowerCase().includes(search) ||
          training.training_name?.toLowerCase().includes(search) ||
          training.description?.toLowerCase().includes(search) ||
          training.duration?.toLowerCase().includes(search) ||
          training.trainer?.toLowerCase().includes(search) ||
          training.training_type?.toLowerCase().includes(search) ||
          training.validity?.toLowerCase().includes(search) ||
          training.status?.toLowerCase().includes(search) ||
          training.target_roles?.toLowerCase().includes(search) ||
          training.start_date?.toLowerCase().includes(search) ||
          training.end_date?.toLowerCase().includes(search) ||
          training.recurrence?.toLowerCase().includes(search) ||
          training.location?.toLowerCase().includes(search) ||
          training.contact_no?.toLowerCase().includes(search) ||
          training.email?.toLowerCase().includes(search);

          return matchesTab && matchesSearch;
   });









    return (
       <div className="w-full min-h-screen flex">
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          <div className="w-full xl:w-[82%] min-h-screen text-secondary/80 bg-secondaryy">
             <TopMenu setShowMenu={setShowMenu} title="Training Programs" />

             <div className="w-full min-h-screen flex flex-col gap-3 py-6 px-2 md:px-6">
                 {/* Top Part  */}
                 <div className="w-full flex items-start justify-between">
                    <div className="flex flex-col">
                       <label className="text-lg">Training Requests</label>
                       <label className="text-xs text-secondary/60">Review staff training requests and approve the valid ones.</label>
                    </div>
                    <div className="flex items-center gap-3">
                       {/* <div className="pr-3 border border-secondary/50 rounded-md">
                          <select className="py-2 text-sm flex px-3 focus:outline-none cursor-pointer">
                              <option>All categories</option>
                              <option>Mandatory</option>
                              <option>Optional</option>
                          </select>
                       </div> */}
                       <div className="md:w-[30vh] border border-secondary/40 rounded-sm px-3 flex items-center bg-white/80">
                          <IoSearchSharp className="text-secondary/30" />
                          <input value={searchProgram} onChange={(e) => setSearchProgram(e.target.value)} type="text" className="py-2 w-full px-2 focus:outline-none focus:ring-0 text-sm" placeholder="Search request..." />
                      </div>
                       {/* <PrimaryButt onClick={() => navigate("/admin/training_programs/program_add")}><RiAddLargeLine /> Add Training</PrimaryButt> */}
                    </div>
                 </div>

                 {/* Navigate tab  */}
                <div className="w-full flex items-center text-xs font-bold border-b border-secondary/20">
                {tabs.map((tab) => (
                  <div 
                  key = {tab.name}
                  onClick={() => setSelectedTab(tab.name)}
                  className={`px-5 ${ selectedTab === tab.name ? "border-b-4 border-primary" : "" } py-2 cursor-pointer hover:bg-primary/10`}><label>{tab.name}</label></div>
                ))}
                </div>

                 {/* Programs  */}
                 <div className="w-full grid items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-4">
                  {loading ? (
                       <div className="col-span-full w-full py-20 flex items-center justify-center">
                          <p>Loading requests...</p>
                       </div>
                  ) : filteredPrograms.length === 0 ? (
                       <div className="col-span-full w-full flex items-center justify-center py-20">
                           <p className="text-secondary/60">No training requests available.</p>
                       </div>
                  ) : (
                   filteredPrograms.map((program) => (
                    <RequestsCard 
                       key = {program.id}
                       id = {program.id}
                       training_name = {program.training_name}
                       description = {program.description}
                       category = {program.category}
                       duration = {program.duration}
                       provider = {program.trainer}
                       training_code = {program.training_code}
                       onDelete = {handleDelete}
                    />
                   ))
                  )}
                 </div>
             </div>

          </div>
       </div>
    );
}

export default TrainingRequests;

