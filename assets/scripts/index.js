"use strict";

//Task 2
class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class LinkedList {
  constructor(...args) {
    args = [...new Set(args)];

    this.head = null;
    this.tail = null;
    this.length = 0;

    for (const item of args) {
      if (!item || !Number.isInteger(item)) {
        continue;
      }

      if (this.length === 0) {
        const node = new ListNode(item);
        this.head = node;
        this.tail = node;
        this.length++;
      } else {
        const newLastNode = new ListNode(item);

        newLastNode.prev = this.tail;
        this.tail.next = newLastNode;
        this.tail = newLastNode;
        this.length++;
      }
    }
    return this.length;
  }

    insertAnte(index, value) {
      if(!Number.isInteger(value)){
        throw new TypeError('Value must be a number');
      }

      if(this.length === 0 || index < 0 || index > this.length){
        throw new RangeError('Not in list');
      }

      if(index === 0 && this.length === 0){
        const node = new ListNode(value);

        this.head = node;
        this.tail = node;
        this.length++;
        return;
      }

      if(index === 0 && this.length !== 0){
        const node = new ListNode(value);

        node.next = this.head;

        this.head.prev = node;
        this.head = node;
        this.length++;
        return 1;
      }

      const node = new ListNode(value);
      let currentNode = this.head;
      let count = 0;

      while(currentNode.next && count < index){
        currentNode = currentNode.next;
        count++;
      }

      node.next = currentNode;
      node.prev = currentNode.prev;

      currentNode.prev = node;
      currentNode.prev.next = node

      return ++this.length;
    }



    insertPost(index, value) {
      if(!Number.isInteger(value)){
        throw new TypeError('Value must be a number');
      }

      if(index < 0 || index > this.length){
        throw new RangeError('Not in list');
      }

      if(index === 0 && this.length === 0){
        const node = new ListNode(value);

        this.head = node;
        this.tail = node;
        this.length++;
        return;
      }

      if(index === 0 && this.length !== 0){
        const node = new ListNode(value);

        node.next = this.head.next;
        node.prev = this.head;

        this.head.next.prev = node;
        this.head.next = node;
        this.length++;
        return;
      }

      const node = new ListNode(value);
      let currentNode = this.head;
      let count = 0;

      while(currentNode.next && count < index){
        currentNode = currentNode.next;
        count++;
      }

      node.next = currentNode.next;
      node.prev = currentNode;

      currentNode.next = node;
      currentNode.next.prev = node;

      return ++this.length;
    }

    peek(index=0) {
      if(this.length === 0 || index < 0 || index > this.length){
        throw new RangeError('Not in list');
      }

      let currentNode = this.head;
      let count = (-1);
      
      while(count < index){
        if(count + 1 === index){
          return currentNode.value;
        }
        currentNode = currentNode.next;
        count++;
      }
    }
  
    logValues(){
      for(let i = 0; i < this.length; i++){
        console.log(this.peek(i));
      }
    }
}


let lim = prompt('How many numbers do you want to enter?');
const list = new LinkedList();

for(let i = 0; i < lim; i++){
  let number = +prompt(`Enter the ${i+1} number`);
  list.insertPost(i,number);
}

list.logValues();
