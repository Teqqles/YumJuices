/** namespace to product against third-party libraries for the Yum product
 * @namespace Yum
 */
var Yum = window.Yum || {};

/**
 * Basket
 *
 * Class for storing the users shopping basket.  The class updates the product list during user activity.
 *
 * Author: David Long (dlong06)
 **/

/**
 * @name Product
 * Product type, encapsulation of Yum Juices products
 * @class Product
 * @constructor
 * @param id
 * @param name
 * @param picture
 * @param price
 * @param quantity
 */
Yum.Product = (function( id, name, picture, price, quantity ) {
    this.id     = id;
    this.name     = name;
    this.picture  = picture;
    this.price    = price;
    this.quantity = quantity;
    this.crate = 6;
    this.category = 'juice';
    this.gluten = false;
    this.dairy = false;

    this.addStock = function() {
        this.quantity++;
    }

    this.removeStock = function() {
        this.quantity--;
    }
});

Yum.Item = (function() {
    this.product_item_id = 0;
    this.quantity = 0;
});

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

basket = new Yum.Basket();

test = new Yum.Product( 0, 'Test', 'null', 0.5, 1 );
test2 = new Yum.Product( 1, 'Test', 'null', 0.5, 1 );

basket.add( test );
basket.add( test );
basket.add( test2 );

document.getElementById( 'basket' ).innerHTML = basket.render();






