'use strict';

console.log('in JS');
var leftProduct = null;
var centerProduct = null;
var rightProduct = null;

var allProductsSectionTag = document.getElementById('all_products');
var leftProductTag = document.getElementById('left_product_img');
var rightProductTag = document.getElementById('right_product_img');
var centerProductTag = document.getElementById('center_product_img');


var Products = function (name, imageSrc) {
  this.name = name;
  this.clicks = 0;
  this.timesShown = 0;
  this.url = imageSrc;

  Products.allProducts.push(this);
};

Products.allProducts = [];

new Products('Bag', './img/bag.jpg');

new Products('Banana', './img/banana.jpg');
new Products('Bathroom', './img/bathroom.jpg');
new Products('Boots', './img/boots.jpg');

new Products('Breakfast', './img/breakfast.jpg');
new Products('Bubblegum', './img/bubblegum.jpg');
new Products('Chair', './img/chair.jpg');
new Products('Cthulhu', './img/cthulhu.jpg');
new Products('Boots', './img/dog-duck.jpg');
new Products('Boots', './img/dragon.jpg');
new Products('Boots', './img/pen.jpg');
new Products('Boots', './img/pet-sweep.jpg');
new Products('Boots', './img/scissors.jpg');
new Products('Boots', './img/shark.jpg');
new Products('Boots', './img/sweep.png');
new Products('Boots', './img/tauntaun.jpg');
new Products('Boots', './img/unicorn.jpg');
new Products('Boots', './img/usb.gif');
new Products('Boots', './img/water-can.jpg');
new Products('Boots', './img/wine-glass.jpg');

console.log('Products ' + Products.allProducts[0]);


var pickNextProducts = function () {
  console.log('picking products');
  var leftIndex = Math.floor(Math.random() * Products.allProducts.length - 1);
  var centerIndex = Math.floor(Math.random() * Products.allProducts.length - 1);
  var rightIndex = Math.floor(Math.random() * Products.allProducts.length - 1);

  /*do {
    var rightIndex = Math.floor(Math.random() * Products.allImages.length - 1);
  } while (rightIndex === leftIndex);
  //console.log(Products.allImages[leftIndex].name, Products.allImages[rightIndex].name);

  do {
    var centerIndex = Math.floor(Math.random() * Products.allImages.length - 1);
  } while (rightIndex === leftIndex);
  leftProduct = Products.allImages[leftIndex];
  rightProduct = Products.allImages[rightIndex];
  centerProduct = Products.allImages[centerIndex];*/

  renderNewProducts(leftIndex, centerIndex, rightIndex);
};

var renderNewProducts = function (leftIndex, centerIndex, rightIndex) {
  console.log('left product ' + Products.allProducts[leftIndex]);
  leftProductTag.src = Products.allProducts[leftIndex].url;
  centerProductTag.src = Products.allProducts[centerIndex].url;
  rightProductTag.src = Products.allProducts[rightIndex].url;
};

pickNextProducts();
