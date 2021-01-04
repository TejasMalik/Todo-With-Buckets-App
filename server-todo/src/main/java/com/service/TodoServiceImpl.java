package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.TodoDAO;
import com.model.Todo;

@Service
public class TodoServiceImpl implements TodoService {
	
	@Autowired
	TodoDAO todoDAO;

	@Override
	public List<Todo> getAllTodo(int bucketId) {
		// TODO Auto-generated method stub
		return todoDAO.getAllTodo(bucketId);
	}

	@Override
	public boolean addTodo(int bucketId, Todo todo) {
		// TODO Auto-generated method stub
		return todoDAO.addTodo(bucketId, todo);
	}

	@Override
	public boolean deleteTodo(int bucketId, int todoId) {
		// TODO Auto-generated method stub
		return todoDAO.deleteTodo(bucketId, todoId);
	}

	@Override
	public Todo getTodo(int bucketId, int todoId) {
		// TODO Auto-generated method stub
		return todoDAO.getTodo(bucketId, todoId);
	}

	@Override
	public boolean updateTodo(int bucketId, Todo todo) {
		// TODO Auto-generated method stub
		return todoDAO.updateTodo(bucketId, todo);
	}

	@Override
	public boolean isTodoExists(int bucketId, int todoId) {
		// TODO Auto-generated method stub
		return todoDAO.isTodoExists(bucketId, todoId);
	}

}
