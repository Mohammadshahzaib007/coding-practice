// https://www.codingame.com/playgrounds/5422/js-interview-prep-recursion

// ###########################################################################
// ###########################################################################
// Question 1: Sum all numbers
// Write a function called sumRange. It will take a number and return the sum of all numbers from 1 up to the number passed in.
// Sample: sumRange(3) returns 6, since 1 + 2 + 3 = 6.

function sumRange(n) {
  if (n === 0) return 0;
  return n + sumRange(n - 1);
}

// console.log(sumRange(6));

// ###########################################################################
// ###########################################################################
// Question 2: Power function
// Write a function called power which takes in a base and an exponent. If the exponent is 0, return 1.

// Sample:
// console.log(power(2, 4)); // 16
// console.log(power(2, 3)); // 8
// console.log(power(2, 2)); // 4
// console.log(power(2, 1)); // 2
// console.log(power(2, 0)); // 1

function power(x, n) {
  if (n === 0) return 1;
  return x * power(x, n - 1);
}

// ###########################################################################
// ###########################################################################
// Question 3: Calculate factorial
// Write a function that returns the factorial of a number. As a quick refresher, a factorial of a number is the result of that number multiplied by the number before it, and the number before that number, and so on, until you reach 1. The factorial of 1 is just 1.

// Sample:
// console.log(factorial(5)); // 5 * 4 * 3 * 2 * 1 === 120

function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

// ###########################################################################
// ###########################################################################
// Question 4: Check all values in an array
// Write a function called all which accepts an array and a callback and returns true if every value in the array returns true when passed as parameter to the callback function

// Sample:
// var allAreLessThanSeven = all([1, 2, 9], function (num) {
//   return num < 7;
// });
// console.log(allAreLessThanSeven); // false

function all(arr, callback) {
  if (arr.length === 0) return true;

  if (callback(arr[0])) {
    return all(arr.slice(1), callback);
  } else {
    return false;
  }
}

// ###########################################################################
// ###########################################################################
// Question 5: Product of an array
// Write a function called productOfArray which takes in an array of numbers and returns the product of them all

// Sample:
// var six = productOfArray([1,2,3]) // 6
// var sixty = productOfArray([1,2,3,10]) // 60

function productOfArray(arr) {
  if (arr.length === 0) return 1;
  return arr[0] * productOfArray(arr.slice(1));
}

// ###########################################################################
// ###########################################################################
// Question 6: Search JS object
// Write a function called contains that searches for a value in a nested object. It returns true if the object contains that value.

// Sample:
// var nestedObject = {
//   data: {
//     info: {
//       stuff: {
//         thing: {
//           moreStuff: {
//             magicNumber: 44,
//             something: "foo2",
//           },
//         },
//       },
//     },
//   },
// };

// let hasIt = contains(nestedObject, 44); // true
// let doesntHaveIt = contains(nestedObject, "foo"); // false
// console.log(hasIt, doesntHaveIt);

function contains(obj, value) {
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      return contains(obj[key], value);
    }
    if (obj[key] === value) return true;
  }

  return false;
}

// ###########################################################################
// ###########################################################################
// Question 7: Parse a multi-dimensional array
// Given a multi-dimensional integer array, return the total number of integers stored inside this array

// Sample:
// let seven = totalIntegers([[[5], 3], 0, 2, ["foo"], [], [4, [5, 6]]]); // 7
// console.log(seven);

function totalIntegers(array) {
  if (array.length === 0) return 0;

  let total = 0;
  let first = array[0];

  if (Array.isArray(first)) {
    total += totalIntegers(first);
  } else if (Number.isInteger(first)) {
    total += 1;
  }

  return total + totalIntegers(array.slice(1));
}

// ###########################################################################
// ###########################################################################
// Question 8:
// Write a function that sums squares of numbers in list that may contain more lists

// Sample:
// var l = [1,2,3];
// console.log(sumSquares(l)); // 1 + 4 + 9 = 14

// l = [[1,2],3];
// console.log(sumSquares(l)); // 1 + 4 + 9 = 14

// l = [[[[[[[[[1]]]]]]]]]
// console.log(sumSquares(l)); // 1 = 1

// l = [10, [[10], 10], [10]];
// console.log(sumSquares(l)); // 100 + 100 + 100 + 100 = 400

function sumSquares(list) {
  if (list.length === 0) return 0;

  let sqrTotal = 0;
  const first = list[0];

  if (Array.isArray(first)) {
    sqrTotal += sumSquares(first);
  } else if (typeof first === "number") {
    const double = first * first;
    sqrTotal += double;
  }

  return sqrTotal + sumSquares(list.slice(1));
}

// ###########################################################################
// ###########################################################################
// Question 9:
// The function should return an array containing repetitions of the number argument. For instance, replicate(3, 5) should return [5,5,5]. If the times argument is negative, return an empty array.

// Sample:
// console.log(replicate(3, 5)); // [5, 5, 5]
// console.log(replicate(1, 69)) // [69]
// console.log(replicate(-2, 6)) // []

function replicate(freq, value) {
  if (freq <= 0) return [];

  return [value].concat(replicate(freq - 1, value));
}
