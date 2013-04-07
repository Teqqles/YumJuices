/**
 * Product List
 *
 * Class for handling the product database
 *
 * Author: David Long (dlong06)
 **/

/** namespace to protect against third-party libraries for the Yum product
 * @namespace Yum
 */
var Yum = window.Yum || {};

// static array for storing our homepage top products
Yum.topProducts = [];

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
     *
     * Storage method for adding items to the stock inventory
     *
     * @public
     * @param {Yum.Product} product
     */
    this.addProduct = function( product ) {
        this.products.push( product );
    };

    /**
     * getProduct
     *
     * Retrieves a product object based on id
     *
     * @public
     * @param productId
     * @return {Yum.Product|null}
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
     *
     * Filter based on product category. e.g. juices, smoothies.  More categories can be added at a later date.
     *
     * @public
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
     *
     *
     * @public
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
     * filterTopSellers
     *
     * Used on the homepage
     *
     * @public
     * @param numberOfSellers
     * @return {Array}
     */
    this.filterTopSellers = function( numberOfSellers ) {
        if ( Yum.topProducts.length == 0 ) {
            var productListSorter = new Yum.ProductListSorter( this.products.slice(0) );
            var filter = productListSorter.popularity();
            Yum.topProducts = filter.slice( 0, numberOfSellers );
        }
        return Yum.topProducts;
    };

    /**
     * filterByDairyFree
     *
     * @public
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
     *
     * Main rendering module, selects the stock item and builds the layout for displaying the product.
     *
     * @public
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
                    + '<div class="ingredients">Contains: '
                    + stock[i].ingredients
                    + '</div>'
                    + this.renderBasketControls( stock[i].id )
                    + '</li>';
        }
        product += '</ul>';
        return product;
    };

    /**
     * renderStockLevel
     *
     * @public
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
     *
     * @public
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
     *
     * Method to generate category stock content for pages
     *
     * @public
     * @param category
     * @return {String}
     */
    this.renderCategoryStock = function( category ) {
        var stock = this.filterByCategory( category );
        return this.render( stock );
    };

    /**
     * renderGlutenFreeStock
     *
     * @public
     * @return {String}
     */
    this.renderGlutenFreeStock = function() {
        var stock = this.filterByGlutenFree();
        return this.render( stock );
    };

    /**
     * renderDairyFreeStock
     *
     * @public
     * @return {String}
     */
    this.renderDairyFreeStock = function() {
        var stock = this.filterByDairyFree();
        return this.render( stock );
    };

    /**
     * renderTopSellers
     *
     * Used only on the homepage
     *
     * @public
     * @return {String}
     */
    this.renderTopSellers = function() {
        var stock = this.filterTopSellers( 3 );
        return this.render( stock );
    };
});
