import { NavLink, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { taskListsService } from "@/services/api/taskListsService";
import { tasksService } from "@/services/api/tasksService";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const Sidebar = ({ isOpen, onClose, className }) => {
  const [lists, setLists] = useState([]);
  const [taskCounts, setTaskCounts] = useState({});
  const { listId } = useParams();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
const [listsData, tasksData] = await Promise.all([
        taskListsService.getAll(),
        tasksService.getAll()
      ]);
      
      setLists(listsData);
      
      // Calculate task counts
const counts = {
        all: tasksData.length,
        today: tasksData.filter(task => {
          const dueDate = task.due_date_c || task.dueDate;
          const completed = task.completed_c !== undefined ? task.completed_c : task.completed;
          if (!dueDate) return false;
          const today = new Date();
          const taskDueDate = new Date(dueDate);
          return taskDueDate.toDateString() === today.toDateString() && !completed;
        }).length,
        upcoming: tasksData.filter(task => {
          const dueDate = task.due_date_c || task.dueDate;
          const completed = task.completed_c !== undefined ? task.completed_c : task.completed;
          if (!dueDate || completed) return false;
          const today = new Date();
          const taskDueDate = new Date(dueDate);
          return taskDueDate > today;
        }).length,
        completed: tasksData.filter(task => task.completed_c !== undefined ? task.completed_c : task.completed).length
      };
      
      // Count tasks per list
listsData.forEach(list => {
        counts[list.Id] = tasksData.filter(task => 
          (task.list_id_c?.Id || task.list_id_c) === list.Id || 
          (task.listId && task.listId.toString() === list.Id.toString())
        ).length;
      });
      
      setTaskCounts(counts);
    } catch (error) {
      console.error("Error loading sidebar data:", error);
    }
  };

  const navItems = [
    { 
      to: "/", 
      icon: "Home", 
      label: "All Tasks", 
      count: taskCounts.all || 0,
      isActive: !listId && location.pathname === "/"
    },
    { 
      to: "/today", 
      icon: "Calendar", 
      label: "Today", 
      count: taskCounts.today || 0,
      isActive: location.pathname === "/today"
    },
    { 
      to: "/upcoming", 
      icon: "Clock", 
      label: "Upcoming", 
      count: taskCounts.upcoming || 0,
      isActive: location.pathname === "/upcoming"
    },
    { 
      to: "/completed", 
      icon: "CheckCircle", 
      label: "Completed", 
      count: taskCounts.completed || 0,
      isActive: location.pathname === "/completed"
    }
  ];

  const NavItem = ({ item }) => (
    <NavLink
      to={item.to}
      onClick={() => onClose && onClose()}
      className={({ isActive }) =>
        `flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group ${
          isActive
            ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md"
            : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"
        }`
      }
    >
      <div className="flex items-center gap-3">
        <ApperIcon name={item.icon} size={18} />
        <span className="font-medium">{item.label}</span>
      </div>
      {item.count > 0 && (
        <Badge 
          variant={item.isActive ? "default" : "primary"} 
          className={item.isActive ? "bg-white/20 text-white" : ""}
        >
          {item.count}
        </Badge>
      )}
    </NavLink>
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full p-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
            <ApperIcon name="CheckSquare" size={18} className="text-white" />
          </div>
          <h1 className="text-xl font-bold font-display text-gray-900">TaskFlow</h1>
        </div>
        <p className="text-sm text-gray-600">Organize your day efficiently</p>
      </div>

      <nav className="space-y-2 mb-8">
        {navItems.map((item) => (
          <NavItem key={item.to} item={item} />
        ))}
      </nav>

      {lists.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            My Lists
          </h3>
          
          <div className="space-y-2">
            {lists.map((list) => (
              <NavLink
                key={list.Id}
                to={`/list/${list.Id}`}
                onClick={() => onClose && onClose()}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-secondary-50 hover:text-secondary-600"
                  }`
                }
              >
<div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: list.color_c || list.color }}
                  />
                  <span className="font-medium">{list.name_c || list.name}</span>
                </div>
                {taskCounts[list.Id] > 0 && (
                  <Badge 
                    variant={listId === list.Id.toString() ? "default" : "secondary"}
                    className={listId === list.Id.toString() ? "bg-white/20 text-white" : ""}
                  >
                    {taskCounts[list.Id]}
                  </Badge>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <div className="lg:hidden">
        {isOpen && (
          <div className="fixed inset-0 z-50 flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm"
              onClick={onClose}
            />
            
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="relative w-80 bg-white shadow-xl overflow-y-auto"
            >
              <div className="absolute top-4 right-4 lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8 hover:bg-gray-100"
                >
                  <ApperIcon name="X" size={16} />
                </Button>
              </div>
              
              <SidebarContent />
            </motion.div>
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:w-80 bg-white shadow-sm border-r border-gray-100 overflow-y-auto">
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;