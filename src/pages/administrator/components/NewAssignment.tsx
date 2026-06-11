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
    const [dateAssigned, setDateAssigned] = useState("");
    const [deadline, setDeadline] = useState("");


    // Staff 
    useEffect(() => {
        fetch("http://localhost/ncaa/staff/get_staff.php")
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

        
        return matchesSearch && matchesDepartment;
        
    });



    const allSelected = filteredStaff.length > 0 && filteredStaff.every((staff) => selectedStaff.includes(staff.id));





    // Assigning trainings 
    const handleAssign = async () => {
        if (!selectedProgram || selectedStaff.length === 0) {
            alert("Select staff and a program");
            return;
        }

        const today = new Date();
        const selectedDeadline = new Date(deadline);

        today.setHours(0,0,0,0);
        selectedDeadline.setHours(0,0,0,0);

        if (selectedDeadline < today) {
            alert("❌ Deadline cannot be in the past!");
            return;
        }

        const payload = {
            staff_ids: selectedStaff,
            program_id: selectedProgram,
            date_assigned: dateAssigned,
            deadline: deadline,
        };

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
                alert("Assignment created");
                setSelectedStaff([]);
                setSelectedProgram("");
                setDateAssigned("");
                setDeadline("");

                window.location.reload();
            } else {
                alert("Failed");
            }
        } catch (err) {
            console.error(err);
        }
    }








    return (
        <div className="w-full md:w-[35%] py-6 pb-8 px-5 flex flex-col gap-2 min-h-[86vh] bg-white shadow-sm shadow-secondary/30">
            <label className="font-bold text-lg flex items-center gap-3"><BsFileEarmarkCheck /> New Assignment</label>
            <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-secondary/60">Filter staff by department</label>

                <div className="w-full rounded-md bg-secondaryy/30 border border-secondary/30 px-3">
                    <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)} className="w-full py-2 text-xs cursor-pointer focus:outline-none">
                        <option>All departments</option>
                        <option>Air Navigation</option>
                        <option>Safety & Security</option>
                        <option>Aerodromes</option>
                        <option>Flight Operations</option>
                        <option>Engineering</option>
                        <option>ICT</option>
                        <option>Administration</option>
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
                    <div className="w-full flex flex-col scrollbar-thin scrollbar-secondaryy/10 mt-2 h-[26vh] overflow-y-scroll rounded-md border border-secondary/30 overflow-hidden">
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
                    <div className="w-full rounded-md mt-2 bg-secondaryy/30 border border-secondary/30 px-3">
                      <select value={selectedProgram} onChange={(e) => setSelectedProgram(e.target.value)} className="w-full py-2 text-xs cursor-pointer focus:outline-none">
                        <option value="">All departments</option>
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
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    <div className="flex flex-col gap-1">
                        <label className="font-bold text-xs text-secondary/60">Date Assigned</label>
                        <input value={dateAssigned} onChange={(e) => setDateAssigned(e.target.value)} type="date" className="text-xs border border-secondary/30 rounded-md p-3" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="font-bold text-xs text-secondary/60">Deadline</label>
                        <input value={deadline} onChange={(e) => setDeadline(e.target.value)} type="date" className="text-xs border border-secondary/30 rounded-md p-3" />
                    </div>
                </div>

                <PrimaryButt onClick={handleAssign} className="mt-2">Assign to Employee (s)</PrimaryButt>

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