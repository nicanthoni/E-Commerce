import { createContext, useState } from 'react';

export const CategoryContext = createContext();

export const CategoryContextProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

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
