import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideMenu from "./SideMenu";

function Layout() {
  return (
    <>
      <div className="md:h-16">
        <Header />
      </div>
      <div className="grid grid-cols-12 bg-gray-100 min-h-screen transition-all duration-300">
        {/* Side Menu */}
        <div className="col-span-2 h-screen sticky top-0 hidden lg:flex flex-col">
          <SideMenu />
        </div>

        {/* Main Content Area */}
        <main className="col-span-12 lg:col-span-10 p-4 transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Layout;
