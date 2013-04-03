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
 * @constructor
 * @param {Yum.Basket} basket
 */
Yum.ProductList = (function( basket ) {
    this.products = [];
    this.basket = basket;

    /**
     * addProduct
     * Storage method for adding items to the stock inventory
     * @param {Yum.Product} product
     */
    this.addProduct = function( product ) {
        this.products.push( product );
    };

    /**
     * getProduct
     * @param productId
     * @return {*}
     */
    this.getProduct = function( productId ) {
        for( var i = 0; i < this.products.length; i++ ) {
            if( this.products[i].id == productId ) {
                return this.products[i];
            }
        }
        return null;
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
            product += '<li class="'
                    + stock[i].css
                    + '"><h3 class="name">'
                    + stock[i].name
                    + '</h3>'
                    + '<div class="price">Our Price: &pound;'
                    + stock[i].price
                    + '</div>'
                    + this.renderStockLevel( stock[i].quantity )
                    + this.renderBasketControls( stock[i].id )
                    + '</li>';
        }
        product += '</ul>';
        return product;
    };

    /**
     * renderStockLevel
     * @return {String}
     * @param {Number} quantity
     */

    this.renderStockLevel = function( quantity ) {
        var stock = '<div class="quantity'
        /** no stock left **/
        if ( quantity <= 0 ) {
            stock +=  ' lowstock';
        }
        stock += '">';
        if ( quantity <= 0 ) {
            stock += 'Out of stock';
        } else if( quantity < 10 ) {
            stock += 'Only ' + quantity + ' left in stock';
        } else {
            stock += 'In stock.';
        }
        stock += '</div>';
        return stock;
    };

    /**
     * renderBasketControls
     * @param productId
     * @return {String}
     */
    this.renderBasketControls = function ( productId ) {
        return '<div class="order"><span class="remove"><a href="#" onclick="removeFromBasket( ' + productId + ' );return false;">-</a></span>'
             + '<span class="item_order">'
             + this.basket.getItemQuantity( productId )
             + '</span><span class="add"><a href="#" onclick="addToBasket( ' + productId + ' );return false;">+</a></span>'
             + ' <span class="add_to_basket"><a href="#" onclick="addToBasket( ' + productId + ' );return false;">Add to Basket</a></span></div>';
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
