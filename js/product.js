/**
 * Product
 *
 * Individual Product class, contains all information regarding the product types
 *
 * Author: David Long (dlong06)
 **/

/** namespace to protect against third-party libraries for the Yum product
 * @namespace Yum
 */
var Yum = window.Yum || {};

/**
 * Yum.Product
 *
 * Product type, encapsulation of Yum Juices products.  A wrapper for our complex data type
 *
 * @class Product
 * @constructor
 * @param id
 * @param name
 * @param css
 * @param price
 * @param quantity
 * @param ingredients
 *
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

    /**
     * addStock
     *
     * Used to increment stock when an item is removed from a users basket
     *
     * @public
     */
    this.addStock = function() {
        this.quantity++;
    };

    /**
     * removeStock
     *
     * Used to decrement stock when an item is added to a users basket
     *
     * @public
     */
    this.removeStock = function() {
        this.quantity--;
    };

});

/**
 * newSmoothie
 *
 * factory function to create gluten/non-gluten non-dairy smoothies
 *
 * @param id
 * @param name
 * @param css
 * @param price
 * @param quantity
 * @param gluten
 * @param ingredients
 * @returns {Yum.Product}
 */
function newSmoothie( id, name, css, price, quantity, gluten, ingredients ) {
    var product = new Yum.Product( id, name, css, price, quantity, ingredients );
    product.gluten = gluten;
    product.category = 'smoothie';
    return product;
}

/**
 * newMilkSmoothie
 *
 * factory function to create gluten & dairy smoothies
 *
 * @param id
 * @param name
 * @param css
 * @param price
 * @param quantity
 * @param ingredients
 * @returns {Yum.Product}
 */
function newMilkSmoothie( id, name, css, price, quantity, ingredients ) {
    var product = new Yum.Product( id, name, css, price, quantity, ingredients );
    product.gluten = true;
    product.dairy = true;
    product.category = 'smoothie';
    return product;
}