import React from "react";
import { Link } from "react-router-dom";

function SideMenu() {
  const localStorageData = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="h-full flex-col justify-between bg-gradient-to-br from-white to-gray-100 hidden lg:flex shadow-lg">
      <div className="px-6 py-8">
        <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-3">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <img
              alt="dashboard-icon"
              className="w-5 h-5 transition-all duration-300 transform hover:scale-110"
              src={require("../assets/dashboard-icon.png")}
            />
            <span className="text-md font-semibold"> Dashboard </span>
          </Link>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105">
              <div className="flex items-center gap-3">
                <img
                  alt="inventory-icon"
                  className="w-5 h-5 transition-all duration-300 transform hover:scale-110"
                  src={require("../assets/inventory-icon.png")}
                />
                <span className="text-md font-semibold"> Inventory </span>
              </div>
            </summary>
          </details>

          <Link
            to="/purchase-details"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-green-100 hover:text-green-600 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <img
              alt="purchase-icon"
              className="w-5 h-5 transition-all duration-300 transform hover:scale-110"
              src={require("../assets/supplier-icon.png")}
            />
            <span className="text-md font-semibold"> Purchase Details</span>
          </Link>

          <Link
            to="/sales"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-red-100 hover:text-red-600 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <img
              alt="sale-icon"
              className="w-5 h-5 transition-all duration-300 transform hover:scale-110"
              src={require("../assets/supplier-icon.png")}
            />
            <span className="text-md font-semibold"> Sales</span>
          </Link>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-gray-700 hover:bg-yellow-100 hover:text-yellow-600 transition-all duration-300 ease-in-out transform hover:scale-105">
              <div className="flex items-center gap-3">
                <img
                  alt="store-icon"
                  className="w-5 h-5 transition-all duration-300 transform hover:scale-110"
                  src={require("../assets/order-icon.png")}
                />
                <span className="text-md font-semibold"> Manage Store </span>
              </div>
            </summary>
          </details>
        </nav>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-200">
        <div className="flex items-center gap-4 p-6 bg-white hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
          <img
            alt="Profile"
            src={localStorageData.imageUrl}
            className="h-12 w-12 rounded-full object-cover border-2 border-blue-300 shadow-lg transition-transform transform hover:scale-110"
          />

          <div>
            <p className="text-sm font-semibold text-gray-900">
              {localStorageData.firstName + " " + localStorageData.lastName}
            </p>
            <p className="text-xs text-gray-500"> {localStorageData.email} </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
