const Search = ({ text, onSearch }) => {
  return (
    <input
      type="text"
      className="form-control form-input"
      style={{
        maxWidth: '500px',
        minWidth: '250px',
        width: '100%',
        borderRadius: '0 !important'
      }}
      placeholder={text}
      id="search-icon"
      onChange={onSearch}
    />
  );
};

export default Search;
