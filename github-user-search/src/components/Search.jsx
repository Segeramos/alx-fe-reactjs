import { useState } from 'react';
import { searchUsers, fetchUserData } from '../services/githubService';  // Ensure the path is correct

const SearchInput = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedUserData, setSelectedUserData] = useState(null);  // State to store detailed user data

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
    setUserData([]);  // Clear previous results
    setPage(1);  // Reset page number to 1

    try {
      const users = await searchUsers(username, location, minRepos, 1); // Request page 1
      setUserData(users);
      setHasMore(users.length === 30); // Check if more results are available
    } catch (error) {
      setError("Failed to fetch users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    setLoading(true);

    try {
      const nextPage = page + 1;
      const users = await searchUsers(username, location, minRepos, nextPage);
      setUserData(prevData => [...prevData, ...users]);
      setPage(nextPage);
      setHasMore(users.length === 30);  // Check if more results are available
    } catch (error) {
      setError("Failed to fetch users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch detailed user data when a user is clicked
  const handleUserClick = async (username) => {
    setLoading(true);
    setSelectedUserData(null);  // Clear previous selected user data
    setError(null);

    try {
      const user = await "fetchUserData"(username);  // Fetch detailed data
      setSelectedUserData(user);
    } catch (error) {
      setError("Failed to fetch user details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Form for search */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="text"
          name="location"
          value={location}
          onChange={handleChange}
          placeholder="Location"
        />
        <input
          type="number"
          name="minRepos"
          value={minRepos}
          onChange={handleChange}
          placeholder="Min Repos"
        />
        <button type="submit">Search</button>
      </form>

      {/* Display loading, error, or results */}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div>
        {userData.map((user) => (
          <div key={user.id}>
            <img src={user.avatar_url} alt={user.login} />
            <h3>{user.login}</h3>
            <p>{user.bio}</p>
            <p>{user.location || 'No location'}</p>
            <p>Repos: {user.public_repos}</p>
            <a href={user.html_url} target="_blank" rel="noreferrer">
              View Profile
            </a>
            {/* Button to fetch detailed user data when clicked */}
            <button onClick={() => handleUserClick(user.login)}>
              View Details
            </button>
          </div>
        ))}

        {hasMore && (
          <button onClick={loadMore}>Load More</button>
        )}
      </div>

      {/* Display detailed user data if selected */}
      {selectedUserData && (
        <div>
          <h2>Detailed User Info</h2>
          <img src={selectedUserData.avatar_url} alt={selectedUserData.login} />
          <h3>{selectedUserData.login}</h3>
          <p>{selectedUserData.bio}</p>
          <p>{selectedUserData.location || 'No location'}</p>
          <p>Followers: {selectedUserData.followers}</p>
          <p>Following: {selectedUserData.following}</p>
          <p>Public Repos: {selectedUserData.public_repos}</p>
          <a href={selectedUserData.html_url} target="_blank" rel="noreferrer">
            View Full Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
