import axios from 'axios';
import storage from '../storage/Storage';

const axiosClient = axios.create({
    baseURL: `https://60e85cd9673e350017c2188d.mockapi.io/api/v1`,
    // timeout: 5000, // default is `0` (no timeout)
    // responseType: 'json'
});

export default axiosClient;