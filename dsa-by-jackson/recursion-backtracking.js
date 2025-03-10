//----------------------------------------DAY 2----------------------------------------//
//==========================================================================
// Question 1: k-th symbol in Grammar: We build a table of n rows (1-indexed).
// We start by writing 0 in the 1st row. Now in every subsequent row, we look at
// the previous row and replace each occurrence of 0 with 01, and each occurrence of 1 with 10.
// For example, for n = 3, the 1st row is 0, the 2nd row is 01, and the 3rd row is 0110.
// Given two integer n and k, return the kth (1-indexed) symbol in the nth row of a table of n rows.

function kthGrammar(n, k) {
  if (n === 1) return 0;
  const mid = Math.pow(2, n - 1) / 2;
  if (mid < k) {
    return 1 - kthGrammar(n - 1, k - mid);
  }
  return kthGrammar(n - 1, k);
}

//==========================================================================
// Question 2: Josephus problem:
// There are n friends that are playing a game. The friends are sitting in a circle and are numbered from 1 to n in clockwise order. More formally, moving clockwise from the ith friend brings you to the (i+1)th friend for 1 <= i < n, and moving clockwise from the nth friend brings you to the 1st friend.

// The rules of the game are as follows:
// 1.Start at the 1st friend.
// 2.Count the next k friends in the clockwise direction including the friend you started at. The counting wraps around the circle and may count some friends more than once.
// 3.The last friend you counted leaves the circle and loses the game.
// 4.If there is still more than one friend in the circle, go back to step 2 starting from the friend immediately clockwise of the friend who just lost and repeat.
// 5.Else, the last friend in the circle wins the game.
// Given the number of friends, n, and an integer k, return the winner of the game

function winner(n, k, approach = 3) {
  if (approach === 1) {
    // TC = O(N2) SC = O(N)
    const array = Array.from({ length: n }, (_, indx) => indx + 1);
    function helper(arr, startIndex) {
      if (arr.length === 1) return arr[0];

      const indexToRemove = (startIndex + k - 1) % arr.length; // We are using this formula because, we are not using the circular DS, so there should be way to come back to the starting index
      // if n = 5, k = 7, the first element to be removed [startIndex + k - 1] % 5 = 7 % 5 = 2, so 2nd element will be removed
      // subtracting 1 because index starts from 0
      arr.splice(indexToRemove, 1);
      return helper(arr, indexToRemove);
    }

    return helper(array, 0);
  }

  if (approach === 2) {
    // will use the solution of sub-problem = [sp + k] % n
    // TC = O(N) SC = O(N)
    // Think if you knew the winner for (n-1, k), you can find the winner for (n, k)
    function helper(n) {
      if (n === 1) return 0;
      return (helper(n - 1) + k) % n; // converting the subproblem solution to the main problem's solution
    }

    return helper(n) + 1;
  }

  if (approach === 3) {
    // TC = O(N2) SC = O(1)
    let survivor = 0;
    // we know that if n=1 the output will be 0 + 1 = 1
    for (let i = 2; i <= n; i++) {
      survivor = (survivor + k) % i;
    }

    return survivor + 1; // Adding one because index starts from 0
  }
}

//----------------------------------------DAY 3----------------------------------------//
//==========================================================================
// Question 1: Tower of Hanoi: We have three rods and N disks.
// The objective of the puzzle is to move the entire stack to another rod.
// Initially, these discs are in the rod 1.
// You need to print all the steps of discs movement so that all the discs reach the 3rd rod.
// Also, find & return the total moves.

// Note: The discs are arranged such that the top disc is numbered 1 and the bottom-most disc is numbered N.
// Also, all the discs have different sizes and a bigger disc cannot be put on the top of a smaller disc.
// You can only move 1 disk at a time.

function toh(n, fromm, to, aux) {
  let total = 0;

  function helper(n, fromm, to, aux) {
    if (n === 1) {
      total++;
      console.log("move disk " + n + " from rod " + fromm + " to rod " + to);
      return;
    }

    helper(n - 1, fromm, aux, to);
    total++;
    console.log("move disk " + n + " from rod " + fromm + " to rod " + to);
    helper(n - 1, aux, to, fromm);
  }

  helper(n, fromm, to, aux);
  return total;
}

// Question 2:
// Power Sum: Let’s define a peculiar type of array in which each element is either an integer or another peculiar array.
// Assume that a peculiar array is never empty. Write a function that will take a peculiar array as its input and find the
// sum of its elements. If an array is an element in the peculiar array you have to convert it to it’s equivalent value so
// that you can sum it with the other elements. Equivalent value of an array is the sum of its elements raised to the number
// which represents how far nested it is. For e.g. [2,3[4,1,2]] = 2+3+ (4+1+2)^2

// [1,2,[7,[3,4],2]] = 1 + 2 +( 7+(3+4)^3+2)^2

function powerSum(list, depth = 1) {
  let total = 0;

  for (let num of list) {
    if (Array.isArray(num)) {
      total += powerSum(num, depth + 1);
    } else {
      total += num;
    }
  }
  return Math.pow(total, depth);
}

//----------------------------------------DAY 4----------------------------------------//
//==========================================================================
// Backtracking
// Question 1: Permutations:
// Given an array nums of distinct integers, return all the possible permutations.
// You can return the answer in any order.

function permutations(list) {
  const result = [];
  function helper(i) {
    if (i === list.length - 1) {
      result.push([...list]);
      return;
    }

    for (let j = i; j < list.length; j++) {
      [list[i], list[j]] = [list[j], list[i]];
      helper(i + 1);
      [list[i], list[j]] = [list[j], list[i]];
    }
  }

  helper(0);
  return result;
}

// Question 2:
// Permutations 2: Given a collection of numbers, nums, that might contain duplicates,
// return all possible unique permutations in any order.

function uniquePermutations(list) {
  const result = [];
  function helper(i) {
    if (i === list.length - 1) {
      result.push([...list]);
      return;
    }

    const hash = {};
    for (let j = i; j < list.length; j++) {
      if (!hash[list[j]]) {
        hash[list[j]] = 1;
        [list[i], list[j]] = [list[j], list[i]];
        helper(i + 1);
        [list[i], list[j]] = [list[j], list[i]];
      }
    }
  }

  helper(0);
  return result;
}

//----------------------------------------DAY 5----------------------------------------//
//==========================================================================
// Question 1: Subsets: Given an integer array of unique elements,
// return all possible subsets (the power set).
// The solution set must not contain duplicate subsets. Return the solution in any order.
function powerSet(list) {
  const results = [];

  function helper(i, subset) {
    if (i === list.length) {
      results.push(subset.slice());
      return;
    }
    // Don't add
    helper(i + 1, subset);

    // Add
    subset.push(list[i]);
    helper(i + 1, subset);
    subset.pop(); // Backtracking step
  }

  helper(0, []);
  return results;
}

// console.log(powerSet([1, 2, 3])); [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]

// Question 2: Subsets 2: Given an integer array nums that may contain duplicates,
// return all possible subsets (the power set). The solution set must not contain duplicate subsets.
// Return the solution in any order.

function uniquePowerSet(list) {
  const results = [];
  list.sort((a, b) => a - b);

  function helper(i, subset) {
    if (i === list.length) {
      results.push([...subset]);
      return;
    }

    // Recursive case
    // inclued
    subset.push(list[i]);
    helper(i + 1, subset);
    subset.pop();

    while (list[i] === list[i + 1] && i < list.length - 1) {
      i++;
    }
    helper(i + 1, subset);
  }

  helper(0, []);
  return results;
}

// console.log(uniquePowerSet([1, 1, 2])); [ [ 1, 1, 2 ], [ 1, 1 ], [ 1, 2 ], [ 1 ], [ 2 ], [] ]

//----------------------------------------DAY 6----------------------------------------//
//==========================================================================
// Question 1: Combinations: Given two integers n and k, return all possible combinations of k numbers
//  chosen from the range [1, n].
// You may return the answer in any order.

function combinations(n, k) {
  const results = [];

  function helper(index, subset) {
    if (subset.length === k) {
      results.push([...subset]);
      return;
    }

    const need = k - subset.length; // Optimization
    for (let j = index; j <= n - need + 1; j++) {
      subset.push(j);
      helper(j + 1, subset);
      subset.pop();
    }
  }

  helper(1, []);
  return results;
}
// console.log(combinations(4, 2));

// Question 2: Combinations Sum 1: Given an array of distinct integers candidates and a target integer target,
// return a list of all unique combinations of candidates where the chosen numbers sum to target.
// You may return the combinations in any order.

// The same number may be chosen from candidates an unlimited number of times.
// Two combinations are unique if the frequency of at least one of the chosen numbers is different.
function combinationSum(list, target) {
  const results = [];

  function helper(startIndex, currSet, currSum) {
    if (target === currSum) {
      results.push([...currSet]);
      return;
    }

    if (currSum > target) {
      return;
    }

    for (let j = startIndex; j < list.length; j++) {
      currSet.push(list[j]);
      helper(j, currSet, list[j] + currSum);
      currSet.pop();
    }
  }

  helper(0, [], 0);

  return results;
}

// console.log(combinationSum([2, 3, 8, 9], 9));

//----------------------------------------DAY 7----------------------------------------//
//==========================================================================

// Question 1: Combinations Sum 2: Given a collection of candidate numbers (candidates) and a target number (target),
// find all unique combinations in candidates where the candidate numbers sum to target.
// Each number in candidates may only be used once in the combination.
// Note: The solution set must not contain duplicate combinations.

function combinationSum2(list, target) {
  const results = [];
  list.sort((a, b) => a - b);
  function helper(startIndex, currSet, currSum) {
    if (target === currSum || startIndex > candidates.length - 1) {
      results.push([...currSet]);
      return;
    }

    if (currSum > target) {
      return;
    }

    const hash = {};
    for (let j = startIndex; j < list.length; j++) {
      const element = list[j];
      if (!hash[element]) {
        hash[element] = 1;
        currSet.push(element);
        helper(j + 1, currSet, element + currSum);
        currSet.pop();
      }
    }
  }
  helper(0, [], 0);
  return results;
}
// check for target 4 as well
// console.log(combinationSum2([3, 5, 2, 1, 3], 4)); // [[1,3,3], [5,2]]

// Question 2: Combinations Sum 3: Find all valid combinations of k numbers that sum up to n such that the following conditions are true:
// •Only numbers 1 through 9 are used.
// •Each number is used at most once.
// Return a list of all possible valid combinations. The list must not contain the same combination twice, and the combinations may be returned in any order.

function combinationSum3(k, n) {
  const results = [];

  function helper(startIndex, currSet, currSum) {
    if (currSum === n && currSet.length === k) {
      results.push([...currSet]);
      return;
    }

    if (currSum > n) {
      return;
    }

    const hash = {};
    for (let j = startIndex; j <= 9; j++) {
      if (!hash[j]) {
        hash[j] = 1;
        currSet.push(j);
        helper(j + 1, currSet, j + currSum);
        currSet.pop();
      }
    }
  }

  helper(1, [], 0);

  return results;
}

// console.log(combinationSum3(3, 6));

//----------------------------------------DAY 8----------------------------------------//
//==========================================================================

// Question 1: Sudoku Solver: Write a program to solve a Sudoku puzzle by filling the empty cells.
// A sudoku solution must satisfy all of the following rules:
// 1.Each of the digits 1-9 must occur exactly once in each row.
// 2.Each of the digits 1-9 must occur exactly once in each column.
// 3.Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
// The '.' character indicates empty cells.
function solveSudoku(board) {
  function isValid(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
      // Check row and column: The number must not already exist in the same row and column.
      if (board[x][col] === num || board[row][x] === num) {
        return false;
      }

      // Calculate the start row and column index for the 3x3 sub-box.
      let r = 3 * Math.floor(row / 3) + Math.floor(x / 3);
      let c = 3 * Math.floor(col / 3) + (x % 3);

      // Check 3x3 sub-box: The number must not already exist in the same 3x3 sub-box.
      if (board[r][c] === num) {
        return false;
      }
    }

    // If the number 'num' is not found in the same row, column, and 3x3 sub-box, it is valid.
    return true;
  }

  function helper(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        // If the cell is empty ('.').
        if (board[row][col] === ".") {
          // Try placing each number from 1 to 9 in the empty cell.
          for (let num = 1; num <= 9; num++) {
            // Convert number to string for comparison, if needed, depending on how the board is set up
            let char = num.toString();
            // Check if the number is valid in the current position.
            if (isValid(board, row, col, char)) {
              // Place the number in the cell.
              board[row][col] = char;

              // Recursively attempt to solve the rest of the board with this number placed.
              if (helper(board)) {
                return true;
              }

              // If placing the number does not lead to a solution, reset the cell and try the next number.
              board[row][col] = ".";
            }
          }

          // If no number from 1 to 9 can be placed in this cell, backtrack.
          return false;
        }
      }
    }

    // If the entire board is filled without conflicts, the puzzle is solved.
    return true;
  }

  // Start the solving process.
  helper(board);
  // console.log(JSON.stringify(board, null, 2));
}

// Sudoku board
const board = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];
// console.log(solveSudoku(board));

// Question 2: N Queens: The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.
// Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.
// Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.

function solveNQueens(n) {
  let res = [];
  // Create the initial board setup with all cells empty ('.')
  let board = new Array(n).fill().map(() => new Array(n).fill("."));

  // Converts the board array of arrays into an array of strings
  function convertBoard(board) {
    return board.map((row) => row.join(""));
  }

  // Checks if it's valid to place a queen at board[row][col]
  function isValid(row, col, board) {
    // Check the same column for other queens
    for (let x = 0; x < row; x++) {
      if (board[x][col] === "Q") return false;
    }

    // Check the top-left diagonal
    for (let r = row, c = col; r >= 0 && c >= 0; r--, c--) {
      if (board[r][c] === "Q") return false;
    }

    // Check the top-right diagonal
    for (let r = row, c = col; r >= 0 && c < n; r--, c++) {
      if (board[r][c] === "Q") return false;
    }

    return true;
  }

  // Function to place queens on the board
  function positionNextQueen(board, row) {
    // Base case: if all queens are placed
    if (row === n) {
      res.push(convertBoard(board));
      return;
    }

    // Try placing a queen in each column of the current row
    for (let col = 0; col < n; col++) {
      if (isValid(row, col, board)) {
        board[row][col] = "Q"; // Place the queen
        positionNextQueen(board, row + 1); // Move to the next row
        board[row][col] = "."; // Backtrack: remove the queen
      }
    }
  }

  positionNextQueen(board, 0); // Start the recursion from the first row
  return res;
}

console.log(solveNQueens(4));
