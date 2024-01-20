// Bubble Sort
function swap(list, idx1, idx2) {
  return ([list[idx1], list[idx2]] = [list[idx2], list[idx1]]);
}

function bubbleSort(list) {
  let noSwaps = true;
  for (let i = list.length; i > 0; i--) {
    for (let j = 0; j < i - 1; j++) {
      if (list[j] > list[j + 1]) {
        swap(list, j, j + 1);
        noSwaps = false;
      }
    }
    if (noSwaps) break;
  }
  return list;
}

// console.log(bubbleSort([2, 1, 12, 7, 6, 0, 32, 100, 90, 45, 23]));

// Selection Sort
function selectionSort(list) {
  for (let i = 0; i < list.length; i++) {
    let lowest = i;
    for (let j = i + 1; j < list.length; j++) {
      if (list[j] < list[lowest]) {
        lowest = j;
      }
    }
    if (i !== lowest) {
      swap(list, lowest, i);
    }
  }

  return list;
}

// console.log(selectionSort([2, 1, 12, 7, 6, 0, 32, 100, 90, 45, 23]));

// Insertion sort
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let currVal = arr[i];
    for (var j = i - 1; j >= 0 && arr[j] > currVal; j--) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = currVal;
  }
  return arr;
}

// console.log(insertionSort([2, 1, 9, 76, 4]));

// Merge sort
function merge(arr1, arr2) {
  let results = [];
  let i = 0;
  let j = 0;
  while (i < arr1.length && j < arr2.length) { // Merging two sorted arrays
    if (arr2[j] > arr1[i]) {
      results.push(arr1[i]);
      i++;
    } else {
      results.push(arr2[j]);
      j++;
    }
  }
  while (i < arr1.length) {
    results.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    results.push(arr2[j]);
    j++;
  }
  return results;
}
// justCodingThings.com
function mergeSort(arr) {
  if (arr.length <= 1) return arr; // Base case if lenght of the arr is equal or less then 1 return arr
  let mid = Math.floor(arr.length / 2); // dividing array into two pieces from middle
  let left = mergeSort(arr.slice(0, mid)); // passing the left side to mergeSort again and same for the right (Recursion mechanism)
  let right = mergeSort(arr.slice(mid));
  return merge(left, right); // At the end meging left and right array
}
console.log(mergeSort([10, 24, 76, 73])); // [ 10, 24, 73, 76 ]
