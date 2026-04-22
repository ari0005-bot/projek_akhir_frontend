import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({
  baseURL: BASE_URL,
});

export const getUsers = () => API.get("/users");
export const createUser = (data) => API.post("/users", data);
export const deleteUser = (id) => API.delete(`/users/${id}`);

export const getEvents = () => API.get("/events");
export const createEvent = (data) => API.post("/events", data);
export const updateEvent = (id, data) => API.put(`/events/${id}`, data);
export const deleteEvent = (id) => API.delete(`/events/${id}`);

export default API;
