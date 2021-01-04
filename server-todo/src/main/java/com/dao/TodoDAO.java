package com.dao;

import java.util.List;

import com.model.Todo;

public interface TodoDAO {

	public List<Todo> getAllTodo(int bucketId);

	public boolean addTodo(int bucketId, Todo todo);

	public boolean deleteTodo(int bucketId, int todoId);

	public Todo getTodo(int bucketId, int todoId);

	public boolean updateTodo(int bucketId, Todo todo);
	
	public boolean isTodoExists(int bucketId, int todoId);

}
