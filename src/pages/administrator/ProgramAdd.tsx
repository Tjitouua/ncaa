import React, { useState } from "react";
import TopMenu from "./components/TopMenu";
import Menu from "./components/Menu";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import Inputs from "../../ui/Inputs";
import PrimaryButt from "../../ui/PrimaryButt";
import { RiAddLargeLine } from "react-icons/ri";
import SelectInputs from "../../ui/SelectInputs";
import DateInputs from "../../ui/DateInputs";




const ProgramAdd = () => {

   const [showMenu, setShowMenu] = useState(false);

   const navigate = useNavigate();

   const [form, setForm] = useState({
      trainingName: "",
      trainingCode: "",
      desc: "",
      duration: "",
      category: "",
      trainer_provider: "",
      trainingType: "",
      validity: "",
      status: "",
      targetRole: "",
      startDate: "",
      endDate: "",
      recurrence: "",
      location: "",
      contactNo: "",
      email: ""
      // trainer: ""
   });


   const [errors, setErrors] = useState<any>({});
   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value})
   };



   const validate = () => {
      const newErrors: any = {};

      Object.keys(form).forEach((key) => {
          if (!form[key as keyof typeof form]) {
              newErrors[key] = "This field is required";
          }
      });

      setErrors(newErrors);

      return Object.keys(newErrors).length === 0;
   };



   const handleSubmit = async () => {
      if (!validate()) return;
   }



    return (
       <div className="w-full min-h-screen flex">
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          <div className="w-full xl:w-[82%] min-h-screen text-secondary/80 bg-secondaryy">
             <TopMenu setShowMenu={setShowMenu} title="Employees" />
             <div className="w-full min-h-screen flex flex-col gap-3 px-2 py-4 md:px-6">
                <label onClick={() => navigate("/admin/training_programs")}><IoArrowBack className="cursor-pointer hover:text-primary" /></label>



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

                          <Inputs
                            label="Training Code"
                            name="trainingCode"
                            value={form.trainingCode}
                            onChange={handleChange}
                            error={errors.trainingCode}
                            placeholder="Enter the program code"
                          />

                          <Inputs
                            label="Description"
                            name="desc"
                            value={form.desc}
                            onChange={handleChange}
                            error={errors.desc}
                            placeholder="Enter training description"
                          />

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
                            <option>Select category</option>
                            <option>Language</option>
                            <option>Operations</option>
                            <option>Safety</option>
                            <option>Security</option>
                            <option>Human Factors</option>
                          </SelectInputs>

                          <SelectInputs
                            label = "Trainer / Provider"
                            name = "trainer_provider"
                            value = {form.trainer_provider}
                            onChange = {handleChange}
                            error = {errors.trainer_provider}
                          >
                            <option>Select trainer</option>
                            <option>Internal Trainer</option>
                            <option>External Provider</option>
                          </SelectInputs>

                          <SelectInputs
                            label = "Training Type"
                            name = "trainingType"
                            value = {form.trainingType}
                            onChange = {handleChange}
                            error = {errors.trainingType}
                          >
                            <option>All types</option>
                            <option>Mandatory</option>
                            <option>Recommended</option>
                            <option>Optional</option>
                          </SelectInputs>

                          <Inputs
                            label="Validity duration"
                            name="validity"
                            value={form.validity}
                            onChange={handleChange}
                            error={errors.validity}
                            placeholder="Enter validity duration"
                          />

                          <SelectInputs
                            label = "Status"
                            name = "status"
                            value = {form.status}
                            onChange = {handleChange}
                            error = {errors.status}
                          >
                            <option>Select status</option>
                            <option>Active</option>
                            <option>Inactive</option>
                          </SelectInputs>

                          <Inputs
                            label="Target role (s)"
                            name="targetRole"
                            value={form.targetRole}
                            onChange={handleChange}
                            error={errors.targetRole}
                            placeholder="Enter program target role (s)"
                          />

                          <DateInputs name="startDate" value={form.startDate} onChange={handleChange} error={errors.startDate} label="Start date" />

                          <DateInputs name="endDate" value={form.endDate} onChange={handleChange} error={errors.endDate} label="End date" />

                          <SelectInputs
                            label = "Recurrence"
                            name = "trainingType"
                            value = {form.recurrence}
                            onChange = {handleChange}
                            error = {errors.recurrence}
                          >
                            <option>Select recurrence</option>
                            <option>One Time</option>
                            <option>Monthly</option>
                            <option>Quartely</option>
                            <option>Semi-Annual</option>
                            <option>Annual</option>
                            <option>Every 2 years</option>
                            <option>Every 3 years</option>
                            <option>Every 5 years</option>
                            <option>Every 10 years</option>
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
                            error={errors.contactNo}
                            placeholder="Enter program contact number"
                          />
                          <Inputs
                            label="Email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            error={errors.email}
                            placeholder="Enter program email address"
                          />

                      </div>
                      <PrimaryButt onClick={handleSubmit} className="w-full"><RiAddLargeLine /> Add Employee</PrimaryButt>
                   </div>
                </div>
             </div>




             </div>
          </div>
       </div>
    );
}

export default ProgramAdd;