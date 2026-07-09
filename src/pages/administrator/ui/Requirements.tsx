import { IoMdInformationCircleOutline } from "react-icons/io";
import PrimaryButt from "../../../ui/PrimaryButt";
import { RiAddLargeLine } from "react-icons/ri";



const Requirements = () => {
    return (
        <div className="w-[70%] h-[75vh] flex flex-col items-start gap-2 py-6 px-5 bg-white shadow-sm shadow-secondary/30">

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
                <div className="px-3 py-2 cursor-pointer hover:bg-primary/10 border-b-4 border-primary"><label>Mandatory (3)</label></div>
                <div className="px-3 py-2 cursor-pointer hover:bg-primary/10"><label>Recommended (2)</label></div>
                <div className="px-3 py-2 cursor-pointer hover:bg-primary/10"><label>Not Required (25)</label></div>
            </div>

            {/* Add Requirement Part  */}
            <div className="w-full items-center flex justify-between py-2">
                <div className="rounded-sm bg-primary/10 border border-primary/30 flex items-center gap-3 text-xs font-bold py-2 px-3">
                   <IoMdInformationCircleOutline />
                   <label>These are the mandatory training requirements for the Software Developer.</label>
                </div>
                <PrimaryButt>
                    <RiAddLargeLine />
                    Add Requirement
                </PrimaryButt>
            </div>

        </div>
    );
}

export default Requirements;