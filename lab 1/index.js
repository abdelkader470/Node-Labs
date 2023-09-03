// task1
function getDays (year){
return days =year*365
}
console.log(getDays(24))
//----------------------------------
// task2
function minNumber(...number){
    let minNum=0;
    for (let i = 0; i < number.length; i++) {
        if(number[i]<number[i+1]){
            minNum=number[i]
            return minNum
        }
    }
}
console.log(minNumber(9,3,2,4,5))
//--------------------------------------
// task3
function SortDescending(nums) {
    for (let i = 0; i < nums.length - 1; i++) {
    for (let j = 0; j < nums.length - 1 - i; j++) {
        if (nums[j] < nums[j + 1]) {
        const temp = nums[j];
        nums[j] = nums[j + 1];
        nums[j + 1] = temp;
        }
    }
    }
    return nums;
    }
  console.log(SortDescending([5, 1, 9, 3, 7,8, 6,10])); 
//--------------------------------------
// task4
function calcAvg (...num){
    let sum=0;
    for (let i = 0; i < num.length; i++) {
        sum += num[i];
    }
    let avg =(sum/(num.length))
    return avg;
}
console.log(calcAvg(2,3,7,8))
//-------------------------------------
// task5
console.log( [] == [] ) //false
/*
When compere two array with '==',
it compere the value of both array
and check if both array refer to same address in memory,
so that the result will be false because it's not refer to same address  
*/
console.log( {} == {} ) //false
/*
When compere two object with '==',
it compere the value of both object
and check if both object refer to same address in memory,
so that the result will be false because it's not refer to same address  
*/
//--------------------------------------------
// task6
function main() {
console.log("A");
setTimeout(function print() {
console.log("B");
}, 0);
console.log("C");
}
main()// A C B
/*
console.log("A");
is the first line executed,
console.log("C"); 
is the next line executed
the function inside setTimeout run asynchronously not execute immediately.
it move to the event queue to execute after code finish.
the setTimeout call, 
so "B" is printed to the console.
so the outPut will be A C B
*/
//--------------------------------------------
// task7
var num = 8;
var num = 10;
console.log(num)//10
/*
The num is declared and initialized with the value 8.
and the variable num is redeclared and reassigned with the value 10.
so the finial value of num is 10 and output will be 10
*/
//--------------------------------------
// task8
function sayHi() {
    console.log(name);
    console.log(age);
    var name = 'Ayush';
    let age = 21;
    }
    sayHi(); 
/*
the name variable is declared using var,
so it gets hoisted to the top of the function. 
and it is initialized with undefined.

The age variable is declared using let
and let variables are not hoisted.

When console.log(name) is executed
output is undefined because the name variable is declared 
but not assigned a value yet

When console.log(age) is executed
it get error because age is not defined yet.
*/