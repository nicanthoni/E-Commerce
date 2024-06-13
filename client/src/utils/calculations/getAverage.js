// 1. Iterate through each number of the array through reduce
// 2. Add each currentValue during iteration to reduce to sum
// 3. Finally, divide the result by the length of the array to get the average


export const getAverage = (array) =>
    array.reduce((sum, currentValue) => sum + currentValue, 0) / array.length;