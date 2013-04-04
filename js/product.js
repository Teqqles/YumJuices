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
 * @param css
 * @param price
 * @param quantity
 * @param id
 */
Yum.Product = (function( id, name, css, price, quantity, ingredients ) {
    this.id       = id;
    this.name     = name;
    this.css      = css;
    this.price    = price;
    this.quantity = quantity;
    this.ingredients = ingredients;
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
 * @param css
 * @param price
 * @param quantity
 * @param gluten
 * @returns {Yum.Product}
 */
function newSmoothie( id, name, css, price, quantity, gluten, ingredients ) {
    var product = new Yum.Product( id, name, css, price, quantity, ingredients );
    product.gluten = gluten;
    product.category = 'smoothie';
    return product;
}

/**
 * newMilkSmoothie - factory function to create gluten & dairy smoothies
 * @param id
 * @param name
 * @param css
 * @param price
 * @param quantity
 * @returns {Yum.Product}
 */
function newMilkSmoothie( id, name, css, price, quantity, ingredients ) {
    var product = new Yum.Product( id, name, css, price, quantity, ingredients );
    product.gluten = true;
    product.dairy = true;
    product.category = 'smoothie';
    return product;
}