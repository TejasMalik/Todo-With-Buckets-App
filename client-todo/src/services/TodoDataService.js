import axios from "axios";
const TODO_API_URL = 'http://localhost:8080/todo'

class TodoDataService {

    getAllTodos(todoId) {
        return axios.get(`${TODO_API_URL}/${todoId}`);
     }

     addTodo(todo, bucketId) {
         return axios.post(`${TODO_API_URL}/${bucketId}`, todo)
     }

     deleteTodo(bucketId, todoId) {
         return axios.delete(`${TODO_API_URL}/${bucketId}/${todoId}`)
     }

     updateTodo(bucketId, todo) {
         return axios.put(`${TODO_API_URL}/${bucketId}`, todo)
     }

     getTodo(bucketId, todoId) {
         return axios.get(`${TODO_API_URL}/${bucketId}/${todoId}`)
     }

}
export default new TodoDataService();