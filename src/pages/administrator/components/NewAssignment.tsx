import { LuUsers } from "react-icons/lu";
import { BsFileEarmarkCheck } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import PrimaryButt from "../../../ui/PrimaryButt";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { preview } from "vite";




const NewAssignment = () => {


    const navigate = useNavigate();


    const [staff, setStaff] = useState([]);
    const [program, setProgram] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchStaff, setSearchStaff] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("All departments");

    const [selectedStaff, setSelectedStaff] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState("");
    // const [dateAssigned, setDateAssigned] = useState("");
    const [scheduledDate, setScheduledDate] = useState("");
    const [endDate, setEndDate] = useState("");
    // const [type, setType] = useState("Mandatory");
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



    // Preventing assignment without the matrix 
    useEffect(() => {
        if(!selectedProgram) return;

        setSelectedStaff((prevSelected) =>
            prevSelected.filter((staffId) => {
                const employee = staff.find((s) => s.id === staffId);

                return employee?.programs.some(
                    (program) => program.id === Number(selectedProgram)
                );
            })
        );
    }, [selectedProgram, staff]);




    // Searching 
    const filteredStaff = staff.filter((employee) => {
        const search = searchStaff.toLowerCase().trim();

        const matchesSearch = 
           employee.first_name?.toLowerCase().includes(search) ||
           employee.last_name?.toLowerCase().includes(search) ||
           employee.role?.toLowerCase().includes(search) ||
           employee.department?.toLowerCase().includes(search) ||
           `${employee.first_name} ${employee.last_name}`.toLowerCase().includes(search);
        
        const matchesDepartment = 
           selectedDepartment === "All departments" ||
           employee.department === selectedDepartment;


        const matchesProgram =
           selectedProgram == "" ||
           employee.programs.some(
              (program) => program.id === Number(selectedProgram)
           )
        //    employee.programs.includes(Number(selectedProgram));
        
        return matchesSearch && matchesDepartment && matchesProgram;
        
    });



    const allSelected = filteredStaff.length > 0 && filteredStaff.every((staff) => selectedStaff.includes(staff.id));





    // Assigning trainings 
    const handleAssign = async () => {
        if (!selectedProgram || selectedStaff.length === 0) {
            alert("Select staff and a program");
            return;
        }

        const today = new Date();
        const selectedDeadline = new Date(endDate);

        today.setHours(0,0,0,0);
        selectedDeadline.setHours(0,0,0,0);

        if (selectedDeadline < today) {
            alert("❌ End date cannot be before the start date!");
            return;
        }

        // const selectedEmployee = staff.find(
        //     employee => employee.id === selectedStaff[0]
        // );

        // const trainingType = selectedEmployee.programs.find(
        //     program => program.id === Number(selectedProgram)
        // )?.type;



        const assignments = selectedStaff.map((staffId) => {
            const employee = staff.find(
                employee => employee.id === staffId
            );

            const type = employee.programs.find(
                program => program.id === Number(selectedProgram)
            )?.type;

            return {
                staff_id: staffId,
                type: type
            };
        });





        const payload = {
            assignments: assignments,
            program_id: selectedProgram,
            // date_assigned: dateAssigned,
            scheduled_date: scheduledDate,
            end_date: endDate,
            // type: trainingType
        };

        setLoading2(true);

        try {
            const res = await fetch("http://localhost/ncaa/assign/create_assignment.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            console.log(data);

            if (data.success) {
                alert("Assignment (s) created");
                setSelectedStaff([]);
                setSelectedProgram("");
                setScheduledDate("");
                setEndDate("");
                // setType("");

                window.location.reload();
            } else {
                alert("Failed");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading2(false);
        }
    }








    return (
        <div className="w-full md:w-[35%] py-6 pb-8 px-5 flex flex-col gap-2 min-h-[86vh] bg-white shadow-sm shadow-secondary/30">
            <label className="font-bold text-lg flex items-center gap-3"><BsFileEarmarkCheck /> New Assignment</label>
            <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-secondary/60">Filter staff by department</label>

                <div className="w-full rounded-md bg-secondaryy/30 border border-secondary/30 px-3">
                    <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)} className="w-full py-2 text-xs cursor-pointer focus:outline-none">
                      <option value="All departments">All departments</option>
                      <option value="Airworthiness (AIR)">Airworthiness (AIR)</option>
                      <option value="Flight Operations (OPS)">Flight Operations (OPS)</option>
                      <option value="Personnel Licensing (PEL)">Personnel Licensing (PEL)</option>
                      <option value="Aerodromes and Ground Aids (AGA)">Aerodromes and Ground Aids (AGA)</option>
                      <option value="Aviation Security (AvSec)">Aviation Security (AvSec)</option>
                      <option value="Air Navigation Services Safety Oversight (ANSSO)">Air Navigation Services Safety Oversight (ANSSO)</option>
                      <option value="Safety Promotion and Quality (SPG)">Safety Promotion and Quality (SPG)</option>
                      <option value="Compliance and Regulatory Risk (CRR)">Compliance and Regulatory Risk (CRR)</option>
                      <option value="Finance and Administration">Finance and Administration</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Procurement">Procurement</option>
                      <option value="Legal">Legal</option>
                      <option value="ICTP">ICTP</option>
                    </select>
                </div>

                <div className="w-full flex flex-col gap-1 py-2">
                    <div className="flex w-full items-center justify-between py-1">
                       <div className="flex items-center gap-2">
                          <LuUsers className="text-xs font-bold text-secondary/60" />
                          <label className="text-xs font-bold text-secondary/60">Employees ({filteredStaff.length})</label>
                       </div>
                       <label 
                       onClick={() => {
                           if (allSelected) {
                              setSelectedStaff([]);
                           } else {
                              setSelectedStaff(filteredStaff.map((staff) => staff.id));
                           }
                       }} 
                       className="text-xs cursor-pointer hover:underline text-primary">{allSelected ? "Clear" : "Select all"}</label>
                    </div>
                    <div className="w-full flex items-center text-xs gap-2 border px-3 border-secondary/30 bg-secondaryy/30 rounded-md">
                      <IoSearchSharp />
                      <input value={searchStaff} onChange={(e) => setSearchStaff(e.target.value)} className="py-3 w-full font-bold focus:outline-none placeholder:font-normal placeholder:text-xs" type="text" placeholder="Search staff..." />
                    </div>
                    <div className="w-full flex flex-col scrollbar-thin scrollbar-secondaryy/10 mt-2 h-[26vh] overflow-y-auto rounded-md border border-secondary/30 overflow-hidden">
                        {loading ? (
                            <p>Loading staff...</p>
                        ): filteredStaff.length === 0 ? (
                            <div className="w-full h-full flex items-center justify-center">
                                <label>No Staff available</label>
                            </div>
                        ) : (filteredStaff.map((staff, index) => (
                        <div key={staff.id} className="w-full py-2 gap-5 flex px-3 items-center cursor-pointer hover:bg-secondaryy/60">
                            <input 
                               type="checkbox"
                               checked={selectedStaff.includes(staff.id)}
                               onChange={() => {
                                 setSelectedStaff((prev) =>
                                   prev.includes(staff.id)
                                 ? prev.filter((id) => id !== staff.id)
                                 : [...prev, staff.id]
                                  );
                              }}
                                />
                            <div className="flex flex-col">
                               <label className="text-xs font-bold">{staff.first_name} {staff.last_name}</label>
                               <label className="text-xs text-secondary/50">{staff.role} · {staff.department}</label>
                            </div>
                        </div>
                        ))
                       )}
                    </div>
                </div>

                <div className="w-full flex flex-col">
                    <label className="text-xs font-bold text-secondary/60">Training Program</label>
                    <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-3 mt-2">
                    <div className="rounded-md bg-secondaryy/30 border border-secondary/30 px-3">
                      <select value={selectedProgram} onChange={(e) => setSelectedProgram(e.target.value)} className="w-full py-2 text-xs cursor-pointer focus:outline-none">
                        <option value="">Choose training...</option>
                        {program.map((program, index) => (
                        <option
                         key = {program.id}
                         value = {program.id}
                        >
                            {program.training_name}
                        </option>
                        ))}
                      </select>
                    </div>
                    {/* <div className="rounded-md bg-secondaryy/30 border border-secondary/30 px-3">
                       <select value={type} onChange={(e) => setType(e.target.value)} className="w-full py-2 text-xs cursor-pointer focus:outline-none">
                           <option value="Mandatory">Mandatory</option>
                           <option value="Recommended">Recommended</option>
                       </select>
                    </div> */}
                    </div>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    <div className="flex flex-col gap-1">
                        <label className="font-bold text-xs text-secondary/60">Schedule Date</label>
                        <input value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} type="date" className="text-xs border border-secondary/30 rounded-md p-3" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="font-bold text-xs text-secondary/60">End Date</label>
                        <input value={endDate} onChange={(e) => setEndDate(e.target.value)} type="date" className="text-xs border border-secondary/30 rounded-md p-3" />
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