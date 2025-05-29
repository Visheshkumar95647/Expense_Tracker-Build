import React, { useState } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";
import bar from '../../assets/bar.webp';
import { baseURL } from "../../URL";
import '../../style/grapics.css'
const colors = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF5733", "#D500F9", 
  "#00B0FF", "#66BB6A", "#FFEB3B", "#FF5722", "#9C27B0", "#FF80AB",
];

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

export default function BarGraph() {
  const [year, setYear] = useState("");
  const [data, setData] = useState([]);

  const getData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${baseURL}/getByYear?startDate=${year}&endDate=${year}`,
        {
          method: "GET",
          headers: {
            "auth-token": token,
          },
        }
      );
      const result = await response.json();

      // Group data by month and aggregate amounts
      const aggregatedData = result.reduce((acc, entry) => {
        const month = entry.month;
        const existing = acc.find(item => item.month === month);
        
        if (existing) {
          existing.amount += entry.amount; // Aggregate the amount
        } else {
          acc.push({ month, amount: entry.amount });
        }
        return acc;
      }, []);

      // Ensure all months are present, even with zero amount if no data exists for that month
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      
      const completeData = monthNames.map(month => {
        const monthData = aggregatedData.find(item => item.month === month);
        return { month, amount: monthData ? monthData.amount : 0 };
      });

      setData(completeData); // Set the aggregated data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="enter-year">
        <div className="year-input">
        <p>Enter Year</p>
          <input
            type="number"
            placeholder="Enter Year"
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className="btn">
          <button onClick={getData}>Show</button>
        </div>
      </div>

      {data.length > 0 ? ( // Only render the chart if data is available
        <BarChart 
          className="bar"
          width={700}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Bar
            dataKey="amount"
            fill="#8884d8"
            shape={<TriangleBar />}
            label={{ position: "top" }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      ) : (
        <div className="temp-data">
                  <p>Enter The Year First</p>
                  <div className="img"><img src={bar} alt="" /></div>
            </div>
      ) }
    </>
  );
}
