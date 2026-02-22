import React from 'react';
import Sidebar from './Sidebar'; // Your Sidebar component
import { Outlet } from 'react-router-dom'; // For nested routes
import Chatbot from './Chatbot';

const Layout = () => {
  return (
    <div className="flex bg-blue-100 min-h-screen">
      {/* Sidebar with full height of content */}
      <div className="flex-shrink-4 ">
        <Sidebar />
        <Chatbot/>
      </div>

      {/* Main content */}
      <main className="flex-1 p-0 ">

        
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
