#### 1) What is the difference between var, let, and const?

- **var:**  Function-scoped, can be redeclared, allows hoisting.
- **let:**  Block-scoped, cannot be redeclared in the same scope, allows value change.
- **const:**  Block-scoped, cannot be redeclared or reassigned, but objects/arrays can be mutated.

#### 2) Difference between `map()`, `forEach()`, and `filter()`?
- **map():**  Returns a new array with transformed elements.
- **forEach():**  Loops through items, does not return a new array.
- **filter():**  Returns a new array with elements that pass a condition.

#### 3) What are arrow functions in ES6?
Arrow functions are a shorter syntax for functions in javascript.  

Example:

const loadPlantByCategory = (id) =>{

  console.log(id);

}

#### 4) How does destructuring assignment work in ES6?

Destructuring assignment in ES6 is a feature that allows  to unpack values from arrays or properties from objects into distinct variables.

const [x, y] = [1, 2];

const {name, age} = {name: "Suborna", age: 22};

#### 5) Explain template literals in ES6. How are they different from string concatenation?

They allow embedding variables inside strings using backticks  (` `).Offer a more flexible and readable way to work with strings in JavaScript compared to traditional string concatenation.

Example:

const name = "Suborna";
const age = 22;

const templateLiteral = `Hello, my name is ${name} and I am ${age} years old.`;

console.log(templateLiteral);




