// SINGLY LINKED LIST
// A data structure that contains a head, tail and length property.
// Linked Lists consist of nodes, and each node has a value and a
// pointer to another node or null.

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    // This function should accept a value
    // Create a new node using the value passed to the function
    // If there is no head property on the list, set the head and tail to be the newly created node
    // Otherwise set the next property on the tail to be the new node node
    // and set the tail property on the list to be the newly created node
    // Increment the length by one
    const newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;

    return this;
  }

  pop() {
    // if there are no nodes in the list, return undefined.
    // Loop through the list until you reach the tail.
    // Set the next property of the 2nd to last node to be null
    // Set the tail to be the 2nd to last node
    // Decrement the length of the list by 1
    // Return the value of the node removed
    if (!this.head) return undefined;
    let current = this.head;
    let newTail = current;
    while (current.next) {
      newTail = current;
      current = current.next;
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }

  shift() {
    // if there are no nodes return undefined
    // Store the current head property in a variable.
    // Set the head property to be the current head's next property
    // Decrement the length by 1
    // Return the value of the removed node
    if (!this.head) return undefined;
    let temp = this.head;
    this.head = temp.next;
    temp.next = null;
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }
    return temp;
  }

  unshift(val) {
    // - This function should accept a value
    // - Create a new node using the value passed to the function
    // - If there is no head property on the list, set the head and tail
    // to be the newly created node
    // - Otherwise set the newly created node's next property to be the current
    // head property on the list
    // - Set the head property on the list to be that newly created node
    // - Increment the length of the list by 1
    //- Return the linked list
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
    return this;
  }

  get(index) {
    // This function should accept an index
    // If the index is less than zero or greater than or equal to the lenght of the list, return null
    // Loop through the list until you reach the index and return the node at that specific index.

    if (index < 0 || index >= this.length) return null;

    let count = 0;
    let curr = this.head;
    while (index !== count) {
      curr = curr.next;
      count++;
    }

    return curr;
  }

  set(index, val) {
    // This function should accept a value and index.
    // Use your get function to find the specific node
    // If the node is not found, return false
    // If the node is found, set the value of that node to be the value passed to the function and return true

    const foundNode = this.get(index);
    if (!foundNode) return false;
    foundNode.val = val;
    return true;
  }

  insert(index, val) {
    // If the index is less than zero or greater than the length, return false
    // If the index is the same as the length, push a new node to the end of the list
    // If the index is 0, unshift a new node to the start of the list
    // Otherwise, using the get method, access the node at the index - 1
    // Set the next property on that node to be the new node.
    // Set the next property on the new node to be the previous next
    // Increment the length
    // Return true
    if (index < 0 || index > this.length) return false;
    if (index === this.length) return this.push(val);
    if (index === 0) return this.unshift(val);

    const newNode = new Node(val);
    const prevNode = this.get(index - 1);

    const temp = prevNode.next;
    prevNode.next = newNode;
    newNode.next = temp;

    this.length++;

    return true;
  }
}

const list = new SinglyLinkedList();

list.push("mohammad");
list.push("shahzaib");
list.push("coder");
list.push("sass");
list.push("indie hacker");
// console.log(list.pop());
// console.log(list.shift());
// list.unshift("The")
list.insert(1, "khan");
console.log(list);
