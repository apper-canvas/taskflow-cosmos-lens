import tasksData from "@/services/mockData/tasks.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory storage for this session
let tasks = [...tasksData];

export const tasksService = {
  async getAll() {
    await delay(300);
    return [...tasks];
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(task => task.Id === id);
    if (!task) {
      throw new Error(`Task with Id ${id} not found`);
    }
    return { ...task };
  },

  async create(taskData) {
    await delay(400);
    const newId = Math.max(...tasks.map(t => t.Id), 0) + 1;
    const newTask = {
      Id: newId,
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, updateData) {
    await delay(300);
    const index = tasks.findIndex(task => task.Id === id);
    if (index === -1) {
      throw new Error(`Task with Id ${id} not found`);
    }
    
    tasks[index] = { ...tasks[index], ...updateData };
    return { ...tasks[index] };
  },

  async delete(id) {
    await delay(250);
    const index = tasks.findIndex(task => task.Id === id);
    if (index === -1) {
      throw new Error(`Task with Id ${id} not found`);
    }
    
    const deletedTask = { ...tasks[index] };
    tasks.splice(index, 1);
    return deletedTask;
  }
};