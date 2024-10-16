import React, { useState, useEffect, useContext } from "react";
import AddStore from "../components/AddStore";
import AuthContext from "../AuthContext";

function Store() {
  const [showModal, setShowModal] = useState(false);
  const [stores, setAllStores] = useState([]);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetching all stores data
  const fetchData = () => {
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllStores(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const modalSetting = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center ">
      <div className="flex flex-col gap-5 w-11/12 border-2 p-5 bg-gray-100 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-800">Manage Store</span>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold p-2 rounded transition duration-200 ease-in-out transform hover:scale-105"
            onClick={modalSetting}
          >
            {/* <img
              alt="add-icon"
              className="h-5 w-5 inline-block mr-1"
              src={require("../assets/add-product-icon.png")}
            /> */}
            Add Store
          </button>
        </div>
        {showModal && <AddStore />}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((element) => {
            return (
              <div
                className="bg-white h-fit flex flex-col gap-4 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                key={element._id}
              >
                <img
                  alt="store"
                  className="h-60 w-full object-cover rounded-t-lg"
                  src={element.image}
                />
                <div className="flex flex-col gap-3 justify-between items-start">
                  <span className="font-bold text-lg text-gray-800">{element.name}</span>
                  <div className="flex items-center text-gray-600">
                    <img
                      alt="location-icon"
                      className="h-6 w-6 mr-2"
                      src={require("../assets/location-icon.png")}
                    />
                    <span>
                      {element.address}, {element.city}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Store;
