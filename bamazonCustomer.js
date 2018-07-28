const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id" + connection.threadId);
  queryAllProducts();
});

function queryAllProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(
        res[i].id +
          "|" +
          res[i].product_name +
          "|" +
          res[i].product_price +
          "|" +
          res[i].department_name +
          "|" +
          res[i].inventory
      );
    }
    console.log("------------------------------");
    userPurchase();
  });
}

// console.log('');
//Prompt what the user wants to purchase
function userPurchase() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "item_id",
        message: "Please enter the Item ID which you would like to purchase.",
        validate: function(value) {
          var valid = value.match(/^[0-9]+$/);
          if (valid) {
            return true;
          }
          return "Please enter a valid Product ID";
        }
      },
      {
        type: "input",
        name: "quantity",
        message: "How many would you like to purchase?",
        validate: function(value) {
          var valid = value.match(/^[0-9]+$/);
          if (valid) {
            return true;
          }
          return "Please enter a valid Product ID";
        }
      }
    ])
    .then(function(input) {
      let inputQuantity = input.quantity;
      let inputItemID = input.item_id;

      console.log(
        "Customer has selected: \n    id = " +
          inputItemID +
          "\n    quantity = " +
          inputQuantity
      );

      connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("new connection ran");
        var item = inputItemID - 1;
        var quantity = parseInt(inputQuantity);
        var grandTotal = parseFloat(
          (res[item].product_price * quantity).toFixed(2)
        );
        console.log(grandTotal);

        //check inventory
        if (res[item].inventory >= quantity) {
          //update quantity in products table
          connection.query(
            "UPDATE products SET ? WHERE ? ",
            [
              { inventory: res[item].inventory - quantity },
              { id: inputItemID }
            ],
            function(err, result) {
              if (err) throw err;
              console.log("Accepted. Your total is $" + grandTotal.toFixed(2));
              reprompt();
            }
          );
        }
      });
    });

}

//ask if continue shopping
function reprompt() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "reply",
        message: "Would you like to continue shopping?"
      }
    ])
    .then(function(input) {
      if (input.reply === 'y' || 'Y') {
        queryAllProducts();
      } else {
        console.log("Until next time!");
        connection.end();
      }
    });
}
