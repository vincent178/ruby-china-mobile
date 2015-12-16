
var fruits = ["Apple", "Orange", "Donkey"];

// pop() && push()
// modify array itself in the end of an array
fruits.pop();

var styles = ["Jazz", "Blues"];
styles.push("Rock'n'Roll");
styles[styles.length-2] = "Classic";
console.log(styles.pop());

// shift() && unshift()
var fruits = ["Apple", "Orange"];
var apple = fruits.shift();
fruits.unshift("Lemon");
console.log(fruits);

function arrayRandomItem(arr) {
  return arr[Math.random()*(arr.length)];
}

// iterating
var arr = [ "test", 2, 1.5, false ];

function find(arr, value) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      return i;
    }
  }
  return -1;
}

console.log(find(arr, "test") === 0);
console.log(find(arr, 2) === 1);
console.log(find(arr, 1.5) === 2);
console.log(find(arr, 0) === -1);

function filterNumeric(arr) {

}

// slice()
var arr = ["Why", "learn", "Javascript"];
var arr2 = arr.slice(0, 2);
console.log(arr2);

var arr3 = arr.slice(1); // means slice 1 to end
console.log(arr3);

