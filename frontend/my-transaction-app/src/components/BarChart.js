import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ barChartData }) => {
  const chartData = {
    labels: barChartData.map((item) => item.priceRange), // Labels for X-axis
    datasets: [
      {
        label: "Number of Items",
        data: barChartData.map((item) => item.itemCount), // Data for Y-axis
        backgroundColor: "rgba(54, 162, 235, 0.2)", //  You can customize colors
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    // Add  further chart options and customizations here
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
