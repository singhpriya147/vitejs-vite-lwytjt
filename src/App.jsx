import { useState } from 'react';
import Container from './Container';
import './App.css';
import { CiSearch } from 'react-icons/ci';
function App() {
  const [query, setQuery] = useState('');
  const [container, setContainer] = useState([]);
  const [showContainer, setShowContainer] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    fetchData();
  };

  const keyHandler = (e) => {
    fetchData();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      keyHandler();
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}?q=${query}&pharmacyIds=1,2,3`
      );
      const data = await response.json();

      setContainer(data.data.saltSuggestions);
      setShowContainer(true);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div>
      <header className="container-wrapper">
        <h1>PharmaScout</h1>
        <span>Search for Your Medications with Ease.</span>
      </header>
      <div className="search-bar">
        <input
          placeholder="Try searching...paracetamol"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <span className="span-button" onClick={submitHandler}>
          Search
        </span>
        <CiSearch className="search-icon" />
      </div>
      <div>
        <hr />
      </div>
      {showContainer ? (
        <div className="container">
          <Container container={container} />
        </div>
      ) : (
        <div className="home-text">
          <h3>"Find medicines with amazing discount "</h3>
        </div>
      )}
    </div>
  );
}

export default App;
