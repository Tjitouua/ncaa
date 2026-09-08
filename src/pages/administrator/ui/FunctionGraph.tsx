import { useEffect, useState } from "react";
import { TbDownload } from "react-icons/tb";
import jsPDF from "jspdf";
import autoTable, { HookData } from "jspdf-autotable";
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




const FunctionGraph = () => {




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
            ? `http://localhost/ncaa/reports/get_training_function.php?year=${selectedYear}`
            : `http://localhost/ncaa/reports/get_training_function.php`;


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





    // PDF Report 
    const downloadPDF = () => {
        const doc = new jsPDF;

        // Colors 
        // const darkBlue = "#193B63";
        // const darkBlue = "#3E5DE6";
        const darkBlue = "#3451D1";
        const lightBlue = "#E9EEF5";
        const textGray = "#555555";
        const lightGray = "#F7FBFC";


        // Header 
        // doc.setFillColor(255, 255, 255);
        // doc.rect(0, 0, 210, 35, "S");

        const logo = new Image();
        logo.src = "/images/ncaa_logo3.jpeg";

        logo.onload = () => {

        doc.addImage(logo, "JPEG", 92.5, 10, 30, 30);

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(
            "Private Bag 12003 Windhoek Namibia | (Tel) +264 83 235 2100 | (Web) https://ncaa.com.na/",
            105,
            50,
            { align: "center" }
        );
        
        


        // Top Part 
        // doc.setFillColor(255, 255, 155);
        // doc.rect(0, 0, 210, 35, "S");

        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        doc.text(
            "Training by Main Function",
            10,
            80
        )


        const financialYear = selectedYear
              ? `Year: ${selectedYear}/${String(Number(selectedYear) + 1).slice(-2)}`
              : "All Financial Years";

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(
            financialYear,
            10,
            87
        )



        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(
            "Regulatory, Support and Service Provider totals including overall cost.",
            10,
            92
        )



        const generatedDate = new Date().toLocaleString();

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(
            `Generated: ${generatedDate}`,
            10,
            97
        )




        // Table data 
        const tableData = data.map((item: any) => [
            item.name,
            item.trainings,
            item.staff,
            item.cost,
            `N$ ${Number(item.cost).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`,
        ]);





        // Total 
        const totalTrainings = data.reduce(
            (total: number, item: any) =>
                 total + Number(item.trainings || 0),
            0
        );


        const totalStaff = data.reduce(
            (total: number, item: any) =>
                 total + Number(item.staff || 0),
            0
        );


        const totalCost = data.reduce(
            (total: number, item: any) =>
                 total + Number(item.cost || 0),
            0
        );





        // Total row 
        tableData.push([
            "TOTAL",
            totalTrainings,
            totalStaff,
            `N$ ${totalCost.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}`,
        ]);




        // Create table 
        autoTable(doc, {
            startY: 107,

            margin: {
               left: 10,
               right: 10
            },

            head: [
                [
                   "Main Function",
                   "Trainings Attended",
                   "Staff",
                   "Total Cost",
                ],
            ],

            body: tableData,

            theme: "plain",

            headStyles: {
                fillColor: darkBlue,
                textColor: 255,
                fontStyle: "bold",
                fontSize: 9,
            },

            bodyStyles: {
                fontSize: 9,
                textColor: [80, 80, 80],
            },

            alternateRowStyles: {
                fillColor: lightGray,
            },

            columnStyles: {
                0: {
                    cellWidth: 56,
                },
                1: {
                    cellWidth: 45,
                    halign: "left",
                },
                2: {
                    cellWidth: 45,
                    halign: "left",
                },
                3: {
                    cellWidth: 45,
                    halign: "left",
                },
            },


            styles: {
                cellPadding: 5,
                lineWidth: 0,
            },

            didParseCell: (hookData) => {
                // Total row bold 
                if (
                    hookData.row.index === tableData.length - 1
                ) {
                    hookData.cell.styles.fontStyle = "bold";
                }
            },

        });






        const fileName = selectedYear
              ? `Trainings_by_Main_Functions_${selectedYear}.pdf`
              : "Trainings_by_Main_Functions";






        logo.onerror = () => {
            console.error("Logo failed to load");
        };




 
        const boardMembers =
              "Board Members: Ms. Loide Shaparara (Chairperson), Ms. Martha Hitenanye (Deputy Chairperson), Mr. Edward N Kafita, Dr. John Shimaneni, Mr. Edson E Isaaks, Mr. Sam H Nekaro, Mr. Onesmus L. Kaukungwa Ms. Toska Sem (Executive Director)";

        
        const wrappedBoardMembers = doc.splitTextToSize(boardMembers, 160);

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(
            wrappedBoardMembers,
            105,
            doc.internal.pageSize.getHeight() - 20,
            { align: "center" }
        )





        doc.save(fileName);

        };

    }



    // doc.setFontSize(16);
    // doc.setFont("helvetica", "bold");
    // doc.text(
    //     "NCAA - Training Record Management System",
    //     105,
    //     15,
    //     { align: "center" }
    // );



    return (
        <div className="p-6 flex flex-col bg-white shadow-xs shadow-secondary/20 h-[55vh]">
           <div className="w-full flex items-start justify-between">
              <div className="flex flex-col">
                 <label className="font-bold">Trainings by Main Function</label>
                 <label className="text-xs text-secondary/50 mb-6">Regulatory, Support and Service Provider totals including overall cost.</label>
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
                 <TbDownload onClick={downloadPDF} className="font-bold cursor-pointer hover:text-primary" />
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

export default FunctionGraph;


