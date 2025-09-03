const { ApperClient } = window.ApperSDK;

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = 'task_c';

export const tasksService = {
  async getAll() {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "completed_at_c"}},
          {"field": {"Name": "list_id_c"}}
        ],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };
      
      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error("Failed to fetch tasks:", response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "completed_at_c"}},
          {"field": {"Name": "list_id_c"}}
        ]
      };
      
      const response = await apperClient.getRecordById(tableName, id, params);
      
      if (!response.success || !response.data) {
        throw new Error(`Task with Id ${id} not found`);
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error);
      throw error;
    }
  },

  async create(taskData) {
    try {
      const params = {
        records: [{
          Name: taskData.title_c || taskData.title || "Untitled Task",
          title_c: taskData.title_c || taskData.title,
          description_c: taskData.description_c || taskData.description,
          priority_c: taskData.priority_c || taskData.priority || "medium",
          due_date_c: taskData.due_date_c || taskData.dueDate,
          completed_c: taskData.completed_c || taskData.completed || false,
          created_at_c: new Date().toISOString(),
          completed_at_c: taskData.completed_at_c || taskData.completedAt,
          list_id_c: taskData.list_id_c || parseInt(taskData.listId) || null
        }]
      };
      
      const response = await apperClient.createRecord(tableName, params);
      
      if (!response.success) {
        console.error("Failed to create task:", response.message);
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
      console.error("Error creating task:", error);
      throw error;
    }
  },

  async update(id, updateData) {
    try {
      const updateFields = {
        Id: id
      };
      
      if (updateData.title_c !== undefined || updateData.title !== undefined) {
        updateFields.title_c = updateData.title_c || updateData.title;
        updateFields.Name = updateData.title_c || updateData.title;
      }
      if (updateData.description_c !== undefined || updateData.description !== undefined) {
        updateFields.description_c = updateData.description_c || updateData.description;
      }
      if (updateData.priority_c !== undefined || updateData.priority !== undefined) {
        updateFields.priority_c = updateData.priority_c || updateData.priority;
      }
      if (updateData.due_date_c !== undefined || updateData.dueDate !== undefined) {
        updateFields.due_date_c = updateData.due_date_c || updateData.dueDate;
      }
      if (updateData.completed_c !== undefined || updateData.completed !== undefined) {
        updateFields.completed_c = updateData.completed_c || updateData.completed;
      }
      if (updateData.completed_at_c !== undefined || updateData.completedAt !== undefined) {
        updateFields.completed_at_c = updateData.completed_at_c || updateData.completedAt;
      }
      if (updateData.list_id_c !== undefined || updateData.listId !== undefined) {
        updateFields.list_id_c = updateData.list_id_c || parseInt(updateData.listId);
      }
      
      const params = {
        records: [updateFields]
      };
      
      const response = await apperClient.updateRecord(tableName, params);
      
      if (!response.success) {
        console.error("Failed to update task:", response.message);
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
      console.error("Error updating task:", error);
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
        console.error("Failed to delete task:", response.message);
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
      console.error("Error deleting task:", error);
      throw error;
    }
  }
};