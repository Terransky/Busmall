
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



let productArr = [];
let imgCache = [];

let imgContainerGroup = document.querySelector("body main");
let imgContainerOne = document.querySelector("img:first-child");
let imgContainerTwo = document.querySelector("img:nth-child(2)");
let imgContainerThree = document.querySelector("img:nth-child(3)");
let button = document.querySelector("button");
let uList = document.querySelector("ul");




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



function randomInt() {
  return Math.floor(Math.random() * productArr.length); // referenced from MDN
}

let imgOne;
let imgTwo;
let imgThree;

function assignRandomImg() {
 
  imgOne = productArr[randomInt()];
  imgTwo = productArr[randomInt()];
  imgThree = productArr[randomInt()];

  

 while ((imgOne === imgTwo) || (imgOne === imgThree) || (imgTwo === imgThree)) { //will rewrite this later using prototype.includes
    assignRandomImg(); //recursion, run again from the top
  }
  
  imgCache.push(imgOne, imgTwo, imgThree);
  
  
}

function renderImages() {
 
  assignRandomImg();
 
  imgContainerOne.src = imgCache[0].src;
  imgContainerTwo.src = imgCache[1].src;
  imgContainerThree.src = imgCache[2].src;
  
  for (let i in imgCache) {
    imgCache[i].views++;
  }
  

}

function clearCache() {
  for (let i = imgCache.length; i > 0; i--) {
    imgCache.pop();    
  }
}


// need event listener, handler, removal, and button

renderImages();

let totalClicks = 0;

function handleClick(event) {
  totalClicks++;
  let imgClicked = event.target.getAttribute("src");
  
  
  for (let i in imgCache) {
    if (imgClicked === imgCache[i].src) {
      imgCache[i].votes++;
      clearCache();
      
      renderImages();
    }
  }
  
  if (totalClicks === rounds) {
    imgContainerGroup.removeEventListener('click', handleClick);
    button.addEventListener('click', handleButton);
  }
}

function handleButton(event){
    
  for (let i in productArr) {
    let li = document.createElement("li");
    let temp = document.createTextNode(`${productArr[i].name} had ${productArr[i].votes} votes, and was seen ${productArr[i].views} times.`);
    li.appendChild(temp);
    uList.appendChild(li);
  }
  button.removeEventListener('click', handleButton);
}

imgContainerGroup.addEventListener('click', handleClick);
button.addEventListener('click', handleButton);

// after voting rounds, remove event listener and add button with text View Results which displays the list of all products followed by the votes and number of times viewed. e.g. "dog-duck had 3 votes, and was seen 5 times".