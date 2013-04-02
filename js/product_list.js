/**
 **/

/**
 * @name Yum.Product
 * Product type, encapsulation of Yum Juices products
 * @class Product
 * @constructor
 * @param name
 * @param picture
 * @param price
 * @param quantity
 */
Yum.Product = (function( id, name, picture, price, quantity ) {
    this.id       = id;
    this.name     = name;
    this.picture  = picture;
    this.price    = price;
    this.quantity = quantity;
    this.crate = 6;
    this.category = 'juice';
    this.gluten = false;
    this.dairy = false;

    this.addStock = function() {
        this.quantity++;
    }

    this.removeStock = function() {
        this.quantity--;
    }

});

/**
 * newSmoothie - factory function to create gluten/non-gluten non-dairy smoothies
 * @param id
 * @param name
 * @param picture
 * @param price
 * @param quantity
 * @param gluten
 * @returns {Product}
 */
function newSmoothie( id, name, picture, price, quantity, gluten ) {
    var product = new Yum.Product( id, name, picture, price, quantity );
    product.gluten = gluten;
    product.category = 'smoothie';
    return product;
}

/**
 * newMilkSmoothie - factory function to create gluten & dairy smoothies
 * @param id
 * @param name
 * @param picture
 * @param price
 * @param quantity
 * @returns {Product}
 */
function newMilkSmoothie( id, name, picture, price, quantity ) {
    var product = new Yum.Product( id, name, picture, price, quantity );
    product.gluten = true;
    product.dairy = true;
    product.category = 'smoothie';
    return product;
}

/**
 * ProductList
 * Stores details on all carried stock items
 * @class ProductList
 */
var ProductList = (function() {
    this.products = [];

    /**
     * addProduct
     * Storage method for adding items to the stock inventory
     * @param {Product} product
     */
    this.addProduct = function( product ) {
        this.products.push( product );
    }

    /**
     * render
     * Method to generate the contents of the basket for display
     * @param category
     * @param pageOptions
     */
    this.renderStock = function( category, pageOptions ) {
        var product = '<ul>';
        for (var i = 0; i < this.products.length; i++) {
            product += '<li><span class="name">' + this.products[i].name + '</span><span class="quantity">' + this.products[i].quantity + '</span></li>';
        }
        product += '</ul>';
        return basket;
    };
});

var products = new ProductList();

/** juices **/
products.addProduct( new Product( 0, 'Lime Juice', 'images/product/lime.png', 5.99, 50 ) );
products.addProduct( new Product( 1, 'Apple Juice', 'images/product/apple.png', 5.99, 15 ) );
products.addProduct( new Product( 2, 'Orange Juice', 'images/product/orange.png', 5.99, 30 ) );
products.addProduct( new Product( 3, 'Lemon Juice', 'images/product/lemon.png', 5.99, 20 ) );
products.addProduct( new Product( 4, 'Grapefruit Juice', 'images/product/grapefruit.png', 5.99, 10 ) );
/** milk smoothies **/
products.addProduct( newMilkSmoothie( 5, 'Strawberry Milk', 'images/product/stawberrymilk.png', 11.99, 90 ) );
products.addProduct( newMilkSmoothie( 6, 'Blueberry Milk', 'images/product/blueberrymilk.png', 11.99, 100 ) );
products.addProduct( newMilkSmoothie( 7, 'Banana Milk', 'images/product/bananamilk.png', 11.99, 6 ) );
products.addProduct( newMilkSmoothie( 8, 'Summer Fruits Milk', 'images/product/summerfruitsmilk.png', 11.99, 2 ) );
/** non-milk smoothies **/
products.addProduct( newSmoothie( 9, 'Strawberry &amp; Banana', 'images/product/stawberrybanana.png', 11.99, 4, true ) );
products.addProduct( newSmoothie( 10, 'Raspberry Pie', 'images/product/raspberrypie.png', 11.99, 4, true ) );
products.addProduct( newSmoothie( 11, 'Blueberry, Rasberry &amp; Blackberry', 'images/product/blueberryraspberryblackberry.png', 11.99, 6, false ) );
products.addProduct( newSmoothie( 12, 'Forest Fruits', 'images/product/forestfruits.png', 11.99, 10, false ) );
