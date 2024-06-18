import axios from "axios";

const API_URL = "/api/tasks";

export const fetchTasks = async () => {
	try {
		const response = await axios.get(API_URL);
		console.log("fetchTasks response data:", response.data);
		return response.data.data;
	} catch (error) {
		console.error("fetchTasks error:", error);
		throw error;
	}
};

export const addTask = async (task: {id: string; title: string; detail: string; time: string}) => {
	try {
		console.log("addTask request data:", task);
		const response = await axios.post(API_URL, task);
		console.log("addTask response data:", response.data);
		if (response.data) {
			return response.data.task;
		}
	} catch (error) {
		console.error("addTask error:", error);
		throw error;
	}
};

export const deleteTaskFromAPI = async (id: string) => {
	try {
		console.log("deleteTask request id:", id);
		const response = await axios.delete(`${API_URL}?id=${id}`);
		console.log("deleteTask response data:", response.data);
		return response.data;
	} catch (error) {
		console.error("deleteTask error:", error);
		throw error;
	}
};
