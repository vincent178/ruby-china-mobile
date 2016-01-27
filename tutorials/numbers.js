
// Infinity && NaN
// NaN is not equal to anything, including itself
console.log(1/0);
console.log(-1/0);
console.log(0/0);

// strict conversion use +, permissive conversion use parseFloat() && parseInt()
function isNumberic(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function convertToNumber(n) {
  return +n;
}

// Rounding
console.log(Math.floor(3.9)); // round down
console.log(Math.ceil(3.1)); // round up
console.log(Math.round(3.49)); // round to nearest

function randomToMax(max) {
  return max * Math.random();
}

function randomMinToMax(min, max) {
  return Math.random() * (max - min) + min;
}

function randomIntegerMinToMax(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//
