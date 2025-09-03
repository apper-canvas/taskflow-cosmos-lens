import { motion } from "framer-motion";
import { format } from "date-fns";
import Checkbox from "@/components/atoms/Checkbox";
import PriorityBadge from "@/components/molecules/PriorityBadge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  className 
}) => {
const completed = task.completed_c !== undefined ? task.completed_c : task.completed;
  const dueDate = task.due_date_c || task.dueDate;
  const isOverdue = !completed && dueDate && new Date(dueDate) < new Date();
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-lg p-4 shadow-card hover:shadow-card-hover transition-all duration-200 border border-gray-100 ${className}`}
    >
      <div className="flex items-start gap-3">
        <Checkbox
checked={completed}
          onChange={() => onToggleComplete(task.Id)}
          className="mt-1"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
<h3 className={`font-medium text-gray-900 ${completed ? 'line-through text-gray-500' : ''}`}>
              {task.title_c || task.title}
            </h3>
            
            <div className="flex items-center gap-2">
<PriorityBadge priority={task.priority_c || task.priority} />
              
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(task)}
                  className="h-8 w-8 hover:bg-gray-100"
                >
                  <ApperIcon name="Edit2" size={14} />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(task.Id)}
                  className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                >
                  <ApperIcon name="Trash2" size={14} />
                </Button>
              </div>
            </div>
          </div>
          
{(task.description_c || task.description) && (
            <p className={`text-sm text-gray-600 mt-1 ${completed ? 'line-through' : ''}`}>
              {task.description_c || task.description}
            </p>
          )}
          
{dueDate && (
            <div className="flex items-center gap-2 mt-2">
              <ApperIcon name="Calendar" size={14} className="text-gray-400" />
              <span className={`text-xs ${
                isOverdue 
                  ? 'text-red-600 font-medium' 
                  : completed 
                    ? 'text-gray-400 line-through' 
                    : 'text-gray-500'
              }`}>
                {format(new Date(dueDate), 'MMM d, yyyy')}
                {isOverdue && ' (Overdue)'}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;