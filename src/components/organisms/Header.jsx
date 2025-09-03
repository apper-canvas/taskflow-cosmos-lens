import { useState } from "react";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ onMenuClick, onSearch, onAddTask }) => {
  return (
    <header className="bg-white border-b border-gray-100 px-4 lg:px-6 py-4">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden h-10 w-10 hover:bg-gray-100"
        >
          <ApperIcon name="Menu" size={20} />
        </Button>

        <div className="flex-1 max-w-md">
          <SearchBar
            onSearch={onSearch}
            placeholder="Search tasks..."
            className="w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={onAddTask}
            className="flex items-center gap-2 hidden sm:flex"
          >
            <ApperIcon name="Plus" size={16} />
            New Task
          </Button>
          
          <Button
            onClick={onAddTask}
            size="icon"
            className="sm:hidden h-10 w-10"
          >
            <ApperIcon name="Plus" size={18} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;