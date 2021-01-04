package com.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.model.Bucket;
import com.model.Todo;
import com.mongodb.WriteResult;

@Repository
public class BucketDAOImpl implements BucketDAO {

	@Autowired
	MongoTemplate mongoTemplate;

	@Override
	public boolean addBucket(Bucket bucket) {
		// TODO Auto-generated method stub
		System.out.println("Inside DAO : " + bucket);
		List<Todo> todos = new ArrayList<Todo>();
		bucket.setTodos(todos);
		mongoTemplate.save(bucket);
		return true;
	}

	@Override
	public Bucket getBucket(int bucketId) {
		// TODO Auto-generated method stub
		return mongoTemplate.findById(bucketId, Bucket.class);
	}

	@Override
	public boolean isBucketExists(int bucketId) {
		// TODO Auto-generated method stub
		Bucket bucket = mongoTemplate.findById(bucketId, Bucket.class);
		if (bucket == null) {
			return false;
		}
		return true;
	}

	@Override
	public boolean deleteBucket(int bucketId) {
		// TODO Auto-generated method stub
		Bucket bucket = new Bucket();
		bucket.setBucketId(bucketId);
		WriteResult writeResult = mongoTemplate.remove(bucket);
		int rowsAffected = writeResult.getN();

		if (rowsAffected == 0) {
			return false;
		}
		return true;
	}

	@Override
	public boolean updateBucket(Bucket bucket) {
		// TODO Auto-generated method stub
		Query query = new Query();
		query.addCriteria(Criteria.where("_id").is(bucket.getBucketId()));

		Update update = new Update();
		update.set("bucketName", bucket.getBucketName());

		WriteResult writeResult = mongoTemplate.updateFirst(query, update, Bucket.class);
		int rowsAffected = writeResult.getN();

		if (rowsAffected == 0) {
			return false;
		}
		return true;
	}

	@Override
	public List<Bucket> getBuckets() {
		// TODO Auto-generated method stub
		return mongoTemplate.findAll(Bucket.class);
	}

	@Override
	public List<Bucket> searchBucketByName(String bucketName) {
		// TODO Auto-generated method stub
		Query query = new Query();
		query.addCriteria(Criteria.where("bucketName").regex(bucketName, "i"));
		List<Bucket> bucketWithNames = mongoTemplate.find(query, Bucket.class);
		return bucketWithNames;
	}

}
