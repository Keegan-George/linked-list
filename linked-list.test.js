import { LinkedList } from "./linked-list.js";
import { test, expect, beforeEach } from "@jest/globals";

let list;

beforeEach(() => {
  list = new LinkedList();
  list.append("B");
  list.append("C");
  list.append("D");
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

test("Get value at the start of a list", () => {
  expect(list.at(0)).toBe("B");
});

test("Get value in the middle of a list", () => {
  expect(list.at(1)).toBe("C");
});

test("Get value at the end of a list", () => {
  expect(list.at(2)).toBe("D");
});

test("Pop returns the value of the first node", () => {
  expect(list.pop()).toBe("B");
});

test("Pop removes the first node from the list ", () => {
  list.pop();
  expect(list.toString()).toBe("( C ) -> ( D ) -> null");
});

test("Can find value at the start of the list", () => {
  expect(list.contains("B")).toBe(true);
});

test("Can find value in the middle of the list", () => {
  expect(list.contains("C")).toBe(true);
});

test("Can find value at the end of the list", () => {
  expect(list.contains("D")).toBe(true);
});

test("return false for value not in the list", () => {
  expect(list.contains("A")).toBe(false);
});

test("Can get index of value at the start of the list", () => {
  expect(list.findIndex("B")).toBe(0);
});

test("Can get index of value in the middle of the list", () => {
  expect(list.findIndex("C")).toBe(1);
});

test("Can get index of value at the end of the list", () => {
  expect(list.findIndex("D")).toBe(2);
});

test("Return -1 if the value is not in the list", () => {
  expect(list.findIndex("Z")).toBe(-1);
});

//negatives tests
//if list is empty head() should return undefined
//if list is empty tail() should return undefined
//at should return undefined if there is no node at that index
//pop on an empty list should return undefined
//toString should return "" for empty list
