import axios from "axios";

const API_URL = "http://localhost:5001/api/tasks";

export const fetchTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data.data;
};

export const addTask = async (task) => {
  try {
    const response = await axios.post(API_URL, task);
    if (response.data) {
      return response.data.task;
    }
  } catch (error) {
    console.error("Failed to add task:", error);
    throw error;
  }
};

export const deleteTaskFromAPI = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete task:", error);
    throw error;
  }
};