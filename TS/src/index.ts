let id: number = 5
let company: string = 'Google'
let isPasswordCorrect: boolean = true
let x: any = 'Hello'
let age:number
age = 28

let ids: number[] = [1,2,3,4]
let arr: any[] = [1,true, 'Hello']

// Tuple
let person: [number, string, boolean] = [1, 'Tom', true]
// Tuple Array
let employee: [number, string][] 

employee = [
    [1, 'Brad'],
    [2, 'John'],
    [3, 'Jill']
]

// Union 
let pid : string | number 
pid = 123

// Enum 
// default console.log(Direction1.Up) = 0
enum Direction1 {
    Up = 1, // now console.log(Direction1.Up) = 1
    Down, // now console.log(Direction1.Down) = 2
    Left,
    Right,
}
enum Direction2 {
    Up = 'Up', // now console.log(Direction2.Up) = 'Up'
    Down  = 'Down', // now console.log(Direction2.Down) = 'Down'
    Left = 'Left',
    Right = 'Right',
}

// Object
const user:{
    id: number,
    name: string
} = {
    id: 1,
    name: 'John'
}

type User = {
    id:number,
    name:string,
}
const user2:User = {
    id:123,
    name:'Tom'
}

// Type Assertion => specific type of variable
let cid: any = 1
// let customerId = <number>cid
let customerId = cid as number

// Functions
function addNum(x: number, y: number): number {
    return x + y
}

// Void
function log(message: string | number): void { // void : mean function that not return a value
    console.log(message)
}

// Interfaces => setting type for a object or function
interface UserInterface  {
    readonly id: number, // cannot edit id property
    name: string,
    age?: number, // ? means okay for having age or not
}

const user3: UserInterface = {
    id: 1,
    name: 'John'
}

//interface Point = number | string => cannot do that 

interface MathFunc {
    (x: number, y: number): number
}

const add: MathFunc = (x: number, y:number):number => x+y
const sub: MathFunc = (x: number, y:number):number => x-y


interface PersonInterface  {
    id: number, // cannot edit id property
    name: string,
    register(): string
}

// Classes
class Person implements PersonInterface {
    // private id: number => private means just visible in class. protected means visible in class and extended class.
    id: number
    name: string

    constructor(id: number, name: string) {
        this.id = id
        this.name = name
    }

    // method
    register() {
        return `${this.name} is now registered`
    }
}

const brad = new Person(1, 'Brad')
const mike = new Person(2, 'Mike')

// Subclasses
class Employee extends Person {
    position: string

    constructor(id: number, name: string, position: string) {
         super(id, name)
         this.position = position
    }
}

const emp = new Employee(3, 'Shawn', 'Developer')

// Generics => create type variable
function getArray<T>(items:T[]):T[] {
    return new Array().concat(items)
}

let numArray = getArray<number>([1,2,3,4])
let stringArray = getArray<string>(['1','2','3','4'])

stringArray.push('hello')

