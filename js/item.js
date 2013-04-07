/**
 * Item
 *
 * Small complex data type used within the basket class.
 *
 * Author: David Long (dlong06)
 **/

/** namespace to protect against third-party libraries for the Yum product
 * @namespace Yum
 */
var Yum = window.Yum || {};

/**
 * Item - type for storing in the basket
 * @class
 */

Yum.Item = (function() {
    this.product_item_id = 0;
    this.quantity = 0;
});


