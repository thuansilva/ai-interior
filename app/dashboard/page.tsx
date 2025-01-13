// import { UserButton } from "@clerk/nextjs";
import React from "react";
import Listing from "./_components/Listing";

function Dashboard({ children }) {
  return (
    <div>
      <Listing />
      {children}
    </div>
  );
}

export default Dashboard;
