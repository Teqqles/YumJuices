/**
 * Basket
 *
 * Class for storing the users shopping basket.  The class updates the product list during user activity.
 *
 * Author: David Long (dlong06)
 **/

/** namespace to product against third-party libraries for the Yum product
 * @namespace Yum
 */
var Yum = window.Yum || {};

/**
 * basket - encapsulation of the shopping basket
 * @class
 */
Yum.Basket = ( function() {

    /**
     * @name basketItems
     * @type {Array}
     */
    this.basketItems = [];

    /**
     * add
     * Method for adding product to the basket.  Translates product to item and then stores in basket.
     * @param {Yum.Product} productItem
     */
    this.add = function( productItem ) {
        if ( productItem instanceof Yum.Product && productItem.quantity > 0 ) {
            var item = this.convertProductToItem( productItem );
            this.addItemToBasket( item );
            productItem.removeStock();
        }
    };

    /**
     * remove
     * Method for removing item, or quantity from the basket
     * @param {Yum.Product} productItem
     */
    this.remove = function( productItem ) {
        if ( productItem instanceof Yum.Product ) {
            var item = this.convertProductToItem( productItem );
            if ( this.removeItemFromBasket( item ) ) {
                productItem.addStock();
            }
        }
    };

    /**
     * convertProductToItem
     * Transfers relevant data to compact basket item
     * @param {Yum.Product} product
     * @returns {Yum.Item}
     */
    this.convertProductToItem = function( product ) {
        var item = new Yum.Item();
        item.product_item_id = product.id;
        item.quantity = 1;
        return item;
    };

    /**
     * addItemToBasket
     * increases quantity or adds specified item to basket
     * @param {Yum.Item} item
     */
    this.addItemToBasket = function( item ) {
        var found = false;
        for (var i = 0; i < this.basketItems.length; i++) {
            if ( this.doItemsMatch( this.basketItems[i], item )  ) {
                found = true;
                this.basketItems[i].quantity++;
            }
        }
        if ( !found ) {
            this.basketItems.push( item );
        }
    };

    /**
     * removeItemFromBasket
     * reduces the quantity or removes specified item from basket. Notifies whether product has been removed for stock control
     * @param {Yum.Item} item
     */
    this.removeItemFromBasket = function( item ) {
        var itemRemoved = false;
        for (var i = 0; i < this.basketItems.length; i++) {
            if ( this.doItemsMatch( this.basketItems[i], item )  ) {
                this.basketItems[i].quantity--;
                if( this.basketItems[i].quantity <= 0 ) {
                    this.basketItems.pop( i );
                    itemRemoved = true;
                }
            }
        }
        return itemRemoved;
    };

    this.doItemsMatch = function ( item, matchingItem ) {
        return matchingItem.product_item_id == item.product_item_id;
    };

    /**
     * render
     * Method to generate the contents of the basket for display
     */
    this.render = function() {
        var basket = '<ul>';
        for (var i = 0; i < this.basketItems.length; i++) {
            basket += '<li><span class="name">' + this.basketItems[i].product_item_id + '</span><span class="quantity">' + this.basketItems[i].quantity + '</span></li>';
        }
        basket += '</ul>';
        return basket;
    };
});

