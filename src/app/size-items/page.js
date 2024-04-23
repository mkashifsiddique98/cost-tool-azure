"use client";
import { useState, useEffect } from "react";

const SizeItems = () => {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("");
  const [sizeList, setSizeList] = useState("");
  const [message, setMessage] = useState("");
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    // Fetch data from API route
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/size-template");
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/size-template", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category, sizeList }),
      });
      if (response.ok) {
        fetchData();
        setCategory("");
        setSizeList("");
        setMessage("Item added successfully");
        setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
      } else {
        console.error("Failed to add item");
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/size-template`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        setItems(items.filter((item) => item._id !== id));
        setMessage("Item deleted successfully");
        setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setCategory(item.category);
    setSizeList(item.sizeList.join(", "));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/size-template/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editItem._id,
          category,
          sizeList: sizeList.split(",").map((item) => item.trim()),
        }),
      });
      if (response.ok) {
        const data = await response.json();
        fetchData();
        setCategory("");
        setSizeList("");
        setMessage("Item updated successfully");
        setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
        setEditItem(null);
      } else {
        console.error("Failed to update item");
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-10"> <h1 className="text-2xl font-bold mb-4">Size Items</h1>
      {message && (
        <p className="text-green-500 mb-4 animate-bounce capitalize">
          {message}
        </p>
      )}</div>
     
      <form onSubmit={editItem ? handleEditSubmit :handleSubmit} className="mb-4 flex items-center gap-2">
        <div className="flex items-center">
          <label htmlFor="category" className="mr-2">
            Category:
          </label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded p-2"
            required
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="sizeList" className="mr-2">
            Size List:
          </label>
          <input
            id="sizeList"
            type="text"
            value={sizeList}
            onChange={(e) => setSizeList(e.target.value)}
            className="border rounded p-2"
            required
          />
        </div>
        <button
          type="submit"
         
          className="bg-[#135D66] text-white px-4 py-2 rounded hover:bg-[#003C43]"
        >
          {editItem ? "Update Item" : "Add Item"}
        </button>
      </form>
      
      <ul>
        {items.map((item) => (
          <li key={item._id} className="border border-[#77B0AA] p-4 mb-4">
            <div>
              <strong>Category:</strong> {item.category}
            </div>
            <div>
              <strong>Size List:</strong>{" "}
              {item.sizeList && item.sizeList.map((subItem,index)=>( <strong key={index}>{subItem},&nbsp;</strong>))}
            </div>

            <div className="mt-2">
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white px-2 py-1 rounded mr-2 hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => handleEdit(item)}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
        {items.length == 0 && (
          <div className="flex justify-center items-center border border-[#77B0AA] h-[50vh]">
            <p className="bold">No Record Found!</p>
          </div>
        )}
      </ul>
      {/* {editItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Edit Item</h2>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <div className="flex items-center">
                <label htmlFor="editCategory" className="mr-2">Category:</label>
                <input
                  id="editCategory"
                  type="text"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="border rounded p-2"
                  required
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="editSizeList" className="mr-2">Size List:</label>
                <input
                  id="editSizeList"
                  type="text"
                  value={sizeList}
                  onChange={e => setSizeList(e.target.value)}
                  className="border rounded p-2"
                  required
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Update</button>
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default SizeItems;
