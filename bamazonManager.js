
// DEPENDENCIES ==========================================

var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");
var chalk = require("chalk");



//VARIABLES ==============================================

var choice;
var lowStock = 5;
var itemId;
var itemAmount;
var stock;
var departments = ["dog","cat","fish"];
var name;
var department;
var price;
var quantity;

//CONNECT TO DATABASE ====================================

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
});


function start(){
    
    var menuOptions = ["View Products for Sale", "View Low Inventory", 
                       "Add to Inventory", "Add New Product"];
    inquirer.prompt([
        {
        type:"list",
        name:"options",
        message:"MENU OPTIONS: \n",
        choices: menuOptions
        }
    ]).then(function(response){
        
        choice = response.options
        
        switch(choice){
            case menuOptions[0]:
                viewProducts();
                break;
            case menuOptions[1]:
                lowInv();
                break;
            case menuOptions[2]:
                addInv();
                break;
            case menuOptions[3]:
                addProduct();
                break;
        }
    });
};

function viewProducts(){
    connection.query("SELECT * FROM products", function(err,res){
        if (err) throw err;
        console.log("\nPRODUCTS: \n")
        console.table(res);
        selectAgain();
    });
    
}

//**********HOW DO I LOOK FOR <= 5 QUANTITY***********
function lowInv(){
    connection.query("SELECT * FROM products WHERE ?",{stock_quantity:lowStock}, function(err,res){
        if (err) throw err;
        console.log("\nLOW INVENTORY: \n")
        console.table(res);
        selectAgain();
    });
  
}

function addInv(){
    // viewProducts();
    inquirer.prompt([
        {
            type:"input",
            name:"itemId",
            message:"Which item ID are you adding inventory to?"
        },
        {
            type:"input",
            name:"amount",
            message:"How many units are you adding?"
        }
    ]).then(function(response){
        
        itemId = response.itemId;
        itemAmount = parseInt(response.amount);

        connection.query("SELECT stock_quantity FROM products WHERE item_id=?",[itemId],function(err,res){
            if (err) throw err;
            stock = parseInt(res[0].stock_quantity);
            stock = stock + itemAmount;
            updateStock();     
        });
        
    });
}

function addProduct(){

    inquirer.prompt([
        {
            type:"input",
            name:"name",
            message:"Product name: "
        },
        {
            type:"list",
            name:"department",
            message:"Department: ",
            choices: departments
        },
        {
            type:"input",
            name:"price",
            message:"Price: ",
        },
        {
            type:"input",
            name:"quantity",
            message:"Quantity: ",
        }
    ]).then(function(response){
        name = response.name;
        department = response.department;
        price = parseFloat(response.price);
        quantity = parseInt(response.quantity);

        var query = "INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('"+name+"','"+department+"',"+price+","+quantity+")";
        
        connection.query(query,function(err,res){
            if (err) throw err;
            console.log("\nItem added successfully!");
            
            selectAgain();
        });
        
    });
}


function updateStock() {
    connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [stock, itemId], function (err) {
        if (err) throw err;
        console.log("\nStock quantity updated successfully!\n");
        selectAgain();
    });
}


function selectAgain(){
    inquirer.prompt([
        {
            type:"list",
            name:"again",
            message:"\nWould you like to view the Menu Options again?",
            choices:["YES", "NO"]
        }
    ]).then(function(response){
        if (response.again === "YES"){
            start();
        } else {
            return;
        }
    });
}
