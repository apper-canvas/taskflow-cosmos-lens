import taskListsData from "@/services/mockData/taskLists.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory storage for this session
let taskLists = [...taskListsData];

export const taskListsService = {
  async getAll() {
    await delay(250);
    return [...taskLists];
  },

  async getById(id) {
    await delay(200);
    const list = taskLists.find(list => list.Id === id);
    if (!list) {
      throw new Error(`Task list with Id ${id} not found`);
    }
    return { ...list };
  },

  async create(listData) {
    await delay(300);
    const newId = Math.max(...taskLists.map(l => l.Id), 0) + 1;
    const newList = {
      Id: newId,
      ...listData,
      taskCount: 0,
      order: taskLists.length + 1
    };
    taskLists.push(newList);
    return { ...newList };
  },

  async update(id, updateData) {
    await delay(250);
    const index = taskLists.findIndex(list => list.Id === id);
    if (index === -1) {
      throw new Error(`Task list with Id ${id} not found`);
    }
    
    taskLists[index] = { ...taskLists[index], ...updateData };
    return { ...taskLists[index] };
  },

  async delete(id) {
    await delay(200);
    const index = taskLists.findIndex(list => list.Id === id);
    if (index === -1) {
      throw new Error(`Task list with Id ${id} not found`);
    }
    
    const deletedList = { ...taskLists[index] };
    taskLists.splice(index, 1);
    return deletedList;
  }
};