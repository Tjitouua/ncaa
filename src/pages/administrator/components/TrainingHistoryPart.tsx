import PrimaryButt from "../../../ui/PrimaryButt";
import { IoSearchSharp } from "react-icons/io5";
import { LuDownload, LuFilter } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import SecondaryButt from "../../../ui/SecondaryButt";










const TrainingHistoryPart = () => {

   const navigate = useNavigate();
   
  
   const [assignments, setAssignments] = useState([]);
   const [loading, setLoading] = useState(true);
   const [selectedStatus, setSelectedStatus] = useState("All status");
   const [searchTraining, setSearchTraining] = useState("");
   const [showFilters, setShowFilters] = useState(false);
   
   const getNextStatus = (current) => {
      if (current === "Pending") return "Completed";
      if (current === "Completed") return "Overdue";
      if (current === "Overdue") return "Pending";
      return "Pending";
   }


   const getStatusColor = (status) => {
      if (status === "Pending") return "bg-orange-200";
      if (status === "Completed") return "bg-green-200";
      if (status === "Overdue") return "bg-red-200";
      return "bg-grey-200";
   }

   
   

   useEffect(() => {
       fetch("http://localhost/ncaa/assign/get_assignments.php")
       .then((response) => response.json())
       .then((data) => {
          if (data.success) {
             setAssignments(data.data);
          }
       })
       .catch((error) => {
          console.error("Error fetching assignments", error);
       })
       .finally(() => {
           setLoading(false);
       });
   }, []);




   // Changing the status of a record
   const cycleStatus = async (assign) => {
      
         const next = getNextStatus(assign.status);

         try {
            const res = await fetch ("http://localhost/ncaa/assign/update_assignment_status.php", {
               method: "POST",
               headers: {
                  "Content-Type": "application/json"
               },
               body: JSON.stringify({
                  id: assign.id,
                  status: next
               })
            });

            const data = await res.json();

            if (data.success) {
               setAssignments((prev) => 
                  prev.map((a) => 
                     a.id === assign.id ? { ...a, status: next } : a
                  )
               );
            } else {
               console.error(data.message);
            }
         } catch (error) {
            console.error("Error updating status: ", error);
         }
   };






   // Filtering 
   
   const [filters, setFilters] = useState({
      function: "",
      department: "",
      division: "",
      job_category: "",
      // trainer_status: "",
      category: "",
      training_type: "",
      // quarter: "",
      method: "",
      status: "",
      disadvantaged: "",
      disability: "",
      gender: "",
      year: ""
   });




   const filterOptions = [
      {
         name: "function",
         label: "Function",
         options: [
            "Regulatory",
            "Support",
            "Service Provider"
         ]
      },
      {
         name: "department",
         label: "Department",
         options: [
            "ANS (Air Navigation Services)",
            "Safety and Security",
            "Finance and Administration",
            "Human Capital and Strategy",
            "Legal and Compliance",
            "Office of the Executive Director",
         ]
      },
      {
         name: "division",
         label: "Division",
         options: [
            "Airworthiness (AIR)",
            "Flight Operations (OPS)",
            "Personnel Licensing (PEL)",
            "Aerodromes and Ground Aids (AGA)",
            "Aviation Security (AvSec)",
            "Air Navigation Services Safety Oversight (ANSSO)",
            "Safety Promotion and Quality (SPG)",
            "Compliance and Regulatory Risk (CRR)", 
            "Finance and Administration",
            "Human Resources", 
            "Procurement",
            "Legal",
            "ICTP"
         ]
      },
      {
         name: "job_category",
         label: "Job/AA Category",
         options: [
            "Executive Director",
            "Senior Management",
            "Middle Management",
            "Specialized / Senior supervisory",
            "Skilled",
            "Semi-skilled",
            "Unskilled"
         ]
      },
      // {
      //    name: "trainer_status",
      //    label: "Trainer Status",
      //    options: [
      //       "Qualified",
      //       "Not Qualified"
      //    ]
      // },
      {
         name: "category",
         label: "Category",
         options: [
            "Mandatory",
            "Advanced",
            "Certification",
            "Personal Development"
         ]
      },
      {
         name: "training_type",
         label: "Training Type",
         options: [
            "Initial / co-course",
            "Recurring",
            "Specialized",
            "OJT",
            "Academic qualification",
            "Industrial workshop / conference / Seminar",
         ]
      },
      // {
      //    name: "quarter",
      //    label: "Quarter",
      //    options: [
      //       "First (1)",
      //       "Second (2)",
      //       "Third (3)",
      //       "Fourth (4)"
      //    ]
      // },
      {
         name: "method",
         label: "Method",
         options: [
            "Online",
            "In-house",
            "Face-to-face"
         ]
      },
      {
         name: "status",
         label: "Status",
         options: [
            "Completed",
            "Pending",
            "Rejected"
         ]
      },
      {
         name: "disadvantaged",
         label: "Disadvantaged",
         options: [
            "Yes",
            "No"
         ]
      },
      {
         name: "disability",
         label: "Disability",
         options: [
            "Yes",
            "No"
         ]
      },
      {
         name: "gender",
         label: "Gender",
         options: [
            "Male",
            "Female"
         ]
      },
      {
         name: "year",
         label: "Year",
         options: [
            "2017",
            "2018",
            "2019",
            "2020",
            "2021",
            "2022",
            "2023",
            "2024",
            "2025",
            "2026",
            "2027",
            "2028",
            "2029",
            "2030",
            "2031",
            "2032"
         ]
      }
   ];




   const handleFilterChange = (name, value) => {
      setFilters((prev) => ({
         ...prev,
         [name]: value
      }));
   };






   // Searching 
   const filteredTraining = assignments.filter((training) => {
       const search = searchTraining.toLowerCase().trim();

       const matchesSearch =
           training.first_name?.toLowerCase().includes(search) ||
           training.last_name?.toLowerCase().includes(search) ||
           training.training_name?.toLowerCase().includes(search) ||
           training.duration?.toLowerCase().includes(search) ||
           training.assigned_date?.toLowerCase().includes(search) ||
           training.scheduled_date?.toLowerCase().includes(search) ||
           training.status?.toLowerCase().includes(search) ||
           `${training.first_name} ${training.last_name}`.toLowerCase().includes(search);


       const matchesFunction = 
           !filters.function ||
           training.function === filters.function;

       const matchesDepartment =
           !filters.department ||
           training.department === filters.department;

       const matchesDivision = 
           !filters.division ||
           training.division === filters.division;

       const matchesAA =
           !filters.job_category ||
           training.job_category === filters.job_category;

       const matchesCategory =
           !filters.category ||
           training.category === filters.category;

       const matchesTrainingType =
           !filters.training_type ||
           training.training_type === filters.training_type;

       const matchesQuarter =
           !filters.quarter ||
           training.quarter === filters.quarter;

       const matchesMethod =
           !filters.method ||
           training.method === filters.method;

       const matchesStatus =
           !filters.status ||
           training.status === filters.status;

       const matchesDisadvantaged =
           !filters.disadvantaged ||
           training.disadvantaged === filters.disadvantaged;

       const matchesDisability =
           !filters.disability ||
           training.disability === filters.disability;

       const matchesGender = 
           !filters.gender ||
           training.gender === filters.gender;

       const matchesYear =
           !filters.year ||
           training.scheduled_date?.slice(0, 4) === filters.year;

       return (
          matchesSearch && 
          matchesFunction &&
          matchesDepartment &&
          matchesDivision &&
          matchesAA &&
          matchesCategory &&
          matchesTrainingType &&
          matchesQuarter &&
          matchesMethod &&
          matchesStatus &&
          matchesDisadvantaged &&
          matchesDisability &&
          matchesGender &&
          matchesYear
       );
   })





   // Exporting 
   const handleExport = () => {
      const params = new URLSearchParams();

      if (searchTraining.trim()) {
         params.append("search", searchTraining.trim());
      }

      if (filters.function) {
         params.append("function", filters.function);
      }

      if (filters.department) {
         params.append("department", filters.department);
      }

      if (filters.division) {
         params.append("division", filters.division);
      }

      if (filters.job_category) {
         params.append("job_category", filters.job_category);
      }

      if (filters.category) {
         params.append("category", filters.category);
      }

      if (filters.training_type) {
         params.append("training_type", filters.training_type);
      }

      if (filters.quarter) {
         params.append("quarter", filters.quarter);
      }

      if (filters.method) {
         params.append("method", filters.method);
      }

      if (filters.status) {
         params.append("status", filters.status);
      }

      if (filters.disadvantaged) {
         params.append("disadvantaged", filters.disadvantaged);
      }

      if (filters.disability) {
         params.append("disability", filters.disability);
      }

      if (filters.gender) {
         params.append("gender", filters.gender);
      }

      if (filters.year) {
         params.append("year", filters.year);
      }




      window.open(
         `http://localhost/ncaa/assign/export_assignments.php?${params.toString()}`,
         "_blank"
      );
   };






   // Filtering 
   const resetFilters = () => {
      setFilters({
         function: "",
         department: "",
         division: "",
         job_category: "",
      // trainer_status: "",
         category: "",
         training_type: "",
         quarter: "",
         method: "",
         disadvantaged: "",
         disability: "",
         gender: ""
      });
   };



   // Filter Button function 
   const handleFilterToggle = () => {
      if (showFilters) {
         // resetFilters();
      }

      setShowFilters((prev) => !prev);
   };




   // Total Cost 
   const totalCost = filteredTraining.reduce(
      (total, training) => total + Number(training.total_cost || 0), 0
   );










    return (
       <div onClick={() => {setShowFilters(false);}} className="w-full min-h-screen py-2 text-secondary/90 px-2 md:px-6">
          <div className="w-full h-screen  py-5">

             <div className="flex flex-col">
               {/* Top Part  */}
               <div className="flex items-center justify-between border-b border-secondary/30 pb-5">
                 <div className="flex flex-col">
                    <label className="text-lg">Training Records</label>
                    <div className="flex gap-5 items-center text-xs text-secondary/60">
                      <label>{filteredTraining.length} records found</label>
                      <label>:</label>
                      <label>Total cost: <span className="font-bold ml-2 text-primary">N$ {totalCost.toLocaleString("fr-FR", {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(",", ".")}</span></label>
                    </div>
                 </div>
                 <div className="flex items-center gap-3">
                    {/* <div className="w-[20vh] rounded-md bg-white border border-secondary/30 px-3">
                      <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="w-full py-2 text-xs cursor-pointer focus:outline-none">
                        <option>All status</option>
                        <option>Completed</option>
                        <option>Pending</option>
                        <option>Overdue</option>
                      </select>
                   </div> */}
                   {/* Filtering  */}
                   <div onClick={(e) => e.stopPropagation()} className="flex flex-col gap-3 items-end">
                          <SecondaryButt onClick={handleFilterToggle}><LuFilter /> Filter</SecondaryButt>
                          {showFilters && (
                          <div className="px-9 py-9 scrollbar-thin scrollbar-secondary/10 overflow-y-auto max-h-120 min-w-40 fixed mt-12 bg-white shadow-sm text-xs flex flex-col">
                              <label>Filters</label>
                              <hr className="border border-secondary/10 mt-3" />
                              {/* department  */}
                              {filterOptions.map((filter) => (
                              <div key={filter.name} className="flex flex-col gap-2 border-b border-secondary/20 py-3">
                                  <label className="font-bold">{filter.label}</label>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {filter.options.map((option) => (
                                      <div key={option} className="flex items-center gap-1">
                                         <input name={filter.name} value={option} type="radio" checked={filters[filter.name] === option} onClick={() => handleFilterChange(filter.name, filters[filter.name] === option ? "" : option)} readOnly /> <label>{option}</label>
                                      </div>
                                    ))}
                                  </div>
                              </div>
                              ))}
                          </div>
                          )}
                      </div>
                 </div>
               </div>
               {/* Names  */}
                <div className="w-full py-5 flex flex-col gap-5">
                    <div className="w-full flex items-center justify-between">
                      <div className="md:w-[40vh] border border-secondary/40 rounded-sm px-3 flex items-center bg-white/80">
                       <IoSearchSharp className="text-secondary/30" />
                       <input value={searchTraining} onChange={(e) => setSearchTraining(e.target.value)} type="text" className="py-2 w-full px-2 focus:outline-none focus:ring-0 text-sm" placeholder="Search training..." />
                      </div>
                      <div className="flex items-center gap-3">
                      <PrimaryButt onClick={handleExport}>
                          <LuDownload />
                          Export CSV
                      </PrimaryButt>
                    </div>
                    </div>
                    {/* Employees Table  */}
                    <table className="w-full mt-1 border text-xs border-secondary/30">
                       <thead>
                          <tr className="bg-secondary/10 border-b border-secondary/20">
                             <th className="text-left p-3">Employee</th>
                             <th className="text-left p-3">Training</th>
                             <th className="text-left p-3">Development gap</th>
                             <th className="text-left p-3">Training type</th>
                             <th className="text-left p-3">Duration</th>
                             <th className="text-left p-3">Total cost (N$)</th>
                             <th className="text-left p-3">Status</th>
                             {/* <th className="text-right p-3">Action</th> */}
                          </tr>
                       </thead>
                       <tbody>

                       {loading ? (
                          <tr>
                             <td colSpan={6} className="text-center py-5 text-secondary/60">
                                Loading assignments...
                             </td>
                          </tr>
                       ) : filteredTraining.length === 0 ? (
                          <tr>
                             <td colSpan={6} className="text-center py-5 text-secondary/60">
                                No assignments available.
                             </td>
                          </tr>
                       ) : (     
                        filteredTraining.map((assign, index) => (
                          <tr key = {index} onClick={() => navigate(`/admin/training_details/${assign.id}`)} className="border-t border-secondary/20 cursor-pointer bg-white/60 hover:bg-white/30">
                             <td className="px-3 py-3">{assign.first_name} {assign.last_name}</td>
                             <td className="px-3 py-3">{assign.training_name}</td>
                             <td className="px-3 py-3">{assign.reason}</td>
                             <td className="px-3 py-3">{assign.training_type}</td>
                             <td className="px-3 py-3">{assign.duration}</td>
                             <td className="px-3 py-3">{Number(assign.total_cost).toLocaleString("fr-FR", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                             <td className="px-3 py-3">
                                  <div className={`p-1 ${getStatusColor(assign.status)} rounded-xs font-bold flex items-center justify-center w-20`}>
                                    {assign.status}
                                  </div>
                             </td>
                             
                          </tr>
                        ))
                        )}
                       
                       </tbody>
                    </table>
                    
                </div>
             </div>

          </div>
       </div>
    )
}


export default TrainingHistoryPart;






// {/* <td className="px-3 text-right py-3">
//                                <div className="w-full flex justify-end items-center gap-3">
//                                 <button 
//                                 onClick={(e) => {e.stopPropagation(); cycleStatus(assign);}}
//                                 className="px-3 py-2 cursor-pointer border border-secondary/30 bg-white hover:bg-secondaryy 
//                                     text-xs font-bold rounded-md">Mark {getNextStatus(assign.status)}
//                                 </button>
//                                 {/* <div className="p-1 h-1 bg-green-600 rounded-full"></div> */}
//                                </div>
//                              </td> */}













   
   // const assignments = [
   //    {
   //       employee: "Petrus Hamukwaya",
   //       duration: "2 weeks",
   //       training: "Dangerous Goods Handling",
   //       assigned: "2026-05-22",
   //       deadline: "2026-07-21",
   //       status: "Completed"
   //    },
   //    {
   //        employee: "Johannes Kavela",
   //        duration: "2 weeks",
   //        training: "Human Factors in Aviation",
   //        assigned: "2026-04-22",
   //        deadline: "2026-06-21",
   //        status: "Completed"
   //     },
   //     {
   //        employee: "Nangula Iitula",
   //        duration: "2 weeks",
   //        training: "Aerodrome Inspection Procedures",
   //        assigned: "2026-04-07",
   //        deadline: "2026-06-06",
   //        status: "Completed"
   //     },
   //     {
   //        employee: "Tangeni Shipanga",
   //        duration: "2 weeks",
   //        training: "Human Factors in Aviation",
   //        assigned: "2026-03-28",
   //        deadline: "2026-05-27",
   //        status: "Completed"
   //     },
   //     {
   //        employee: "Hilma Nambahu",
   //        duration: "2 weeks",
   //        training: "Aviation Security (AVSEC)",
   //        assigned: "2026-03-13",
   //        deadline: "2026-05-12",
   //        status: "Completed"
   //     },
   //     {
   //        employee: "David Haufiku",
   //        duration: "2 weeks",
   //        training: "ICAO Aviation English Proficiency",
   //        assigned: "2026-02-26",
   //        deadline: "2026-04-27",
   //        status: "Completed"
   //     },
   //     {
   //        employee: "Maria Nghipundjwa",
   //        duration: "2 weeks",
   //        training: "Aerodrome Inspection Procedures",
   //        assigned: "2026-02-11",
   //        deadline: "2026-04-12",
   //        status: "Completed"
   //     },
   //     {
   //        employee: "Selma Amukwaya",
   //        duration: "2 weeks",
   //        training: "Dangerous Goods Handling",
   //        assigned: "2026-01-27",
   //        deadline: "2026-03-28",
   //        status: "Completed"
   //     },
   // ]




// className="w-full border text-xs border-secondary/30 