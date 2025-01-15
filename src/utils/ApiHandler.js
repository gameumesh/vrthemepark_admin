import axios from 'axios';

// Get the base URL from the .env file
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to handle different API methods and optional tokens
const apiCall = async (method, url, data = null, isFormData = false, token = null) => {
  try {
    let response;
    const headers = token
      ? {
          Authorization: `Bearer ${token}`,
          'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
        }
      : {
          'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
        };

    // Define the config for requests with tokens
    const config = { headers };

    if (isFormData) {
      switch (method.toLowerCase()) {
        case 'post':
          response = await axiosInstance.post(url, data, config);
          break;
        case 'put':
          response = await axiosInstance.put(url, data, config);
          break;
        case 'delete':
          response = await axiosInstance.delete(url, { data: data, ...config });
          break;
        default:
          throw new Error(`Unsupported method for FormData: ${method}`);
      }
    } else {
      // Regular JSON-based requests
      switch (method.toLowerCase()) {
        case 'get':
          response = await axiosInstance.get(url, config);
          break;
        case 'post':
          response = await axiosInstance.post(url, data, config);
          break;
        case 'put':
          response = await axiosInstance.put(url, data, config);
          break;
        case 'delete':
          response = await axiosInstance.delete(url, { data: data, ...config });
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
    }

    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

export default apiCall;
