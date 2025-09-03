import React, { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "@/components/organisms/Sidebar";
import Header from "@/components/organisms/Header";
import { AuthContext } from "../../App";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { logout } = useContext(AuthContext);
  const { isAuthenticated } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return null; // Will redirect via App.jsx authentication logic
  }

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleAddTask = () => {
    // This will be handled by the page component
    if (typeof window !== 'undefined' && window.CustomEvent) {
      window.dispatchEvent(new window.CustomEvent('addTask'));
    }
  };
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={closeSidebar}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
<Header 
          onMenuClick={handleMenuClick}
          onSearch={handleSearch}
          onAddTask={handleAddTask}
          onLogout={logout}
        />
        
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet context={{ searchQuery }} />
        </main>
      </div>
    </div>
  );
};

export default Layout;