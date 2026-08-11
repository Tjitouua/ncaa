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
import TextAreaInputs from "../../ui/TextAreaInputs";




const StaffProgramAdd = () => {

   const [showMenu, setShowMenu] = useState(false);

   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);

   const [form, setForm] = useState({
      trainingCode: "",
      trainingName: "",
      description: "",
      duration: "",
      category: "",
      type: "",
      validity: "",
      status: "",
      trainer: "",
      provider: "",
      location: "",
      contactNo: "",
      email: "",

      cost: "",
      start_date: "",
      end_date: "",
      reason: ""
   });


   const [errors, setErrors] = useState<any>({});
   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

      setLoading(true);

      try {
        const response = await fetch(
           "http://localhost/ncaa/program/add_request.php",
           {
             method: "POST",
             credentials: "include",
             headers: {
                "Content-Type": "application/json",
             },
             body: JSON.stringify(form),
           }
        );

        const data = await response.json();
        

        if (data.success) {
           alert("Training added successfully");
           navigate("/staff/request_training");
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
             <div className="w-full min-h-screen flex flex-col gap-3 px-2 py-4 md:px-6">
                <label onClick={() => navigate("/staff/request_training")}><IoArrowBack className="cursor-pointer hover:text-primary" /></label>



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
                      <label className="font-bold">Training Details</label>
                      <label className="text-xs mb-3 text-secondary/40">Tell HR everything about the training</label>
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
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            error={errors.description}
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
                            <option value="">Select category</option>
                            <option value="Language">Language</option>
                            <option value="Operations">Operations</option>
                            <option value="Safety">Safety</option>
                            <option value="Security">Security</option>
                            <option value="Health">Health</option>
                            <option value="Human Factors">Human Factors</option>
                          </SelectInputs>

                          <SelectInputs
                            label = "Type"
                            name = "type"
                            value = {form.type}
                            onChange = {handleChange}
                            error = {errors.trainer_provider}
                          >
                            <option value="">Select type</option>
                            <option value="Internal">Internal</option>
                            <option value="External">External</option>
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
                            label="Trainer"
                            name="trainer"
                            value={form.trainer}
                            onChange={handleChange}
                            error={errors.location}
                            placeholder="Enter program location"
                          />

                          <Inputs
                            label="Provider"
                            name="provider"
                            value={form.provider}
                            onChange={handleChange}
                            error={errors.location}
                            placeholder="Enter program location"
                          />

                          <Inputs
                            label="Location"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            error={errors.location}
                            placeholder="Enter program location"
                          />

                          <Inputs
                            label="Contact number (trainer)"
                            name="contactNo"
                            value={form.contactNo}
                            onChange={handleChange}
                            error={errors.contactNo}
                            placeholder="Enter program contact number"
                          />

                          <Inputs
                            label="Email (trainer)"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            error={errors.email}
                            placeholder="Enter program email address"
                          />

                         <Inputs
                            label="Cost (N$)"
                            name="cost"
                            value={form.cost}
                            onChange={handleChange}
                            error={errors.cost}
                            placeholder="Enter the cost of the training"
                          />

                          <DateInputs
                            label="Start Date"
                            name="start_date"
                            value={form.start_date}
                            onChange={handleChange}
                            error={errors.start_date}
                          />

                          <DateInputs
                            label="End Date"
                            name="end_date"
                            value={form.end_date}
                            onChange={handleChange}
                            error={errors.end_date}
                          />

                          <TextAreaInputs
                            label="Reason for training"
                            name="reason"
                            value={form.reason}
                            onChange={handleChange}
                            error={errors.reason}
                            placeholder="Enter the reason for the training"
                          />

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

export default StaffProgramAdd;

