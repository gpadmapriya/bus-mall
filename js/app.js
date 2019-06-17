'use strict';

var leftProduct = null;
var rightProduct = null;

var Products = function (name, imageSrc) {
  this.name = name;
  this.clicks = 0;
  this.timesShown = 0;
  this.url = imageSrc;

  Products.allProducts.push(this);
};

Products.allImages = [];

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


