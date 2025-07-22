import React, { useState } from "react";

const data = [
  { name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop' },
  { name: 'Dell XPS 13', color: 'Black', category: 'Laptop' },
  { name: 'Sony WH-1000XM5', color: 'Black', category: 'Headphones' },
  { name: 'Samsung Galaxy Tab S9', color: 'Gray', category: 'Tablet' },
  { name: 'Google Pixel 7', color: 'White', category: 'Phone' },
  { name: 'Bose QuietComfort 45', color: 'Silver', category: 'Headphones' },
  { name: 'HP Envy 15', color: 'Silver', category: 'Laptop' },
  { name: 'Canon EOS R5', color: 'Black', category: 'Camera' },
  { name: 'Logitech MX Master 3S', color: 'Graphite', category: 'Accessories' },
  { name: 'LG Ultragear Monitor', color: 'Black', category: 'Monitor' },
  { name: 'Asus ROG Phone 6', color: 'Black', category: 'Phone' },
  { name: 'Razer Huntsman Keyboard', color: 'Black', category: 'Accessories' },
  { name: 'Samsung Odyssey G9', color: 'White', category: 'Monitor' },
  { name: 'HyperX Cloud II', color: 'Red', category: 'Headphones' },
  { name: 'Acer Predator Helios', color: 'Black', category: 'Laptop' },
  { name: 'DJI Mini 3 Pro', color: 'Gray', category: 'Drone' }
];

const ITEMS_PER_PAGE = 8;

export const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
<div className=" w-full p-5 flex space-x-5">
    <div className="relative overflow-x-auto shadow-lg sm:rounded-lg p-4 bg-white border border-gray-200 w-full">
        <div className="w-full p-4 flex justify-between">
            <div className="">
                <select className="w-20 p-2 outline-none cursor-pointer hover:outline-blue-500 transition duration-300 ease-in-out" name="" id="">
                    <option value="">1</option>
                     <option value="">2</option>
                      <option value="">3</option>
                </select>
            </div>
            <div>
                <input className="w-42 border border-gray-200 outline-blue-500 p-2" type="text" name="" id="" />
            </div>
        </div>
      <table className="w-full text-sm text-left bg-white">
        <thead className="text-xs text-gray-700 uppercase bg-white">
          <tr className="font-bold">
            <th className="px-6 py-3">Product name</th>
            <th className="px-6 py-3">Color</th>
            <th className="px-6 py-3">Category</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index} className="bg-white border-b hover:bg-gray-200 cursor-pointer">
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.name}</th>
              <td className="px-6 py-4">{item.color}</td>
              <td className="px-6 py-4">{item.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-end mt-4 space-x-2">
        <button
          className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 text-sm rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>

            <div className="w-[450px]">
                <div className="w-full h-screen rounded-md border borrder-gray-200 p-5 bg-white">
                <div className="">
                    <p className="font-bold">Orders overview</p>
                    <p className="text-gray-400"><i class="fa-solid fa-arrow-up text-green-500"></i> <span className="font-bold text-gray-600">24%</span> this month</p>
                </div>
                <div className="py-4">
                    <ul>
                        <li className="flex">
                            <i class="fa-solid fa-bell mr-5 py-4 text-gray-400"></i>
                            <div>
                                <p className="">$2400, desing changes</p>
                                <p className="text-gray-400">22 DEC 7:22 PM</p>
                            </div>
                        </li>
                        <li className="border-l-2 border-gray-300 h-8 ml-2"></li>
                        <li className="flex">
                            <i class="fa-solid fa-circle-plus mr-5 py-4 text-gray-400"></i>
                            <div>
                                <p className="">$2400, desing changes</p>
                                <p className="text-gray-400">22 DEC 7:22 PM</p>
                            </div>
                        </li>
                        <li className="border-l-2 border-gray-300 h-8 ml-2"></li>
                         <li className="flex">
                            <i class="fa-solid fa-cart-shopping mr-5 py-4 text-gray-400"></i>
                            <div>
                                <p className="">$2400, desing changes</p>
                                <p className="text-gray-400">22 DEC 7:22 PM</p>
                            </div>
                        </li>
                        <li className="border-l-2 border-gray-300 h-8 ml-2"></li>
                         <li className="flex">
                            <i class="fa-solid fa-credit-card mr-5 py-4 text-gray-400"></i>
                            <div>
                                <p className="">$2400, desing changes</p>
                                <p className="text-gray-400">22 DEC 7:22 PM</p>
                            </div>
                        </li>
                        
                    </ul>
                </div>
            </div>
            </div>
        </div>
    );
};
