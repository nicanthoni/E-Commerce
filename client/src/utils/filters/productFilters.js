// Price
export const sortByPriceAsc = (array) => {
  return array.slice().sort((a, b) => a.price - b.price);
};
export const sortByPriceDesc = (array) => {
  return array.slice().sort((a, b) => b.price - a.price);
};

// Alphabetical
export const sortByAlphabetical = (array) =>
  array.sort((a, b) => a.name.localeCompare(b.name));

export const sortByReverseAlphabetical = (array) =>
  array.sort((a, b) => b.name.localeCompare(a.name));

// Newest 'createdAt' date
export const sortByNewest = (array) => {
  return array
    .slice()
    .sort((a, b) => parseInt(b.createdAt) - parseInt(a.createdAt));
};
