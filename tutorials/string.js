// charAt()
var str = "string";
str = str.charAt(2) + str.charAt(3) + str.charAt(4);

console.log(str);

// toLowerCase() && toUpperCase()
console.log("Hey-HO!".toLowerCase());
console.log("Hey-ho!".charAt(0).toLowerCase());

function ucFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

console.log(ucFirst("dfjaxXXX"));

// indexOf()
var str = "Widget with id";

// return the index of the first occurrence
console.log(str.indexOf("Widget"));
console.log(str.indexOf("id"));

// with optional params find other occurrence
console.log(str.indexOf("id", 2));

// ~
var str = "Widget";
if (~str.indexOf("get")) {
  console.log("match");
}

function checkSpam(str) {
  var str = str.toLowerCase();
  return (~str.indexOf("viagra") || ~str.indexOf("xxx")) ? true : false;
}
console.log(checkSpam('buy ViAgRA now') == true);
console.log(checkSpam('free xxxx') == true);
console.log(checkSpam('innocent rabbit') == false);

// substring, substr, slice
function truncate(str, maxLength) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength-3) + "...";
  } else {
    return str;
  }
}

var str = "and here is what I want to say on that matter:";
console.log(truncate(str, 20) === "and here is what ...");

// compare
console.log(2 > 14);
console.log("2" > "14");
console.log(2 > "14"); // if not both is string, both of them would convert to numbers


