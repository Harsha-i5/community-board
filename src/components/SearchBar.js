'use client';

export default function SearchBar({ onSearch }) {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search categories..."
        onChange={handleChange}
      />
      <span className="material-symbols-outlined search-icon">search</span>
    </div>
  );
}