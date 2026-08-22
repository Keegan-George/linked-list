import { LinkedList } from "./linked-list.js";
import { test, expect, describe, beforeEach, afterAll } from "@jest/globals";

let list;

describe("Positive scenarios", () => {
  beforeEach(() => {
    list = new LinkedList();
    list.append("B");
    list.append("C");
    list.append("D");
  });

  afterAll(() => {
    list = new LinkedList();
  });

  describe("append(), prepend(), and size scenarios", () => {
    test("Can display a string representation of the list", () => {
      expect(list.toString()).toBe("( B ) -> ( C ) -> ( D ) -> null");
    });

    test("Can append a node to the end of the list", () => {
      list.append("E");
      expect(list.toString()).toBe("( B ) -> ( C ) -> ( D ) -> ( E ) -> null");
    });

    test("Can prepend a node to the start of the list", () => {
      list.prepend("A");
      expect(list.toString()).toBe("( A ) -> ( B ) -> ( C ) -> ( D ) -> null");
    });

    test("Can get the size of the list", () => {
      expect(list.size).toBe(3);
    });

    test("Size of the list increases when a node is appended", () => {
      list.append("D");
      expect(list.size).toBe(4);
    });

    test("Size of the list increases when a node is prepended", () => {
      list.prepend("A");
      expect(list.size).toBe(4);
    });
  });

  describe("head() and tail() scenarios", () => {
    test("Can get the value of the head node in the list,", () => {
      expect(list.head()).toBe("B");
    });

    test("Prepended node becomes the new head node,", () => {
      list.prepend("A");
      expect(list.head()).toBe("A");
    });

    test("Can get the value of the tail node in the list,", () => {
      expect(list.tail()).toBe("D");
    });

    test("Appended node becomes the new tail node", () => {
      list.append("E");
      expect(list.tail()).toBe("E");
    });
  });

  describe("at() scenarios", () => {
    test("Get value at the first index", () => {
      expect(list.at(0)).toBe("B");
    });

    test("Get value at middle index", () => {
      expect(list.at(1)).toBe("C");
    });

    test("Get value last index", () => {
      expect(list.at(2)).toBe("D");
    });

    test("Undefined if index equals size of the list", () => {
      expect(list.at(3)).toBeUndefined();
    });

    test("Undefined if index is greater than the size of the list", () => {
      expect(list.at(4)).toBeUndefined();
    });

    test("Undefined if index is negative", () => {
      expect(list.at(-1)).toBeUndefined();
    });
  });

  describe("pop() scenarios", () => {
    test("Pop returns the value of the first node", () => {
      expect(list.pop()).toBe("B");
    });

    test("Pop removes the first node from the list ", () => {
      list.pop();
      expect(list.toString()).toBe("( C ) -> ( D ) -> null");
    });

    test("Pop decreases the size of the list", () => {
      list.pop();
      expect(list.size).toBe(2);
    });

    test("Pop repeatedly until the list is empty", () => {
      list.pop();
      list.pop();
      list.pop();
      expect(list.size).toBe(0);
      expect(list.pop()).toBeUndefined();
    });
  });

  describe("contains() scenarios", () => {
    test("True if value found at start of list", () => {
      expect(list.contains("B")).toBe(true);
    });

    test("True if value found in middle of list", () => {
      expect(list.contains("C")).toBe(true);
    });

    test("True if value found at end of list", () => {
      expect(list.contains("D")).toBe(true);
    });

    test("False for value not in list", () => {
      expect(list.contains("A")).toBe(false);
    });
  });

  describe("findIndex() scenarios", () => {
    test("Returns index of value at the start of list", () => {
      expect(list.findIndex("B")).toBe(0);
    });

    test("Returns index of value in middle of list", () => {
      expect(list.findIndex("C")).toBe(1);
    });

    test("Returns index of value at end of list", () => {
      expect(list.findIndex("D")).toBe(2);
    });

    test("Returns index of first match in list", () => {
      list.append("D");
      expect(list.findIndex("D")).toBe(2);
    });

    test("Index is -1 if value is not in the list", () => {
      expect(list.findIndex("Z")).toBe(-1);
    });
  });

  describe("removeAt() scenarios", () => {
    test("Remove the node at the start of the list", () => {
      list.removeAt(0);
      expect(list.toString()).toBe("( C ) -> ( D ) -> null");
    });

    test("Remove a node from the middle of the list", () => {
      list.removeAt(1);
      expect(list.toString()).toBe("( B ) -> ( D ) -> null");
    });

    test("Remove the node at the end of the list", () => {
      list.removeAt(2);
      expect(list.toString()).toBe("( B ) -> ( C ) -> null");
    });

    test("Removing a node by its index decreases the size of the list", () => {
      list.removeAt(2);
      expect(list.size).toBe(2);
    });

    test("Throws range error if removeAt index is negative", () => {
      expect(() => {
        list.removeAt(-1);
      }).toThrow(RangeError);
    });

    test("Throws range error if removeAt index is equal to list size", () => {
      expect(() => {
        list.removeAt(3);
      }).toThrow(RangeError);
    });

    test("Throws range error if removeAt index is greater than list size", () => {
      expect(() => {
        list.removeAt(4);
      }).toThrow(RangeError);
    });
  });

  describe("insertAt() scenarios", () => {
    test("Insert a node before the first node", () => {
      list.insertAt(0, "X");
      expect(list.toString()).toBe("( X ) -> ( B ) -> ( C ) -> ( D ) -> null");
    });

    test("Insert a node before the last node", () => {
      list.insertAt(2, "X");
      expect(list.toString()).toBe("( B ) -> ( C ) -> ( X ) -> ( D ) -> null");
    });

    test("Insert a node at the end", () => {
      list.insertAt(3, "X");
      expect(list.toString()).toBe("( B ) -> ( C ) -> ( D ) -> ( X ) -> null");
    });

    test("Insert several nodes before the first node", () => {
      list.insertAt(0, "X", "Y");
      expect(list.toString()).toBe(
        "( X ) -> ( Y ) -> ( B ) -> ( C ) -> ( D ) -> null",
      );
    });

    test("Insert severanl nodes before the last node", () => {
      list.insertAt(2, "X", "Y");
      expect(list.toString()).toBe(
        "( B ) -> ( C ) -> ( X ) -> ( Y ) -> ( D ) -> null",
      );
    });

    test("Insert severanl nodes at the end", () => {
      list.insertAt(3, "X", "Y");
      expect(list.toString()).toBe(
        "( B ) -> ( C ) -> ( D ) -> ( X ) -> ( Y ) -> null",
      );
    });

    test("Throws range error if insertAt index is negative", () => {
      expect(() => {
        list.insertAt(-1);
      }).toThrow(RangeError);
    });

    test("Throws range error if insertAt index is greater than list size", () => {
      expect(() => {
        list.insertAt(4);
      }).toThrow(RangeError);
    });
  });

  test("To string on a single element", () => {
    const list = new LinkedList();
    list.append("A");
    expect(list.toString()).toBe("( A ) -> null");
  });
});

describe("Empty list scenarios", () => {
  test("For empty list head returns undefined", () => {
    expect(list.head()).toBeUndefined();
  });

  test("For empty list tail returns undefined", () => {
    expect(list.tail()).toBeUndefined();
  });

  test("For empty list at returns undefined", () => {
    expect(list.at(0)).toBeUndefined();
  });

  test("For empty list pop returns undefined", () => {
    expect(list.pop()).toBeUndefined();
  });

  test("For empty list contains returns false", () => {
    expect(list.contains("A")).toBe(false);
  });

  test("For empty list findIndex returns -1", () => {
    expect(list.findIndex("A")).toBe(-1);
  });

  test("For empty list toString returns an empty string", () => {
    expect(list.toString()).toBe("");
  });

  test("For empty list removeAt throws RangeError", () => {
    expect(() => {
      list.removeAt(0);
    }).toThrow(RangeError);
  });

  test("For empty list insertAt throws RangeError", () => {
    expect(() => {
      list.insertAt(0, "A");
    }).toThrow(RangeError);
  });
});
