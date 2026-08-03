class LinkedList {
  constructor() {
    this._head;
    this._tail;
  }

  append(value) {
    const node = new Node(value);

    if (!this.head) {
      this._head = node;
    }

    if (!this.tail) {
      this._tail = node;
    } else {
      this.tail.nextNode = node;
      this._tail = node;
    }
  }

  get head() {
    return this._head;
  }

  get tail() {
    return this._tail;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.nextNode = null;
  }
}

const linkedList = new LinkedList();
const head = linkedList.head;
const tail = linkedList.tail;

// const linkedList = new LinkedList();
// linkedList.append("A");
// linkedList.append("B");
// linkedList.append("C");
// linkedList.append("D");
// const head = linkedList.head;
// const tail = linkedList.tail;

const pass = "pass";
