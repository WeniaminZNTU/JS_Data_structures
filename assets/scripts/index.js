"use strict";

class Stack {
  constructor(maxSize = 1000) {
    if (typeof maxSize !== "number") {
      throw new TypeError("size must be a number");
    }
    if (maxSize < 1) {
      throw new RangeError("must be a positive number");
    }

    this._maxSize = maxSize;
    this._size = 0;
  }

  get maxSize() {
    return this._maxSize;
  }

  get isEmpty() {
    return this.size === 0;
  }

  get size() {
    return this._size;
  }

  push(value) {
    if (this.size >= this.maxSize) {
      throw new RangeError("Stack overflow");
    }
    this[this._size++] = value;
    return this.size;
  }

  pop() {
    const lastElement = this[--this._size];

    delete this[this.size];

    return lastElement;
  }

  peek() {
    if (this.isEmpty) {
      return;
    }
    return this[this.size - 1];
  }
}

console.log("Task 1");
console.log("checkBraces('()([<{}>])'):", checkBraces("()([<{}>])"));
console.log("checkBraces('()([<{}>]>'):", checkBraces("()([<{}>]>"));
console.log(
  "checkBraces('()<{()}>([<{}>])'):",
  checkBraces("()<{()}>([<{}>])")
);
console.log("checkBraces('()<{()}>[<{}>])'):", checkBraces("()<{()}>[<{}>])"));
console.log(
  "checkBraces('()))))))))))))))'):",
  checkBraces("()))))))))))))))")
);

function checkBraces(string) {
  if (string.length % 2 !== 0) {
    return false;
  }

  let stack = new Stack(string.length);

  let roundClosingBrackts = ")";
  let squareClosingBrackets = "]";
  let curlyClosingBrackets = "}";
  let angleClosingBrackets = ">";

  for (let ch of string) {
    if (ch === "(" || ch === "[" || ch === "{" || ch === "<") {
      // console.log('ch in if():',ch);
      stack.push(ch);
      // console.log('stack.peek():',stack.peek());
      continue;
    } else if (
      (stack.peek() === "(" && ch === ")") ||
      (stack.peek() === "[" && ch === "]") ||
      (stack.peek() === "{" && ch === "}") ||
      (stack.peek() === "<" && ch === ">")
    ) {
      stack.pop();
      if (stack.size < 0) {
        return false;
      }
    } else {
      return false;
    }
  }
  return stack.isEmpty;
}

// Task 2
class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

// Task 2
class LinkedList {
  constructor(...args) {
    let numerals = [...new Set(args)];

    this.head = null;
    this.tail = null;
    this.length = 0;

    let lastIndex = 0;

    for (const item of numerals) {
      this.insertPost(new ListNode(lastIndex++, item));
    }

    return this.length;
  }

  inputValidation(index, value) {
    if (!Number.isInteger(value)) {
      alert("ERROR: Value must be a number");
      throw new TypeError("Value must be a number");
    }

    if (index < 0 || index > this.length) {
      throw new RangeError("Not in list");
    }

    if (index === 0 && this.length === 0) {
      const node = new ListNode(value);

      this.head = node;
      this.tail = node;
      this.length++;
      return;
    }

    if (index === 0 && this.length !== 0) {
      const node = new ListNode(value);

      node.next = this.head;

      this.head.prev = node;
      this.head = node;
      this.length++;
      return 1;
    }

    for (let i = 0; i < this.length; i++) {
      if (value === this.peek(i)) {
        alert("ERROR: The number must not be repeated");
        throw new RangeError("The number must not be repeated");
      }
    }
  }

  insertAnte(index, value) {
    this.inputValidation(index, value);

    const node = new ListNode(value);
    let currentNode = this.head;
    let count = 0;

    while (currentNode.next && count < index) {
      currentNode = currentNode.next;
      count++;
    }

    node.next = currentNode;
    node.prev = currentNode.prev;

    currentNode.prev = node;
    currentNode.prev.next = node;

    return ++this.length;
  }

  insertPost(index, value) {
    this.inputValidation(index, value);

    const node = new ListNode(value);
    let currentNode = this.head;
    let count = 0;

    while (currentNode.next && count < index) {
      currentNode = currentNode.next;
      count++;
    }

    node.next = currentNode.next;
    node.prev = currentNode;

    currentNode.next = node;
    currentNode.next.prev = node;

    return ++this.length;
  }

  peek(index = 0) {
    if (this.length === 0 || index < 0 || index > this.length) {
      throw new RangeError("Not in list");
    }

    let currentNode = this.head;
    let count = -1;

    while (count < index) {
      if (count + 1 === index) {
        return currentNode.value;
      }
      currentNode = currentNode.next;
      count++;
    }
  }

  logValues() {
    for (let i = 1; i < this.length; i++) {
      console.log(this.peek(i));
    }
  }
}

console.log("\nTask 2");
let num = prompt("Enter the number");

let list = addNumeralsFromInputNumber(num);

console.log(`Output numerals ${num} number`);
list.logValues();

function addNumeralsFromInputNumber(string) {
  let num = string.split("");
  num = num.map((x) => Number(x));

  let returnList = new LinkedList();

  for (let i = 0; i < num.length; i++) {
    for (let j = (i+1); j < num.length; j++) {
      if (num[i] === num[j]) {
        num.splice(j, 1);
      }
    }
  }

  for (let i = 0; i < num.length; i++) {
    returnList.insertPost(i, num[i]);
  }

  return returnList;
}
