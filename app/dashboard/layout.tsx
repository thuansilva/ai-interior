import React from "react";
import Header from "./_components/Header";

function DashboardLayout(props) {
  return (
    <Header>
      <div>{props.children}</div>
    </Header>
  );
}

export default DashboardLayout;
