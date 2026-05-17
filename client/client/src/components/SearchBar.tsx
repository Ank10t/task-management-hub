import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { setSearchQuery } from '../store/tasksSlice';
import { useDebounce } from '../hooks/useDebounce';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchQuery = useSelector((state: RootState) => state.tasks.searchQuery);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  
  const debouncedSearch = useDebounce(localSearch, 300);

  // Update Redux store only after debounce delay
  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearch));
  }, [debouncedSearch, dispatch]);
  
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search title"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
      />
      {localSearch && (
        <button onClick={() => setLocalSearch('')} className="clear-btn">
          X
        </button>
      )}
    </div>
  );
};

export default SearchBar;