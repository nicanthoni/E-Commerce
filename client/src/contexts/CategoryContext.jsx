import { createContext, useState } from 'react';

export const CategoryContext = createContext();

// Context used to make state of 'category' product filter globally accessible
export const CategoryContextProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('All Products'); // default to All Products

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <CategoryContext.Provider
      value={{ selectedCategory, handleCategoryChange }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
