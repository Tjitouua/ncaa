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




const CostsGraph = () => {



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
            ? `http://localhost/ncaa/reports/get_costs_stats.php?year=${selectedYear}`
            : `http://localhost/ncaa/reports/get_costs_stats.php`;

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
    }, [selectedYear]);



    const costData = data.map((item) => ({
        name: item.quarter,
        value: Number(item.total),
        accommodation: Number(item.accommodation),
        travel: Number(item.travel),
        snt: Number(item.snt),
        training: Number(item.training),
        others: Number(item.others),
    }));



    return (
        <div className="p-6 flex flex-col bg-white shadow-xs shadow-secondary/20 h-[55vh]">
           <div className="w-full flex items-start justify-between">
              <div className="flex flex-col">
                 <label className="font-bold">Cost breakdown per Quarter</label>
                 <label className="text-xs text-secondary/50 mb-6">Quarterly and annual breakdown of accommodation, travel, S&T, training and other costs.</label>
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
                           <Pie data={costData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                               {costData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}  />
                               ))}
                           </Pie>
                           <Tooltip 
                               content={({ active, payload }) => {
                                if (!active || !payload || !payload.length) {
                                   return null;
                                }
   
                                const item = payload[0].payload;
   
                             return (
                                <div className="bg-white p-3 flex flex-col gap-1 shadow-md rounded">
                                   <p className="font-bold mb-1">{item.name}</p>
                                   <p>Training Cost:{" N$  "}{Number(item.training).toLocaleString("fr-FR", {minimumFractionDigits: 2,})}</p>
                                   <p>Accommodation Cost:{" N$  "}{Number(item.accommodation).toLocaleString("fr-FR", {minimumFractionDigits: 2,})}</p>
                                   <p>Travel Cost:{" N$  "}{Number(item.travel).toLocaleString("fr-FR", {minimumFractionDigits: 2,})}</p>
                                   <p>S&T Cost:{" N$  "}{Number(item.snt).toLocaleString("fr-FR", {minimumFractionDigits: 2,})}</p>
                                   <p>Other Costs:{" N$  "}{Number(item.others).toLocaleString("fr-FR", {minimumFractionDigits: 2,})}</p>
                                   <p className="font-bold mt-1">Total Cost:<span className="text-primary">{" N$  "}{Number(item.value).toLocaleString("fr-FR", {minimumFractionDigits: 2,})}</span></p>
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

export default CostsGraph;


