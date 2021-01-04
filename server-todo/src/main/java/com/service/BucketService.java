package com.service;

import java.util.List;

import com.model.Bucket;

public interface BucketService {

	public boolean addBucket(Bucket bucket);

	public Bucket getBucket(int bucketId);

	public boolean isBucketExists(int bucketId);

	public boolean deleteBucket(int bucketId);

	public boolean updateBucket(Bucket bucket);

	public List<Bucket> getBuckets();

	public List<Bucket> searchBucketByName(String bucketName);

}
