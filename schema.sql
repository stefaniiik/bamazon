use bamazon;

create table products (	
  id integer(11) auto_increment not null primary key,
  product_name varchar(30) not null,
   product_price integer(11) not null,
   department_name varchar(30) not null,
   inventory integer(11) not null,
   in_demand boolean
   )
   
   insert into products (product_name, product_price, department_name, inventory)
   values("Mascara", 7, "Beauty and Cosmetics", 500);
   values("Hockey Stick", 40, "Sporting Goods", 20);
   values("Avocados", 1, "Grocery", 300);
   values("Tajin", 3, "Grocery", 550);
   values("Birthday Card", 3, "Cards and Stationary", 1000);
   values("Swim Trunks", 15, "Men's Clothing", 50);
   values("Bibs" 5, "Baby" 25);
   values("Fruity Pebbles", 4, "Grocery", 800);
   values("PlayStation 4", 300, "Games and Electronics", 20);
   values("Basketball", 10, "Sporting Goods", 250);
   
   SELECT * FROM  products;