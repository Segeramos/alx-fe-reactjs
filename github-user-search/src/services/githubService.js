import axios from 'axios';

// Exact GitHub API URL as required
const API_URL = 'https://api.github.com/search/users?q';  // Exact URL as per the requirement
const USER_API_URL = 'https://api.github.com/users';    // GitHub User details endpoint

// Function to construct the query string for advanced search
const constructQuery = (username, location, minRepos) => {
  let query = username; // Base query is the username

  if (location) {
    query += ` location:${location}`; // Add location to the query if provided
  }

  if (minRepos) {
    query += ` repos:>=${minRepos}`; // Add minRepos to the query if provided
  }

  return query;
};

// Function to search users based on query parameters
export const searchUsers = async (username, location = '', minRepos = '', page = 1) => {
  // Construct query based on the provided filters
  const query = constructQuery(username, location, minRepos);

  try {
    const response = await axios.get(API_URL, {
      params: {
        q: query,        // Passing the query string to the API
        page: page,      // Pagination (page number)
        per_page: 30,    // Results per page (adjustable)
      },
    });

    // Return the list of users that match the query
    return response.data.items;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users. Please try again later.");
  }
};

// Function to fetch user data by username
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${USER_API_URL}/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Failed to fetch user data. Please try again later.");
  }
};
