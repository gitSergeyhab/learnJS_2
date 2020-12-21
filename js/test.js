var contacts = [
    {
        "firstName": "Akira",
        "lastName": "Laine",
        "number": "0543236543",
        "likes": ["Pizza", "Coding", "Brownie Points"]
    },
    {
        "firstName": "Harry",
        "lastName": "Potter",
        "number": "0994372684",
        "likes": ["Hogwarts", "Magic", "Hagrid"]
    },
    {
        "firstName": "Sherlock",
        "lastName": "Holmes",
        "number": "0487345643",
        "likes": ["Intriguing Cases", "Violin"]
    },
    {
        "firstName": "Kristian",
        "lastName": "Vos",
        "number": "unknown",
        "likes": ["JavaScript", "Gaming", "Foxes"]
    }
];


function lookUpProfile(name, prop){
    for (let con of contacts) {
        if (con.firstName == name) {
            if (con.hasOwnProperty(prop)) {
                return con[prop];
            } else {
                return "No such property";
            }
        }
    }
    return "No such contact";
// Only change code below this line

// Only change code above this line
}
console.log(lookUpProfile("Kristian", "lastName"));

const arr = [];
function rangeOfNumbers(startNum, endNum) {
  if(startNum > endNum) return arr;
  arr.push(startNum);
  return rangeOfNumbers(startNum+1, endNum);
};
console.log(rangeOfNumbers(10, 20));
