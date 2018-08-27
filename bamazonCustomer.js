//TO DO

//error handling
//  if enter wrong ID num or not a num
//  if dont enter a num for amount


// DEPENDENCIES ===============================================

var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");
var chalk = require("chalk");

//VARIABLES =================================================

var itemId;
var amount;
var stock;
var name;
var price;

//CONNECT TO DATABASE =========================================

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    // console.log("Connected as id " + connection.threadId);
    start();
})

//FUNCTIONS ====================================================


function start() {
    //Shows products available for purchase
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("\nCurrent items available for purchase: \n")
        console.table(res);
    });

    //Prompts user to select item and amount
    inquirer.prompt([
        {
            type: "input",
            name: "itemId",
            message: "\nWhat is the item ID you would like to buy?"
        },
        {
            type: "input",
            name: "amount",
            message: "\nHow many would you like to buy?"
        }
    ]).then(function (response) {

        itemId = response.itemId;
        amount = response.amount;

        purchase();
    })

};


function purchase() {
    //Grab stock quantity at itemId, subtract amount purchased from stock quantity
    connection.query("SELECT stock_quantity, product_name, price FROM products WHERE item_id=?", [itemId], function (err, res) {
        if (err) throw err;

        //Store variables
        stock = parseInt(res[0].stock_quantity);
        name = res[0].product_name;
        price = parseFloat(res[0].price);

        if (stock - amount > 0) {
            //Update stock with new amount
            stock = stock - amount;
            console.log("\nYou have purchased " + amount + " " + name + "s" +
                "\n Your total cost is " + "$" + (price * amount).toFixed(2));
            updateStock();

            inquirer.prompt([
                {
                    type:"list",
                    name:"another",
                    message:"\nWould you like to make another purchase?",
                    choices:["YES", "NO"]
                }
            ]).then(function(response){
                if (response.another === "YES"){
                    start();
                } else {
                    console.log("\nThank you, come again!");
                    return;
                }
            });
        }
        else {
            console.log(chalk.red("\nSorry! Insufficient quantity! Make another selection please.\n"));
            start();
        }
    });

   
}


function updateStock() {
    connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [stock, itemId], function (err, res) {
        if (err) throw err;
    });
}



