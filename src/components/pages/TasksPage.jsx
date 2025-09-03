import { useState, useEffect } from "react";
import { useParams, useOutletContext, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import TaskListHeader from "@/components/molecules/TaskListHeader";
import FilterBar from "@/components/organisms/FilterBar";
import TaskList from "@/components/organisms/TaskList";
import TaskModal from "@/components/organisms/TaskModal";
import { tasksService } from "@/services/api/tasksService";
import { taskListsService } from "@/services/api/taskListsService";

const TasksPage = () => {
  const { listId } = useParams();
  const { searchQuery } = useOutletContext();
  const location = useLocation();
  
  const [tasks, setTasks] = useState([]);
  const [currentList, setCurrentList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    loadTasks();
    if (listId) {
      loadCurrentList();
    } else {
      setCurrentList(null);
    }
  }, [listId]);

  useEffect(() => {
    // Update active filter based on route
    const path = location.pathname;
    if (path === "/today") setActiveFilter("today");
    else if (path === "/upcoming") setActiveFilter("upcoming");
    else if (path === "/completed") setActiveFilter("completed");
    else setActiveFilter("all");
  }, [location.pathname]);

  useEffect(() => {
    // Listen for add task event from header
    const handleAddTask = () => {
      setEditingTask(null);
      setIsModalOpen(true);
    };

    window.addEventListener("addTask", handleAddTask);
    return () => window.removeEventListener("addTask", handleAddTask);
  }, []);

  const loadTasks = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await tasksService.getAll();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks");
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadCurrentList = async () => {
    try {
      const list = await taskListsService.getById(parseInt(listId));
      setCurrentList(list);
    } catch (err) {
      console.error("Error loading list:", err);
      setCurrentList(null);
    }
  };

  const handleSaveTask = async (taskData) => {
    try {
if (editingTask) {
        await tasksService.update(editingTask.Id, taskData);
        toast.success("Task updated successfully!");
      } else {
        await tasksService.create(taskData);
        toast.success("Task created successfully!");
      }
      
      await loadTasks();
      setEditingTask(null);
    } catch (err) {
      toast.error("Failed to save task");
      console.error("Error saving task:", err);
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId);
      if (!task) return;

const currentCompleted = task.completed_c !== undefined ? task.completed_c : task.completed;
      const updatedTask = {
        completed_c: !currentCompleted,
        completed_at_c: !currentCompleted ? new Date().toISOString() : null
      };

      await tasksService.update(taskId, updatedTask);
      
      if (updatedTask.completed) {
        toast.success("🎉 Task completed! Great job!");
      } else {
        toast.info("Task marked as incomplete");
      }
      
      await loadTasks();
    } catch (err) {
      toast.error("Failed to update task");
      console.error("Error updating task:", err);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await tasksService.delete(taskId);
      toast.success("Task deleted successfully!");
      await loadTasks();
    } catch (err) {
      toast.error("Failed to delete task");
      console.error("Error deleting task:", err);
    }
  };

  const getFilteredAndSortedTasks = () => {
    let filtered = tasks;

    // Filter by list
if (listId) {
      filtered = filtered.filter(task => {
        const taskListId = task.list_id_c?.Id || task.list_id_c || task.listId;
        return taskListId && taskListId.toString() === listId.toString();
      });
    }

    // Filter by route
    const path = location.pathname;
    if (path === "/today") {
filtered = filtered.filter(task => {
        const dueDate = task.due_date_c || task.dueDate;
        const completed = task.completed_c !== undefined ? task.completed_c : task.completed;
        if (!dueDate) return false;
        const today = new Date();
        const taskDueDate = new Date(dueDate);
        return taskDueDate.toDateString() === today.toDateString() && !completed;
      });
    } else if (path === "/upcoming") {
filtered = filtered.filter(task => {
        const dueDate = task.due_date_c || task.dueDate;
        const completed = task.completed_c !== undefined ? task.completed_c : task.completed;
        if (!dueDate || completed) return false;
        const today = new Date();
        const taskDueDate = new Date(dueDate);
        return taskDueDate > today;
      });
} else if (path === "/completed") {
      filtered = filtered.filter(task => task.completed_c !== undefined ? task.completed_c : task.completed);
    }

    // Filter by completion status
if (!showCompleted && path !== "/completed") {
      filtered = filtered.filter(task => {
        const completed = task.completed_c !== undefined ? task.completed_c : task.completed;
        return !completed;
      });
    }

    // Filter by search query
if (searchQuery) {
      filtered = filtered.filter(task => {
        const title = task.title_c || task.title || "";
        const description = task.description_c || task.description || "";
        return title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               description.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    // Sort tasks
    filtered.sort((a, b) => {
      switch (sortBy) {
case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          const aPriority = a.priority_c || a.priority || 'medium';
          const bPriority = b.priority_c || b.priority || 'medium';
          return priorityOrder[bPriority] - priorityOrder[aPriority];
        
case "dueDate":
          const aDueDate = a.due_date_c || a.dueDate;
          const bDueDate = b.due_date_c || b.dueDate;
          if (!aDueDate && !bDueDate) return 0;
          if (!aDueDate) return 1;
          if (!bDueDate) return -1;
          return new Date(aDueDate) - new Date(bDueDate);
        
case "created":
          const aCreated = a.created_at_c || a.createdAt || a.CreatedOn;
          const bCreated = b.created_at_c || b.createdAt || b.CreatedOn;
          return new Date(bCreated) - new Date(aCreated);
        
case "alphabetical":
          const aTitle = a.title_c || a.title || "";
          const bTitle = b.title_c || b.title || "";
          return aTitle.localeCompare(bTitle);
        
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredTasks = getFilteredAndSortedTasks();
const completedTasks = tasks.filter(task => task.completed_c !== undefined ? task.completed_c : task.completed).length;
  
  const getEmptyMessage = () => {
    const path = location.pathname;
    if (path === "/today") return "No tasks due today";
    if (path === "/upcoming") return "No upcoming tasks";
    if (path === "/completed") return "No completed tasks yet";
if (listId) return `No tasks in ${currentList?.name_c || currentList?.name || "this list"}`;
    if (searchQuery) return "No tasks match your search";
    return "No tasks found";
  };

  const getEmptyDescription = () => {
    const path = location.pathname;
    if (path === "/today") return "You're all caught up for today! 🎉";
    if (path === "/upcoming") return "No future tasks scheduled yet.";
    if (path === "/completed") return "Complete some tasks to see them here.";
    if (searchQuery) return "Try adjusting your search terms.";
    return "Create your first task to get started!";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <TaskListHeader
        list={currentList}
        taskCount={filteredTasks.length}
        completedCount={completedTasks}
        onAddTask={() => {
          setEditingTask(null);
          setIsModalOpen(true);
        }}
      />

      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        showCompleted={showCompleted}
        onToggleCompleted={() => setShowCompleted(!showCompleted)}
      />

      <TaskList
        tasks={filteredTasks}
        loading={loading}
        error={error}
        onRetry={loadTasks}
        onToggleComplete={handleToggleComplete}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        emptyMessage={getEmptyMessage()}
        emptyDescription={getEmptyDescription()}
      />

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        task={editingTask}
        listId={listId}
      />
    </motion.div>
  );
};

export default TasksPage;