import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';

const DEFAULT_SUGGESTIONS = ['Silla', 'Escalera', 'Banco'];

interface SearchProps {
  readonly placeholder?: string;
}

export default function Search({ placeholder = 'Buscar productos...' }: SearchProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();

  const filteredSuggestions = DEFAULT_SUGGESTIONS.filter((suggestion) =>
    suggestion.toLowerCase().includes(query.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    navigate(`/?search=${encodeURIComponent(suggestion)}`);
  };

  const handleClear = () => {
    setQuery('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="search">
      <div className="search__input-container">
        <input
          ref={inputRef}
          type="text"
          className="search__input"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length > 0 && setShowSuggestions(true)}
        />
        {query && (
          <button className="search__clear" onClick={handleClear} aria-label="Limpiar búsqueda">
            &times;
          </button>
        )}
        <button
          className="search__button"
          disabled={!query.trim()}
          onClick={handleSearch}
          aria-label="Buscar"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>
      </div>
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul ref={suggestionsRef} className="search__suggestions">
          {filteredSuggestions.map((suggestion) => (
            <li key={suggestion}>
              <button
                className="search__suggestion"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
