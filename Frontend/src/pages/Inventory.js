import React, { useState, useEffect, useContext } from "react";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "../components/UpdateProduct";
import AuthContext from "../AuthContext";


function Inventory() {
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateProduct, setUpdateProduct] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [updatePage, setUpdatePage] = useState(true);
  const [stores, setAllStores] = useState([]);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchProductsData();
    fetchSalesData();
  }, [updatePage]);

  const fetchProductsData = () => {
    fetch(`http://localhost:4000/api/product/get/${authContext.user}`)
      .then(response => response.json())
      .then(data => setAllProducts(data))
      .catch(err => console.log(err));
  };

  const fetchSearchData = () => {
    fetch(`http://localhost:4000/api/product/search?searchTerm=${searchTerm}`)
      .then(response => response.json())
      .then(data => setAllProducts(data))
      .catch(err => console.log(err));
  };

  const fetchSalesData = () => {
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then(response => response.json())
      .then(data => setAllStores(data));
  };

  const addProductModalSetting = () => {
    setShowProductModal(!showProductModal);
  };

  const updateProductModalSetting = (selectedProductData) => {
    setUpdateProduct(selectedProductData);
    setShowUpdateModal(!showUpdateModal);
  };

  const deleteItem = (id) => {
    fetch(`http://localhost:4000/api/product/delete/${id}`)
      .then(response => response.json())
      .then(() => setUpdatePage(!updatePage));
  };

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    fetchSearchData();
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center fadeIn">
      <div className="flex flex-col gap-5 w-11/12">
        <div className="bg-white shadow-lg rounded p-5 transition-transform hover:scale-105">
          <span className="font-semibold text-lg px-4 text-gray-700">Overall Inventory</span>
          <div className="flex flex-col md:flex-row justify-between items-center mt-4">
            <div className="stat-card">
              <span className="font-semibold text-blue-600 text-xl">Total Products</span>
              <span className="font-semibold text-gray-600 text-2xl">{products.length}</span>
              <span className="text-gray-400 text-sm">Last 7 days</span>
            </div>
            <div className="stat-card border-x-2">
              <span className="font-semibold text-yellow-600 text-xl">Stores</span>
              <div className="flex gap-8 mt-2">
                <div>
                  <span className="font-semibold text-gray-600 text-2xl">{stores.length}</span>
                  <span className="text-gray-400 text-sm">Last 7 days</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600 text-2xl">$2000</span>
                  <span className="text-gray-400 text-sm">Revenue</span>
                </div>
              </div>
            </div>
            <div className="stat-card border-x-2">
              <span className="font-semibold text-purple-600 text-xl">Top Selling</span>
              <div className="flex gap-8 mt-2">
                <div>
                  <span className="font-semibold text-gray-600 text-2xl">5</span>
                  <span className="text-gray-400 text-sm">Last 7 days</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600 text-2xl">$1500</span>
                  <span className="text-gray-400 text-sm">Cost</span>
                </div>
              </div>
            </div>
            <div className="stat-card">
              <span className="font-semibold text-red-600 text-xl">Low Stocks</span>
              <div className="flex gap-8 mt-2">
                <div>
                  <span className="font-semibold text-gray-600 text-2xl">12</span>
                  <span className="text-gray-400 text-sm">Ordered</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600 text-2xl">2</span>
                  <span className="text-gray-400 text-sm">Not in Stock</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showProductModal && <AddProduct addProductModalSetting={addProductModalSetting} handlePageUpdate={() => setUpdatePage(!updatePage)} />}
        {showUpdateModal && <UpdateProduct updateProductData={updateProduct} updateModalSetting={updateProductModalSetting} />}

        <div className="overflow-x-auto rounded-lg border bg-white shadow-lg mt-5 transition hover:shadow-xl">
          <div className="flex justify-between py-5 px-4">
            <div className="flex gap-4 items-center">
              <span className="font-bold text-gray-700">Products</span>
              <div className="flex items-center px-3 border-2 rounded-md">
                <img alt="search-icon" className="w-5 h-5 mr-2" src={require("../assets/search-icon.png")} />
                <input
                  className="border-none outline-none text-sm"
                  type="text"
                  placeholder="Search here"
                  value={searchTerm}
                  onChange={handleSearchTerm}
                />
              </div>
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 transform hover:scale-105"
              onClick={addProductModalSetting}
            >
              Add Product
            </button>
          </div>
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left font-medium text-gray-900">Products</th>
                <th className="px-4 py-2 text-left font-medium text-gray-900">Manufacturer</th>
                <th className="px-4 py-2 text-left font-medium text-gray-900">Stock</th>
                <th className="px-4 py-2 text-left font-medium text-gray-900">Description</th>
                <th className="px-4 py-2 text-left font-medium text-gray-900">Availability</th>
                <th className="px-4 py-2 text-left font-medium text-gray-900">More</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((element) => (
                <tr
                  key={element._id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2 text-gray-900">{element.name}</td>
                  <td className="px-4 py-2 text-gray-700">{element.manufacturer}</td>
                  <td className="px-4 py-2 text-gray-700">{element.stock}</td>
                  <td className="px-4 py-2 text-gray-700">{element.description}</td>
                  <td className="px-4 py-2 text-gray-700">{element.availability}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded-full shadow-sm transition-transform transform hover:scale-105"
                      onClick={() => updateProductModalSetting(element)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded-full shadow-sm ml-2 transition-transform transform hover:scale-105"
                      onClick={() => deleteItem(element._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
