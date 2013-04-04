/**
 * Product List Sorter
 *
 * Class for handling product ordering
 *
 * Author: David Long (dlong06)
 **/

/** namespace to product against third-party libraries for the Yum product
 * @namespace Yum
 */
var Yum = window.Yum || {};

//global string for keeping track of sorting to stop continuous resorting
Yum.lastSort = 'popularity';

/**
 * ProductListSorter
 * Changes the order of products
 * @class ProductListSorter
 */
Yum.ProductListSorter = (function( productList ) {
    this.products = productList;

    /**
     * name
     * Sort by name, a custom function to sort products by name.  Due to the structure of the content within the array
     * the default sort is not valid for this filter.
     * @returns {Array}
     */
    this.name = function() {
        this.products.sort(
            function(a,b) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
        Yum.lastSort = 'name';
        return this.products;
    };

    this.priceAscending = function() {
        this.products.sort(function(a,b){ return a.price - b.price });
        Yum.lastSort = 'lowprice';
        return this.products;
    };

    this.priceDescending = function() {
        this.products.sort(function(a,b){ return b.price - a.price });
        Yum.lastSort = 'highprice';
        return this.products;
    };

    this.popularity = function() {
        this.products.sort(function(a,b){ return a.quantity - b.quantity });
        Yum.lastSort = 'popularity';
        return this.products;
    };
});
