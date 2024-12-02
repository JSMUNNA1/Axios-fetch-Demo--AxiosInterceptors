// Why Use This Axios Instance?
// Centralized Configuration:

// Instead of setting the baseURL and headers every time you make a request, you do it once when creating the Axios instance. This ensures consistency and reduces boilerplate code.
// Reusable Configuration:

// This instance can be reused throughout your app. For example, any request made using axiosInstance will automatically have the base URL and headers set.
// Environment-specific Configuration:

// By using process.env.REACT_APP_URL, you can easily switch between different environments (e.g., development, production) by changing the value in the .env file instead of hardcoding the URLs into your code.

import axios from "axios";

// Create Axios instance
// Purpose: This method is used to create a custom instance of Axios, which allows you to configure global defaults for all requests made with this instance.
// Why Use It? It’s useful when you need a different configuration (e.g., base URL, headers) for different parts of your app without affecting the global Axios default configuration.
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL, 
  headers: {
    "Content-Type": "application/json",                
  },
});


// Purpose: Automatically adds necessary headers (like tokens) to each request.
// Workflow: The request goes through the interceptor before being sent to the server, modifying the request configuration.
// Why Use It? For consistent, maintainable, and scalable API requests that handle authentication and custom headers centrally.
//it when tigger jab aapaka request jane se phle ye pura dyanmicall adjust karega request header ko
// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Request sent:", config);
    // Add an authorization token if required
    // const token = localStorage.getItem("authToken");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor

// The Axios response interceptor is triggered whenever an HTTP response is received from the server, regardless of whether the response is successful or contains an error. Here's how the process works:

// Purpose: The response interceptor allows you to handle responses and errors globally for all API calls made with the axiosInstance.
// Why Use It?:
// Centralizes error handling.
// Allows for uniform response transformation or modification.
// Provides better debugging and user-friendly error messages.
// Handles global issues like token expiration in a centralized way.
// How It Works:
// If the response is successful, it logs and returns the response.
// If there's an error, it logs the error, shows a message to the user, and propagates the error for further handling.
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response received:", response);
    return response;
  },
  (error) => {
    console.error("Response error:", error.response);
    alert("An error occurred: " + error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
