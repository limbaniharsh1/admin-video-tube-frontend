import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const Layout = ({ children, btnContent, onAddClick }) => {
  return (
    <div>
      <Header btnContent={btnContent} onAddClick={onAddClick} />
      <main className="flex ">
        <Sidebar />
        {children}
      </main>
    </div>
  );
};

export default Layout;
