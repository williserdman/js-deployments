"use strict";
let id = 5;
let s = "this is a string";
let thing = true;
let x = "anything lol";
//arrays
let ids = [1, 2, 3, 4, 5, 6, 7, 4];
let ids2 = ["you", 1, true, "seven"];
//tuple
let person = [1, 'me', true];
//tuple array
let employee;
employee = [
    [1, "brad"],
    [2, "john"],
    [3, "kill"]
];
//union 
let pid;
pid = 22;
pid = '22';
//enum
var Direction1;
(function (Direction1) {
    Direction1[Direction1["Up"] = 1] = "Up";
    Direction1[Direction1["Down"] = 2] = "Down";
    Direction1[Direction1["Left"] = 3] = "Left";
    Direction1[Direction1["Right"] = 4] = "Right";
    //up would be 0 to start, however it can be changed
})(Direction1 || (Direction1 = {}));
var Direction2;
(function (Direction2) {
    Direction2["Up"] = "Up";
    Direction2["Down"] = "Down";
    Direction2["Left"] = "Left";
    Direction2["Right"] = "Right";
})(Direction2 || (Direction2 = {}));
//objects
const user = {
    id: 1,
    name: "john"
};
const user2 = {
    id: 2,
    name: "jill"
};
//type assertion
let cid = 1;
//let customerID = <number>cid;
let customerID = cid;
//customerID will be of type number instead of any
//Functions
function addNum(x, y) {
    return x + y;
}
console.log(addNum(1, 2));
function print(message) {
    console.log(message);
}
print("heeeeelllooo world");
const user3 = {
    id: 2,
    name: "jill"
};
const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
//classes
class Person {
    //public by default
    //also has private and protected
    constructor(id, name) {
        console.log(123);
        this.id = id;
        this.name = name;
    }
    register() {
        return `${this.name} is now registered`;
    }
}
const person1 = new Person(43, "mike");
print(person1.register());
//do something
//subclasses
class Employee extends Person {
    constructor(id, name, position) {
        super(id, name);
        this.position = position;
    }
}
const emp = new Employee(7, "jack", "ceo");
print(emp.name);
print(emp.register());
//generics
function getArray(items) {
    return new Array().concat(items);
}
let numArray = getArray([1, 2, 3, 4]);
let strArray = getArray(["one", "two", "three", "four"]);
//numArray.push("hello");
