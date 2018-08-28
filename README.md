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
<p align="center">
    <img src="images/custPurch.png" width="600" style="border:1px solid">
</p>


Select YES to make another purchase.  
If attempting to purchase more than stock quantity, customer will receive an 'Insufficient Quantity' error.

<p align="center">
    <img src="images/custPurch2.png" width="600" style="border:1px solid">
</p>

Select NO to finish purchase

<p align="center">
    <img src="images/custEnd.png" width="600" style="border:1px solid">
</p>

### AS A MANAGER:

``` 
node bamazonManager.js 
```

Select desired menu option

<p align="center">
    <img src="images/manMenuOptions.png" width="600" style="border:1px solid">
</p>

View current products available

<p align="center">
    <img src="images/manView.png" width="600" style="border:1px solid">
</p>

View products with low inventory

<p align="center">
    <img src="images/lowInv.png" width="600" style="border:1px solid">
</p>

Add inventory to a product

<p align="center">
    <img src="images/addInv.png" width="600" style="border:1px solid">
</p>

Add a new product

<p align="center">
    <img src="images/addProd.png" width="600" style="border:1px solid">
</p>

