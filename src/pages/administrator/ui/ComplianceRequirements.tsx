import { IoSearchSharp } from "react-icons/io5";




const ComplianceRequirements = () => {
    return (
       <div className="w-full lg:w-[70%] h-[75vh] overflow-y-auto scrollbar-thin scrollbar-secondaryy/10 flex flex-col items-start gap-2 py-6 px-5 bg-white shadow-sm shadow-secondary/30">

          {/* Top Part  */}
          <div className="w-full flex items-center justify-between py-4 px-4 bg-white shadow-sm shadow-secondary/30">
              {/* Stats Part  */}
              <div className="flex flex-col gap-2">
                 <label className="font-bold text-primary">Software Developer</label>
                 <div className="flex items-center gap-3">
                   <div className="py-1 px-3 bg-red-100 flex items-3 gap-2 text-xs text-red-700">
                       <label>1</label>
                       <label>Mandatory</label>
                   </div>
                   <div className="py-1 px-3 bg-green-100 flex items-3 gap-2 text-xs text-green-700">
                       <label>2</label>
                       <label>Recommended</label>
                   </div>
                   <div className="py-1 px-3 bg-secondary/10 flex items-3 gap-2 text-xs text-secondary/80">
                       <label>2</label>
                       <label>Staff</label>
                   </div>
                </div>
              </div>
              {/* Search Part  */}
              <div className="flex items-center text-xs gap-2 border px-3 border-secondary/30 bg-secondaryy/30 rounded-md">
                      <IoSearchSharp />
                      <input className="py-3 font-bold focus:outline-none placeholder:font-normal placeholder:text-xs" type="text" placeholder="Search staff..." />
              </div>
          </div>


          {/* Staff Part  */}
          <div className="w-full py-4 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="py-3 bg-white shadow-sm shadow-secondary/30">

              </div>
          </div>

       </div>
    );
}


export default ComplianceRequirements;