console.log("has this script been loaded?");

var number = 12;
var a_string = "wassup";
var israd = false;

//document.getElementById("box").innerHTML = number + 5;

if (number == 10) {
    console.log("number is 10");
} else {
    console.log("number isn't 10");
}

for (var i = 0; i < 10; i++) {
    console.log(i);
}

var groceries = ["Milk", "Eggs", "Cheese"]


function listGroceries() {
    for (var i = 0; i < groceries.length; i++) {
        console.log(groceries[i])
    }
}

listGroceries()

document.getElementById("box").addEventListener("click", function() {
    alert("WHYYYYYYYYYY!")//this is cool
})
