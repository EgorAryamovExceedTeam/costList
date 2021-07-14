import { useState, useContext, useEffect } from "react";
import CostBar from "./CostBar";
import CostTable from "./CostTable";

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="header">
        <h1>Учет Расходов</h1>
      </div>
      <CostBar />
      <CostTable />
    </div>
  );
};
export default HomePage;
