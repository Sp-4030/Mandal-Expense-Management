import React from "react";
import { Link } from "react-router-dom"; // Only if you’re using React Router

function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-800 tracking-widest">
          404
        </h1>
        <div className="bg-blue-500 px-2 text-sm rounded rotate-12 inline-block text-white">
          Page Not Found
        </div>
        <p className="mt-4 text-gray-600">
          Sorry, the page you’re looking for doesn’t exist.
        </p>

        <div className="mt-6">
          <Link
            to="/"
            className="relative inline-block text-sm font-medium text-white group focus:outline-none focus:ring"
          >
            <span className="absolute inset-0 border border-blue-600 group-active:border-blue-500 rounded"></span>
            <span className="block px-6 py-2 bg-blue-600 rounded transition-transform duration-200 group-hover:-translate-y-1 group-active:translate-y-0">
              Go Home
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
