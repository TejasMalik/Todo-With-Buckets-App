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
import com.service.BucketService;

@RestController
@RequestMapping("bucket")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
public class BucketController {
	
	@Autowired
	BucketService bucketService;
	
	@GetMapping("/{bucketId}")
	public ResponseEntity<Bucket> getBucket(@PathVariable("bucketId") int bucketId) {
		System.out.println("Get Bucket called " + bucketId);
		Bucket bucket = new Bucket();
		if (bucketService.isBucketExists(bucketId)) {
			bucket = bucketService.getBucket(bucketId);
			return new ResponseEntity<Bucket>(bucket, HttpStatus.OK);
		}
		return new ResponseEntity<Bucket>(bucket, HttpStatus.NO_CONTENT);
	}

	@DeleteMapping("/{bucketId}")
	public ResponseEntity<Bucket> deleteBucket(@PathVariable("bucketId") int bucketId) {
		System.out.println("Delete Bucket called " + bucketId);
		Bucket bucket = new Bucket();
		if (bucketService.isBucketExists(bucketId)) {
			bucketService.deleteBucket(bucketId);
			return new ResponseEntity<Bucket>(bucket, HttpStatus.OK);
		}
		return new ResponseEntity<Bucket>(bucket, HttpStatus.NOT_FOUND);
	}

	@GetMapping
	public ResponseEntity<List<Bucket>> getAllBuckets() {

		System.out.println("Get All Buckets");
		List<Bucket> allBuckets = bucketService.getBuckets();
		return new ResponseEntity<List<Bucket>>(allBuckets, HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<Bucket> saveBucket(@RequestBody Bucket bucket) {
		System.out.println("Saving a bucket");
		System.out.println(bucket);
		if (!bucketService.isBucketExists(bucket.getBucketId())) {
			bucketService.addBucket(bucket);
			return new ResponseEntity<Bucket>(bucket, HttpStatus.CREATED);
		}
		return new ResponseEntity<Bucket>(bucket, HttpStatus.CONFLICT);
	}

	@PutMapping
	public ResponseEntity<Bucket> updateBucket(@RequestBody Bucket bucket) {
		System.out.println("Updating a bucket");
		System.out.println(bucket);
		if (bucketService.isBucketExists(bucket.getBucketId())) {
			bucketService.updateBucket(bucket);
			return new ResponseEntity<Bucket>(bucket, HttpStatus.OK);
		}
		return new ResponseEntity<Bucket>(bucket, HttpStatus.NOT_FOUND);
	}

	@GetMapping("/search/{bucketName}")
	public ResponseEntity<List<Bucket>> searchBucketByName(@PathVariable("bucketName") String bucketName) {
		System.out.println("Search By Name " +bucketName);
		List<Bucket> allBucketByName = bucketService.searchBucketByName(bucketName);
		return new ResponseEntity<List<Bucket>>(allBucketByName, HttpStatus.OK);
	}

}
