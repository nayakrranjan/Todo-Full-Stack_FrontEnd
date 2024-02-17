import { apiClient } from "./ApiClient";

export const getTodosByUser = (username) => apiClient.get(`/${username}/todos`);
export const deleteTodo = (username, id) => apiClient.delete(`/${username}/todos/${id}`);
export const getTodo = (username, id) => apiClient.get(`/${username}/todos/${id}`);
export const updateTodo = (username, id, todo) => apiClient.put(`/${username}/todos/${id}`, todo);
export const createTodo = (username, todo) => apiClient.post(`/${username}/todos`, todo, );
export const executeAuthentication = (token) => apiClient.get('/auth', {
    headers: {
        Authorization: token
    }
})