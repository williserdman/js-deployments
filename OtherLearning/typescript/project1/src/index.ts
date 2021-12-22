
let id: number = 5;
let s: string = "this is a string";
let thing: boolean = true;
let x: any = "anything lol";

//arrays
let ids: number[] = [1, 2, 3, 4, 5, 6, 7, 4];
let ids2: any[] = ["you", 1, true, "seven"];

//tuple
let person: [number, string, boolean] = [1, 'me', true];
//tuple array
let employee: [number, string][];

employee = [
    [1, "brad"],
    [2, "john"],
    [3, "kill"]
]

//union 
let pid: string | number;
pid = 22;
pid = '22';

//enum
enum Direction1 {
    Up = 1,
    Down, 
    Left, 
    Right
    //up would be 0 to start, however it can be changed
}

enum Direction2 {
    Up = "Up",
    Down = "Down", 
    Left = "Left",
    Right = "Right"
}

//objects

const user: {
    id: number,
    name: string
} = {
    id: 1,
    name: "john"
}

type User = {
    id: number, 
    name: string
}

const user2: User = {
    id: 2,
    name: "jill"
}

//type assertion
let cid: any = 1;
//let customerID = <number>cid;
let customerID = cid as number;
//customerID will be of type number instead of any

//Functions

function addNum(x: number, y: number): number {
    return x + y
}

console.log(addNum(1, 2))

function print(message: string | number): void {
    console.log(message);
}

print("heeeeelllooo world");

//interfaces
interface UserInterface {
    readonly id: number, 
    name: string,
    age?: number //question mark makes it optional
}

const user3: UserInterface = {
    id: 2,
    name: "jill"
}
//type can be used with primatives and unions

interface MathFunc {
    (x: number, y: number): number;
}

const add: MathFunc = (x: number, y:number):number => x + y;
const subtract: MathFunc = (x: number, y:number):number => x - y;

interface PersonInterface {
    readonly id: number, 
    name: string,
    register(): string
}

//classes
class Person implements PersonInterface {
    id: number;
    name: string;
    //public by default
    //also has private and protected
    
    constructor(id: number, name: string) {
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
    position: string;
    constructor(id: number, name: string, position: string) {
        super(id, name);
        this.position = position;
    }

}

const emp = new Employee(7, "jack", "ceo");

print(emp.name);
print(emp.register());

//generics
function getArray<T>(items: T[]): T[] {
    return new Array().concat(items);
}

let numArray = getArray<number>([1, 2, 3, 4]);
let strArray = getArray<string>(["one", "two", "three", "four"])

//numArray.push("hello");
