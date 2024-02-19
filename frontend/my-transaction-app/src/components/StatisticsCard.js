import React from "react";

const StatisticsCard = ({ stats }) => {
  return (
    <div style={{ display: "flex" }}>
      {" "}
     
      <div className="stat-box">
        {" "}
        
        Total Sale: ₹{stats.totalSaleAmount}
      </div>
      <div className="stat-box">Total Sold Items: {stats.totalSoldItems}</div>
      <div className="stat-box">
        Total Not Sold Items: {stats.totalNotSoldItems}
      </div>
    </div>
  );
};

export default StatisticsCard;
