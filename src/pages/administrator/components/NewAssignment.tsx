import { LuUsers } from "react-icons/lu";
import { BsFileEarmarkCheck } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import PrimaryButt from "../../../ui/PrimaryButt";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
// import { preview } from "vite";




const NewAssignment = () => {


    const navigate = useNavigate();


    const [staff, setStaff] = useState([]);
    const [program, setProgram] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState("");
    const [searchTraining, setSearchTraining] = useState("");
    const [selectedStaff, setSelectedStaff] = useState("");
    const [selectedProgram, setSelectedProgram] = useState<string[]>([]);
    const [selectedQuarter, setSelectedQuarter] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [quarter, setQuarter] = useState("");
    const [loading2, setLoading2] = useState(false);


    // Staff 
    useEffect(() => {
        fetch("http://localhost/ncaa/staff/get_assignment_staff.php")
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                setStaff(data.data);
            }
        })
        .catch((error) => {
            console.error("Error fetching staff: ", error);
        })
        .finally(() => {
            setLoading(false)
        });
    }, []);



    // Tarining 
    useEffect(() => {
        fetch("http://localhost/ncaa/program/get_programs.php")
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                setProgram(data.data);
            }
        })
        .catch((error) => {
            console.error("Error fetching program: ", error);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);





    // Searching 
    const filteredPrograms = program.filter((training) => {
        const search = searchTraining.toLowerCase().trim();

        const matchesSearch = 
           training.training_name?.toLowerCase().includes(search);
        
        const matchesStaff = 
           selectedStaff === "" ||
           Number(training.staff_id) === Number(selectedStaff);

        const matchesYear =
           selectedYear === "" ||
           Number(training.year) === Number(selectedYear);

        const matchesQuarter =
           selectedQuarter === "" ||
           Number(training.quarter) === Number(selectedQuarter)
        
        return matchesSearch && matchesStaff && matchesYear && matchesQuarter;
        
    });







    // Assigning trainings 
    const handleAssign = async () => {
        if (!selectedProgram || selectedProgram.length === 0) {
            alert("Select staff and atleast one training");
            return;
        }

        const today = new Date();
        const selectedDeadline = new Date(endDate);

        today.setHours(0,0,0,0);
        selectedDeadline.setHours(0,0,0,0);




        const payload = {
            staff_id: Number(selectedStaff),
            program_ids: selectedProgram.map(Number),
            start_date: startDate,
            end_date: endDate,
            quarter: quarter
        };

        console.log("Sending assignment: ", payload);

        setLoading2(true);

        try {
            const res = await fetch("http://localhost/ncaa/assign/create_assignment.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const text = await res.text();

            console.log("Raw PHP response: ", text);

            let data;

            try {
                data = JSON.parse(text);
            } catch {
                console.error("PHP did not return JSON: ", text);
                alert("Server returned an error. Check the PHP file");
                return;
            }


            console.log("Assignment response: ", data);


            if (data.success) {
                alert("Assignment (s) created successfully");
                setSelectedStaff("");
                setSelectedProgram([]);
                setStartDate("");
                setEndDate("");
                setQuarter("");
                
                window.location.reload();
            } else {
                alert("Failed to create assignment");
            }
        } catch (err) {
            console.error("Error creating assignment", err);
            alert("Could not create assignment");
        } finally {
            setLoading2(false);
        }
    }








    return (
        <div className="w-full md:w-[35%] py-6 pb-8 px-6 flex flex-col gap-2 min-h-[86vh] bg-white shadow-sm shadow-secondary/30">
            <label className="font-bold text-lg flex items-center gap-3"><BsFileEarmarkCheck /> New Assignment</label>
            <div className="flex flex-col gap-1">

                  <div className="w-full flex flex-col gap-1">
                    <label className="text-xs font-bold text-secondary/60">Staff</label>
                    <Select 
                       className="text-xs cursor-pointer bg-secondary/30 rounded-md"
                       options={staff.map((person) => ({
                          value: person.id,
                          label: `${person.first_name} ${person.last_name}`,
                       }))}
                       placeholder="Search or select staff..."
                       isSearchable
                       onChange={(selected) => {
                          setSelectedStaff(selected?.value || "");
                          setSelectedProgram([]);
                       }}
                    />
                  </div>

                <div className="w-full flex flex-col gap-1 py-2">
                    <div className="flex w-full items-center justify-between py-1">
                       <div className="flex items-center gap-2">
                          <LuUsers className="text-xs font-bold text-secondary/60" />
                          <label className="text-xs font-bold text-secondary/60">Trainings ({filteredPrograms.length})</label>
                       </div>
                    </div>
                    <div className="w-full flex items-center text-xs gap-2 border px-3 border-secondary/30 bg-secondaryy/30 rounded-md">
                      <IoSearchSharp />
                      <input value={searchTraining} onChange={(e) => setSearchTraining(e.target.value)} className="py-3 w-full font-bold focus:outline-none placeholder:font-normal placeholder:text-xs" type="text" placeholder="Search training..." />
                    </div>

                    <div className="w-full flex flex-col scrollbar-thin scrollbar-secondaryy/10 mt-2 h-[26vh] overflow-y-auto rounded-md border border-secondary/30 overflow-hidden">
                        {loading ? (
                            <div className="w-full h-full flex items-center justify-center">
                               <p>Loading trinings...</p>
                            </div>
                        ): filteredPrograms.length === 0 ? (
                            <div className="w-full h-full flex items-center justify-center">
                                <label>No trainings available</label>
                            </div>
                        ) : (filteredPrograms.map((training) => (
                        <div key={training.id} className="w-full py-2 gap-5 flex px-3 items-center cursor-pointer hover:bg-secondaryy/60">
                            <input 
                               type="checkbox"
                               checked={selectedProgram.includes(String(training.id))}
                               onChange={() => {
                                  const programId = String(training.id);
                                  setSelectedProgram((prev) => 
                                     prev.includes(programId)
                                     ? prev.filter((id) => id !== programId)
                                     : [...prev, programId]
                                  );
                               }}
                                />
                            <div className="flex flex-col">
                               <label className="text-xs font-bold">{training.training_name}</label>
                               <label className="text-xs text-secondary/50">{training.category} ·  {training.reason}</label>
                            </div>
                        </div>
                        ))
                       )}
                    </div>
                </div>

                <div className="w-full flex flex-col">
                    <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-secondary/60">Year</label>
                      <div className="rounded-md bg-secondaryy/30 border border-secondary/30 px-3">
                       <select value={selectedYear} onChange={(e) => {setSelectedYear(e.target.value); setSelectedProgram([]);}} className="w-full py-2 text-xs cursor-pointer focus:outline-none">
                       <option value="">Choose Year</option>
                        <option value="2026">2026</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                        <option value="2016">2016</option>
                        <option value="2015">2015</option>
                       </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-secondary/60">Quarter</label>
                      <div className="rounded-md bg-secondaryy/30 border border-secondary/30 px-3">
                        <select value={selectedQuarter} onChange={(e) => { setSelectedQuarter(e.target.value); setSelectedProgram([]);} } className="w-full py-2 text-xs cursor-pointer focus:outline-none">
                         <option value="">Choose Quarter</option>
                         <option value="1">First (1)</option>
                         <option value="2">Second (2)</option>
                         <option value="3">Third (3)</option>
                         <option value="4">Fourth (4)</option>
                        </select>
                      </div>
                    </div>
                    
                    </div>
                </div>

                

                <PrimaryButt 
                disabled={loading2}
                onClick={handleAssign} 
                className="mt-2">
                    {loading2 ? "Assigning training ..." : (
                       <>Assign to Employee (s)</>
                    )}
                </PrimaryButt>

            </div>
        </div>
    );
}

export default NewAssignment;













// <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
//                     <div className="flex flex-col gap-1">
//                         <label className="font-bold text-xs text-secondary/60">Start Date</label>
//                         <input value={startDate} onChange={(e) => setStartDate(e.target.value)} type="date" className="text-xs border border-secondary/30 rounded-md p-3" />
//                     </div>
//                     <div className="flex flex-col gap-1">
//                         <label className="font-bold text-xs text-secondary/60">End Date</label>
//                         <input value={endDate} onChange={(e) => setEndDate(e.target.value)} type="date" className="text-xs border border-secondary/30 rounded-md p-3" />
//                     </div>
//                 </div>















{/* <label 
                       onClick={() => {
                           if (allSelected) {
                              setSelectedStaff([]);
                           } else {
                              setSelectedStaff(filteredStaff.map((staff) => staff.id));
                           }
                       }} 
                       className="text-xs cursor-pointer hover:underline text-primary">{allSelected ? "Clear" : "Select all"}</label> */}






    // const staff = [
    //     {
    //        name: "Tangeni Shipanga",
    //        position: "Senior Controller",
    //        department: "Air Navigation"
    //     },
    //     {
    //         name: "Tangeni Shipanga",
    //         position: "Senior Controller",
    //         department: "Air Navigation"
    //      },
    //     {
    //         name: "Tangeni Shipanga",
    //         position: "Senior Controller",
    //         department: "Air Navigation"
    //      },
    //      {
    //         name: "Tangeni Shipanga",
    //         position: "Senior Controller",
    //         department: "Air Navigation"
    //      },
    //      {
    //         name: "Tangeni Shipanga",
    //         position: "Senior Controller",
    //         department: "Air Navigation"
    //      },
    // ]