const Search = ({ setSearch, search, handleSearch }: any) => {
  const handleChange = (e: any) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-row gap-6 w-full">
      <input
        type="text"
        placeholder="Type here..."
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        value={search}
        className="bg-white px-4 py-3 rounded-md h-[45px] w-full sm:w-[90%] focus:border-none focus:outline-none outline-none text-black"
      />
      <button
        className="bg-white px-6 h-[45px] rounded-md text-black"
        onClick={() => handleSearch()}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
