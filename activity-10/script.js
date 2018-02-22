// console.log("script is linked correctly");
/*
if (true) {
 let a = 40;
 console.log(a); //40
}
console.log(a); // undefined
*/

/*let a = 50;
let b = 100;
if (true) {
 let a = 60;
 var c = 10;
 console.log(a/c); // 6
 console.log(b/c); // 10
}
console.log(c); // 10
console.log(a); // 50*/

/*const a = 50;
a = 60; // shows error. You cannot change the value of const.
const b = "Constant variable";
b = "Assigning new value"; // shows error.*/

/*const LANGUAGES = ['Js', 'Ruby', 'Python', 'Go'];
//LANGUAGES = "Javascript"; // shows error. 
LANGUAGES.push('Java'); // Works fine.
console.log(LANGUAGES); // ['Js', 'Ruby', 'Python', 'Go', 'Java']*/

/*// Old Syntax
function oldOne() {
 console.log("Hello World..!");
}
// New Syntax
var newOne = () => {
 console.log("Hello World..!");
}

oldOne();
newOne();*/

/*let NewOneWithParameters = (a, b) => {
 console.log(a+b); // 30
}
NewOneWithParameters(10, 20);*/

/*let Func = (a, b = 10) => {
 return a + b; 
}
console.log(Func(20)); // 20 + 10 = 30
console.log("passed Func");
console.log(Func(20, 50));*/

/*let NotWorkingFunction = (a = 10, b) => {
 return a + b;
}
console.log(NotWorkingFunction(20)); // NAN. Not gonna work.
console.log(NotWorkingFunction(20, 30)); // 50*/

/*let arr = [2,3,4,1];
for (let value of arr) {
 console.log(value);
}*/

/*let string = "Javascript";
for (let char of string) {
 console.log(char);
}*/

/*
let SumElements = (arr) => {
 console.log(arr); // [10, 20, 40, 60, 90]
 let sum = 0;
 for (let element of arr) {
  sum += element;
 }
 console.log(sum); // 220. 
}
SumElements([10, 20, 40, 60, 90]); */

/*let SumElements = (...arr) => {
 console.log(arr); // [10, 20, 40, 60, 90]
let sum = 0;
 for (let element of arr) {
  sum += element;
 }
 console.log(sum); // 220. 
}
SumElements(10, 20, 40, 60, 90);*/

/*console.log(Math.max(10, 20, 60, 100, 50, 200)); // returns 200.

let arr = [10, 20, 60];
console.log(Math.max(arr));*/

/*let arr = [10, 20, 60];
console.log(Math.max(...arr)); // 60*/

/*var NewMap = new Map();
NewMap.set('name', 'John'); 
NewMap.set('id', 2345796);
NewMap.set('interest', ['js', 'ruby', 'python']);
console.log(NewMap.get('name')); // John
console.log(NewMap.get('id')); // 2345796
console.log(NewMap.get('interest')); // ['js', 'ruby', 'python']*/

/*var map = new Map();
map.set('name', 'John');
map.set('name', 'Andy');
map.set(1, 'number one');
map.set(NaN, 'No value');
console.log(map.get('name')); // Andy. Note John is replaced by Andy.
console.log(map.get(1)); // number one
console.log(map.get(NaN)); // No value*/

/*var map = new Map();
map.set('name', 'John');
map.set('id', 10);
map.size; // 2. Returns the size of the map.
map.keys(); // outputs only the keys. 
map.values(); // outputs only the values.
for (let key of map.keys()) {
 console.log(key);
}

//var map = new Map();
for (let element of map) {
 console.log(element);
}

for (let [key, value] of map) {
 console.log(key+" - "+value);
}
*/

/*var sets = new Set();
sets.add('a');
sets.add('b');
sets.add('a'); // We are adding duplicate value.
for (let element of sets) {
 console.log(element);
}*/

/*var sets = new Set([1,5,6,8,9]);
console.log(sets.size); // returns 5. Size of the size.
console.log(sets.has(1)); // returns true. 
console.log(sets.has(10)); // returns false.*/

/*class Example {
 static Callme() {
 console.log("Static method");
 }
}
Example.Callme();*/

/*class People {
constructor(name) {
      this.name = name;
    }
    getName() {
      return this.name;
    }
    setName(name) {
      this.name = name;
    }
}
let person = new People("Jon Snow");
console.log(person.getName());
person.setName("Dany");
console.log(person.getName());*/

/*class People {
constructor(name) {
      this.name = name;
    }
    get Name() {
      return this.name;
    }
    set Name(name) {
      this.name = name;
    }
}
let person = new People("Jon Snow");
console.log(person.Name);
person.Name = "Dany";
console.log(person.Name);*/