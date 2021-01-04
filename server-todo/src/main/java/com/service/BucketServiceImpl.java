package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.BucketDAO;
import com.model.Bucket;

@Service
public class BucketServiceImpl implements BucketService {
	
	@Autowired
	BucketDAO bucketDAO;

	@Override
	public boolean addBucket(Bucket bucket) {
		// TODO Auto-generated method stub
		return bucketDAO.addBucket(bucket);
	}

	@Override
	public Bucket getBucket(int bucketId) {
		// TODO Auto-generated method stub
		return bucketDAO.getBucket(bucketId);
	}

	@Override
	public boolean isBucketExists(int bucketId) {
		// TODO Auto-generated method stub
		return bucketDAO.isBucketExists(bucketId);
	}

	@Override
	public boolean deleteBucket(int bucketId) {
		// TODO Auto-generated method stub
		return bucketDAO.deleteBucket(bucketId);
	}

	@Override
	public boolean updateBucket(Bucket bucket) {
		// TODO Auto-generated method stub
		return bucketDAO.updateBucket(bucket);
	}

	@Override
	public List<Bucket> getBuckets() {
		// TODO Auto-generated method stub
		return bucketDAO.getBuckets();
	}

	@Override
	public List<Bucket> searchBucketByName(String bucketName) {
		// TODO Auto-generated method stub
		return bucketDAO.searchBucketByName(bucketName);
	}

}
