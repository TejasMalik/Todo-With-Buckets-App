package com.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Todo {

	@Id
	private int todoId;
	private String todoName;
	private boolean completed;

	public Todo() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Todo(int todoId, String todoName, boolean completed) {
		super();
		this.todoId = todoId;
		this.todoName = todoName;
		this.completed = completed;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (completed ? 1231 : 1237);
		result = prime * result + todoId;
		result = prime * result + ((todoName == null) ? 0 : todoName.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Todo other = (Todo) obj;
		if (completed != other.completed)
			return false;
		if (todoId != other.todoId)
			return false;
		if (todoName == null) {
			if (other.todoName != null)
				return false;
		} else if (!todoName.equals(other.todoName))
			return false;
		return true;
	}

	public int getTodoId() {
		return todoId;
	}

	public void setTodoId(int todoId) {
		this.todoId = todoId;
	}

	public String getTodoName() {
		return todoName;
	}

	public void setTodoName(String todoName) {
		this.todoName = todoName;
	}

	public boolean isCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
	}

	@Override
	public String toString() {
		return "Todo [todoId=" + todoId + ", todoName=" + todoName + ", completed=" + completed + "]";
	}

}
