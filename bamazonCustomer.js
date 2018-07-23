var mySQL = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    databse: "bamazon"
});

connection.connect(function(err) {
    if(err)throw err;
    console.log("connected as id" + connection.threadId);
    queryAllProducts();
});

function queryAllProducts(){
    connection.query("SELECT * FROM products", function(err, res){
        for (var i = 0 < res.length; i++;){
            console.log(res[i].id + '|' + res[i].product_name + '|' + res[i].product_price + '|' + res[i].department_name +
            '|' + res[i].inventory);
        }
        console.log("--------------------------");
    });
}

console.log(query.sql);

//validate that the user is entering positive numbers
function validateInput(value){
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1 )) {
		return true;
	} else {
		return 'Please enter a whole non-zero number.';
	}
}
//Prompt what the user wants to purchase
function userPurchase () {
	inquirer
	.promt([
	{
		type: 'input',
		name: 'item_id',
		message: 'Please enter the Item ID which you would like to purchase.',
		validate: validateInput,
		filter: Number
	},
	{
		type: 'input',
		name: 'quantity',
		message: 'How many would you like to purchase?',
		filter: Number
	}
]).then(function(input){
	console.log('Customer has selected: \n    item_id = '  + input.item_id + '\n    quantity = ' + input.quantity);
	var item = input.item_id;
    var quantity = input.quantity;
//Query to confirm the item selected is available. Question mark allows for what use inputs
var querySql = 'SELECT * FROM products WHERE ?';

connection.query(querySql, {item_id: item}, function (err, res) {
	if (err) throw err;
console.log('data = ' + JSON.stringify(res));

}); else{
	var productInfo = res[0];
console.log('productData = ' + JSON.stringify(productData));
console.log('productData.stock_quantity = ' + productData.stock_quantity);

//if quantity is in stock

if (quantity <= productInfo.inventory) {
	console.log('Item in stock. Placing order now!');

//update query
var updateQuery = 'UPDATE products SET inventory =' + (prdocutInfo.inventory - quantity) + ' WHERE item_id = ' + item;
//console.log(updateQuery = ' + updateQuery) {

//update inventory
connection.query(updateQuery, function (err, res){
	if(err) throw err;

console.log('Your order has been place. Your total is $' + productInfo.price * quantity);
console.log('Thank you for shopping');
console.log('----------------------------\n');

//ending database connection
connection.end();
})
} else{
	console.log('Sorry, item selected low on qauntity. Cannot place order as it');
	console.log('Please choose a lesser amount');
	console.log('----------------------------------------------');
}
