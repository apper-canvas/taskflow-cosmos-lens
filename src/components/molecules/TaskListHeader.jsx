import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const TaskListHeader = ({ 
  list, 
  taskCount, 
  completedCount,
  onAddTask,
  className 
}) => {
  const progressPercent = taskCount > 0 ? Math.round((completedCount / taskCount) * 100) : 0;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-lg p-6 shadow-card mb-6 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold font-display text-gray-900">
              {list?.name || "All Tasks"}
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              {taskCount} tasks • {completedCount} completed
            </p>
          </div>
          
          {taskCount > 0 && (
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="url(#progress-gradient)"
                    strokeWidth="2"
                    strokeDasharray={`${progressPercent}, 100`}
                    className="transition-all duration-500"
                  />
                  <defs>
                    <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#5B4CFF" />
                      <stop offset="100%" stopColor="#FF6B9D" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-700">
                    {progressPercent}%
                  </span>
                </div>
              </div>
              
              <Badge variant="primary" className="text-sm">
                {progressPercent}% Complete
              </Badge>
            </div>
          )}
        </div>
        
        <Button onClick={onAddTask} className="flex items-center gap-2">
          <ApperIcon name="Plus" size={16} />
          Add Task
        </Button>
      </div>
    </motion.div>
  );
};

export default TaskListHeader;