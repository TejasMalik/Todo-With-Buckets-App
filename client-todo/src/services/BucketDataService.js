import axios from "axios";
const BUCKET_API_URL = 'http://localhost:8080/bucket'

class BucketDataService {

   getAllBuckets() {
      return axios.get(`${BUCKET_API_URL}`);
   }

   deleteBucket(bucketId) {
      return axios.delete(`${BUCKET_API_URL}/${bucketId}`);
   }

   getBucket(bucketId) {
      return axios.get(`${BUCKET_API_URL}/${bucketId}`);
   }

   updateBucket(bucket) {
      return axios.put(`${BUCKET_API_URL}`, bucket);
   }

   addBucket(bucket) {
      return axios.post(`${BUCKET_API_URL}`, bucket);
   }

   searchBucketByName(bucketName) {
      return axios.get(`${BUCKET_API_URL}/search/${bucketName}`)
   }
}

export default new BucketDataService()