import React from "react";

const Report = ({
  items,
  fabricRequirement,
  rawMaterialRequirement,
  totalCost,
  reportDate,
}) => {
  // Calculate fabric usage for shalwar and qameez based on size
  const calculateFabricUsage = () => {
    let totalFabric = 0;

    // Shalwar fabric usage
    if (items.hasOwnProperty("shalwar")) {
      items.shalwar.forEach((item) => {
        const size = parseInt(item.size);
        if (size >= 22 && size <= 32) {
          totalFabric += item.qty * 1.06;
        } else if (size >= 34 && size <= 38) {
          totalFabric += item.qty * 1.62;
        }
      });
    }

    // Qameez fabric usage
    if (items.hasOwnProperty("qameez")) {
      items.qameez.forEach((item) => {
        const size = parseInt(item.size);
        if (size >= 20 && size <= 30) {
          totalFabric += item.qty * 1.02;
        } else if (size >= 32 && size <= 38) {
          totalFabric += item.qty * 1.63;
        } else if (size >= 40 && size <= 42) {
          totalFabric += item.qty * 2.27;
        }
      });
    }

    // Shirt fabric usage
    if (items.hasOwnProperty("shirt")) {
      items.shirt.forEach((item) => {
        const size = parseInt(item.size);
        if (size >= 18 && size <= 26) {
          totalFabric += item.qty * 1;
        } else if (size >= 28 && size <= 32) {
          totalFabric += item.qty * 1.6;
        } else if (size >= 34 && size <= 38) {
          totalFabric += item.qty * 2;
        }
      });
    }

    return totalFabric;
  };

  const calculateMaterialRequirement = () => {
    let materialRequirement = {};
    
    // Shirt material requirement
    if (items.hasOwnProperty("shirt")) {
      items.shirt.forEach((item) => {
        const size = parseInt(item.size);
        let buttons = 8;
        if (size >= 28 && size <= 32) {
          buttons = 10;
        } else if (size >= 34 && size <= 38) {
          buttons = 14;
        }
        materialRequirement = {
          ...materialRequirement,
          [size]: { collar: 1, buttons, cuff: 2, frontCuff: 1 }
        };
      });
    }

    // Qameez material requirement
    if (items.hasOwnProperty("qameez")) {
      items.qameez.forEach((item) => {
        const size = parseInt(item.size);
        materialRequirement = {
          ...materialRequirement,
          [size]: { collar: 1, buttons: 4, cuff: 2, frontCuff: 1 }
        };
      });
    }

    // Shalwar material requirement
    if (items.hasOwnProperty("shalwar")) {
      items.shalwar.forEach((item) => {
        const size = parseInt(item.size);
        materialRequirement = {
          ...materialRequirement,
          [size]: { cuff: 0.7 }
        };
      });
    }

    return materialRequirement;
  };

  const fabricNeed = calculateFabricUsage().toFixed(2);
  const materialRequirement = calculateMaterialRequirement();

  return (
    <div className="container h-[60vh]">
      <div className="my-4">
        <h1 className="text-3xl font-bold text-center">Uniform Items Report</h1>
      </div>
      <div className="my-4">
        <h2 className="text-xl font-bold">Item List</h2>
        <ul className="list-disc list-inside">
          {Object.keys(items).map((category) =>
            items[category].map((item, index) => {
              return item.qty > 0 && (
                <li key={index}>
                  {category}: {item.size} - {item.qty}
                </li>
              );
            })
          )}
        </ul>
      </div>

      <div className="my-4">
        <h2 className="text-xl font-bold">Total Items</h2>
        <p>
          {Object.values(items)
            .flat()
            .reduce((acc, item) => acc + item.qty, 0)}
        </p>
      </div>

      <div className="my-4">
        <h2 className="text-xl font-bold">Fabric Requirement</h2>
        <p>Fabric Needed: {fabricNeed} meters</p>
        
      </div>

      <div className="my-4">
        <h2 className="text-xl font-bold">Material Requirement</h2>
        <ul className="list-disc list-inside">
          {Object.keys(materialRequirement).map((size) => (
            <li key={size}>
              Size {size}:
              {materialRequirement[size].collar && <span> Collar: {materialRequirement[size].collar},</span>}
              {materialRequirement[size].buttons && <span> Buttons: {materialRequirement[size].buttons},</span>}
              {materialRequirement[size].cuff && <span> Cuff: {materialRequirement[size].cuff},</span>}
              {materialRequirement[size].frontCuff && <span> Front Cuff: {materialRequirement[size].frontCuff}</span>}
            </li>
          ))}
        </ul>
      </div>

  

      <div className="my-4">
        <h2 className="text-xl font-bold">Total Cost and Date Delivery</h2>
        <p>Total Cost: £{(fabricNeed*120).toFixed(2)}</p>
        <p>Delivery Date Date: {reportDate}</p>
      </div>

      {/* Delete Functionality Component */}
      {/* Add your delete functionality component here if needed */}
    </div>
  );
};

export default Report;
