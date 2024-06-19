import axios from "axios";
import {Task} from "../types/types";
const API_URL = "/api/tasks";

export const fetchTasks = async () => {
	try {
		const response = await axios.get(API_URL);
		console.log("fetchTasks response data:", response.data);
		if (response.data) {
			return response.data;
		} else {
			return [];
		}
	} catch (error) {
		console.error("fetchTasks error:", error);
		throw error;
	}
};

export const addTask = async (task: Task): Promise<void> => {
	const response = await axios.post<Task>(API_URL, task);
	console.log(response);
};

export const deleteTaskFromAPI = async (id: string): Promise<void> => {
	console.log(`deleteTaskFromAPI`, id);
	const response = await axios.delete(`${API_URL}/${id}`);
	console.log(response);
};
