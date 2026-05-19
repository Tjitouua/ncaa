import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";



  const data = [
    {
       name: "Flight Operations",
       percentage: 100
    },
    {
        name: "Engineering",
        percentage: 100
     },
     {
        name: "Administration",
        percentage: 100
     },
     {
        name: "Aerodromes",
        percentage: 67
     },
     {
        name: "Air Navigation",
        percentage: 60
     },
     {
        name: "Safety & Security",
        percentage: 60
     }
  ]



const ComplianceGraph = () => {
     return (
        <div className="p-5 flex flex-col bg-white shadow-xs shadow-secondary/20 h-[55vh]">
           <label className="font-bold">Training Compliance by Department</label>
           <label className="text-xs text-secondary/50">% of assignments completed per department</label>

           <div className="flex-1 w-full">
           <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={data}>
                       <CartesianGrid strokeDasharray="3 3" />
                       <XAxis dataKey="name" />
                       <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
                       <Tooltip formatter={(value) => `${value}%`} />
                       <Bar dataKey="percentage" radius={[6, 6, 0, 0]} />
                   </BarChart>
           </ResponsiveContainer>
           </div>
        </div>
     )
}

export default ComplianceGraph;