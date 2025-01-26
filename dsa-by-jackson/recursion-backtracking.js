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
      const indexToRemove = (startIndex + k - 1) % arr.length;
      arr.splice(indexToRemove, 1);
      return helper(arr, indexToRemove);
    }

    return helper(array, 0);
  }

  if (approach === 2) {
    // will use the solution of sub-problem = [sp + k] % n
    // TC = O(N) SC = O(N)
    function helper(n) {
      if (n === 1) return 0;
      return (helper(n - 1) + k) % n;
    }

    return helper(n) + 1;
  }

  if (approach === 3) {
    // TC = O(N2) SC = O(1)
    let survivor = 0;
    for (let i = 2; i <= n; i++) {
      survivor = (survivor + k) % i;
    }

    return survivor + 1;
  }
}

//----------------------------------------DAY 3----------------------------------------//
