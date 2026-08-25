class LinkedList {
  constructor() {
    this._head;
    this._tail;
    this._size = 0;
  }

  append(value) {
    const node = new Node(value);

    if (!this._head) {
      this._head = node;
      this._tail = node;
    } else {
      this._tail.nextNode = node;
      this._tail = node;
    }

    this._size++;
  }

  prepend(value) {
    const node = new Node(value);

    if (!this._head) {
      this._head = node;
      this._tail = node;
    } else {
      node.nextNode = this._head;
      this._head = node;
    }

    this._size++;
  }

  get size() {
    return this._size;
  }

  get head() {
    return this._head?.value;
  }

  get tail() {
    return this._tail?.value;
  }

  at(index) {
    if (!this._size || index < 0 || index >= this._size) {
      return undefined;
    }

    let current = this._head;
    for (let i = 0; i < index; i++) {
      current = current.nextNode;
    }
    return current.value;
  }

  pop() {
    if (!this._size) {
      return undefined;
    }

    const value = this._head.value;
    this._head = this._head.nextNode;

    if (!this._head) {
      this._tail = this._head;
    }

    this._size--;

    return value;
  }

  contains(value) {
    let current = this._head;

    for (let i = 0; i < this._size; i++) {
      if (current.value === value) {
        return true;
      }
      current = current.nextNode;
    }

    return false;
  }

  findIndex(value) {
    let current = this._head;

    for (let i = 0; i < this._size; i++) {
      if (current.value === value) {
        return i;
      }
      current = current.nextNode;
    }
    return -1;
  }

  toString() {
    if (!this._size) {
      return "";
    }

    const values = [];

    let current = this._head;

    for (let i = 0; i < this._size; i++) {
      values.push(current.value);
      current = current.nextNode;
    }

    return values
      .map((x) => `( ${x} )`)
      .join(" -> ")
      .concat(" -> null");
  }

  insertAt(index, ...values) {
    if (index < 0 || index > this._size) {
      throw new RangeError();
    }

    //node before the ones to be inserted
    let before = this._head;

    for (let i = 0; i < index - 1; i++) {
      before = before.nextNode;
    }

    const sequence = this.#createNodeSequence(values);

    if (this._size === 0) {
      this._head = sequence.firstNode;
      this._tail = sequence.lastNode;
      this._size = sequence.size;
      return;
    }

    if (index === 0) {
      sequence.lastNode.nextNode = before;
      this._head = sequence.firstNode;
    } else if (index === this._size) {
      before.nextNode = sequence.firstNode;
      this._tail = sequence.lastNode;
    } else {
      sequence.lastNode.nextNode = before.nextNode;
      before.nextNode = sequence.firstNode;
    }

    this._size += sequence.size;
  }

  removeAt(index) {
    if (index < 0 || index >= this._size) {
      throw new RangeError();
    }
    if (index === 0) {
      this.pop();
      return;
    }

    //get the node before the one to be removed
    let before = this._head;

    for (let i = 0; i < index - 1; i++) {
      before = before.nextNode;
    }

    //node to be removed
    let remove = before.nextNode;

    //node after the one to be removed
    let after = remove.nextNode;

    //update the previous node's nextNode property
    before.nextNode = after;

    if (index === this._size - 1) {
      this._tail = before;
    }

    this._size--;
  }

  #createNodeSequence(values) {
    //create nodes from values
    let first;
    let last;
    let current;
    let count = 0;

    for (let i = 0; i < values.length; i++) {
      let node = new Node(values[i]);

      if (i === 0) {
        current = node;
        first = current;
      } else {
        current.nextNode = node;
        current = node;
      }
      if (i === values.length - 1) {
        last = current;
      }

      count++;
    }

    return {
      firstNode: first,
      lastNode: last,
      size: count,
    };
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.nextNode = null;
  }
}

export { LinkedList };
