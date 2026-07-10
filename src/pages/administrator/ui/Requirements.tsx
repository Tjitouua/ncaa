import { IoMdInformationCircleOutline } from "react-icons/io";
import PrimaryButt from "../../../ui/PrimaryButt";
import { RiAddLargeLine, RiDeleteBin6Line } from "react-icons/ri";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useState } from "react";



const Requirements = () => {

// const [loading, setLoading] = 
const [selectedTab, setSelectedTab] = useState("Mandatory");

//    Mandatory 
   const mandatory = [
    {
        training_name: "Fire Safety",
        training_code: "FS101",
        category: "Safety",
        duration: "2 weeks",
        renewalPeriod: "2 years"
    },
    {
        training_name: "First Aid",
        training_code: "FS101",
        category: "Safety",
        duration: "5 days",
        renewalPeriod: "2 years"
    },
    {
        training_name: "Human factors in Aviation",
        training_code: "FS101",
        category: "Human Factors",
        duration: "2 weeks",
        renewalPeriod: "Infinite"
    },
 
 ];



 //    Recommended 
 const recommended = [
    {
        training_name: "Fire Safety",
        training_code: "FS101",
        category: "Safety",
        duration: "2 weeks",
        renewalPeriod: "2 years"
    },
    {
        training_name: "First Aid",
        training_code: "FS101",
        category: "Safety",
        duration: "5 days",
        renewalPeriod: "2 years"
    },
 
 ];




 //    Mandatory 
 const required = [
    {
        training_name: "Fire Safety",
        training_code: "FS101",
        category: "Safety",
        duration: "2 weeks",
        renewalPeriod: "2 years"
    },
    {
        training_name: "First Aid",
        training_code: "FS101",
        category: "Safety",
        duration: "5 days",
        renewalPeriod: "2 years"
    },
    {
        training_name: "Human factors in Aviation",
        training_code: "FS101",
        category: "Human Factors",
        duration: "2 weeks",
        renewalPeriod: "Infinite"
    },
    {
        training_name: "First Aid",
        training_code: "FS101",
        category: "Safety",
        duration: "5 days",
        renewalPeriod: "2 years"
    },
    {
        training_name: "Human factors in Aviation",
        training_code: "FS101",
        category: "Human Factors",
        duration: "2 weeks",
        renewalPeriod: "Infinite"
    },
 
 ];



 const training = selectedTab === "Mandatory" ? mandatory : selectedTab === "Recommended" ? recommended : required;





 const tabs = [
    { name: "Mandatory", count: 3 },
    { name: "Recommended", count: 2 },
    { name: "Not Required", count: 20 }
 ];



const tabInfo = {
    Mandatory: {
        text: "These are the mandatory training requirements for the Software Developer."
    },
    Recommended: {
        text: "These are the recommended training requirements for the Software Developer."
    },
    "Not Required": {
        text: "Training programs not assigned to Software Developer."
    }
};

 const currentTab = tabInfo[selectedTab];










    return (
        <div className="w-[70%] h-[75vh] overflow-y-auto scrollbar-thin scrollbar-secondaryy/10 flex flex-col items-start gap-2 py-6 px-5 bg-white shadow-sm shadow-secondary/30">

            {/* Top Part  */}
            <div className="w-full flex items-center text-secondary/80 font-bold text-sm justify-between">
                <label>2. Manage Requirements for:  <span className="text-primary ml-2">Software Developer</span></label>
                <div className="flex items-center gap-3">
                   <div className="py-2 px-3 bg-red-100 flex items-3 gap-3 text-xs text-red-700">
                       <label>Mandatory</label>
                       <label>3</label>
                   </div>
                   <div className="py-2 px-3 bg-green-100 flex items-3 gap-3 text-xs text-green-700">
                       <label>Recommended</label>
                       <label>2</label>
                   </div>
                   <div className="py-2 px-3 bg-secondary/10 flex items-3 gap-3 text-xs text-secondary/80">
                       <label>Total</label>
                       <label>5</label>
                   </div>
                </div>
            </div>

            {/* Navigate tab  */}
            <div className="w-full flex items-center text-xs font-bold border-b border-secondary/20 mt-2">
                {tabs.map((tab) => (
                  <div 
                  key = {tab.name}
                  onClick={() => setSelectedTab(tab.name)}
                  className={`px-3 ${ selectedTab === tab.name ? "border-b-4 border-primary" : "" } py-2 cursor-pointer hover:bg-primary/10`}><label>{tab.name} ({tab.count})</label></div>
                ))}
            </div>


             {/* Mandatory  */}
            <div className="w-full flex flex-col gap-3">
            {/* Add Requirement Part  */}
            <div className="w-full items-center flex justify-between py-2">
                <div className="rounded-sm bg-primary/10 border border-primary/30 flex items-center gap-3 text-xs font-bold py-2 px-3">
                   <IoMdInformationCircleOutline />
                   <label>{currentTab.text}</label>
                </div>
                <PrimaryButt>
                    <RiAddLargeLine />
                    Add Requirement
                </PrimaryButt>
            </div>

            {/* Trainings Table  */}
            <table className="w-full mt-1 border text-xs border-secondary/30">
                       <thead>
                          <tr className="bg-secondary/10 border-b border-secondary/20">
                             <th className="text-left p-3"></th>
                             <th className="text-left p-3">Training</th>
                             <th className="text-left p-3">Category</th>
                             <th className="text-left p-3">Duration</th>
                             <th className="text-left p-3">Renewal</th>
                             <th className="text-left p-3">Action</th>
                          </tr>
                       </thead>
                       <tbody>
                        {training.map((training, index) => (
                          <tr key={index} className="border-t border-secondary/20 bg-white/60">
                             <td className="px-3 py-3"><RxDragHandleDots2 /></td>
                             <td className="px-3 py-3">{training.training_name}</td>
                             <td className="px-3 py-3">{training.category}</td>
                             <td className="px-3 py-3">{training.duration}</td>
                             <td className="px-3 py-3">{training.renewalPeriod}</td>
                             <td className="px-3 py-3">
                                {/* <div className="flex items-center justify-center"> */}
                                  <button 
                                     className="flex items-center gap-2 font-bold 
                                     rounded-sm py-2 px-3 cursor-pointer hover:text-white hover:bg-primary"><RiDeleteBin6Line /></button>
                                {/* </div> */}
                             </td>
                          </tr>
                        ))}
                       </tbody>
            </table>
            </div>





        </div>
    );
}

export default Requirements;