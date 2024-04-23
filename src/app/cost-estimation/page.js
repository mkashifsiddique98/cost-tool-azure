"use client";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ModelButton from "@/components/model";

const CostEstimation = () => {
  const [categories, setCategories] = useState({
    shirt: false,
    pant: false,
    shalwar: false,
    qameez: false,
  });

  const initialSizeState = {
    size: "",
    qty: 0,
  };

  const [sizes, setSizes] = useState({
    shirt: [initialSizeState],
    pant: [initialSizeState],
    shalwar: [initialSizeState],
    qameez: [initialSizeState],
  });

  const [sizesTemplate, setSizesTemplate] = useState([]);

  const [deliveryDate, setDeliveryDate] = useState(new Date() + 5);
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/size-template");
      if (response.ok) {
        const data = await response.json();
        setSizesTemplate(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCategoryChange = (category) => {
    setCategories({
      ...categories,
      [category]: !categories[category],
    });
    if (!categories[category]) {
      setSizes({
        ...sizes,
        [category]: [initialSizeState],
      });
    }
  };

  const handleSizeChange = (category, index, e) => {
    const newSize = e.target.value;
    const newSizes = [...sizes[category]];
    newSizes[index].size = newSize;
    setSizes({
      ...sizes,
      [category]: newSizes,
    });
  };

  const handleItemChange = (category, index, e) => {
    const newQuantity = parseInt(e.target.value);
    const newSizes = [...sizes[category]];
    newSizes[index].qty = newQuantity;
    setSizes({
      ...sizes,
      [category]: newSizes,
    });
  };

  const addSizeField = (category) => {
    setSizes({
      ...sizes,
      [category]: [...sizes[category], { ...initialSizeState }],
    });
  };

  const handleDeliveryDateChange = (date) => {
    setDeliveryDate(date);
  };

  // Sample items, fabric requirement, raw material requirement, total cost, and report date
   useEffect(() => {
    console.log("sizes :",sizes)
   }, [sizes])
   
  const fabricRequirement = "500 meters";
  const rawMaterialRequirement =
    "Collar: 20 pieces, Cuff: 30 pieces, Buttons: 100 pieces";
  const totalCost = "$1000";
  const reportDate = "April 21, 2024";

  return (
    <>
      <div className="max-w-md p-8 h-screen">
        <h2 className="text-xl font-bold mb-4">
          Cost Estimation and Report Generator
        </h2>
        {/* Category checkboxes */}
        <div className="mb-4 flex gap-4">
          {Object.keys(categories).map((category) => (
            <div
              key={category}
              className="flex items-center mb-2 mr-2 capitalize"
            >
              <input
                type="checkbox"
                id={category}
                checked={categories[category]}
                onChange={() => handleCategoryChange(category)}
                className="mr-2"
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))}
        </div>
        {/* Size selection */}
        <div className="mb-4 grid grid-cols-2 gap-10">
          {Object.keys(categories).map(
            (category) =>
              categories[category] && (
                <div key={category} className="mr-4">
                  <h3 className="font-bold mb-2 capitalize">
                    {category} Sizes:
                  </h3>
                  {sizes[category].map((sizeObj, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <select
                        value={sizeObj.size}
                        onChange={(e) => handleSizeChange(category, index, e)}
                        className="border rounded px-2 py-1 mr-2"
                      >
                        <option value="">Select Size</option>
                        {sizesTemplate
                          .find((template) => template.category === category)
                          ?.sizeList?.[0]?.split(",")
                          .map((size, index) => (
                            <option key={index} value={size.trim()}>
                              {size.trim()}
                            </option>
                          ))}
                      </select>
                      <input
                        type="number"
                        value={sizeObj.qty}
                        onChange={(e) => handleItemChange(category, index, e)}
                        className="border rounded px-4 py-2 w-20"
                        min="1"
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => addSizeField(category)}
                    className="bg-[#135D66] text-white px-4 py-2 rounded hover:bg-[#003C43]"
                  >
                    Add {category} Size
                  </button>
                </div>
              )
          )}
        </div>
        {/* Delivery Date */}
        <div className="mb-4">
          <label htmlFor="deliveryDate" className="font-bold block mb-2">
            Delivery Date:
          </label>
          <DatePicker
            dateFormat="dd MMMM yyyy"
            selected={deliveryDate}
            onChange={handleDeliveryDateChange}
            minDate={new Date()}
            className="border rounded px-4 py-2 w-full"
          />
          <p className="m-1 text-sm text-red-500">
            Minimum 5 days required to complete the order
          </p>
        </div>
        {/* Button to generate report */}
        <ModelButton
          items={sizes}
          fabricRequirement={fabricRequirement}
          rawMaterialRequirement={rawMaterialRequirement}
          totalCost={totalCost}
          reportDate={reportDate}
        />
      </div>
    </>
  );
};

export default CostEstimation;
