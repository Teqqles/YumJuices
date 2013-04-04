/**
 * Discount Calculator
 *
 * Author: David Long (dlong06)
 **/

/** namespace to product against third-party libraries for the Yum product
 * @namespace Yum
 */
var Yum = window.Yum || {};

/**
 * discountCalculator
 * @class
 */
Yum.discountCalculator = (function() {

    /**
     * @type {number}
     */
    this.discount = 1 - 0.125;

    /**
     * calculateDiscount
     * @param {Yum.Item} item
     * @param {Yum.Project} product
     * @returns {number}

     */
    this.calculateDiscount = function( item, product ) {
        var price = 0.0;
        price = item.quantity + product.price;
        if ( item.quantity >= 5 ) {
            price = this.applyDiscount( price );
        }
        return price;
    };

    /**
     * applyDiscount
     * @param {number} price
     * @returns {number}
     */
    this.applyDiscount = function( price ) {
        return this.discount * price;
    };
});