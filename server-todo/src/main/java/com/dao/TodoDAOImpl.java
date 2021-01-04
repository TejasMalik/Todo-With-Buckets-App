package com.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import com.model.Bucket;
import com.model.Todo;

@Repository
public class TodoDAOImpl implements TodoDAO {
	
	@Autowired
	MongoTemplate mongoTemplate;
	
	@Autowired
	BucketDAO bucketDAO;
	
	Bucket bucket = new Bucket();
	Todo todo = new Todo();
	

	@Override
	public List<Todo> getAllTodo(int bucketId) {
		// TODO Auto-generated method stub
		bucket = bucketDAO.getBucket(bucketId);

		List<Todo> allTodo = bucket.getTodos();
		System.out.println(allTodo);

		return allTodo;
	}

	@Override
	public boolean addTodo(int bucketId, Todo todo) {
		// TODO Auto-generated method stub
		bucket = bucketDAO.getBucket(bucketId);

		System.out.println(bucket);

		List<Todo> allTodo = new ArrayList<Todo>();
		allTodo = bucket.getTodos();
		System.out.println(allTodo);

		System.out.println(todo);

		allTodo.add(todo);

		System.out.println(allTodo);
		bucket.setTodos(allTodo);

		System.out.println("Inside DAO :" + todo);
		System.out.println("Inside DAO :" + bucket);

		mongoTemplate.save(bucket, "bucket");
		return true;
	}

	@Override
	public boolean deleteTodo(int bucketId, int todoId) {
		// TODO Auto-generated method stub
		bucket = bucketDAO.getBucket(bucketId);

		List<Todo> allTodo = new ArrayList<Todo>();
		allTodo = bucket.getTodos();
		System.out.println(allTodo);

		for (int i = 0; i < allTodo.size(); i++) {
			if (allTodo.get(i).getTodoId() == todoId) {
				allTodo.remove(i);
			}
		}

		bucket.setTodos(allTodo);
		mongoTemplate.save(bucket, "bucket");

		return true;
	}

	@Override
	public Todo getTodo(int bucketId, int todoId) {
		// TODO Auto-generated method stub
		bucket = bucketDAO.getBucket(bucketId);

		List<Todo> allTodo = new ArrayList<Todo>();
		allTodo = bucket.getTodos();
		System.out.println(allTodo);

		for (int i = 0; i < allTodo.size(); i++) {
			if (allTodo.get(i).getTodoId() == todoId) {
				todo = allTodo.get(i);
			}
		}

		return todo;
	}

	@Override
	public boolean updateTodo(int bucketId, Todo todo) {
		// TODO Auto-generated method stub
		bucket = bucketDAO.getBucket(bucketId);
		System.out.println(bucketId);
		System.out.println(bucket);
		List<Todo> allTodo = bucket.getTodos();
		for (Todo x : allTodo) {
			if (x.getTodoId() == todo.getTodoId()) {
				System.out.println(x);
//				allTodo.remove(x);
//				allTodo.add(todo);
//				bucket.setTodos(allTodo);
				x.setTodoName(todo.getTodoName());
				x.setCompleted(todo.isCompleted());
				mongoTemplate.save(bucket, "bucket");
				break;
			}
		}
		System.out.println(bucket.getTodos());
		return true;
	}

	@Override
	public boolean isTodoExists(int bucketId, int todoId) {
		// TODO Auto-generated method stub
		bucket = bucketDAO.getBucket(bucketId);
		System.out.println(bucketId);
		List<Todo> allTodo = bucket.getTodos();
		System.out.println(allTodo);
		for (Todo x: allTodo) {
			if (x.getTodoId() == todoId) {
				return true;
			}
		}
		return false;
	}

}
