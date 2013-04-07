/**
 * Tax Calculator
 *
 * Author: David Long (dlong06)
 **/

/** namespace to protect against third-party libraries for the Yum product
 * @namespace Yum
 */
var Yum = window.Yum || {};

/**
 * taxCalculator
 * @class
 */
Yum.TaxCalculator = (function() {

    /**
     * tax
     *
     * Taxation at 17.5%.  Added as a type to simplify change.
     *
     * @type {number}
     */
    this.tax = 0.175;

    /**
     * calculateTax
     *
     * Calculates the tax rate and returns the result.
     *
     * @param {number} price
     * @returns {number}
     */
    this.calculateTax = function( price ) {
        return this.applyTax( price, this.tax );
    };

    /**
     * applyTax
     *
     * Applies tax rate to the price of goods
     *
     * @param {number} price
     * @param {number} tax
     * @returns {number}
     */
    this.applyTax = function( price, tax ) {
        return tax * price;
    };

});