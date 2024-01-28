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
    const newNode = new Node(val);

    // If there is no head property on the list, set the head and tail to be the newly created node
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      // Otherwise set the next property on the tail to be the new node node
      // and set the tail property on the list to be the newly created node
      this.tail.next = newNode;
      this.tail = newNode;
    }
    // Increment the length by one
    this.length++;

    return this;
  }
}

const list = new SinglyLinkedList();

list.push("mohammad");
list.push("shahzaib");
list.push("coder");
console.log(list);
