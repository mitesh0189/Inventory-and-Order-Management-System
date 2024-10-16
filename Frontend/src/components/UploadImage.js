import React, { useState } from "react";

function UploadImage({ uploadImage }) {
  const [fileName, setFileName] = useState("");

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setFileName(file);
    uploadImage(file);
  };

  return (
    <div className="flex flex-col items-center">
      <label
        htmlFor="fileInput"
        className="flex items-center cursor-pointer rounded-md shadow-md py-3 px-6 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <svg
          className="w-6 h-6 inline-block mr-2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 16V21H21V16H3ZM5 18H19V16H5V18ZM3 6H21V14H3V6ZM5 10H19V8H5V10Z"
            fill="currentColor"
          />
        </svg>
        <span className="inline-block">
          {fileName?.name ? fileName.name : "Choose file"}
        </span>
      </label>
      <input
        type="file"
        id="fileInput"
        className="hidden"
        accept=".png, .jpeg, .jpg"
        required
        onChange={handleFileInputChange}
      />
      <style jsx>{`
        label {
          transition: transform 0.2s ease-in-out;
        }
        label:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}

export default UploadImage;
