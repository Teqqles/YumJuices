/**
 * Product
 *
 * Individual Product class, contains all information regarding the product types
 *
 * Author: David Long (dlong06)
 **/

/** namespace to product against third-party libraries for the Yum product
 * @namespace Yum
 */
var Yum = window.Yum || {};

/**
 * @name Yum.Product
 * Product type, encapsulation of Yum Juices products
 * @class Product
 * @constructor
 * @param name
 * @param picture
 * @param price
 * @param quantity
 * @param id
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
    };

    this.removeStock = function() {
        this.quantity--;
    };

});

/**
 * newSmoothie - factory function to create gluten/non-gluten non-dairy smoothies
 * @param id
 * @param name
 * @param picture
 * @param price
 * @param quantity
 * @param gluten
 * @returns {Yum.Product}
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
 * @returns {Yum.Product}
 */
function newMilkSmoothie( id, name, picture, price, quantity ) {
    var product = new Yum.Product( id, name, picture, price, quantity );
    product.gluten = true;
    product.dairy = true;
    product.category = 'smoothie';
    return product;
}