var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    start();
});

function start() {
    connection.query("SELECT * FROM products", function(err, res) {
        console.log("Retrieving Items for Sale...");
        for (var i = 0; i < res.length; i++) {
            console.log(`ID: ${res[i].item_id} | ${res[i].product_name} | Price($): ${res[i].price} | Stock: ${res[i].stock_quantity}`);
        }

        inquirer.prompt([
            {
                name: "id",
                type: "input",
                message: "Please type in the ID number of the product you'd like to purchase:"
            },
            {
                name: "units",
                type: "input",
                message: "How many units of the product would you like to purchase?"
            }
        ]).then(function(answer) {
            console.log("Please wait one moment to process the order...");
            var item = 0; 
            for (var i=0; i < res.length; i++){
            
                if (res[i].item_id === parseInt(answer.id)) {
                    item = res[i];
                }
            };
            console.log(item);
           
            var stock = (item.stock_quantity - parseInt(answer.units));
            console.log(stock);

            if (stock > 0) {
                var total = parseInt(answer.units) * item.price;
                console.log("Your order total is $" + total + ".");
                connection.query("UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: (item.stock_quantity - parseInt(answer.units))
                        }, 
                        {
                            item_id: item.item_id
                        }
                    ], function(err) {
                        if (err) throw err;
                        console.log(`Your order for ${item.product_name} has processed successfully!`);
                    }
                );
                connection.end();
            }
            else {
                console.log("Sorry, we don't have enough in stock.");
            }
        });
    });
};