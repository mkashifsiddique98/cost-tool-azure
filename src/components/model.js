"use client";
import React, { useState } from "react";
import Report from "./Report";
const ModelButton = ({
  items,
  fabricRequirement,
  rawMaterialRequirement,
  totalCost,
  reportDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex justify-center items-center">
      <div>
        <button
          className="bg-[#135D66] text-white px-4 py-2 rounded hover:bg-[#003C43]"
          onClick={openModal}
        >
          Estimate Cost
        </button>
        {isOpen && (
          <div className="fixed inset-0 px-2 z-10 overflow-hidden flex items-center justify-center">
            <div
              className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={closeModal}
            ></div>
            <div
              className="bg-white rounded-md shadow-xl overflow-hidden max-w-md w-full sm:w-96 md:w-1/2 lg:w-2/3 xl:w-1/3 z-50"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <div className="bg-[#003C43] text-white px-4 py-2 flex justify-between">
                <h2 id="modal-title" className="text-lg font-semibold">
                  Report of Cost Estimatation
                </h2>

                <button
                  className="text-white"
                  onClick={closeModal}
                  aria-label="Close Modal"
                >
                  &times;
                </button>
              </div>
              <div className="p-4 overflow-auto">
                <Report
                  items={items}
                  fabricRequirement={fabricRequirement}
                  rawMaterialRequirement={rawMaterialRequirement}
                  totalCost={totalCost}
                  reportDate={reportDate}
                />
              </div>
              <div className="border-t px-4 py-2 flex justify-between">
                <button className="px-3 py-1 bg-red-500 text-white rounded-md w-full sm:w-auto">
                  Recalculate
                </button>
                <button className="px-3 py-1 bg-[#135D66] text-white rounded-md w-full sm:w-auto">
                  Proceesed Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelButton;
