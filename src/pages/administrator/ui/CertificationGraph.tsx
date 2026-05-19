import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
  } from "recharts";



  const data = [
    {name: "Active", value: 230},
    {name: "Expiring Soon", value: 32},
    {name: "Expired", value: 6}
  ];


  const COLORS = ["#0962AB", "#BD3217", "#217A1C"]




const CertificationGraph = () => {
    return (
        <div className="p-6 flex flex-col bg-white shadow-xs shadow-secondary/20 h-[55vh]">
           <label className="font-bold">Certification Status Distribution</label>
           <label className="text-xs text-secondary/50 mb-6">Active vs expiring vs expired</label>

           <div className="flex-1 w-full text-xs">
               <ResponsiveContainer width="100%" height="100%">
                       <PieChart>
                           <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                               {data.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}  />
                               ))}
                           </Pie>
                           <Tooltip />
                           <Legend />
                       </PieChart>
               </ResponsiveContainer>
           </div>
        </div>
    )
}

export default CertificationGraph;