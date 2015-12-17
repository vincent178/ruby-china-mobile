
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

// reverse()
var domain = "my.site.com";
var last = domain.split('.').reverse()[0];
var last2 = domain.split('.')[-1]; // not support negative index
console.log(last);
console.log(last2);

// sort()
// sort converts everything to string and use lexicographical order
var arr = [1, 2, 15];
console.log(arr.sort());

function compare(a, b) {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  }
  return 0;
}
console.log(arr.sort(compare));

var john = {name: "John Smith", age: 23};
var mary = {name: "Mary Key", age: 18};
var bob = {name: "Bob-small", age: 6};
var people = [john, mary, bob]

function ageSort(people) {
  function compare(pA, pB) {
    if (pA.age > pB.age) {
      return 1;
    } else if (pA.age < pB.age) {
      return -1;
    }
    return 0;
  }
  return people.sort(compare).map(function(p) {
    return p.name
  });
}

console.log(ageSort(people));

function sumPrimes(n) {

  var arr = [];

  for (var i = 0; i < n; i++) {
    arr.push(i);
  }

  var p = 2;

  arr.filter(function(el) {
    el !== p && el % p === 0
  });
}

//console.log(sumPrimes(100));
var arr = [];
for (var i = 0; i < 10; i++) {
  arr.push(i);
}

console.log(arr);

var arr1 = arr;

for (var i = arr1.length - 1; i >= 0; i--) {
  if (arr1[i] === 5) {
    arr1.slice(i, 1);
  }
}

console.log(arr1);


