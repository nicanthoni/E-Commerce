import { createContext, useState } from 'react';

export const SortProductsContext = createContext();

// Context used to make state of 'sort by' product filter globally accessible
export const SortProductsContextProvider = ({ children }) => {
  const [selectedSortBy, setSelectedSortBy] = useState('Newest'); // default to Newest Products

  const handleSortByChange = (sortBy) => {
    setSelectedSortBy(sortBy);
  };

  return (
    <SortProductsContext.Provider
      value={{ selectedSortBy, handleSortByChange }}
    >
      {children}
    </SortProductsContext.Provider>
  );
};
