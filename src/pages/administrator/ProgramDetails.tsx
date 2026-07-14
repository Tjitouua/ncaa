import { useNavigate, useParams } from "react-router-dom";
import Menu from "./components/Menu";
import TopMenu from "./components/TopMenu";
import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import PrimaryButt from "../../ui/PrimaryButt";
import { GrEdit } from "react-icons/gr";
import DetailsInput from "./ui/DetailsInput";
import SecondaryButt from "../../ui/SecondaryButt";
import DetailsSelect from "./ui/DetailsSelect";
import DetailsDate from "./ui/DetailsDate";




const ProgramDetails = () => {

   const [showMenu, setShowMenu] = useState(false);

   const navigate = useNavigate();

   const {id} = useParams();

   const [program, setProgram] = useState<any>(null);

   useEffect(() => {
      fetch(`http://localhost/ncaa/program/get_program_by_id.php?id=${id}`)
      .then(res => res.json())
      .then(data => {
         if (data.success) {
            setProgram(data.data);
         }
      });
   }, [id]);


   const handleChange = (e: any) => {
      setProgram({
         ...program,
         [e.target.name]: e.target.value
      });
   }


   const handleUpdate = async () => {
       try {
          const res = await fetch("http://localhost/ncaa/program/update_program.php", {
             method: "POST",
             headers: {
                "Content-Type": "application/json"
             },
             body: JSON.stringify(program)
          });

          const data = await res.json();

          if (data.success) {
             alert("Training updated successfully");
          } else {
             alert(data.message);
          }
       } catch (err) {
           alert("Server error");
       }
   };


   if (!program) return <p className="p-5">Loading...</p>



    return (
       <div className="w-full min-h-screen flex">
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          <div className="w-full xl:w-[82%] min-h-screen text-secondary/80 bg-secondaryy">
             <TopMenu setShowMenu={setShowMenu} title="Employees" />
 
             <div className="w-full min-h-screen items-center flex flex-col gap-3 px-2 md:px-6 py-8">
                <div className="w-full"><label onClick={() => navigate("/admin/training_programs")}><IoArrowBack className="cursor-pointer hover:text-primary" /></label></div>
                {/* Program Div  */}
                <div className="w-4/5 flex mt-3 flex-col gap-4 py-3">

                    <div className="pb-5 bg-white shadow-xs shadow-black/10 ">

                    <div className="w-full mb-4 py-5 px-5 bg-primaryy">
                      <div className="w-35 h-20 bg-[url('/images/ncaa-logo.png')] bg-center bg-cover"></div>
                    </div>

                        <div className="flex items-center px-6 justify-between pb-4 border-b border-secondary/40">
                           <label className="font-bold">Training Program</label>
                           <PrimaryButt onClick={handleUpdate}>Edit <GrEdit /></PrimaryButt>
                        </div>
                        <div className="w-full py-2 px-6">
                           <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                              <DetailsInput className="text-secondary/50" onChange={handleChange} name="training_code" label="Training Code" value={program.training_code}/>
                              <DetailsInput className="text-secondary/50" onChange={handleChange} name="training_name" label="Training Name" value={program.training_name}/>
                              <DetailsInput className="text-secondary/50" onChange={handleChange} name="description" label="Description" value={program.description}/>
                              <DetailsInput className="text-secondary/50" onChange={handleChange} name="duration" label="Duration" value={program.duration}/>
                              <DetailsSelect label="Category" onChange={handleChange} name="category" value={program.category}>
                                    <option>Language</option>
                                    <option>Operations</option>
                                    <option>Safety</option>
                                    <option>Security</option>
                                    <option>Human Factors</option>
                              </DetailsSelect>
                              <DetailsSelect label="Type" onChange={handleChange} name="type" value={program.type}>
                                    <option>Internal</option>
                                    <option>External</option>
                              </DetailsSelect>
                              <DetailsInput className="text-secondary/50" onChange={handleChange} name="validity" label="validity" value={program.validity}/>
                              <DetailsSelect label="Status" onChange={handleChange} name="status" value={program.status}>
                                    <option>Active</option>
                                    <option>Inactive</option>
                              </DetailsSelect>

                              <DetailsInput className="text-secondary/50" onChange={handleChange} name="trainer" label="Trainer" value={program.trainer}/>
                              <DetailsInput className="text-secondary/50" onChange={handleChange} name="provider" label="Provider" value={program.provider}/>
                              <DetailsInput className="text-secondary/50" onChange={handleChange} name="location" label="Location" value={program.location}/>
                              <DetailsInput className="text-secondary/50" onChange={handleChange} name="contact_no" label="Contact Number" value={program.contact_no}/>
                              <DetailsInput className="text-secondary/50" onChange={handleChange} name="email" label="Email" value={program.email}/>
                           </div>
                        </div>
                    </div>

                </div>

             </div>


          </div>
       </div>
    );
}

export default ProgramDetails;




{/* <DetailsInput className="text-secondary/50" onChange={handleChange} name="target_roles" label="Target roles" value={program.target_roles}/>
<DetailsDate className="text-secondary/50" onChange={handleChange} name="start_date" label="Start Date" value={program.start_date}/>
// <DetailsDate className="text-secondary/50" onChange={handleChange} name="end_date" label="End Date" value={program.end_date}/>
// <DetailsSelect label="Recurrence" onChange={handleChange} name="recurrence" value={program.recurrence}> */}
// <option value="One Time">One Time</option>
//                                    <option value="Monthly">Monthly</option>
//                                    <option value="Quarterly">Quarterly</option>
//                                    <option value="Semi-Annual">Semi-Annual</option>
//                                    <option value="Annual">Annual</option>
//                                    <option value="Every 2 years">Every 2 years</option>
//                                    <option value="Every 3 years">Every 3 years</option>
//                                    <option value="Every 5 years">Every 5 years</option>
//                                    <option value="Every 10 years">Every 10 years</option>
//                               {/* </DetailsSelect> */}


// border border-secondary/30 py-2 px-3 mt-2

{/* <img src="/images/spillo.jpg" className="w-full h-full" />  */}
// shadow-xs shadow-black/30 