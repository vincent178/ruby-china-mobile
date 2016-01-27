// create an object
var o = new Object();
o = {};

o.name = 'John';
console.log(o.name);
delete o.name;
console.log(o.name);

var user = {};
user.name = 'John';
console.log(user.name);
user.name = 'Serge';
console.log(user.name);
delete user.name;
console.log(user.name);

// check if a key exist
var obj = {key: undefined};
console.log("key" in obj);

// iteration
