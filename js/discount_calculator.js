/**
 * Discount Calculator
 *
 * Author: David Long (dlong06)
 **/

/** namespace to protect against third-party libraries for the Yum product
 * @namespace Yum
 */
var Yum = window.Yum || {};

/**
 * DiscountCalculator
 * @class
 */
Yum.DiscountCalculator = (function() {

    /** discount
     *
     * 12.5% discount rate
     *
     * @type {number}
     */
    this.discount = 0.125;

    /** quantity
     *
     * Number of items that must be purchased to receive discount
     *
     * @type {number}
     */
    this.quantity = 5;

    /**
     * calculateCost
     *
     * Calculates the cost of goods prior to adding discount
     *
     * @param {Yum.Item} item
     * @param {Yum.Product} product
     * @returns {number}
     */
    this.calculateCost = function( item, product ) {
        var price = 0.0;
        price = item.quantity * product.price;
        return price;
    };

    /**
     * calculateDiscount
     *
     * Calculates the discount due to the customer
     *
     * @param {number} quantity
     * @param {number} price
     * @return {number}
     */
    this.calculateDiscount = function( quantity, price ) {
        var discount = 0.0;
        if ( quantity >= this.quantity ) {
            discount = this.applyDiscount( price );
        }
        return discount;
    };

    /**
     * applyDiscount
     *
     * Applies discount rate to purchase price
     *
     * @param {number} price
     * @returns {number}
     */
    this.applyDiscount = function( price ) {
        return this.discount * price;
    };
});