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
    if (!this._size) {
      return undefined;
    }
    return this._head.value;
  }

  tail() {
    if (!this._size) {
      return undefined;
    }
    return this._tail.value;
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

  removeAt(index) {
    if (index === 0) {
      this.pop();
      return;
    }

    //get the node prior the one to be removed
    let previous = this._head;

    for (let i = 0; i < index - 1; i++) {
      previous = previous.nextNode;
    }

    //node to be removed
    let remove = previous.nextNode;

    //node that follows the one to be removed
    let next = remove.nextNode;

    //update the previous node's nextNode property
    previous.nextNode = next;

    //set properties of the removal node to null
    remove.value = null;
    remove.nextNode = null;

    this._size--;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.nextNode = null;
  }
}

const list = new LinkedList();
list.append("A");
list.append("B");
list.append("C");

list.removeAt(2);

list.toString();

export { LinkedList };
