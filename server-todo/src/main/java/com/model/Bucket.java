package com.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Bucket {

	@Id
	private int bucketId;
	private String bucketName;
	private List<Todo> todos;

	public Bucket() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Bucket(int bucketId, String bucketName, List<Todo> todos) {
		super();
		this.bucketId = bucketId;
		this.bucketName = bucketName;
		this.todos = todos;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + bucketId;
		result = prime * result + ((bucketName == null) ? 0 : bucketName.hashCode());
		result = prime * result + ((todos == null) ? 0 : todos.hashCode());
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
		Bucket other = (Bucket) obj;
		if (bucketId != other.bucketId)
			return false;
		if (bucketName == null) {
			if (other.bucketName != null)
				return false;
		} else if (!bucketName.equals(other.bucketName))
			return false;
		if (todos == null) {
			if (other.todos != null)
				return false;
		} else if (!todos.equals(other.todos))
			return false;
		return true;
	}

	public int getBucketId() {
		return bucketId;
	}

	public void setBucketId(int bucketId) {
		this.bucketId = bucketId;
	}

	public String getBucketName() {
		return bucketName;
	}

	public void setBucketName(String bucketName) {
		this.bucketName = bucketName;
	}

	public List<Todo> getTodos() {
		return todos;
	}

	public void setTodos(List<Todo> todos) {
		this.todos = todos;
	}

	@Override
	public String toString() {
		return "Bucket [bucketId=" + bucketId + ", bucketName=" + bucketName + ", todos=" + todos + "]";
	}

}
