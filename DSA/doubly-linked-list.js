class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.length++;
    return this;
  }

  pop() {
    if (!this.head) return undefined;
    let temp = this.tail;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = temp.prev;
      this.tail.next = null;
      temp.prev = null;
    }

    this.length--;
    return temp;
  }

  shift() {
    if (!this.head) return undefined;

    const temp = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = temp.next;
      this.head.prev = null;
      temp.next = null;
    }

    this.length--;
    return temp;
  }

  unshift(val) {
    if (!this.head) return this.push(val);

    const newNode = new Node(val);

    this.head.prev = newNode;
    newNode.next = this.head;
    this.head = newNode;

    this.length++;
    return this;
  }

  get(index) {
    if (index === 0 || index >= this.length) return null;

    let count = 0;
    let curr = this.head;
    while (index !== count) {
      curr = curr.next;
      count++;
    }

    return curr;
  }
}

const list = new DoublyLinkedList();
