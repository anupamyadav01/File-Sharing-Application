import { useState } from "react";
import axios from "axios";

const AddUser = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Toggling dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    photo: null,
  });

  // const handleOnSubmit = async (e) => {
  //   console.log(userDetails);
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:8080/api/upload-file`,
  //       userDetails
  //     );
  //     console.log(response);
  //   } catch (error) {
  //     console.error("Error uploading photo", error);
  //   }
  // };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object
    const formData = new FormData();
    formData.append("name", userDetails.name);
    formData.append("email", userDetails.email);
    formData.append("photo", userDetails.photo);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/upload-file`,
        formData
      );
      console.log(response);
    } catch (error) {
      console.error("Error uploading photo", error);
    }
  };

  return (
    <div
      className={`${
        darkMode ? "dark" : ""
      } min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900`}
    >
      {/* Dark Mode Toggle Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-600"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Form Container */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
          Upload Your Details
        </h2>

        {/* Form */}
        <form className="space-y-4" encType="multipart/form-data">
          {/* Name Field */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              onChange={(e) =>
                setUserDetails({ ...userDetails, name: e.target.value })
              }
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Your Email"
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* File Upload Field */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 font-semibold mb-2">
              Upload Photo
            </label>
            <input
              type="file"
              name="photo"
              onChange={(e) =>
                setUserDetails({ ...userDetails, photo: e.target.files[0] })
              }
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleOnSubmit}
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
