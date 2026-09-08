import { useEffect, useState } from "react";
import { TbDownload } from "react-icons/tb";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
  } from "recharts";
import SelectInputs from "../../../ui/SelectInputs";





  const COLORS = ["#0962AB", "#F2970C", "#BD3217"]




const TrainingTypeGraph = () => {



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
            ? `http://localhost/ncaa/reports/get_training_type_stats.php?year=${selectedYear}`
            : `http://localhost/ncaa/reports/get_training_type_stats.php`;

        fetch(url)
        .then((res) => res.json())
        .then((result) => {
            if (result.success) {
                setData(result.data);
            }
        })
        .catch((error) => {
            console.error("Error fetching training statistics: ", error);
        });
    }, [selectedYear])



    return (
        <div className="p-6 flex flex-col bg-white shadow-xs shadow-secondary/20 h-[55vh]">
           <div className="w-full flex items-start justify-between">
              <div className="flex flex-col">
                 <label className="font-bold">Trainings attendance by Training Type</label>
                 <label className="text-xs text-secondary/50 mb-6">Initial/co-course, recurring, specialised, OJT, academic and workshops.</label>
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
                       <PieChart>
                           <Pie data={data} dataKey="trainings" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                               {data.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}  />
                               ))}
                           </Pie>
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
                           <Legend />
                       </PieChart>
               </ResponsiveContainer>
           </div>
        </div>
    )
}

export default TrainingTypeGraph;


