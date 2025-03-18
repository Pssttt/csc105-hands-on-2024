import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 shadow-lg rounded-lg w-120">
          <div class="text-center">
            <h1 class="text-4xl font-bold text-red-500 mb-4">
              404 - Page Not Found
            </h1>
            <p class="text-lg text-gray-600 mb-6">
              Oops! The page you're looking for doesn't exist.
            </p>
            <button class="inline-block px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg text-lg transition">
              <Link to="/">Go to Home</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
