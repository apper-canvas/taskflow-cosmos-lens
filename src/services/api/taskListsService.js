const { ApperClient } = window.ApperSDK;

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = 'task_list_c';

export const taskListsService = {
  async getAll() {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "color_c"}},
          {"field": {"Name": "order_c"}},
          {"field": {"Name": "task_count_c"}}
        ],
        orderBy: [{"fieldName": "order_c", "sorttype": "ASC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };
      
      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error("Failed to fetch task lists:", response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching task lists:", error);
      return [];
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "color_c"}},
          {"field": {"Name": "order_c"}},
          {"field": {"Name": "task_count_c"}}
        ]
      };
      
      const response = await apperClient.getRecordById(tableName, id, params);
      
      if (!response.success || !response.data) {
        throw new Error(`Task list with Id ${id} not found`);
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching task list ${id}:`, error);
      throw error;
    }
  },

  async create(listData) {
    try {
      const params = {
        records: [{
          Name: listData.name_c || listData.name || "Untitled List",
          name_c: listData.name_c || listData.name,
          color_c: listData.color_c || listData.color || "#5B4CFF",
          order_c: listData.order_c || listData.order || 1,
          task_count_c: listData.task_count_c || listData.taskCount || 0
        }]
      };
      
      const response = await apperClient.createRecord(tableName, params);
      
      if (!response.success) {
        console.error("Failed to create task list:", response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} records:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successful[0]?.data || {};
      }
      
      return {};
    } catch (error) {
      console.error("Error creating task list:", error);
      throw error;
    }
  },

  async update(id, updateData) {
    try {
      const updateFields = {
        Id: id
      };
      
      if (updateData.name_c !== undefined || updateData.name !== undefined) {
        updateFields.name_c = updateData.name_c || updateData.name;
        updateFields.Name = updateData.name_c || updateData.name;
      }
      if (updateData.color_c !== undefined || updateData.color !== undefined) {
        updateFields.color_c = updateData.color_c || updateData.color;
      }
      if (updateData.order_c !== undefined || updateData.order !== undefined) {
        updateFields.order_c = updateData.order_c || updateData.order;
      }
      if (updateData.task_count_c !== undefined || updateData.taskCount !== undefined) {
        updateFields.task_count_c = updateData.task_count_c || updateData.taskCount;
      }
      
      const params = {
        records: [updateFields]
      };
      
      const response = await apperClient.updateRecord(tableName, params);
      
      if (!response.success) {
        console.error("Failed to update task list:", response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} records:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successful[0]?.data || {};
      }
      
      return {};
    } catch (error) {
      console.error("Error updating task list:", error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const params = {
        RecordIds: [id]
      };
      
      const response = await apperClient.deleteRecord(tableName, params);
      
      if (!response.success) {
        console.error("Failed to delete task list:", response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} records:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successful.length > 0;
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting task list:", error);
      throw error;
    }
  }
};