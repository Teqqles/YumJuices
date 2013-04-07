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
 * DiscountCalculator
 * @class
 */
Yum.DiscountCalculator = (function() {

    /**
     * @type {number}
     */
    this.discount = 0.125;

    /**
     * calculateCost
     * @param {Yum.Item} item
     * @param {Yum.Project} product
     * @returns {number}
     */
    this.calculateCost = function( item, product ) {
        var price = 0.0;
        price = item.quantity * product.price;
        return price;
    };

    /**
     * calculateDiscount
     * @param {nuumber} quantity
     * @param {number} price
     * @return {number}
     */
    this.calculateDiscount = function( quantity, price ) {
        var discount = 0.0;
        if ( quantity >= 5 ) {
            discount = this.applyDiscount( price );
        }
        return discount;
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