// Binary Search
const arr = [1, 3, 4, 6, 8, 9, 11, 12, 15, 16, 17, 18, 19];

function binarySearch(list, target) {
  let left = 0;
  let right = list.length - 1;
  let middle = Math.floor((left + right) / 2);

  while (list[middle] !== target && left <= right) {
    if (list[middle] < target) left = middle + 1;
    else right = middle - 1;
    middle = Math.floor((left + right) / 2);
  }

  return list[middle] === target ? middle : -1;
}

// console.log(binarySearch(arr, 15));

function naiveSearch(long, short) {
  let count = 0;
  for (let i = 0; i < long.length; i++) {
    for (let j = 0; j < short.length; j++) {
      if (short[j] !== long[i + j]) break;
      console.log(short[j], long[i + j]);
      if (j === short.length - 1) count++;
    }
  }
  return count;
}

// console.log(naiveSearch("lorie loled", "lol"));
