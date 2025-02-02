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

console.log(permutations([1, 2, 3]));
