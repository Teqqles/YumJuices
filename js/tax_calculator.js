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
    this.tax = 0.175;

    /**
     * calculateTax
     * @param price
     * @returns {*}
     */
    this.calculateTax = function( price ) {
        return this.applyTax( price, this.tax );
    };

    /**
     * applyTax
     * @param {number} price
     * @param {number} tax
     * @returns {number}
     */
    this.applyTax = function( price, tax ) {
        return tax * price;
    };

});