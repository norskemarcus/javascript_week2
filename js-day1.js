//Function Declaration
//Observe: no return type, no type on parameters
function add(n1, n2) {
  return n1 + n2;
}

//Function Expression
const sub = function (n1, n2) {
  return n1 - n2;
};

//Callback example
const cb = function (n1, n2, callback) {
  return (
    "Result from the two numbers: " + n1 + "and" + n2 + "=" + callback(n1, n2)
  );
};

//console.log(add(1, 2)); // 1: prints 1+2 = 3

// console.log(add); // 2: prints [Function: add] --> no parameters

//console.log(add(1, 2, 3)); // 3: prints 3, because the method only return 2 parametres

//console.log(add(1)); // 4: prints NaN = Not-A-Number = a property of the global object

//console.log(cb(3, 3, add)); // 5. Result from the two numbers: 3+3=6

//console.log(cb(4, 3, sub)); // 6: Result from the two numbers: 4+3=1, because in the callback it calls the sub function with subtract

//console.log(cb(3, 3, add())); // 7:  "Result from the two numbers: " + n1 + "+" + n2 + "=" + callback(n1, n2)
// OBS fordi man har brugt add() --> TypeError: callback is not a function

//console.log(cb(3, "hh", add)); // 8:  Result from the two numbers: 3+hh=3hh => concatination

// Ex. 4: multiplication
function mul(n1, n2) {
  return n1 * n2;
}

//console.log(cb(2, 4, mul)); // Result from the two numbers: 2+4=8 (burde stå * i stedet for +)

//Ex. 5  An anonymous function is a function without a name
const result = cb(10, 2, function (x, y) {
  return x / y;
});

//console.log(result); // Result from the two numbers: 10+5=2

// Ex. 5 skrevet alt i ett
/* console.log(
  cb(10, 2, function (x, y) {
    return x / y;
  })
);
 */
// Callbacks with filter, map and forEach

// 1. Use the filter method to create a new array with only names of length <=3.

const names = [
  "William",
  "Andrew",
  "Michael",
  "Bo",
  "Joseph",
  "Matthew",
  "David",
  "Robert",
  "Max",
  "Christopher",
];

// My version
const shortNamesOfThreeOrLess = names.filter((name) => name.length <= 3);

//console.log("Short names: " + shortNamesOfThreeOrLess); // Prints Bo and Max
//console.log("All names: " + names);
// Problem with this version: all names in one line without spaces, just ,

// Use filter to create a new array with only names of length <= 3
const filteredNames = names.filter((name) => name.length <= 3);

//console.log("Original Array:");
// OBS: Vigtig --> sådan looper man igennem og printer ud et array:
//names.forEach((name) => console.log(name));

//console.log("\nFiltered Array (names of length <= 3):");
//filteredNames.forEach((name) => console.log(name));

//console.log("\n");

// Ex. 2 : use map to create a new array with all names uppercased.
//console.log("Used map to get all names uppercased:");
const uppercased = names.map((name) => name.toUpperCase());
//uppercased.forEach((name) => console.log(name));

// Ex. 3
const listItemsAsStr = names.map((name) => "<li>" + name + "</li>").join("");
// Se index filen hvordan man bruger id inde i en <ul>
//document.getElementById("my-ul").innerHTML = listItemsAsStr;

// Ex. 4
const cars = [
  { id: 1, year: 1997, make: "Ford", model: "E350", price: 3000 },
  { id: 2, year: 1999, make: "Chevy", model: "Venture", price: 4900 },
  { id: 3, year: 2000, make: "Chevy", model: "Venture", price: 5000 },
  { id: 4, year: 1996, make: "Jeep", model: "Grand Cherokee", price: 4799 },
  { id: 5, year: 2005, make: "Volvo", model: "V70", price: 44799 },
];

let newerCars = cars.filter((car) => car.year > 1999);
//newerCars.forEach((car) => console.log(car));

let volvos = cars.filter((car) => car.make == "Volvo");
//volvos.forEach((car) => console.log(car));

let carsBelow5000 = cars.filter((car) => car.year > 5000);
//carsBelow5000.forEach((car) => console.log(car));

// Implement YOUR OWN functions that takes callbacks as arguments
// 4a)

const newerCars1999 = (car) => car.year > 1999;

const filtrating = function (array, callback) {
  const filteredArray = [];

  array.forEach((car) => {
    if (callback(car)) {
      filteredArray.push(car);
    }
  });
  /* for (let i = 0; i < array.length; i++) {
    // checker en og en bil
    if (callback(array[i])) {
      // Bruger callback til at checke om bilens alder, if true, adder til ny arraylist
      filteredArray.push(array[i]);
    }
  } */
  return filteredArray;
};
//console.log("Cars newer than 1999:");
//console.log(filtrating(cars, newerCars1999));

// 4 b) Min egen map / callback

/* function makeUppercase(array) {}

const nameUppercase = (name) => name.uppercased;

function myMapFunction(array, callback) {
  const mappedArray = [];

  for (let index = 0; index < array.length; index++) {
    mappedArray.push(callback(array[index]));
  }
  array.forEach(name => {mappedArray.push(callback(name))}

  return mappedArray;
}

//console.log(myMapFunction(names, nameUppercase)); */

// Extra ex 4a)  INSERT INTO cars (id,year,make,model,price) VALUES ( 1, 1997 'Ford','E350', 3000 );

//Asynchronous Callbacks
// 1)
// console.log("aaaaaaaaaa");
// console.log("dddddddddd");
// console.log("ffffffffff");
// msgPrinter ("eeeeeeeeee",1000);
// msgPrinter ("bbbbbbbbbb",2000);
//
//
//
// 2: Add the code to a javascript file, execute and verify whether you answer to 1) was right

const msgPrinter = function (msg, delay) {
  setTimeout(() => console.log(msg), delay); //Observe an arrow-function
};
/* console.log("aaaaaaaaaa");
msgPrinter("bbbbbbbbbb", 2000);
console.log("dddddddddd");
msgPrinter("eeeeeeeeee", 1000);
console.log("ffffffffff");
 */
// yes i  expected the correct order!
//

//
// 1) JavaScript Objects - Create an object with four different properties, with values of your own choice (ex: name, birthday, hobby, email).

let student = {
  name: "Marcus",
  birthday: "15.01.1985",
  zip: "3660",
  email: "marcus.holje@gmail.com",
};

// Use a for-in loop (as sketched below) to demonstrate that we can iterate over the properties in an object.

for (prop in student) {
  console.log(prop, student[prop]);
}

console.log(student.name);
student["gender"] = "male";
console.log("Gender :" + student.gender + "\r\n");

delete student.zip;

console.log("Zip is now deleted from the object Student:");
console.log("\r\n");

for (prop in student) {
  console.log(prop, student[prop]);
}
console.log("\n");

// Closures not done
var makeCounter = function () {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function () {
      changeBy(1);
    },
    decrement: function () {
      changeBy(-1);
    },
    value: function () {
      return privateCounter;
    },
  };
};
var counter1 = makeCounter();
var counter2 = makeCounter();
//counter1.increment();
//counter1.increment();
//lert(counter1.value()); /* Alerts 2 */
