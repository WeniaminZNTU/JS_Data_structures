'use strict';

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

// let stack = new Stack(string.length);
console.log('checkBraces(\'()([<{}>])\'):',checkBraces('()([<{}>])'));
console.log('checkBraces(\'()([<{}>]>\'):',checkBraces('()([<{}>]>'));
console.log('checkBraces(\'()<{()}>([<{}>])\'):',checkBraces('()<{()}>([<{}>])'));
console.log('checkBraces(\'()<{()}>[<{}>])\'):',checkBraces('()<{()}>[<{}>])'));




function checkBraces(string){
  if(string.length % 2 !== 0){
    return false;
  }

  let stack = new Stack(string.length);


  for (let ch of string) {

    if(ch === '(' || ch === '[' || ch === '{' || ch === '<'){
      // console.log('ch in if():',ch);
      stack.push(ch);
      // console.log('stack.peek():',stack.peek());
      continue;
    }

    switch(true){
      case stack.peek() === '(' && ch === ')':{
        stack.pop();
      break;
      }
      case stack.peek() === '[' && ch === ']':{
        stack.pop();
      break;
      }
      case stack.peek() === '{' && ch === '}':{
        stack.pop();
      break;
      }
      case stack.peek() === '<' && ch === '>':{
        stack.pop();
      break;
      }
      // default:{
      //   return false;
      // }
    }


  }

  return stack.isEmpty;
}

// console.log(checkBraces('(((())))'))



/* function checkBraces(string) {
  const stack = new Stack(string.length);

  if (string % 2 !== 0) {
    return false;
  }
  for (const brace of string) {
    if (brace === "(") {
      stack.push(brace);
      continue;
    }

    if (brace === ")") {
      if (stack.isEmpty) {
        return false;
      }
      stack.pop();
    }
  }
  return stack.isEmpty;
}
 */

