/**
 * A singly linked list implementation that supports insertion, removal, and search operations.
 */
class LinkedList {
  constructor() {
    this._head = null;
    this._tail = null;
    this._size = 0;
  }

  /**
   * Appends a value to the end of the list.
   * @param {*} value - The value to append.
   * @returns {void}
   */
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

  /**
   * Prepends a value to the beginning of the list.
   * @param {*} value - The value to prepend.
   * @returns {void}
   */
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

  /**
   * The number of nodes in the list.
   * @type {number}
   * @readonly
   */
  get size() {
    return this._size;
  }

  /**
   * The value stored in the head node.
   * @type {*|undefined}
   * @readonly
   */
  get head() {
    return this._head?.value;
  }

  /**
   * The value stored in the tail node.
   * @type {*|undefined}
   * @readonly
   */
  get tail() {
    return this._tail?.value;
  }

  /**
   * Retrieves the value at a given index.
   * @param {number} index - Zero-based index.
   * @returns {*|undefined} The value at the index, or undefined if out of range.
   */
  at(index) {
    const node = this.#getNode(index);
    return node?.value;
  }

  /**
   * Removes and returns the first element of the list.
   * @returns {*|undefined} The removed value, or undefined if the list is empty.
   */
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

  /**
   * Checks whether a value exists in the list.
   * @param {*} value - The value to search for.
   * @returns {boolean} True if found, otherwise false.
   */
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

  /**
   * Finds the index of the first occurrence of a value.
   * @param {*} value - The value to search for.
   * @returns {number} The index, or -1 if not found.
   */
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

  /**
   * Converts the list into a readable string representation.
   * Returns an empty string if the list is empty.
   * @returns {string} A formatted string of node values.
   */
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

  /**
   * Inserts one or more values starting at a given index.
   * @param {number} index - Zero-based index where insertion begins.
   * @param {...*} values - Values to insert.
   * @throws {RangeError} If index is out of bounds.
   * @returns {void}
   */
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

  /**
   * Removes the node at a given index.
   * @param {number} index - Zero-based index of the node to remove.
   * @throws {RangeError} If index is out of bounds.
   * @returns {void}
   */
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

  /**
   * Retrieves the node at a given index.
   * @private
   * @param {number} index - Zero-based index.
   * @returns {Node|null} The node, or null if out of range.
   */
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

  /**
   * Creates a linked sequence of Node objects from an array of values.
   * @private
   * @param {Array<*>} values - Values to convert into nodes.
   * @returns {{ firstNode: Node, lastNode: Node, size: number }}
   */
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

/**
 * A node in a singly linked list.
 */
class Node {
  constructor(value) {
    this.value = value;
    this.nextNode = null;
  }
}

export { LinkedList };
