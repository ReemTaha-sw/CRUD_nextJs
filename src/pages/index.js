import React from "react";
import { Typography } from "@mui/material";
import Dashboard from "./dashboard";

const HomePage = () => {
  return (
    <main>
      <div>
        <Typography variant="h3">Welcome to My Mini Dashboard</Typography>

        <Dashboard />
      </div>
    </main>
  );
};

export default HomePage;
