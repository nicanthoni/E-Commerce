// Calculate the average price
export const getAverage = (array) =>
  array.reduce((sum, currentValue) => sum + currentValue.price, 0) /
  array.length;

// Sort by price in ascending order
export const sortByPriceAsc = (array) => {
  return array.slice().sort((a, b) => a.price - b.price);
};

// Sort by price in descending order
export const sortByPriceDesc = (array) => {
  return array.slice().sort((a, b) => b.price - a.price);
};
