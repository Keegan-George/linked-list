import { LinkedList } from "./linked-list.js";
import { test, expect, beforeEach } from "@jest/globals";

let list;

beforeEach(() => {
  list = new LinkedList();
  list.append("B");
  list.append("C");
});

test("Can append a node to the end of the list", () => {
  list.append("D");
  expect(list.toString()).toBe("( B ) -> ( C ) -> ( D ) -> null");
});

test("Can prepend a node to the start of the list", () => {
  list.prepend("A");
  expect(list.toString()).toBe("( A ) -> ( B ) -> ( C ) -> null");
});

test("Can get the size of the list", () => {
  expect(list.size).toBe(2);
});

test("Size of the list increases when a node is appended", () => {
  list.append("D");
  expect(list.size).toBe(3);
});

test("Size of the list increases when a node is prepended", () => {
  list.prepend("A");
  expect(list.size).toBe(3);
});

test("Can get the value of the head node in the list,", () => {
  expect(list.head()).toBe("B");
});

test("Prepended node becomes the new head node,", () => {
  list.prepend("A");
  expect(list.head()).toBe("A");
});

test("Can get the value of the tail node in the list,", () => {
  expect(list.tail()).toBe("C");
});

test("Appended node becomes the new tail node", () => {
  list.append("D");
  expect(list.tail()).toBe("D");
});

//negatives tests
//if list is empty head() should return undefined
//if list is empty tail() should return undefined
//at should return undefined if there is no node at that index
