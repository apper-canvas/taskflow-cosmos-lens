import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const FilterBar = ({ 
  activeFilter, 
  onFilterChange, 
  sortBy, 
  onSortChange,
  showCompleted,
  onToggleCompleted,
  className 
}) => {
  const filters = [
    { value: "all", label: "All", icon: "List" },
    { value: "today", label: "Today", icon: "Calendar" },
    { value: "upcoming", label: "Upcoming", icon: "Clock" },
    { value: "overdue", label: "Overdue", icon: "AlertCircle" }
  ];

  const sortOptions = [
    { value: "dueDate", label: "Due Date", icon: "Calendar" },
    { value: "priority", label: "Priority", icon: "Flag" },
    { value: "created", label: "Created", icon: "Plus" },
    { value: "alphabetical", label: "A-Z", icon: "ArrowUpDown" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-lg p-4 shadow-card mb-6 ${className}`}
    >
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Button
              key={filter.value}
              variant={activeFilter === filter.value ? "primary" : "ghost"}
              size="sm"
              onClick={() => onFilterChange(filter.value)}
              className="flex items-center gap-2"
            >
              <ApperIcon name={filter.icon} size={14} />
              {filter.label}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 hidden sm:inline">Sort by:</span>
            
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="text-sm border border-gray-200 rounded px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <Button
            variant={showCompleted ? "primary" : "ghost"}
            size="sm"
            onClick={onToggleCompleted}
            className="flex items-center gap-2"
          >
            <ApperIcon name={showCompleted ? "EyeOff" : "Eye"} size={14} />
            {showCompleted ? "Hide" : "Show"} Done
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;