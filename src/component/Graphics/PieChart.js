import React, { useState, useEffect } from "react";
import pie from '../../assets/pie.webp';
import { baseURL } from "../../URL";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import '../../style/grapics.css'
import '../../style/dash.css'
import { toast, ToastContainer } from "react-toastify";
const ExpensePieChart = () => {
  const getRandomDarkColor = () => `hsl(${Math.random() * 360}, 50%, 30%)`;

  const aggregateData = (rawData) => {
    const aggregated = rawData.reduce((acc, item) => {
      const existingCategory = acc.find(
        (entry) => entry.category.toLowerCase() === item.category.toLowerCase()
      );
      if (existingCategory) {
        existingCategory.amount += item.amount;
      } else {
        acc.push({ category: item.category, amount: item.amount });
      }
      return acc;
    }, []);
    return aggregated;
  };

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState([]);

  const displayPieChart = async () => {
    setData([]);
    if (!startDate || !endDate || endDate <= startDate) {
      toast.error("Select the Valid Date range");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${baseURL}/getByDate?startDate=${startDate}&endDate=${endDate}`,
        {
          method: "GET",
          headers: {
            "auth-token": token,
          },
        }
      );

      const result = await response.json();
      if (!result || !Array.isArray(result) || result.length === 0) {
        return;
      }

      const aggregatedData = aggregateData(result);
      setData(aggregatedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Optionally you could call displayPieChart when the component mounts or on specific dependencies
  }, [startDate, endDate]);

  // Custom tooltip content
  const renderTooltip = (props) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      const { category, amount } = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="category">{category}</p>
          <p className="amount">{`$${amount.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
    <ToastContainer/>
      <div className="input-date">
        <div>
        <div className="start-date">
          <p>Start Date</p>
          <input type="date" onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="end-date">
          <p>End Date</p>
          <input type="date" onChange={(e) => setEndDate(e.target.value)} />
        </div>
        </div>
        <div className="btn">
          <button onClick={displayPieChart}>Show</button>
        </div>
      </div>

      {data.length > 0 ? (
        <div className="pie">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart className="pie-chart">
              <Pie
                data={data}
                dataKey="amount"
                nameKey="category"
                outerRadius={150}
                innerRadius={50}
                paddingAngle={5}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getRandomDarkColor()} />
                ))}
              </Pie>
              <Tooltip content={renderTooltip} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="temp-data">
          <p>No data available for the selected date range</p>
          <div className="img"><img src={pie} alt="" /></div>
        </div>
      )}
    </div>
  );
};

export default ExpensePieChart;
