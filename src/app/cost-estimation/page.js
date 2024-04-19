"use client";
import Image from "next/image";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Modal = ({ isOpen, onClose, children }) => {
  const [modalOpen, setModalOpen] = useState(isOpen);

  const closeModal = () => {
    setModalOpen(false);
    onClose();
  };

  return (
    <>
      {modalOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={closeModal}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-xl">
              <div className="px-6 py-4">
                <div className="text-xl font-bold mb-4">Modal Title</div>
                {children}
              </div>
              <div className="px-6 py-4 bg-gray-100 text-right">
                <button
                  onClick={closeModal}
                  className="text-blue-500 hover:text-blue-700 font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default function CostEstimation() {
  const [categories, setCategories] = useState({
    shirt: false,
    pant: false,
    shalwar: false,
    qameez: false,
  });
  const [totalItems, setTotalItems] = useState(0);
  const [sizes, setSizes] = useState({
    shirt: [],
    pant: [],
  });
  const [sizeItems, setSizeItems] = useState({});
  const [deliveryDate, setDeliveryDate] = useState(new Date() + 5);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleCategoryChange = (category) => {
    setCategories({
      ...categories,
      [category]: !categories[category],
    });
    if (!categories[category]) {
      setSizes({
        ...sizes,
        [category]: [],
      });
    }
  };

  const handleTotalItemsChange = (e) => {
    setTotalItems(e.target.value);
  };

  const handleSizeChange = (category, index, e) => {
    const newSizes = { ...sizes };
    newSizes[category][index] = e.target.value;
    setSizes(newSizes);
  };

  const handleItemChange = (size, e) => {
    setSizeItems({
      ...sizeItems,
      [size]: e.target.value,
    });
  };

  const addSizeField = (category) => {
    setSizes({
      ...sizes,
      [category]: [...sizes[category], ""],
    });
  };

  const generateReport = () => {
    // You can implement your logic for generating report here
    console.log("Generating report...");
  };

  const handleDeliveryDateChange = (date) => {
    setDeliveryDate(date);
  };
  return (
    <>
      {/* Main Form  */}
      <div className="max-w-md  p-8">
        <h2 className="text-xl font-bold mb-4">
          Cost Estimation and Report Generator
        </h2>
        <h3 className="font-bold mb-2">Items:</h3>
        <div className="mb-4 flex gap-4">
          <div className="flex items-center mb-2 mr-2">
            <input
              type="checkbox"
              id="shirt"
              checked={categories.shirt}
              onChange={() => handleCategoryChange("shirt")}
              className="mr-2"
            />
            <label htmlFor="shirt">Shirt</label>
          </div>
          <div className="flex items-center mb-2 mr-2">
            <input
              type="checkbox"
              id="pant"
              checked={categories.pant}
              onChange={() => handleCategoryChange("pant")}
              className="mr-2"
            />
            <label htmlFor="pant">Pant</label>
          </div>
          <div className="flex items-center mb-2 mr-2">
            <input
              type="checkbox"
              id="shalwar"
              checked={categories.shalwar}
              onChange={() => handleCategoryChange("shalwar")}
              className="mr-2"
            />
            <label htmlFor="shalwar">Shalwar</label>
          </div>
          <div className="flex items-center mb-2 mr-2">
            <input
              type="checkbox"
              id="qameez"
              checked={categories.qameez}
              onChange={() => handleCategoryChange("qameez")}
              className="mr-2"
            />
            <label htmlFor="qameez">Qameez</label>
          </div>
        </div>
        {/* size  */}
        <div className="mb-4 flex">
          {categories.shirt && (
            <div className="mr-4">
              <h3 className="font-bold mb-2">Shirt Sizes:</h3>
              {sizes.shirt.map((size, index) => (
                <div key={index} className="flex items-center mb-2">
                  <select
                    value={size}
                    onChange={(e) => handleSizeChange("shirt", index, e)}
                    className="border rounded px-2 py-1 mr-2"
                  >
                    <option value="">Select Size</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    {/* Add more options as needed */}
                  </select>
                  <input
                    type="number"
                    value={sizeItems[size] || ""}
                    onChange={(e) => handleItemChange(size, e)}
                    className="border rounded px-4 py-2 w-16"
                  />
                </div>
              ))}
              <button
                onClick={() => addSizeField("shirt")}
                className="bg-[#135D66] text-white px-4 py-2 rounded hover:bg-[#003C43]"
              >
                Add Shirt Size
              </button>
            </div>
          )}
          {categories.pant && (
            <div>
              <h3 className="font-bold mb-2">Pant Sizes:</h3>
              {sizes.pant.map((size, index) => (
                <div key={index} className="flex items-center mb-2">
                  <select
                    value={size}
                    onChange={(e) => handleSizeChange("pant", index, e)}
                    className="border rounded px-2 py-1 mr-2"
                  >
                    <option value="">Select Size</option>
                    <option value="30">30</option>
                    <option value="32">32</option>
                    <option value="34">34</option>
                    <option value="36">36</option>
                    {/* Add more options as needed */}
                  </select>
                  <input
                    type="number"
                    value={sizeItems[size] || ""}
                    onChange={(e) => handleItemChange(size, e)}
                    className="border rounded px-4 py-2 w-16"
                  />
                </div>
              ))}
              <button
                onClick={() => addSizeField("pant")}
                className="bg-[#176b76] text-white px-4 py-2 rounded hover:bg-[#003C43]"
              >
                Add Pant Size
              </button>
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="deliveryDate" className="font-bold block mb-2">
            Delivery Date:
          </label>
          <DatePicker
            dateFormat="dd MMMM yyyy"
            selected={deliveryDate}
            onChange={handleDeliveryDateChange}
            minDate={new Date()} // Calendar starts from the current date
            className="border rounded px-4 py-2 w-full"
          />
          <p className="m-1 text-sm text-red-500">
            Minimum 5 days Require to Complete Order
          </p>
        </div>
        {/* Total Item  */}
        {/* <div className="mb-4 mr-2">
          <label htmlFor="totalItems" className="font-bold block mb-2">
            Total Items:
          </label>
          <input
            type="number"
            id="totalItems"
            value={totalItems}
            onChange={handleTotalItemsChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div> */}
        <button
          onClick={openModal}
          className="bg-[#135D66] text-white px-4 py-2 rounded hover:bg-[#003C43]"
        >
          Estimate Cost
        </button>
        {/* <div className="relative"> */}
        <Modal isOpen={isOpen} onClose={closeModal}>
          <p>This is the content of the modal.</p>
          <button
            onClick={generateReport}
            className="bg-[#135D66] text-white px-4 py-2 rounded hover:bg-[#003C43]"
          >
            Estimate Cost
          </button>
        </Modal>
      </div>
    </>
  );
}
