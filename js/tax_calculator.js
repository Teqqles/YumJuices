/**
 * Tax Calculator
 *
 * Author: David Long (dlong06)
 **/

/** namespace to product against third-party libraries for the Yum product
 * @namespace Yum
 */
var Yum = window.Yum || {};

/**
 * taxCalculator
 * @class
 */
Yum.TaxCalculator = (function() {

    /**
     * @type {number}
     */
    this.tax = 1 + 0.175;

    /**
     * calculateTax
     * @param price
     * @returns {number}
     */
    this.calculateTax = function( price ) {
        return this.applyTax( price );
    };

    /**
     * applyTax
     * @param {number} price
     * @returns {number}
     */
    this.applyTax = function( price ) {
        return this.tax * price;
    };
});