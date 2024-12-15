import { useState } from 'react';
import axios from 'axios';

const SearchInput = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') setUsername(value);
    if (name === 'location') setLocation(value);
    if (name === 'minRepos') setMinRepos(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://api.github.com/search/users`, {
        params: {
          q: `${username} location:${location} repos:>=${minRepos}`,
        }
      });

      if (response.status === 404) {
        setError("Looks like we can't find the user");
      } else {
        setUserData(response.data.items);
      }
    } catch (error) {
      setError("Looks like we can't find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-semibold text-center">Search GitHub Users</h2>
        
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <div className="flex-1">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              placeholder="Enter GitHub username"
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location (optional)
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={handleChange}
              placeholder="Enter location"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700">
              Min Repositories (optional)
            </label>
            <input
              type="number"
              id="minRepos"
              name="minRepos"
              value={minRepos}
              onChange={handleChange}
              placeholder="Minimum repositories"
              min="0"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Search
          </button>
        </div>
        
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
      </form>

      {userData && userData.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Search Results</h3>
          <div className="space-y-4">
            {userData.map((user) => (
              <div key={user.id} className="p-4 bg-gray-100 rounded-md shadow-sm">
                <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full" />
                <h4 className="text-lg font-semibold">{user.login}</h4>
                <p className="text-sm">{user.bio}</p>
                <a href={user.html_url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                  View Profile
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
