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
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";





  const COLORS = ["#0962AB", "#F2970C", "#BD3217"]




const CostsGraph = () => {



   const [data, setData] = useState<any[]>([]);
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














    
   
    // PDF Report 
    const downloadPDF = () => {
        const doc = new jsPDF;
  
        // Colors 
        const darkBlue = "#3451D1";
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
            "Trainings per Department",
            10,
            80
        )
  
  
        const financialYear = selectedYear
              ? `Year: ${selectedYear}/${String(Number(selectedYear) + 1).slice(-2)} - Trainings attended and costs per department.`
              : "All Financial Years";
  
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(
            financialYear,
            10,
            87
        )
  
  
  
        // doc.setFontSize(10);
        // doc.setFont("helvetica", "normal");
        // doc.text(
        //     "Regulatory, Support and Service Provider totals including overall cost.",
        //     10,
        //     92
        // )
  
  
  
        const generatedDate = new Date().toLocaleString();
  
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(
            `Generated: ${generatedDate}`,
            10,
            92
        );




        const formatMoney = (value: number) =>
            `N$ ${Number(value || 0).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`;



        
        
        // Quarter data 
        const q1 = data.find((item: any) => item.quarter === "Quarter 1");
        const q2 = data.find((item: any) => item.quarter === "Quarter 2");
        const q3 = data.find((item: any) => item.quarter === "Quarter 3");
        const q4 = data.find((item: any) => item.quarter === "Quarter 4");




        const tableData = [
            [
                "Training fees",
                formatMoney(q1?.training),
                formatMoney(q2?.training),
                formatMoney(q3?.training),
                formatMoney(q4?.training),
                formatMoney(
                    Number(q1?.training || 0) +
                    Number(q2?.training || 0) +
                    Number(q3?.training || 0) +
                    Number(q4?.training || 0) 
                ),
            ],
            [
                "Accommodation",
                formatMoney(q1?.Accommodation),
                formatMoney(q2?.Accommodation),
                formatMoney(q3?.Accommodation),
                formatMoney(q4?.Accommodation),
                formatMoney(
                    Number(q1?.Accommodation || 0) +
                    Number(q2?.Accommodation || 0) +
                    Number(q3?.Accommodation || 0) +
                    Number(q4?.Accommodation || 0) 
                ),
            ],
            [
                "S&T",
                formatMoney(q1?.snt),
                formatMoney(q2?.snt),
                formatMoney(q3?.snt),
                formatMoney(q4?.snt),
                formatMoney(
                    Number(q1?.snt || 0) +
                    Number(q2?.snt || 0) +
                    Number(q3?.snt || 0) +
                    Number(q4?.snt || 0) 
                ),
            ],
            [
                "Travel tickets / flights",
                formatMoney(q1?.travel),
                formatMoney(q2?.travel),
                formatMoney(q3?.travel),
                formatMoney(q4?.travel),
                formatMoney(
                    Number(q1?.travel || 0) +
                    Number(q2?.travel || 0) +
                    Number(q3?.travel || 0) +
                    Number(q4?.travel || 0) 
                ),
            ],
            [
                "Other costs",
                formatMoney(q1?.others),
                formatMoney(q2?.others),
                formatMoney(q3?.others),
                formatMoney(q4?.others),
                formatMoney(
                    Number(q1?.others || 0) +
                    Number(q2?.others || 0) +
                    Number(q3?.others || 0) +
                    Number(q4?.others || 0) 
                ),
            ],
        ];






        // Total Row
        const totalQ1 = Number(q1?.total || 0); 
        const totalQ2 = Number(q2?.total || 0); 
        const totalQ3 = Number(q3?.total || 0); 
        const totalQ4 = Number(q4?.total || 0); 


        const financialYearTotal =
             totalQ1 +
             totalQ2 +
             totalQ3 +
             totalQ4;


        
        tableData.push([
            "TOTAL",
            formatMoney(totalQ1),
            formatMoney(totalQ2),
            formatMoney(totalQ3),
            formatMoney(totalQ4),
            formatMoney(financialYearTotal),
        ]);
  
  

  
  
  
        // Create table 
        autoTable(doc, {
            startY: 100,
  
            margin: {
               left: 10,
               right: 10
            },
  
            head: [
                [
                   "Cost Item",
                   "Q1",
                   "Q2",
                   "Q3",
                   "Q4",
                   "Total"
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
                    cellWidth: 42,
                },
                1: {
                    cellWidth: 30,
                    halign: "left",
                },
                2: {
                    cellWidth: 30,
                    halign: "left",
                },
                3: {
                    cellWidth: 30,
                    halign: "left",
                },
                4: {
                    cellWidth: 30,
                    halign: "left",
                },
                5: {
                    cellWidth: 30,
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
              ? `ncaa_trainings_total_trainings_cost_${selectedYear}.pdf`
              : "ncaa_trainings_total_trainings_cost";
  
  
  
  
  
  
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
                 <TbDownload onClick={downloadPDF} className="font-bold cursor-pointer hover:text-primary" />
              </div>
           </div>

           <div className="flex-1 w-full text-xs">
               <ResponsiveContainer width="100%" height="100%">
                       <PieChart>
                           <Pie data={costData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                               {costData.map((_, index) => (
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


