import { LinkedList } from "./linked-list.js";
import { test, expect, describe, beforeEach } from "@jest/globals";

let list;

describe("Positive scenarios", () => {
  beforeEach(() => {
    list = new LinkedList();
    list.append("B");
    list.append("C");
    list.append("D");
  });

  describe("append() and prepend()", () => {
    test("Display a string representation of a list", () => {
      expect(list.toString()).toBe("( B ) -> ( C ) -> ( D ) -> null");
    });

    test("Append a node to the end of a list", () => {
      expect(list.size).toBe(3);
      expect(list.head).toBe("B");
      expect(list.tail).toBe("D");
      list.append("E");
      expect(list.toString()).toBe("( B ) -> ( C ) -> ( D ) -> ( E ) -> null");
      expect(list.head).toBe("B");
      expect(list.tail).toBe("E");
      expect(list.size).toBe(4);
    });

    test("Prepend a node to the start of a list", () => {
      expect(list.size).toBe(3);
      expect(list.head).toBe("B");
      expect(list.tail).toBe("D");
      list.prepend("A");
      expect(list.toString()).toBe("( A ) -> ( B ) -> ( C ) -> ( D ) -> null");
      expect(list.head).toBe("A");
      expect(list.tail).toBe("D");
      expect(list.size).toBe(4);
    });

    test("Append non-string values", () => {
      const list = new LinkedList();
      list.append(123);
      list.append(true);
      list.append([1, 2, 3]);
      list.append(false);
      expect(list.toString()).toBe(
        "( 123 ) -> ( true ) -> ( 1,2,3 ) -> ( false ) -> null",
      );
      expect(list.head).toBe(123);
      expect(list.tail).toBe(false);
      expect(list.size).toBe(4);
    });
  });

  describe("at() scenarios", () => {
    test("Get value at first index", () => {
      expect(list.at(0)).toBe("B");
    });

    test("Get value at middle index", () => {
      expect(list.at(1)).toBe("C");
    });

    test("Get value at last index", () => {
      expect(list.at(2)).toBe("D");
    });

    test("Undefined if index is negative", () => {
      expect(list.at(-1)).toBeUndefined();
    });

    test("Undefined if index equals size of list", () => {
      expect(list.at(3)).toBeUndefined();
    });

    test("Undefined if index is greater than size of list", () => {
      expect(list.at(4)).toBeUndefined();
    });
  });

  describe("pop() scenarios", () => {
    test("Pop returns value of head node", () => {
      expect(list.head).toBe("B");
      expect(list.tail).toBe("D");
      expect(list.size).toBe(3);
      expect(list.pop()).toBe("B");
      expect(list.head).toBe("C");
      expect(list.tail).toBe("D");
      expect(list.toString()).toBe("( C ) -> ( D ) -> null");
      expect(list.size).toBe(2);
    });

    test("Pop repeatedly until list is empty", () => {
      expect(list.size).toBe(3);
      list.pop();
      list.pop();
      list.pop();
      expect(list.size).toBe(0);
      expect(list.pop()).toBeUndefined();
      expect(list.head).toBeUndefined();
      expect(list.tail).toBeUndefined();
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

    test("True if value is duplicated", () => {
      list.append("D");
      expect(list.contains("D")).toBe(true);
    });
  });

  describe("findIndex() scenarios", () => {
    test("Return index of value at start of list", () => {
      expect(list.findIndex("B")).toBe(0);
    });

    test("Return index of value in middle of list", () => {
      expect(list.findIndex("C")).toBe(1);
    });

    test("Return index of value at end of list", () => {
      expect(list.findIndex("D")).toBe(2);
    });

    test("Return index of first match in list", () => {
      list.append("D");
      expect(list.findIndex("D")).toBe(2);
    });

    test("Index -1 if value not in list", () => {
      expect(list.findIndex("Z")).toBe(-1);
    });
  });

  describe("removeAt() scenarios", () => {
    test("Remove node at start of list", () => {
      expect(list.head).toBe("B");
      expect(list.tail).toBe("D");
      expect(list.size).toBe(3);
      list.removeAt(0);
      expect(list.toString()).toBe("( C ) -> ( D ) -> null");
      expect(list.head).toBe("C");
      expect(list.tail).toBe("D");
      expect(list.size).toBe(2);
    });

    test("Remove node from middle of list", () => {
      expect(list.head).toBe("B");
      expect(list.tail).toBe("D");
      expect(list.size).toBe(3);
      list.removeAt(1);
      expect(list.toString()).toBe("( B ) -> ( D ) -> null");
      expect(list.head).toBe("B");
      expect(list.tail).toBe("D");
      expect(list.size).toBe(2);
    });

    test("Remove node at end of list", () => {
      expect(list.head).toBe("B");
      expect(list.tail).toBe("D");
      expect(list.size).toBe(3);
      list.removeAt(2);
      expect(list.toString()).toBe("( B ) -> ( C ) -> null");
      expect(list.head).toBe("B");
      expect(list.tail).toBe("C");
      expect(list.size).toBe(2);
    });

    test("Throws range error if removeAt index negative", () => {
      expect(() => {
        list.removeAt(-1);
      }).toThrow(RangeError);
    });

    test("Throws range error if removeAt index equals list size", () => {
      expect(() => {
        list.removeAt(3);
      }).toThrow(RangeError);
    });

    test("Throws range error if removeAt index greater than list size", () => {
      expect(() => {
        list.removeAt(4);
      }).toThrow(RangeError);
    });
  });

  describe("insertAt() scenarios", () => {
    test("Insert node before head node", () => {
      expect(list.head).toBe("B");
      expect(list.tail).toBe("D");
      expect(list.size).toBe(3);
      list.insertAt(0, "X");
      expect(list.toString()).toBe("( X ) -> ( B ) -> ( C ) -> ( D ) -> null");
      expect(list.head).toBe("X");
      expect(list.tail).toBe("D");
      expect(list.size).toBe(4);
    });

    test("Insert node before tail node", () => {
      expect(list.head).toBe("B");
      expect(list.tail).toBe("D");
      expect(list.size).toBe(3);
      list.insertAt(2, "X");
      expect(list.toString()).toBe("( B ) -> ( C ) -> ( X ) -> ( D ) -> null");
      expect(list.head).toBe("B");
      expect(list.tail).toBe("D");
      expect(list.size).toBe(4);
    });

    test("Insert node after tail node", () => {
      expect(list.head).toBe("B");
      expect(list.tail).toBe("D");
      expect(list.size).toBe(3);
      list.insertAt(3, "X");
      expect(list.toString()).toBe("( B ) -> ( C ) -> ( D ) -> ( X ) -> null");
      expect(list.head).toBe("B");
      expect(list.tail).toBe("D");
      expect(list.size).toBe(4);
    });

    test("Insert several nodes before head node", () => {
      expect(list.head).toBe("B");
      expect(list.tail).toBe("D");
      expect(list.size).toBe(3);
      list.insertAt(0, "X", "Y");
      expect(list.toString()).toBe(
        "( X ) -> ( Y ) -> ( B ) -> ( C ) -> ( D ) -> null",
      );
      expect(list.head).toBe("X");
      expect(list.tail).toBe("D");
      expect(list.size).toBe(5);
    });

    test("Insert several nodes before tail node", () => {
      expect(list.head).toBe("B");
      expect(list.tail).toBe("D");
      expect(list.size).toBe(3);
      list.insertAt(2, "X", "Y");
      expect(list.toString()).toBe(
        "( B ) -> ( C ) -> ( X ) -> ( Y ) -> ( D ) -> null",
      );
      expect(list.head).toBe("B");
      expect(list.tail).toBe("D");
      expect(list.size).toBe(5);
    });

    test("Insert several nodes after tail node", () => {
      expect(list.head).toBe("B");
      expect(list.tail).toBe("D");
      expect(list.size).toBe(3);
      list.insertAt(3, "X", "Y");
      expect(list.toString()).toBe(
        "( B ) -> ( C ) -> ( D ) -> ( X ) -> ( Y ) -> null",
      );
      expect(list.head).toBe("B");
      expect(list.tail).toBe("Y");
      expect(list.size).toBe(5);
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

  test("Call toString on a single element", () => {
    const list = new LinkedList();
    list.append("A");
    expect(list.toString()).toBe("( A ) -> null");
  });
});

describe("Empty list scenarios", () => {
  beforeEach(() => {
    list = new LinkedList();
  });

  test("head returns undefined for empty list", () => {
    expect(list.head).toBeUndefined();
  });

  test("tail returns undefined for empty list", () => {
    expect(list.tail).toBeUndefined();
  });

  test("at() returns undefined for empty list", () => {
    expect(list.at(0)).toBeUndefined();
  });

  test("pop() returns undefined for empty list", () => {
    expect(list.pop()).toBeUndefined();
  });

  test("size is 0 after repeated pops", () => {
    list.pop();
    list.pop();
    list.pop();
    expect(list.size).toBe(0);
  });

  test("contains() returns false for empty list", () => {
    expect(list.contains("A")).toBe(false);
  });

  test("findIndex() returns -1 for empty list", () => {
    expect(list.findIndex("A")).toBe(-1);
  });

  test("toString() returns an empty string for empty list", () => {
    expect(list.toString()).toBe("");
  });

  test("removeAt() throws RangeError for empty list", () => {
    expect(() => {
      list.removeAt(0);
    }).toThrow(RangeError);
  });

  test("Can insertAt single node into empty list", () => {
    expect(list.size).toBe(0);
    list.insertAt(0, "A");
    expect(list.toString()).toBe("( A ) -> null");
    expect(list.size).toBe(1);
  });

  test("Can insert multiple nodes into empty list", () => {
    expect(list.size).toBe(0);
    list.insertAt(0, "A", "B", "C");
    expect(list.toString()).toBe("( A ) -> ( B ) -> ( C ) -> null");
    expect(list.size).toBe(3);
  });
});

describe("Performance tests", () => {
  beforeEach(() => {
    list = new LinkedList();
  });

  test("Create a large list", () => {
    for (let i = 0; i < 1000; i++) {
      list.append(i);
    }
    expect(list.size).toBe(1000);
  });
});
