import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiTrash2 } from 'react-icons/fi';
import { FiEdit } from 'react-icons/fi';
const Formfile = () => {
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    manufacturer: "",
    weight: "",
    dimensions: "",
    imageUrl: "",
  });
  const [mydata, setMydata] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    category: "",
    manufacturer: "",
    weight: 0,
    dimensions: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMydata({ ...mydata, [name]: value });
  };
  // -------------------------- post data
  const hanndlesubmit = async (e) => {
    e.preventDefault();
    let formIsValid = true;
    const newErrors = { ...errors };

    if (mydata.name.trim() === "") {
      newErrors.name = "Name is required";
      formIsValid = false;
    } else {
      newErrors.name = "";
    }
  
    // Validation for description field
    if (mydata.description.trim() === "") {
      newErrors.description = "Description is required";
      formIsValid = false;
    } else {
      newErrors.description = "";
    }
  
    // Validation for price field
    if (isNaN(mydata.price) || Number(mydata.price) <= 0) {
      newErrors.price = "Price must be a positive number";
      formIsValid = false;
    } else {
      newErrors.price = "";
    }
  
    // Validation for quantity field
    if (!Number.isInteger(Number(mydata.quantity)) || Number(mydata.quantity) <= 0) {
      newErrors.quantity = "Quantity must be a positive integer";
      formIsValid = false;
    } else {
      newErrors.quantity = "";
    }
  
    // Validation for category field
    if (mydata.category.trim() === "") {
      newErrors.category = "Category is required";
      formIsValid = false;
    } else {
      newErrors.category = "";
    }
  
    // Validation for manufacturer field
    if (mydata.manufacturer.trim() === "") {
      newErrors.manufacturer = "Manufacturer is required";
      formIsValid = false;
    } else {
      newErrors.manufacturer = "";
    }
  
    // Validation for weight field
    if (isNaN(mydata.weight) || Number(mydata.weight) <= 0) {
      newErrors.weight = "Weight must be a positive number";
      formIsValid = false;
    } else {
      newErrors.weight = "";
    }
  
    // Validation for dimensions field
    if (mydata.dimensions.trim() === "") {
      newErrors.dimensions = "Dimensions are required";
      formIsValid = false;
    } else {
      newErrors.dimensions = "";
    }
  
    // Validation for imageUrl field
    if (mydata.imageUrl.trim() === "") {
      newErrors.imageUrl = "Image URL is required";
      formIsValid = false;
    } else {
      newErrors.imageUrl = "";
    }
  

  
   

    setErrors(newErrors);

    if (!formIsValid) {
      return;
    }

    try {
      if (mydata.id) {
        // If mydata has an ID, it means it's an existing user being edited
        await axios.put(`http://localhost:3003/users/${mydata.id}`, mydata);
        console.log("Data updated successfully");
      } else {
        // Otherwise, it's a new user being added
        await axios.post("http://localhost:3003/users", mydata);
        console.log("Data added successfully");
      }
      setMydata({
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        category: "",
        manufacturer: "",
        weight: 0,
        dimensions: "",
        imageUrl: "",
      });
      loadData();
    } catch (error) {
      console.error("Error:", error);
    }
    
    setTimeout(() => {
      loadData();
    }, 500);
    setMydata({
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      category: "",
      manufacturer: "",
      weight: 0,
      dimensions: "",
      imageUrl: "",
    });
  };

  // const hanndlesubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3003/users",
  //       mydata
  //     );
  //     console.log("Data uploaded successfully:", response.data);
  //     // Optionally, you can clear the form after successful submission
  //     setMydata({
  //       name: "",
  //       description: "",
  //       price: 0,
  //       quantity: 0,
  //       category: "",
  //       manufacturer: "",
  //       weight: 0,
  //       dimensions: "",
  //       imageUrl: "",
  //     });
  //   } catch (error) {
  //     console.error("Error uploading data:", error);
  //   }else {
  //     // Otherwise, it's a new user being added
  //     await axios.post("http://localhost:3003/users", mydata);
  //     console.log("Data added successfully");
  //   }
  // };

  // const hanndlesubmit = (e) => {
  //   e.preventDefault();

  // };

  const handleEdit = (user) => {
    setMydata({ ...user });
  };


  // ---------------------------- get data
  const [users, setUsers] = useState([]);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await axios.get("http://localhost:3003/users");
    setUsers(response.data);
  };

  // --------------------------- delete data
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3003/users/${id}`);
      console.log("Data deleted successfully");
      loadData(); // Reload data after deletion
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <>
      <div>
        <section className="p-6 dark:bg-gray-800 dark:text-gray-50">
          <form
            novalidate=""
            action=""
            className="container flex flex-col mx-auto space-y-12"
          >
            <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
              <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                <div className="col-span-full sm:col-span-3">
                  <label for="name" className="text-sm">
                    {" "}
                    name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="name"
                    name="name"
                    value={mydata.name}
                    onChange={handleChange}
                    className="w-full p-1 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>
                <div className="col-span-full sm:col-span-3">
                  <label for="description" className="text-sm">
                    description
                  </label>
                  <input
                    id="description"
                    type="text"
                    placeholder="description"
                    name="description"
                    value={mydata.description}
                    onChange={handleChange}
                    className="w-full p-1 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                  )}
                </div>
                <div className="col-span-full sm:col-span-3">
                  <label for="price" className="text-sm">
                    price
                  </label>
                  <input
                    id="price"
                    type="text"
                    placeholder="price"
                    name="price"
                    value={mydata.price}
                    onChange={handleChange}
                    className="w-full p-1 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-xs mt-1">{errors.price}</p>
                  )}
                </div>
                <div className="col-span-full">
                  <label for="quantity" className="text-sm">
                    quantity
                  </label>
                  <input
                    id="quantity"
                    type="text"
                    placeholder="quantity"
                    name="quantity"
                    value={mydata.quantity}
                    onChange={handleChange}
                    className="w-full p-1 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  />
                  {errors.quantity && (
                    <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
                  )}
                </div>
                <div className="col-span-full sm:col-span-2">
                  <label for="manufacturer" className="text-sm">
                    manufacturer
                  </label>
                  <input
                    id="manufacturer"
                    type="text"
                    placeholder="manufacturer"
                    name="manufacturer"
                    value={mydata.manufacturer}
                    onChange={handleChange}
                    className="w-full p-1 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  />
                  {errors.manufacturer && (
                    <p className="text-red-500 text-xs mt-1">{errors.manufacturer}</p>
                  )}
                </div>
                <div className="col-span-full sm:col-span-2">
                  <label for="weight" className="text-sm">
                    weight
                  </label>
                  <input
                    id="weight"
                    type="text"
                    placeholder="weight"
                    name="weight"
                    value={mydata.weight}
                    onChange={handleChange}
                    className="w-full rounded-md focus:ring focus:ri focus:ri p-1 dark:border-gray-700 dark:text-gray-900"
                  />
                  {errors.weight && (
                    <p className="text-red-500 text-xs mt-1">{errors.weight}</p>
                  )}
                </div>
                <div className="col-span-full sm:col-span-2">
                  <label for="dimensions" className="text-sm">
                    dimensions
                  </label>
                  <input
                    id="dimensions"
                    type="text"
                    placeholder="dimensions"
                    name="dimensions"
                    value={mydata.dimensions}
                    onChange={handleChange}
                    className="w-full p-1 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  />
                  {errors.dimensions && (
                    <p className="text-red-500 text-xs mt-1">{errors.dimensions}</p>
                  )}
                </div>
                <div className="col-span-full sm:col-span-2">
                  <label for="image uploade" className="text-sm">
                    image uploade
                  </label>
                  <input
                    id="image uploade"
                    type="file"
                    name="imageUrl"
                    value={mydata.imageUrl}
                    onChange={handleChange}
                    placeholder="image uploade"
                    className="w-full rounded-md focus:ring focus:ri focus:ri p-1 dark:border-gray-700 dark:text-gray-900"
                  />
                  {errors.imageUrl && (
                    <p className="text-red-500 text-xs mt-1">{errors.imageUrl}</p>
                  )}
                </div>
              </div>
            </fieldset>
            <button
              onClick={hanndlesubmit}
              type="button"
              className="px-8 py-3 w-32 bg-slate-400 font-semibold rounded dark:bg-gray-100 dark:text-gray-800"
            >
              submit
            </button>
          </form>
        </section>
      </div>

 <div className="w-full text-center uppercase mt-5 font-bold text-[25px]">
        <table className="w-full p-6 text-xs text-left whitespace-nowrap">
          <thead>
            <tr className="dark:bg-gray-700">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Description</th>
              <th className="p-3">Price</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Manufacturer</th>
              <th className="p-3">Weight</th>
              <th className="p-3">Dimensions</th>
              <th className="p-3">Image URL</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.description}</td>
                <td className="p-3">{user.price}</td>
                <td className="p-3">{user.quantity}</td>
                <td className="p-3">{user.manufacturer}</td>
                <td className="p-3">{user.weight}</td>
                <td className="p-3">{user.dimensions}</td>
                <td className="p-3">{user.imageUrl} <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500"
                  >
                    <FiTrash2 />
                  </button></td>
                  {/* <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-500"
                  >
                    <FiEdit />
                  </button> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="w-full text-center uppercase mt-5 font-bold text-[25px]">
  
        <ul>
          {users.map((datas) => (
            <li>
              <span className="pr-4"> {datas.id}.</span>
              {datas.name}
            </li>
          ))}
        </ul>
      </div> */}
    </>
  );
};

export default Formfile;
