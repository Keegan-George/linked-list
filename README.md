# Linked List

A singly linked list implementation that supports insertion, removal, and search operations.

This is part of [The Odin Project's Full Stack JavaScript path](https://www.theodinproject.com/paths/full-stack-javascript) and focuses on data structure implementation.

## Installation

1. Clone the repository
2. Navigate to the project folder: `cd linked-list`
3. Install dependencies: `npm install`
4. Run the test suite: `npm test`

## Properties

- size — Return the number of nodes
- head — Return the value of the first node
- tail — Return the value of the last node

## Methods

- append(value) — Add a new node to the end of the list
- prepend(value) — Add a new node to the beginning
- at(index) — Return the value of the node at a specific index
- pop() — Remove and return the first node
- contains(value) — Return true if the value exists in the list
- findIndex(value) — Return the index of the value
- insertAt(index, ...values) — Insert one or more nodes at a specific position
- removeAt(index) — Remove a node at a specific position
- toString() — Return a string representation of the list

## Example

```javascript
const LinkedList = require("./LinkedList");

// Instantiate new Linked List
const list = new LinkedList();

// Add nodes to list
list.append("B");
list.append("C");
list.prepend("A");

console.log(list.toString());
// ( A ) -> ( B ) -> ( C ) -> null

console.log(list.findIndex("B"));
// 1

list.removeAt(1);
console.log(list.toString());
// ( A ) -> ( C ) -> null
```

## Features

- Comprehensive Jest unit tests
- Test-Driven Development (TDD)

## Technologies

- JavaScript
- Jest
