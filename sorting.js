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

console.log(insertionSort([2, 1, 9, 76, 4]));
