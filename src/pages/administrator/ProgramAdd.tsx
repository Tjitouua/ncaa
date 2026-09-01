import React, { useState } from "react";
import TopMenu from "./components/TopMenu";
import Menu from "./components/Menu";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import Inputs from "../../ui/Inputs";
import PrimaryButt from "../../ui/PrimaryButt";
import { RiAddLargeLine } from "react-icons/ri";
import SelectInputs from "../../ui/SelectInputs";
import DateInputs from "../../ui/DateInputs";




const ProgramAdd = () => {

   const [showMenu, setShowMenu] = useState(false);

   const navigate = useNavigate();
   const { id } = useParams();
   const [loading, setLoading] = useState(false);

   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

   const startYear = 2016;
   const currentYear = new Date().getFullYear();

   const years = Array.from(
      { length: currentYear - startYear + 1 },
      (_, i) => currentYear - i
   );


   const [form, setForm] = useState({
      trainingName: "",
      reason: "",
      duration: "",
      category: "",
      trainingType: "",
      method: "",
      validity: "",
      trainer: "",
      trainerStatus: "",
      provider: "",
      location: "",
      contactNo: "",
      email: "",
      trainingCost: "",
      accommodationCost: "",
      sntCost: "",
      flightCost: "",
      otherCosts: "",
      approved: "",
      year: "",
      quarter: "",
      start_date: "",
      end_date: "",
      region: "",
      acceptance: ""
   });


   const [errors, setErrors] = useState<any>({});
   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value})
   };



   const validate = () => {
      const newErrors: any = {};

      Object.keys(form).forEach((key) => {

        if (
            key !== "contactNo" &&
            key !== "email" &&
            key !== "start_date" &&
            key !== "end_date" &&
            key !== "trainingCost" &&
            key !== "accommodationCost" &&
            key !== "sntCost" &&
            key !== "flightCost" &&
            key !== "otherCosts" &&
            !form[key as keyof typeof form]
        ) {
           newErrors[key] = "This field is required";
        }
      });



      if (!form.contactNo.trim() && !form.email.trim()) {
        alert("Please enter either a contact number or an email address...");
        return false;
      }


      setErrors(newErrors);

      return Object.keys(newErrors).length === 0;
   };



   const handleSubmit = async () => {
      if (!validate()) return;

      setLoading(true);

      try {
        const response = await fetch(
           "http://localhost/ncaa/program/add_program.php",
           {
             method: "POST",
             headers: {
                "Content-Type": "application/json",
             },
             body: JSON.stringify({
                ...form,
                staff_id: id
             }),
           }
        );

        const data = await response.json();

        if (data.success) {
           alert("Training added successfully");
           navigate(`/admin/training_plans/${id}`);
        } else {
           alert(data.message);
        }
      } catch (error) {
          console.error(error);
          alert("Failed to connect to server");
      } finally {
        setLoading(false);
      }

   }



    return (
       <div className="w-full min-h-screen flex">
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          <div className="w-full xl:w-[82%] min-h-screen text-secondary/80 bg-secondaryy">
             <TopMenu setShowMenu={setShowMenu} title="Employees" />
             <div className="w-full min-h-screen flex flex-col gap-5 px-2 py-9 md:px-6">
                <label onClick={() => navigate(-1)}><IoArrowBack className="cursor-pointer hover:text-primary" /></label>



             {/* Form  */}
             <div className="w-full py-3 min-h-screen flex items-start justify-center">
                <div className="w-full md:w-5/6 flex flex-col bg-white shadow-md shadow-black/30">
                {/* <div className="w-full bg-secondaryy"><label onClick={() => navigate("/admin/employees")}><IoArrowBack className="cursor-pointer hover:text-primary" /></label></div> */}
                  {/* Top Part  */}
                   <div className="w-full py-5 px-5 bg-primaryy">
                      <div className="w-35 h-20 bg-[url('/images/ncaa-logo.png')] bg-center bg-cover"></div>
                   </div>
                   {/* Form (WHite Part) */}
                   <div className="bg-white flex flex-col py-5 pb-10 px-5">
                      <label className="font-bold">Add Training Program</label>
                      <label className="text-xs mb-3 text-secondary/40">Register a new program in the system.</label>
                      <div className="w-full pb-7 py-2 gap-4 text-secondary/60 grid grid-cols-1 sm:grid-cols-4">

                          <Inputs
                            label="Training Name"
                            name="trainingName"
                            value={form.trainingName}
                            onChange={handleChange}
                            error={errors.trainingName}
                            placeholder="Enter the program name"
                          />

                         <SelectInputs
                            label = "Learning and Development Gap"
                            name = "reason"
                            value = {form.reason}
                            onChange = {handleChange}
                            error = {errors.reason}
                          >
                            <option value="">Select reason</option>
                            <option value="Skill">Skill</option>
                            <option value="Knowledge">Knowledge</option>
                            <option value="Attitude">Attitude</option>
                            <option value="Behavior">Behavior</option>
                          </SelectInputs>


                          {/* <Inputs
                            label="Description"
                            name="desc"
                            value={form.desc}
                            onChange={handleChange}
                            error={errors.desc}
                            placeholder="Enter training description"
                          /> */}

                          <Inputs
                            label="Duration"
                            name="duration"
                            value={form.duration}
                            onChange={handleChange}
                            error={errors.duration}
                            placeholder="Enter duration"
                          />

                          <SelectInputs
                            label = "Category"
                            name = "category"
                            value = {form.category}
                            onChange = {handleChange}
                            error = {errors.category}
                          >
                            <option value="">Select category</option>
                            <option value="Mandatory">Mandatory</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Certification">Certification</option>
                            <option value="Personal Development">Personal Development</option>
                          </SelectInputs>

                          <SelectInputs
                            label = "Training type"
                            name = "trainingType"
                            value = {form.trainingType}
                            onChange = {handleChange}
                            error = {errors.trainingType}
                          >
                            <option value="">Select type</option>
                            <option value="Initial / co-course">Initial / co-course</option>
                            <option value="Recurring">Recurring</option>
                            <option value="Specialized">Specialized</option>
                            <option value="OJT">OJT</option>
                            <option value="Academic qualification">Academic qualification</option>
                            <option value="Industrial workshop / conference / Seminar">Industrial workshop / conference / Seminar</option>
                          </SelectInputs>

                          <SelectInputs
                            label = "Method"
                            name = "method"
                            value = {form.method}
                            onChange = {handleChange}
                            error = {errors.method}
                          >
                            <option value="">Select method</option>
                            <option value="Online">Online</option>
                            <option value="In-house">In-house</option>
                            <option value="Face-to-face">Face-to-face</option>
                          </SelectInputs>


                          <Inputs
                            label="Validity duration"
                            name="validity"
                            value={form.validity}
                            onChange={handleChange}
                            error={errors.validity}
                            placeholder="Enter validity duration"
                          />

                          {/* <SelectInputs
                            label = "Status"
                            name = "status"
                            value = {form.status}
                            onChange = {handleChange}
                            error = {errors.status}
                          >
                            <option value="">Select status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </SelectInputs> */}

                          <Inputs
                            label="Training Provider / Institution"
                            name="provider"
                            value={form.provider}
                            onChange={handleChange}
                            error={errors.provider}
                            placeholder="Enter Institution (Provider)"
                          />

                          <Inputs
                            label="Trainer / Instructor"
                            name="trainer"
                            value={form.trainer}
                            onChange={handleChange}
                            error={errors.location}
                            placeholder="Enter program location"
                          />

                          <SelectInputs
                            label = "Trainer Status"
                            name = "trainerStatus"
                            value = {form.trainerStatus}
                            onChange = {handleChange}
                            error = {errors.trainerStatus}
                          >
                            <option value="">Select trainer status</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Not Qualified">Not Qualified</option>
                          </SelectInputs>

                          <Inputs
                            label="Location"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            error={errors.location}
                            placeholder="Enter program location"
                          />

                          <Inputs
                            label="Contact number"
                            name="contactNo"
                            value={form.contactNo}
                            onChange={handleChange}
                            // error={errors.contactNo}
                            placeholder="Enter program contact number"
                          />

                          <Inputs
                            label="Email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            // error={errors.email}
                            placeholder="Enter program email address"
                          />

                         <Inputs
                            label="Training Cost (N$)"
                            name="trainingCost"
                            value={form.trainingCost}
                            onChange={handleChange}
                            // error={errors.cost}
                            placeholder="Enter Training Cost (N$)"
                          />

                          <Inputs
                            label="Accommodation Cost (N$)"
                            name="accommodationCost"
                            value={form.accommodationCost}
                            onChange={handleChange}
                            // error={errors.accommodationCost}
                            placeholder="Enter Accommodation Cost (N$)"
                          />

                          <Inputs
                            label="SNT Cost (N$)"
                            name="sntCost"
                            value={form.sntCost}
                            onChange={handleChange}
                            // error={errors.sntCost}
                            placeholder="Enter SNT Cost (N$)"
                          />

                          <Inputs
                            label="Flight Cost (N$)"
                            name="flightCost"
                            value={form.flightCost}
                            onChange={handleChange}
                            // error={errors.flightCost}
                            placeholder="Enter Flight Cost (N$)"
                          />

                          <Inputs
                            label="Other Costs (N$)"
                            name="otherCosts"
                            value={form.otherCosts}
                            onChange={handleChange}
                            // error={errors.otherCosts}
                            placeholder="Enter Other Costs (N$)"
                          />

                          <SelectInputs
                            label = "Plan Approved"
                            name = "approved"
                            value = {form.approved}
                            onChange = {handleChange}
                            error = {errors.approved}
                          >
                            <option value="">Part of approved Training Plan</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </SelectInputs>


                          <SelectInputs
                            label = "Year"
                            name = "year"
                            value = {form.year}
                            onChange = {handleChange}
                            error = {errors.year}
                          >
                            <option value="">Choose year</option>
                            {years.map((year) => (
                              <option key={year} value={year}>{year}</option>
                            ))}
                          </SelectInputs>



                          <SelectInputs
                            label = "Quarter"
                            name = "quarter"
                            value = {form.quarter}
                            onChange = {handleChange}
                            error = {errors.quarter}
                          >
                            <option value="">Choose Quarter</option>
                            <option value="1">First (1)</option>
                            <option value="2">Second (2)</option>
                            <option value="3">Third (3)</option>
                            <option value="4">Fourth (4)</option>
                          </SelectInputs>



                          <DateInputs name="start_date" value={form.start_date} onChange={handleChange} label="Start date" />

                          <DateInputs name="end_date" value={form.end_date} onChange={handleChange} label="End date" />



                          <SelectInputs
                            label = "Training Region"
                            name = "region"
                            value = {form.region}
                            onChange = {handleChange}
                            error = {errors.region}
                          >
                            <option value="">Select region</option>
                            <option value="Namibia">Namibia</option>
                            <option value="Africa">Africa</option>
                            <option value="Africa">International</option>
                          </SelectInputs>



                          <SelectInputs
                            label = "Training Acceptance"
                            name = "acceptance"
                            value = {form.acceptance}
                            onChange = {handleChange}
                            error = {errors.acceptance}
                          >
                            <option value="">Select status</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                          </SelectInputs>


                      </div>
                      <PrimaryButt 
                      disabled={loading}
                      onClick={handleSubmit} className="w-full">
                        {loading ? "Adding program..." : (
                        <><RiAddLargeLine /> Add Training Program</>
                        )}
                      </PrimaryButt>
                   </div>
                </div>
             </div>




             </div>
          </div>
       </div>
    );
}

export default ProgramAdd;













// targetRole: "",
//       startDate: "",
//       endDate: "",










{/* <SelectInputs
                            label = "Training Type"
                            name = "trainingType"
                            value = {form.trainingType}
                            onChange = {handleChange}
                            error = {errors.trainingType}
                          >
                            <option value="">Select training type</option>
                            <option value="Mandatory">Mandatory</option>
                            <option value="Recommended">Recommended</option>
                            <option value="Optional">Optional</option>
                          </SelectInputs> */}



{/* <Inputs
                            label="Target role (s)"
                            name="targetRole"
                            value={form.targetRole}
                            onChange={handleChange}
                            error={errors.targetRole}
                            placeholder="Enter program target role (s)"
                          /> */}

                          {/* <DateInputs name="startDate" value={form.startDate} onChange={handleChange} error={errors.startDate} label="Start date" />

                          <DateInputs name="endDate" value={form.endDate} onChange={handleChange} error={errors.endDate} label="End date" /> */}

                          {/* <SelectInputs
                            label = "Recurrence"
                            name = "recurrence"
                            value = {form.recurrence}
                            onChange = {handleChange}
                            error = {errors.recurrence}
                          >
                            <option value="">Select recurrence</option>
                            <option value="One Time">One Time</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Quarterly">Quarterly</option>
                            <option value="Semi-Annual">Semi-Annual</option>
                            <option value="Annual">Annual</option>
                            <option value="Every 2 years">Every 2 years</option>
                            <option value="Every 3 years">Every 3 years</option>
                            <option value="Every 5 years">Every 5 years</option>
                            <option value="Every 10 years">Every 10 years</option>
                          </SelectInputs> */}