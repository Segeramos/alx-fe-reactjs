import axios from "axios";

const API_URL = 'https://api.github.com/search/users';

export const searchUsers = async (query) => {
    const response = await axios.get(API_URL, {
        params: {
            q: query,
        }
    })
    return response.data.items;
}