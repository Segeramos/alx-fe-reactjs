import axios from "axios";

const API_URL = 'https://api.github.com/search/users';
const USER_API_URL = 'https://api.github.com/users';

export const searchUsers = async (query) => {
    const response = await axios.get(API_URL, {
        params: {
            q: query,
        }
    })
    return response.data.items;
}

// New function to fetch user data by username
export const fetchUserData = async (username) => {
    const response = await axios.get(`${USER_API_URL}/${username}`);
    return response.data;
}
