import Navbar from "@/components/shared/navbar";
import React from "react";

const ClientRoot = ({ children }) => {
  return (
    <div className="body min-h-screen ">
      <Navbar />
      {children}
    </div>
  );
};

export default ClientRoot;
