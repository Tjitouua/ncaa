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
    { name: "John Kamati", overdue: 2 },
    { name: "Maria Hansen", overdue: 3 },
    { name: "David Uusiku", overdue: 1 },
    { name: "Anna Shikongo", overdue: 1 },
    { name: "Peter Nghipandulwa", overdue: 2 }
  ]



const EmployeesGraph = () => {
     return (
        <div className="p-6 flex flex-col bg-white shadow-xs shadow-secondary/20 h-[55vh]">
           <label className="font-bold">Top Employees with Overdue Training</label>
           <label className="text-xs text-secondary/50 mb-6">Highest overdue counts, follow up directly</label>

           <div className="flex-1 w-full text-xs">
                <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data} layout="vertical" margin = {{top: 0, right: 0, left: -25, bottom: 10}}>
                           <CartesianGrid strokeDasharray="3 3" />
                           <XAxis type="number" />
                           <YAxis type="category" dataKey="name" width={120} />
                           <Tooltip />
                           <Bar dataKey="overdue" fill="#0962AB" radius={[0, 6, 6, 0]} />
                      </BarChart>
                </ResponsiveContainer>
           </div>
        </div>
     )
}

export default EmployeesGraph;