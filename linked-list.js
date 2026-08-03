class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(value) {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
    }

    if (!this.tail) {
      this.tail = node;
    } else {
      this.tail.nextNode = node;
      this.tail = node;
    }
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.nextNode = null;
  }
}

const linkedList = new LinkedList();
linkedList.append("A");
linkedList.append("B");
linkedList.append("C");
linkedList.append("D");

const pass = "pass";
