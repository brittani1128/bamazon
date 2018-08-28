# BAMAZON - The Place for Pets!

## Project Overview

This application involves an Amazon-like storefront that uses MySQL to store product information and inventory. The CLI app takes orders from customers and depletes stock, and also allows managers to view products, view low inventory, add inventory, and add new products.

## Installation

```
git clone https://github.com/brittani1128/bamazon.git  

cd bamazon  

npm install  

```

## How to Run

### AS A CUSTOMER:

``` 
node bamazonCustomer.js 
```

Follow the prompts to select which product ID you would like to purchase and quanity
<img src="images/custPurch.png" width="300">


Select YES to make another purchase.  
If attempting to purchase more than stock quantity, customer will receive an 'Insufficient Quantity' error.

<img src="images/custPurch2.png" width="300">


Select NO to finish purchase

<img src="images/custEnd.png" width="300">


### AS A MANAGER:

``` 
node bamazonManager.js 
```
Select desired menu option

<img src="images/manMenuOptions.png" width="300">

View current products available

<img src="images/manView.png" width="300">

View products with low inventory

<img src="images/lowInv.png" width="300">


Add inventory to a product

<img src="images/addInv.png" width="300">


Add a new product

<img src="images/addProd.png" width="300">


