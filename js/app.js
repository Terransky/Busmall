
'use strict';

//guidelines : display 3 random, unique products from catalogue, create constructor function that makes an object for each product with properties name, file path, views, and votes.

// make a function that selects and renders 3 random images side by side for viewing and selection

// use an event listener that handles clicks for the images. Once clicked, generate new products for 25 rounds total.

// global variables that controls # of rounds

// create property in constructor that keeps tracks of all products currently being considered (what? like an array of them?)

// after voting rounds, remove event listener and add button with text View Results which displays the list of all products followed by the votes and number of times viewed. e.g. "dog-duck had 3 votes, and was seen 5 times".



// Global variables

const rounds = 25;

let imgArr = ["bag", "banana", "bathroom", "boots", "breakfast", "bubblegum", "chair", "cthulhu", "dog-duck", "dragon", "pen", "pet-sweep", "scissors", "shark", "sweep", "tauntaun", "unicorn", "usb", "water-can", "wine-glass"];

console.log(imgArr); // remove later 

let productArr = [];
let imgCache = [];

let imgContainerOne = document.querySelector("img:first-child");
let imgContainerTwo = document.querySelector("img:nth-child(2)");
let imgContainerThree = document.querySelector("img:nth-child(3)");


function Product (name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.votes = 0;
  productArr.push(this);

}

for (let i = 0; i < imgArr.length; i++) {
  productArr[i] = new Product (imgArr[i], `img/${imgArr[i]}.jpg`);
}

console.log(productArr); // remove later

function randomInt() {
  return Math.floor(Math.random() * productArr.length); // referenced from MDN
}

function assignRandomImg() {
  let imgOne = productArr[randomInt()];
  let imgTwo = productArr[randomInt()];
  let imgThree = productArr[randomInt()];

  console.log(randomInt());

 while ((imgOne === imgTwo) || (imgOne === imgThree) || (imgTwo === imgThree)) { //will rewrite this later using prototype.includes
    assignRandomImg(); //recursion, right?
  }
  
  imgCache.push(imgOne, imgTwo, imgThree);
  console.log(imgOne, imgTwo, imgThree); // remove later
  
}

function renderImages() {
 
  assignRandomImg();
 
  imgContainerOne.src = imgCache[0].src;
  imgContainerTwo.src = imgCache[1].src;
  imgContainerThree.src = imgCache[2].src;
  
  for (let i in imgCache) {
    imgCache[i].views++;
  }
  console.log(imgCache);

}


// need event listener, handler, removal, and button

renderImages();

//forgot to make a new branch for today