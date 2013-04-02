/**
 * Product List
 *
 * Class for handling the product database
 *
 * Author: David Long (dlong06)
 **/

/** namespace to product against third-party libraries for the Yum product
 * @namespace Yum
 */
var Yum = window.Yum || {};

/**
 * ProductList
 * Stores details on all carried stock items
 * @class ProductList
 */
Yum.ProductList = (function() {
    this.products = [];

    /**
     * addProduct
     * Storage method for adding items to the stock inventory
     * @param {Yum.Product} product
     */
    this.addProduct = function( product ) {
        this.products.push( product );
    };

    /**
     * filterByCategory
     * @param category
     * @returns {Array}
     */
    this.filterByCategory = function( category ) {
        var filter = [];
        for( var i = 0; i < this.products.length; i++ ) {
            if( this.products[i].category == category ) {
                filter.push( this.products[i] );
            }
        }

        return filter;
    };

    /**
     * filterByGlutenFree
     * @returns {Array}
     */
    this.filterByGlutenFree = function() {
        var filter = [];
        for( var i = 0; i < this.products.length; i++ ) {
            if( !this.products[i].gluten ) {
                filter.push( this.products[i] );
            }
        }
        return filter;
    };

    /**
     * filterByDairyFree
     * @returns {Array}
     */
    this.filterByDairyFree = function() {
        var filter = [];
        for( var i = 0; i < this.products.length; i++ ) {
            if( !this.products[i].dairy ) {
                filter.push( this.products[i] );
            }
        }
        return filter;
    };

    /**
     * render
     * @param {Array} stock
     * @returns {string}
     */

    this.render = function( stock ) {
        var product = '<ul>';
        for (var i = 0; i < stock.length; i++) {
            product += '<li><span class="name">' + stock[i].name + '</span><span class="quantity">' + stock[i].quantity + '</span></li>';
        }
        product += '</ul>';
        return product;
    };

    /**
     * renderCategoryStock
     * Method to generate the contents of the basket for display
     * @param category
     */
    this.renderCategoryStock = function( category ) {
        var stock = this.filterByCategory( category );
        return this.render( stock );
    };

    /**
     * renderGlutenFreeStock
     * Method to generate the contents of the basket for display
     */
    this.renderGlutenFreeStock = function() {
        var stock = this.filterByGlutenFree();
        return this.render( stock );
    };

    /**
     * renderDairyFreeStock
     * Method to generate the contents of the basket for display
     */
    this.renderDairyFreeStock = function() {
        var stock = this.filterByDairyFree();
        return this.render( stock );
    };
});
