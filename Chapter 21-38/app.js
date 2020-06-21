// ----------- Chapter 21-25 String Methods ----------

// Task 1
//Write a program that takes two user inputs for first and last name using prompt and merge them in a new variable titled fullName. Greet the user using his full name. 
var firstName = prompt("Enter your first name: ");
var lastName = prompt("Enter your last name: ");
var fullName = firstName + " " + lastName;
alert("Hello " + fullName);

// Task 2
// Write a program to take a user input about his favorite mobile phone model. Find and display the length of user input in your browser.
var favMobile = prompt("Enter your favorite mobile phone model: ");
document.write("My favorite phone is: " + favMobile + "<br>");
document.write("Length of string: " + favMobile.length);

// Task 3
//Write a program to find the index of letter “n” in the word “Pakistani” and display the result in your browser.
var str = "Pakistani";
var nIndex = str.indexOf("n");
document.write("String: " + str + "<br>");
document.write("Index of 'n': " + nIndex );

// Task 4
// Write a program to find the last index of letter “l” in the word “Hello World” and display the result in your browser.
var str = "Hello World";
var lIndex = str.lastIndexOf("l");
document.write("String: " + str + "<br>");
document.write("Last index of 'l': " + lIndex );

//Task 5
// Write a program to find the character at 3rd index in the word “Pakistani” and display the result in your browser.
var str = "Pakistani";
var Index = str[3];
document.write("String: " + str + "<br>");
document.write("Character at index 3: " + Index );

//Task 6
// Repeat Q1 using string concat() method.
var firstName = prompt("Enter your first name: ");
var lastName = prompt("Enter your last name: ");
var fullName= firstName.concat(lastName);
alert("Hello " + fullName);

//Task 7
// Write a program to replace the “Hyder” to “Islam” in the word “Hyderabad” and display the result in your browser.
var str = "Hyderabad";
var replaceStr = str.replace("Hyder", "Islam");
document.write("City: " + str + "<br>");
document.write("After replacement: " + replaceStr);

//Task 8
//  Write a program to replace all occurrences of “and” in the string with “&” and display the result in your browser.
var str = "Ali and Sami are best friends. They play cricket and football together.";
var replaceStr = str.replace(/and/g, "&");
document.write("Message: " + str + "<br>");
document.write("After replacement: " + replaceStr);

// Task 9
// Write a program that converts a string “472” to a number 472. Display the values & types in your browser.
var str = "472";
var num = Number(str);
document.write("value: " + str + "<br>");
document.write("Tpye: " + typeof(str) + "<br>");
document.write("value: " + num + "<br>");
document.write("Tpye: " + typeof(num) + "<br>");

//Task 10
// Write a program that takes user input. Convert and show the input in capital letters.
var str = prompt("Enter Input: ");
document.write("User input: " + str + "<br>");
document.write("Upper case: " + str.toUpperCase())

//Task 11
// Write a program that takes user input. Convert and show the input in title case.
var str = prompt("Enter Input: ");
var firstChar = str.slice(0,1);
var otherChar = str.slice(1);
var title = firstChar.toUpperCase() + otherChar.toLowerCase();
document.write("User input: " + str + "<br>");
document.write("Title case: " + title);

// Task 12
// Write a program that converts the variable num to string. var num = 35.36 ; Remove the dot to display “3536” display in your browser. 
var num = 35.36;
var str = num.toString();
var dotIndex = str.indexOf(".");
str = str.slice(0,dotIndex) + str.slice(dotIndex + 1);
document.write("Number: " + num + "<br>");
document.write("Result: " + str);

//Task 13
//Write a program to take user input and store username in a variable. If the username contains any special symbol among [@ . , !], prompt the user to enter a valid username. For character codes of [@ .
var username = prompt("Enter your name: ");
var charValue;
for(var i = 0; i < username.length; i++){
    charValue = username[i].charCodeAt(0);
    if(charValue === 33 || charValue === 44 || charValue === 46 || charValue === 64){
        alert("Please enter a valid username")
    }
} 

// Task 14
//Write a program to enable “search by user input” in an array. After searching, prompt the user whether the given item is found in the list or not.
var arr = ["cake", "apple pie", "cookie", "chips", "patties"];
var query = prompt("What do you want to order: ");
query = query.toLowerCase();
var check = false;
for(var i = 0; i < arr.length; i++){
    if(query === arr[i]){
        document.write(arr[i] + " is available at index " + i + " in our bakery");
        check = true;
    }
}
if (check === false){
    document.write("We are sorry. " + query + " is not available in our bakery");
}

// Task 15
// Write a program to take password as an input from user. The password must qualify these requirements: a. It should contain alphabets and numbers b. It should not start with a number c. It must at least 6 characters long.
var password = prompt("Enter your password: ");
var passwordLength = false;
var passwordChar = false;
var passwordInt = false;
var passwordStart = true;

//Checking for Alphabet
for (i = 0; i < password.length; i++){
    var charValue = password[i].charCodeAt(0);

    //Checking for UpperCase Letters
    if (charValue >= 65 && charValue <= 90 ){
        passwordChar = true;
    }

    //Checking for LowerCase Letters
    else if (charValue >= 97 && charValue <= 122 ){
        passwordChar = true;
    }
}

//Checking for Numbers
for (i = 0; i < password.length; i++){
    var charValue = password[i].charCodeAt(0);  
    if (charValue >= 48 && charValue <= 57 ){
        passwordInt = true;
    }
}

//Checking for first letter
var charValue = password.charCodeAt(0);
if (charValue >= 48 && charValue <= 57 ){
    passwordStart = false;
}

//Checking for Length
if(password.length >= 6){
    passwordLength = true;
}

if(passwordChar === false || passwordInt === false || passwordLength === false || passwordStart === false){
    alert("Enter valid Password");
}

else{
    alert("Password Approved");
}

// Task 16
// Write a program to convert the following string to an array using string split method. var university = “University of Karachi”; 
var str = "University of Karachi";
var arr = str.split("");
for(var i=0; i<arr.length; i++){
    document.write(arr[i] + "<br>");
}

// Task 17
// Write a program to display the last character of a user input. 
var str = prompt("Enter your message: ");
document.write("User Input: " + str + "<br>");
document.write("Last character of input: " + str[str.length - 1]);

// Task 18
// You have a string “The quick brown fox jumps over the lazy dog”. Write a program to count number of occurrences of word “the” in given string.
var str = "the quick brown fox jumps over the lazy dog";
var count = (str.match(/the/g) || []).length;
document.write("Text: " + str + "<br>");
document.write("There are " + count + " occurrence(s) of the word 'the'");


// ----------- Chapter 26-30 Maths Methods ----------

// Task 1
// Write a program that takes a positive integer from user & display the following in your browser a. number b. round off value of the number c. floor value of the number d. ceil value of the number.
var num = +prompt("Enter number: ");
document.write("Number: " + num + "<br>");
document.write("Round off value: " + Math.round(num) + "<br>");
document.write("Floor value: " + Math.floor(num) + "<br>");
document.write("Ceil value: " + Math.ceil(num) + "<br>");

//Task 2
// Write a program that takes a negative floating point number from user & display the following in your browser. a. number b. round off value of the number c. floor value of the number d. ceil value of the number 
var num = +prompt("Enter number: ");
document.write("Number: " + num + "<br>");
document.write("Round off value: " + Math.round(num) + "<br>");
document.write("Floor value: " + Math.floor(num) + "<br>");
document.write("Ceil value: " + Math.ceil(num) + "<br>");

//Task 3
//Write a program that displays the absolute value of a number. 
var num = +prompt("Enter number: ");
document.write("The absolute value of " + num + " is " + Math.abs(num));

// Task 4
// Write a program that simulates a dice using random() method of JS Math class. Display the value of dice in your browser.: 
var randomNumber = Math.random() * 6;
document.write("Random dice value: " + Math.floor(randomNumber));

// Task 5
// Write a program that simulates a coin toss using random() method of JS Math class. Display the value of coin in your browser 
var coinValue = Math.random() * 2;
coinValue = Math.floor(coinValue);
if(coinValue > 0){
    document.write("Random coin value: Heads");
}
else{
    document.write("Random coin value: Tails");
}

// Task 6
// Write a program that shows a random number between 1 and 100 in your browser. 
var randomNumber = Math.random() * 100;
document.write("Random number between 1-100: " + Math.ceil(randomNumber));

// Task 7
// Write a program that asks the user about his weight. Parse the user input and display his weight in your browser
var weight = prompt("Enter your weight in kilograms: ");
document.write("The weight of user is " + weight + " kilograms");

// Task 8
// Write a program that stores a random secret number from 1 to 10 in a variable. Ask the user to input a number between 1 and 10. If the user input equals the secret number, congratulate the user. 
var secretNumber = +prompt("Enter a number between 1 and 10");
randomNumber = Math.random() * 10;
randomNumber = Math.ceil(randomNumber);
if(secretNumber === randomNumber){
    alert("Congratulations");
}
else{
    alert("Try Again");
}


// ----------- Chapter 31-34 Date Methods ----------

// Task 1
// Write a program that displays current date and time in your browser. 
var dateNow = new Date();
document.write(dateNow);

// Task 2
// Write a program that alerts the current month in words. For example December.
var dateNow = new Date();
mlist = [ "January", "Febmliruary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
var monthNow = dateNow.getMonth();
document.write("Current Month: " + mlist[monthNow]); 

// Task 3
// Write a program that alerts the first 3 letters of the current day, for example if today is Sunday then alert will show Sun.
var dateNow = new Date();
var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var dayNow = dateNow.getDay();
document.write("Today is " + dayNames[dayNow]);

// Task 4
// Write a program that displays a message “It’s Fun day” if its Saturday or Sunday today.
var dateNow = new Date();
var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var dayNow = dateNow.getDay();
if(dayNames[dayNow] === "Sun" || dayNames[dayNow] === "Sat"){
    document.write("It's Fun day");
}

// Task 5
// Write a program that shows the message “First fifteen days of the month” if the date is less than 16th of the month else shows “Last days of the month”. 
var dateNow = new Date();
var date = dateNow.getDate();
if(date < 16){
    document.write("“First fifteen days of the month");
} 
else{
    document.write("Last days of the month");
}

// Task 6
//  Write a program that determines the minutes since midnight, Jan. 1, 1970 and assigns it to a variable that hasn't been declared beforehand. Use any variable you like to represent the Date object.
var dateNow = new Date();
var millisec = dateNow.getTime();
document.write("Current Date: " + dateNow + "<br>");
document.write("Elapsed milliseconds since January 1, 1970: " + millisec + "<br>");
document.write("Elapsed minutes since January 1, 1970: " + (millisec/(999*60)) + "<br>");

// Task 7
// Write a program that tests whether it's before noon and alert “Its AM” else “its PM”. 
var dateNow = new Date();
var hourNow = dateNow.getHours();
if(hourNow < 12){
    document.write("Its AM");
}
else{
    document.write("Its PM");
}

// Task 8
//  Write a program that creates a Date object for the last day of the last month of 2020 and assigns it to variable named laterDate. 
var dateNow = new Date();
var laterDate = new Date("Dec 31, 2020");
document.write(laterDate);

// Task 9
// Create a date object of the starting date of this Ramadan and alert the number of days past since 1st Ramadan? Note: 1st Ramadan was on June 18, 2015 
var today = new Date();
var todayMilli = today.getTime();
var lastRamadan = new Date("Apr 24, 2020");
var ramazanMilli = lastRamadan.getTime();
var diffMilliSec = todayMilli - ramazanMilli;
var daysPast = diffMilliSec/(1000*60*60*24);
daysPast = Math.floor(daysPast);
document.write(daysPast + " days have passed since 1st Ramazan, 2020");

// Task 10
// Write a program that displays in your browser the seconds that elapsed between the reference date and the beginning of 2015.
var today = new Date();
var todayMilli = today.getTime();
var year2015 = new Date("Jan 01, 2015");
var year2015Milli = year2015.getTime();
var diffMilliSec = todayMilli - year2015Milli;
var secondsPast = diffMilliSec/(1000);
secondsPast = Math.floor(secondsPast);
document.write("On reference date: " + today + "<br>")
document.write(secondsPast + " seconds had passed since beginning of 2015");

// Task 11
// Create a Date object for the current date and time. Extract the hours, reset the date object an hour ahead and finally display the date object in your browser. 
var today = new Date();
var hourAgo = today.getHours();
hourAgo = hourAgo-1
document.write("current date: " + today + "<br>");
today.setHours(hourAgo);
document.write("1 hour ago, it was " + today);

// Task 12
// Write a program that creates a date object and show the date in an alert box that is reset to 100 years back? 
var today = new Date();
var yearsAgo = today.getFullYear();
yearsAgo = yearsAgo-100;
document.write("current date: " + today + "<br>");
today.setFullYear(yearsAgo);
document.write("100 years back, it was " + today);

// Task 13
// Write a program to ask the user about his age. Calculate and show his birth year in your browser. 
var age = +prompt("Enter your age");
var today = new Date();
var yearNow = today.getFullYear();
var birthYear = yearNow - age;
document.write("Your age is " + age + "<br>");
document.write("Your birth year is " + birthYear);

// Task 14
// Write a program to generate your K-Electric bill in your browser. All the amounts should be rounded off to 2 decimal places. Display the following fields: a. Customer Name b. Current Month c. Number of units d. Charges per unit e. Net Amount Payable (within Due Date) f. Late Payment Surcharge g. Gross Amount Payable (after Due Date.
var customerName = "Usama Zia";
var today = new Date();
mlist = [ "January", "Febmliruary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
var currentMonth = today.getMonth();
var noOfUnits = 410;
var unitCost = 16;
var netAmount = noOfUnits * unitCost;
var lateCharges = 150;
var grossAmount = netAmount + lateCharges;
document.write("K-Electric Bill" + "<br>" + "<br>");
document.write("Customer Name: " + customerName + "<br>");
document.write("Month: " + mlist[currentMonth] + "<br>");
document.write("No of units: " + noOfUnits + "<br>");
document.write("Charges per unit: " + unitCost + "<br>" + "<br>");
document.write("Net Amount Payable (within Due Date): " + netAmount + "<br>");
document.write("Late Payment Surcharge: " + lateCharges + "<br>");
document.write("Gross Amount Payable (after Due Date): " + grossAmount + "<br>");


// ----------- Chapter 35-38 Functions ----------

// Task 1
// Write a function that displays current date & time in your browser.
function tellTime(){
    var dateNow  = new Date();
    document.write(dateNow); 
}
tellTime();

// Task 2
// Write a function that takes first & last name and then it greets the user using his full name
function greetUser(){
    var firstName = prompt("Enter your first name: ");
    var lastName = prompt("Enter your last name: ");
    alert("Hello " + firstName + " " + lastName);
}
greetUser();

// Task 3
// Write a function that adds two numbers (input by user) and returns the sum of two numbers. 
function sum(){
    var firstNumber = +prompt("Enter first number: ");
    var secondNumber = +prompt("Enter second number: ");
    alert(firstNumber + " + " + secondNumber + " = " + (firstNumber + secondNumber));
}
sum();

// Task 4
// Write a function that takes three arguments num1, num2 & operator & compute the desired operation. Return and show the desired result in your browser
function calculator(num1,num2,op){
    if(op === "+"){
        alert(num1 + " + " + num2 + " = " + (num1 + num2));
    }
    else if(op === "-"){
        alert(num1 + " - " + num2 + " = " + (num1 - num2));
    }
    else if(op === "*"){
        alert(num1 + " x " + num2 + " = " + (num1 * num2));
    }
    else if(op === "/"){
        alert(num1 + " / " + num2 + " = " + (num1 / num2));
    }
    else{
        alert("Wrong Operator");
    }
}
var firstNumber = +prompt("Enter first number: ");
var operator = prompt("Choose your operator: + - * / ");
var secondNumber = +prompt("Enter second number: ");
calculator(firstNumber,secondNumber,operator);

// Task 5
// Write a function that squares its argument. 
function square(num){
    alert("Square of " + num + " is " + (num*num));
}
var number = +prompt("Enter number for square: ");
square(number);

// Task 6
// Write a function that computes factorial of a number
function factorial(num) {
    var answer = 1;
    if (num === 0 || num === 1) {
        return answer;
    } else {
        for (var i = num; i >= 1; i--) {
            answer = answer * i;
        }
        return answer;
    }
}
var number = +prompt("Enter number for factorial: ");
answer = factorial(number)
alert("The factorial of " + number + " is " + answer);

// Task 7
// Write a function that take start and end number as inputs & display counting in your browser.
function counting(start,end){
    for(var i = start; i <= end; i++ ){
        document.write(i + " ");
    }
}
var start = +prompt("Enter start number for counting:");
var end = +prompt("Enter end number for counting:");
counting(start,end);

// Task 8
// Write a nested function that computes hypotenuse of a right angle triangle. 
function calculateHypotenuse(base,perpendicular){
    var base,perpendicular;
    function calculateSquare(num){
       num = num * num;
       return num;
    }
    base = calculateSquare(base);
    perpendicular = calculateSquare(perpendicular);
    var hypotenuse = base + perpendicular; 
    return hypotenuse;
}
var base = +prompt("Enter base of a right angle triagnle:");
var perpendicular = +prompt("Enter perpendicular of a right angle triagnle:");
var hyp = calculateHypotenuse(base,perpendicular);
alert("hypotenuse of a right angle triangle: " + hyp);

// Task 9
// Write a function that calculates the area of a rectangle.      A = width * height
function areaOfRectangle(width,height){
    var areaCalc = width * height;
    return areaCalc;
}
var width = +prompt("Enter width of rectangle: ");
var height = +prompt("Enter height of rectangle: ");
var area = areaOfRectangle(width,height);
alert("Area of Rectangle: " + area);

// Task 10
// Write a JavaScript function that checks whether a passed string is palindrome or not?
function checkPalindrome(message){
    var reverseMessage = "";
    for (var i = message.length - 1; i >= 0; i--) {
        reverseMessage += message[i];
    }
    if(message === reverseMessage){
        alert(message + " is palindrome");
    }
    else{
        alert(message + " is not palindrome");
    }
}
var msg = prompt("Enter message to check it's palindrome or not");
checkPalindrome(msg);

// Task 11
// Write a JavaScript function that accepts a string as a parameter and converts the first letter of each word of the string in upper case.
function titleCase(message){
    var arr = message.split(" ");
    var titleArray = [];
    var str;
    for(var i = 0; i < arr.length; i++){
        var firstChar = arr[i].slice(0,1);
        var otherChar = arr[i].slice(1);
        var word = firstChar.toUpperCase() + otherChar.toLowerCase();
        titleArray.push(word);

    }
    str = titleArray.join(" ");
    document.write("String: " + message + "<br>")
    document.write("Output: " + str + "<br>")
}

var message = prompt("Enter your Message:");
titleCase(message);

// Task 12
// Write a JavaScript function that accepts a string as a parameter and find the longest word within the string. 
function longestString(message){
    var arr = message.split(" ");
    var longest = arr[0]; 
    for(i = 0; i < arr.length; i++){
        if(arr[i].length > longest.length){
            longest = arr[i];
        }
    }
    document.write("Message: " + message + "<br>")
    document.write("Longest Word : " + longest + "<br>")
}
var message = prompt("Enter your Message:");
longestString(message);

// Task 13
// Write a JavaScript function that accepts two arguments, a string and a letter and the function will count the number of occurrences of the specified letter within the string.  Sample arguments : 'JSResourceS.com', 'o' .
function findOccurence(message,letter){
    var count = 0;
    for(var i = 0; i < message.length; i++){
        if(message[i] === letter){
            count += 1;
        }
    } 
    document.write("Message: " + message + "<br>")
    document.write("Occurence of " + "'" + letter + "'" + " is "  + count + " times")
}
var message = prompt("Enter your Message:");
var letter = prompt("Enter your letter to check occurence:");
findOccurence(message,letter);

// Task 14
//The Geometrizer 
function calcCircumference(radius){
    var circumference = 2 * 3.142 * radius;
    document.write("The circumference is: " + circumference + "<br>");
}
function calcArea(radius){
    var area = 3.142 * radius * radius;
    document.write("The area is: " + area + "<br>");
}
var radius = +prompt("Enter radius of a Circle: ");
calcCircumference(radius);
calcArea(radius);