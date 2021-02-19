
'use strict';

// Global variables

const rounds = 25;

let imgArr = ["bag", "banana", "bathroom", "boots", "breakfast", "bubblegum", "chair", "cthulhu", "dog-duck", "dragon", "pen", "pet-sweep", "scissors", "shark", "sweep", "tauntaun", "unicorn", "usb", "water-can", "wine-glass"];



let productArr = [];
let imgCache = [];
let imgCachePrevious = [];

let votes = [];
let views = [];

let imgContainerGroup = document.querySelector("body main");
let imgContainerOne = document.querySelector("img:first-child");
let imgContainerTwo = document.querySelector("img:nth-child(2)");
let imgContainerThree = document.querySelector("img:nth-child(3)");
let button = document.querySelector("button");
let uList = document.querySelector("ul");




function Product (name, fileExt = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExt}`;
  this.views = 0;
  this.votes = 0;
  productArr.push(this);

}

for (let i = 0; i < imgArr.length; i++) {
  productArr[i] = new Product (imgArr[i]);
}

productArr[14].src = "img/sweep.png";
productArr[17].src = "img/usb.gif";



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

  clearCache();
  imgCache.push(imgOne, imgTwo, imgThree);

  
 
}



function storeCache() {
  for (let i = 0; i < 3; i++) {
    imgCachePrevious[i] = imgCache[i]; 
  }
  assignRandomImg();
}

function compareCache() { 
  
  for (let i = 0; i < 3; i++) {

    if (imgCachePrevious.includes(imgCache[i])) {
      assignRandomImg();;
    }    
  }

  for (let i = 0; i < 3; i++) {

    if (imgCachePrevious.includes(imgCache[i])) {
      compareCache(); // to make sure it worked the first time, if not, run again
    }    
  }
 
}




function renderImages() {
 
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


// Image rendering

assignRandomImg();
renderImages();

let totalClicks = 0;

function handleClick(event) {
  totalClicks++;
  let imgClicked = event.target.getAttribute("src");
  
  
  for (let i in imgCache) {
    if (imgClicked === imgCache[i].src) {
      imgCache[i].votes++;
      
      storeCache();
      compareCache();
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

  for (let i = 0; i < productArr.length; i++) {
    views.push(productArr[i].views);
    votes.push(productArr[i].votes);
    console.log(views, votes);
  }

  let myChart = new Chart(ctx, chartObject);
  button.removeEventListener('click', handleButton);
}

imgContainerGroup.addEventListener('click', handleClick);
button.addEventListener('click', handleButton);



// chart
var ctx = document.getElementById('myChart').getContext('2d');
document.getElementById("canvas").style.visibility = "visible"; 
    // The type of chart we want to create
var chartObject = {
  type: 'bar',
  data: {
    labels: imgArr,
    datasets: [{
      label: '# of Votes',
      hoverBackgroundColor: 'rgba(255, 00, 00, 0.2)',
      data: votes,
      backgroundColor: [
        'rgba(255, 00, 00, 0.2)',
        'rgba(255, 00, 00, 0.2)',
        'rgba(255, 00, 00, 0.2)',
        'rgba(255, 00, 00, 0.2)',
        'rgba(255, 00, 00, 0.2)',
        'rgba(255, 00, 00, 0.2)',
        'rgba(255, 00, 00, 0.2)',
        'rgba(255, 00, 00, 0.2)',
        'rgba(255, 00, 00, 0.2)',
        'rgba(255, 00, 00, 0.2)',
        'rgba(255, 00, 00, 0.2)',
        'rgba(255, 00, 00, 0.2)',
        'rgba(255, 00, 00, 0.2)',
        'rgba(255, 00, 00, 0.2)',
        'rgba(255, 00, 00, 0.2)',
        'rgba(255, 00, 00, 0.2)',
        'rgba(255, 00, 00, 0.2)',
        'rgba(255, 00, 00, 0.2)',
        'rgba(255, 00, 00, 0.2)',
        'rgba(255, 00, 00, 0.2)',
      ],
     
      borderWidth: 1
    },
    {
      label: '# of Views',
      hoverBackgroundColor: 'rgba(00, 00, 235, 0.2)',
      data: views,
      backgroundColor: [
        'rgba(00, 00, 235, 0.2)',
        'rgba(00, 00, 235, 0.2)',
        'rgba(00, 00, 235, 0.2)',
        'rgba(00, 00, 235, 0.2)',
        'rgba(00, 00, 235, 0.2)',
        'rgba(00, 00, 235, 0.2)',
        'rgba(00, 00, 235, 0.2)',
        'rgba(00, 00, 235, 0.2)',
        'rgba(00, 00, 235, 0.2)',
        'rgba(00, 00, 235, 0.2)',
        'rgba(00, 00, 235, 0.2)',
        'rgba(00, 00, 235, 0.2)',
        'rgba(00, 00, 235, 0.2)',
        'rgba(00, 00, 235, 0.2)',
        'rgba(00, 00, 235, 0.2)',
        'rgba(00, 00, 235, 0.2)',
        'rgba(00, 00, 235, 0.2)',
        'rgba(00, 00, 235, 0.2)',
        'rgba(00, 00, 235, 0.2)',
        'rgba(00, 00, 235, 0.2)',
        
      ],
      
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
};