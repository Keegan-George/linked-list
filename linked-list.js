class LinkedList {
  constructor() {
    this._head = null;
    this._tail = null;
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
    const node = this.#getNode(index);
    return node?.value;
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

    while (current) {
      if (current.value === value) {
        return true;
      }
      current = current.nextNode;
    }
    return false;
  }

  findIndex(value) {
    let current = this._head;
    let i = 0;

    while (current) {
      if (current.value === value) {
        return i;
      }
      current = current.nextNode;
      i++;
    }

    return -1;
  }

  toString() {
    let current = this._head;
    let out = "";

    if (!this._size) {
      return out;
    }

    while (current) {
      out += `( ${current.value} ) -> `;
      current = current.nextNode;
    }

    return out + "null";
  }

  insertAt(index, ...values) {
    if (index < 0 || index > this._size) {
      throw new RangeError();
    }

    //get the node before the insertion index
    const before = this.#getNode(index - 1);

    const sequence = this.#createNodeSequence(values);

    if (this._size === 0) {
      this._head = sequence.firstNode;
      this._tail = sequence.lastNode;
      this._size = sequence.size;
      return;
    }

    if (index === 0) {
      sequence.lastNode.nextNode = this._head;
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

    //get the node before removal index
    const before = this.#getNode(index - 1);

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

  #getNode(index) {
    if (index < 0 || index >= this._size) {
      return null;
    }

    let current = this._head;
    for (let i = 0; i < index; i++) {
      current = current.nextNode;
    }
    return current;
  }

  #createNodeSequence(values) {
    let first;
    let last;

    for (const value of values) {
      let node = new Node(value);

      if (!first) {
        first = node;
      } else {
        last.nextNode = node;
      }
      last = node;
    }

    return {
      firstNode: first,
      lastNode: last,
      size: values.length,
    };
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
list.insertAt(0, "Z");

export { LinkedList };
