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

console.log(bubbleSort([2, 1, 12, 7, 6, 0, 32, 100, 90, 45, 23]));
