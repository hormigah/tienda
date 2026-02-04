import { useState, useRef, useEffect } from 'react';
import './NavBar.css';

interface NavBarProps {
  onSearch: (query: string) => void;
}

const SUGGESTIONS = ['Silla', 'Escalera', 'Banco'];

export default function NavBar({ onSearch }: NavBarProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  const filteredSuggestions = SUGGESTIONS.filter((suggestion) =>
    suggestion.toLowerCase().includes(query.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.length > 0);
    onSearch(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
    inputRef.current?.focus();
  };

  const handleClear = () => {
    setQuery('');
    setShowSuggestions(false);
    onSearch('');
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
    <nav className="NavBar">
      <div className="NavBar__brand">
        <a href="/" className="NavBar__logo">
          Tienda
        </a>
      </div>
      <div className="NavBar__search">
        <input
          ref={inputRef}
          type="text"
          className="NavBar__input"
          placeholder="Buscar productos..."
          value={query}
          onChange={handleInputChange}
          onFocus={() => query.length > 0 && setShowSuggestions(true)}
        />
        {query && (
          <button className="NavBar__clear" onClick={handleClear} aria-label="Limpiar búsqueda">
            &times;
          </button>
        )}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul ref={suggestionsRef} className="NavBar__suggestions">
            {filteredSuggestions.map((suggestion) => (
              <li key={suggestion}>
                <button
                  className="NavBar__suggestion"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
