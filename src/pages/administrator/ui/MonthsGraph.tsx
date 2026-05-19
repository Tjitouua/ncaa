import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";


  const data = [
    {month: "Jan", completed: 13},
    {month: "Feb", completed: 7},
    {month: "Mar", completed: 10},
    {month: "Apr", completed: 5},
    {month: "May", completed: 20},
    {month: "Jun", completed: 16},
    {month: "Jul", completed: 4},
    {month: "Aug", completed: 25},
    {month: "Sep", completed: 11},
    {month: "Oct", completed: 17},
    {month: "Nov", completed: 8},
    {month: "Dec", completed: 5},
  ]


const MonthsGraph = () => {
     return (
        <div className="p-6 flex flex-col bg-white shadow-xs shadow-secondary/20 h-[55vh]">
           <label className="font-bold">Training Completion Trends</label>
           <label className="text-xs text-secondary/50 mb-6">Completed trainings per month (last 12 months)</label>

           <div className="flex-1 w-full text-xs">
               <ResponsiveContainer width="100%" height="100%">
                     <LineChart 
                     data={data}
                     margin = {{top: 0, right: 0, left: -35, bottom: 10}}
                     >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line 
                             type="monotone"
                             dataKey="completed"
                             stroke="#3b82f6"
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

export default MonthsGraph;