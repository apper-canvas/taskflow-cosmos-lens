import { AnimatePresence, motion } from "framer-motion";
import TaskCard from "@/components/molecules/TaskCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import React from "react";

const TaskList = ({ 
  tasks, 
  loading, 
  error, 
  onRetry,
  onToggleComplete, 
  onEditTask, 
  onDeleteTask,
  emptyMessage = "No tasks found",
  emptyDescription = "Create your first task to get started!"
}) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

if (!tasks || tasks.length === 0) {
    return (
      <Empty 
        title={emptyMessage}
        description={emptyDescription}
        actionText="Add Task"
        onAction={() => {
          if (typeof window !== 'undefined' && window.CustomEvent) {
            window.dispatchEvent(new window.CustomEvent('addTask'));
          }
        }}
      />
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <motion.div
            key={task.Id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <TaskCard
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;