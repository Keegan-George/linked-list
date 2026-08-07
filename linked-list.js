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
    }

    if (!this._tail) {
      this._tail = node;
    } else {
      this._tail.nextNode = node;
      this._tail = node;
    }

    this._size++;
  }

  prepend(value) {
    const node = new Node(value);

    if (!this.tail) {
      this._tail = node;
    }
    if (!this.head) {
      this._head = node;
    } else {
      node.nextNode = this._head;
      this._head = node;
    }

    this._size++;
  }

  get size() {
    return this._size;
  }

  head() {
    return this._head.value;
  }

  tail() {
    return this._tail.value;
  }

  at(index) {
    if (index < 0 || index > this._size) {
      return undefined;
    }

    let current = this._head;
    for (let i = 0; i < index; i++) {
      current = current.nextNode;
    }
    return current.value;
  }

  pop() {
    // save the value and nextNode properties of the head node
    const value = this._head.value;
    const next_node = this._head.nextNode;

    // remove the current head node references
    this._head.value = null;
    this._head.nextNode = null;

    //set head to the next node in the list
    this._head = next_node;

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
}

class Node {
  constructor(value) {
    this.value = value;
    this.nextNode = null;
  }
}

export { LinkedList };
