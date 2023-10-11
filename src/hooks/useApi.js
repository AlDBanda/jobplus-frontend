import axios from 'axios'; 
import { parseErrors } from '../../src/utils/parseErrors';
import { useCookie } from './useCookie';



const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Get the backend URL from environment variables

// Define a custom hook for making API requests
export const useApi = () => {
  const { getAuthCookie } = useCookie();
  const token = getAuthCookie();
  if (token){
   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  // Define a generic request function that can handle different HTTP methods
  const request = async (endpoint, options = {}) => {
    try {
      // Make an Axios request with the provided or default options
      const res = await axios({
        method: options.method || 'GET', // Use the specified method or default to 'GET'
        url: `${BACKEND_URL}/${endpoint}`, // Combine the backend URL with the endpoint
        data: options.data || {}, // Include the provided data or an empty object
        params: options.params || {}, // Include the provided params or an empty object
      });

      // Call the onSuccess callback function if it exists and pass the response
      options.onSuccess && options.onSuccess(res);
    } catch (err) {
      // Call the onFailure callback function if it exists and pass the parsed error
      options.onFailure && options.onFailure(parseErrors(err));
    }
  };

  // Return an object with methods for different HTTP request methods
  return {
    post: (endpoint, options) => request(endpoint, { ...options, method: 'POST' }),
    get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
    put: (endpoint, options) => request(endpoint, { ...options, method: 'PUT' }),
    delete: (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' }),
  };
};
