package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.model.Bucket;
import com.model.Todo;
import com.service.TodoService;

@RestController
@RequestMapping("todo")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
public class TodoController {
	
	@Autowired
	TodoService todoService;
	Bucket bucket;
	
	@GetMapping("/{bucketId}")
	public ResponseEntity<List<Todo>> getAllTodo(@PathVariable("bucketId") int bucketId) {
		System.out.println("Fetching all Todos");
		System.out.println(bucketId);
		List<Todo> allTodo = todoService.getAllTodo(bucketId);
		return new ResponseEntity<List<Todo>>(allTodo, HttpStatus.OK);
	}

	@PostMapping("/{bucketId}")
	public ResponseEntity<Todo> saveTodo(@RequestBody Todo todo, @PathVariable("bucketId") int bucketId) {
		System.out.println("saving todo");
		System.out.println(bucketId);
		System.out.println(todo.getTodoId());
		if (!todoService.isTodoExists(bucketId, todo.getTodoId())) {
			todoService.addTodo(bucketId, todo);
			return new ResponseEntity<Todo>(todo, HttpStatus.CREATED);
		}
		

		return new ResponseEntity<Todo>(todo, HttpStatus.CONFLICT);

	}

	@GetMapping("/{bucketId}/{todoId}")
	public Todo getTodo(@PathVariable("bucketId") int bucketId, @PathVariable("todoId") int todoId) {
		System.out.println("Getting todo " + todoId);
		return todoService.getTodo(bucketId, todoId);

	}

	@DeleteMapping("/{bucketId}/{todoId}")
	public boolean deleteTodo(@PathVariable("bucketId") int bucketId, @PathVariable("todoId") int todoId) {
		System.out.println("Deleting todo " + todoId);
		return todoService.deleteTodo(bucketId, todoId);

	}
	
	@PutMapping("/{bucketId}")
	public boolean updateTodo(@RequestBody Todo todo, @PathVariable("bucketId") int bucketId) {
		System.out.println("Updating Todo " + bucketId);
		return todoService.updateTodo(bucketId, todo);

	}

}
