import { useEffect, useState } from "react";
import { TbDownload } from "react-icons/tb";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
import SelectInputs from "../../../ui/SelectInputs";





const DivisionsGraph = () => {



   const [data, setData] = useState([]);
   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

   const startYear = 2016;
   const currentYear = new Date().getFullYear();

   const years = Array.from(
      { length: currentYear - startYear + 1 },
      (_, i) => currentYear - i
   );

   useEffect(() => {
      const url = selectedYear
            ? `http://localhost/ncaa/reports/get_training_division_stats.php?year=${selectedYear}`
            : `http://localhost/ncaa/reports/get_training_division_stats.php`;

      fetch(url)
      .then((res) => res.json())
      .then((result) => {
         if (result.success) {
            setData(result.data);
         }
      })
      .catch((error) => {
         console.error("Error fetching training division: ", error);
      });
   }, [selectedYear])




     return (
        <div className="p-6 flex flex-col bg-white shadow-xs shadow-secondary/20 h-[55vh]">
           <div className="w-full flex items-start justify-between">
              <div className="flex flex-col">
                 <label className="font-bold">Training per Division</label>
                 <label className="text-xs text-secondary/50 mb-6">Trainings attended and cost per division</label>
              </div>
              <div className="flex items-center gap-2">
                 <SelectInputs
                            // label = "Year"
                            name = "year"
                            value = {selectedYear}
                            onChange = {(e) => setSelectedYear(e.target.value)}
                            className="!border-none"
                          >
                            <option value="">year</option>
                            {years.map((year) => (
                              <option key={year} value={year}>{year}</option>
                            ))}
                 </SelectInputs>
                 <TbDownload className="font-bold cursor-pointer hover:text-primary" />
              </div>
           </div>

           <div className="flex-1 w-full text-xs">
               <ResponsiveContainer width="100%" height="100%">
                     <LineChart 
                     key={selectedYear}
                     data={data}
                     margin = {{top: 10, right: 10, left: -25, bottom: 10}}
                     >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" interval={0} angle={-15} textAnchor="end" />
                          <YAxis />
                          <Tooltip 
                              content={({ active, payload }) => {
                                 if (!active || !payload || !payload.length) {
                                    return null;
                                 }

                                 const data = payload[0].payload;

                                 return (
                                     <div className="bg-white p-3 shadow-md rounded">
                                        <p className="font-bold">{data.name}</p>
                                        <p>Trainings: {data.trainings}</p>
                                        <p>Staff: {data.staff}</p>
                                        <p>Cost:{" N$  "}{Number(data.cost).toLocaleString("fr-FR", {minimumFractionDigits: 2,})}</p>
                                     </div>
                                 );
                              }}
                          />
                          <Line 
                             type="monotone"
                             dataKey="trainings"
                             stroke="#0962AB"
                             strokeWidth={2}
                             dot={{ r: 3 }}
                             activeDot={{ r: 6 }}
                          />
                     </LineChart>
               </ResponsiveContainer>
           </div>
        </div>
     )
}

export default DivisionsGraph;













// const data = [
//    {month: "Jan", completed: 13},
//    {month: "Feb", completed: 7},
//    {month: "Mar", completed: 10},
//    {month: "Apr", completed: 5},
//    {month: "May", completed: 20},
//    {month: "Jun", completed: 16},
//    {month: "Jul", completed: 4},
//    {month: "Aug", completed: 25},
//    {month: "Sep", completed: 11},
//    {month: "Oct", completed: 17},
//    {month: "Nov", completed: 8},
//    {month: "Dec", completed: 5},
//  ]