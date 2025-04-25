// frontend/src/api/index.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const registerUser = (userData) => api.post('/users/register', userData);
export const loginUser = (credentials) => api.post('/users/login', credentials);
export const getCurrentUser = () => api.get('/users/me');
export const updateUserProfile = (userData) => api.put('/users/profile', userData);

// Food Items API
export const getAllFoodItems = () => api.get('/food-items');
export const getFoodItemById = (id) => api.get(`/food-items/${id}`);
export const createFoodItem = (foodItemData) => api.post('/food-items', foodItemData);
export const updateFoodItem = (id, foodItemData) => api.put(`/food-items/${id}`, foodItemData);
export const deleteFoodItem = (id) => api.delete(`/food-items/${id}`);
export const getMyFoodItems = () => api.get('/food-items/donor/me');

// Donations API
export const createDonation = (donationData) => api.post('/donations', donationData);
export const getAllDonations = () => api.get('/donations');
export const getDonationById = (id) => api.get(`/donations/${id}`);
export const updateDonation = (id, donationData) => api.put(`/donations/${id}`, donationData);
export const getMyDonations = () => api.get('/donations/donor/me');
export const getMyReceivedDonations = () => api.get('/donations/receiver/me');

// Requests API
export const createRequest = (requestData) => api.post('/requests', requestData);
export const getFoodItemRequests = (foodItemId) => api.get(`/requests/food-item/${foodItemId}`);
export const updateRequest = (id, requestData) => api.put(`/requests/${id}`, requestData);
export const getMyRequests = () => api.get('/requests/requester/me');

export default api;