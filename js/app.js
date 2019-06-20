'use strict';

var leftProductOnThePage = null;
var centerProductOnThePage = null;
var rightProductOnThePage = null;

var allProductsSectionTag = document.getElementById('all_products');
var leftProductTag = document.getElementById('left_product_img');
var rightProductTag = document.getElementById('right_product_img');
var centerProductTag = document.getElementById('center_product_img');
var totalClicks = 0;

var Products = function (name, imageSrc) {
  this.name = name;
  this.clicks = 0;
  this.timesShown = 0;
  this.url = imageSrc;

  Products.allProducts.push(this);
};

Products.allProducts = [];

new Products('Suitcase', './img/bag.jpg');

new Products('Banana Slicer', './img/banana.jpg');
new Products('Tablet holder', './img/bathroom.jpg');
new Products('Boots', './img/boots.jpg');

new Products('Breakfast', './img/breakfast.jpg');
new Products('Bubblegum', './img/bubblegum.jpg');
new Products('Chair', './img/chair.jpg');
new Products('Cthulhu', './img/cthulhu.jpg');
new Products('Dog Duck', './img/dog-duck.jpg');
new Products('Dragon Meat', './img/dragon.jpg');
new Products('Pen', './img/pen.jpg');
new Products('Pet Sweep', './img/pet-sweep.jpg');
new Products('Scissors', './img/scissors.jpg');
new Products('Sleeping Bag', './img/shark.jpg');
new Products('Sweep', './img/sweep.png');
new Products('Tauntaun', './img/tauntaun.jpg');
new Products('Unicorn Meat', './img/unicorn.jpg');
new Products('USB', './img/usb.gif');
new Products('Water Can', './img/water-can.jpg');
new Products('Wine Glass', './img/wine-glass.jpg');

var pickedProducts = [];
var localStorageExists = false;
var productName = [];
var shownPercentage = [];

//Check if local storage exists. If it does, get the values into local arrays. If not initialize arrays
if ((JSON.parse(localStorage.getItem('productName')) === null) || (JSON.parse(localStorage.getItem('shownPercentage')) === null)) {
  localStorageExists = false;
  productName = [];
  shownPercentage = [];
} else {
  localStorageExists = true;
  productName = JSON.parse(localStorage.getItem('productName'));
  shownPercentage = JSON.parse(localStorage.getItem('shownPercentage'));
}

//Function to pick and render the next 3 products on the page

var pickNextProducts = function () {
  var leftIndexFound = false;
  var rightIndexFound = false;
  var centerIndexFound = false;
  var leftIndex;
  var rightIndex;
  var centerIndex;

  console.log('Picked previously ' + pickedProducts[0], pickedProducts[1], pickedProducts[2]);
  do {
    leftIndexFound = false;
    leftIndex = Math.floor(Math.random() * Products.allProducts.length);
    for (var i = 0; i < pickedProducts.length; i++) {
      if (leftIndex === pickedProducts[i]) {
        leftIndexFound = true;
      }
    }
  } while (leftIndexFound);

  //Right and left product cannot be the same and should not have been picked in the previous round
  do {
    rightIndexFound = false;
    rightIndex = Math.floor(Math.random() * Products.allProducts.length);

    for (i = 0; i < pickedProducts.length; i++) {
      if (rightIndex === pickedProducts[i]) {
        rightIndexFound = true;
      }
    }
  } while ((rightIndex === leftIndex) || rightIndexFound);

  //Same as above - should not have been picked in the previous round and neighbors cannot be same
  do {
    centerIndexFound = false;
    centerIndex = Math.floor(Math.random() * Products.allProducts.length);

    for (i = 0; i < pickedProducts.length; i++) {
      if (centerIndex === pickedProducts[i]) {
        centerIndexFound = true;
      }
    }

  } while ((rightIndex === centerIndex) || (leftIndex === centerIndex) || centerIndexFound);

  pickedProducts[0] = leftIndex;
  pickedProducts[1] = centerIndex;
  pickedProducts[2] = rightIndex;
  console.log('Picked now ' + pickedProducts[0], pickedProducts[1], pickedProducts[2]);

  leftProductOnThePage = Products.allProducts[leftIndex];
  rightProductOnThePage = Products.allProducts[rightIndex];
  centerProductOnThePage = Products.allProducts[centerIndex];
  renderNewProducts(leftIndex, centerIndex, rightIndex);
};

//render the picked images

var renderNewProducts = function (leftIndex, centerIndex, rightIndex) {
  console.log('left product ' + Products.allProducts[leftIndex]);
  leftProductTag.src = Products.allProducts[leftIndex].url;
  centerProductTag.src = Products.allProducts[centerIndex].url;
  rightProductTag.src = Products.allProducts[rightIndex].url;
};

//Function to handle click event. Totals are displayed after 25 clicks. Store local storage after chart is rendered

var handleClickOnProduct = function (event) {
  console.log('im still alive');
  // if they can still click, do clicky things
  if (totalClicks < 25) {

    var thingWeClickedOn = event.target;
    var id = thingWeClickedOn.id;

    if (id === 'left_product_img' || id === 'right_product_img' || id === 'center_product_img') {
      if (id === 'left_product_img') {
        leftProductOnThePage.clicks++;
      }

      if (id === 'right_product_img') {
        rightProductOnThePage.clicks++;
      }

      if (id === 'center_product_img') {
        centerProductOnThePage.clicks++;
      }
      leftProductOnThePage.timesShown++;
      rightProductOnThePage.timesShown++;
      centerProductOnThePage.timesShown++;

      //after we update the old, pick new pictures
      pickNextProducts();
    }
    console.log(event.target.id);
  }
  // increment amount of clicks
  totalClicks++;
  //when they reach total max clicks, remove the clicky function
  if (totalClicks === 25) {
    allProductsSectionTag.removeEventListener('click', handleClickOnProduct);

    // Render chart
    makeBusChart();

    var productStringified = JSON.stringify(productName);
    localStorage.setItem('productName', productStringified);

    var shownPercentageStringified = JSON.stringify(shownPercentage);
    localStorage.setItem('shownPercentage', shownPercentageStringified);
  }
};

//Function to create and render the results chart
function makeBusChart() {

  var busChartCanvas = document.getElementById('resultsChart');

  //calculate percentage of clicks and store in an array. Randomly generate the bar chart background and border colors.
  var percents = [];
  var names = [];

  var bgColor = [];
  var chartBorderColor = [];

  for (var j = 0; j < Products.allProducts.length; j++) {
    if (localStorageExists) {
      productName[j] = Products.allProducts[j].name;

      var percentage = Math.ceil((Products.allProducts[j].clicks / Products.allProducts[j].timesShown) * 100);
      if (percentage === 0) {
        shownPercentage[j] = 0;
      } else {
        shownPercentage[j] = percentage;
      }
    } else {
      //local storage does not exist
      productName.splice(j, 0, Products.allProducts[j].name);
      percentage = Math.ceil((Products.allProducts[j].clicks / Products.allProducts[j].timesShown) * 100);
      if (percentage === 0) {
        shownPercentage.splice(j, 0, 0);
      } else {
        shownPercentage.splice(j, 0, percentage);
      }

    }
  }

  var clr1, clr2, clr3, bgCalcClr, borderColor;

  if (localStorageExists) {
    names = productName;
    percents = shownPercentage;
  } else {

    for (var i = 0; i < Products.allProducts.length; i++) {
      var p = Math.floor((Products.allProducts[i].clicks / Products.allProducts[i].timesShown) * 100);
      if (Products.allProducts[i].timesShown === 0) {
        p = 0;
      }
      names.push(Products.allProducts[i].name);
      percents.push(p);


    }
  }

  for (i = 0; i < Products.allProducts.length; i++) {
    clr1 = Math.floor(Math.random() * 255);
    clr2 = Math.floor(Math.random() * 255);
    clr3 = Math.floor(Math.random() * 255);
    bgCalcClr = 'rgba(' + clr1 + ', ' + clr2 + ', ' + clr3 + ', ' + '0.2' + ')';
    borderColor = 'rgba(' + clr1 + ', ' + clr2 + ', ' + clr3 + ', ' + '1' + ')';
    bgColor.push(bgCalcClr);
    chartBorderColor.push(borderColor);
  }


  var chartData = {
    labels: names,
    datasets: [{
      label: '# of Votes',
      data: percents,
      backgroundColor: bgColor,
      borderColor: chartBorderColor,
      borderWidth: 1
    }]

  };

  var busChartObject = {
    type: 'bar',
    data: chartData,
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

  var busChart = new Chart(busChartCanvas, busChartObject);

}

//Call function to pick next 3 products.
pickNextProducts();

//Event listener for button click event
allProductsSectionTag.addEventListener('click', handleClickOnProduct);





