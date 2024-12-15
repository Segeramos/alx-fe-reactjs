import { useState, useEffect } from 'react';
import axios from 'axios';

const SearchInput = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      
      if (response.status === 404) {
        setError("Looks like we can't find the user");
      } else {
        setUserData(response.data);
      }
    } catch (error) {
      // This handles the case when the user doesn't exist (e.g., 404 error)
      setError("Looks like we can't find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={handleChange}
          placeholder="Enter username"
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>} {/* Display error message */}
      {userData && (
        <div>
          <img src={userData.avatar_url} alt={userData.login} />
          <h1>{userData.login}</h1>
          <p>{userData.bio}</p>
          <a href={userData.html_url} target="_blank" rel="noreferrer">
            View Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
