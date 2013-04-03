/**
 *
 * Author: David Long (dlong06)
 **/


/** namespace to product against third-party libraries for the Yum product
 * @namespace Yum
 */
var Yum = window.Yum || {};

Yum.basket   = new Yum.Basket();
Yum.products = new Yum.ProductList( Yum.basket );

function renderPage() {
    showPage( 'home_page' );

    /** Setup our product database **/
    /** juices **/
    Yum.products.addProduct( new Yum.Product( 0, 'Lime Juice', 'lime', 6.99, 50 ) );
    Yum.products.addProduct( new Yum.Product( 1, 'Apple Juice', 'apple', 4.99, 15 ) );
    Yum.products.addProduct( new Yum.Product( 2, 'Orange Juice', 'orange', 4.99, 30 ) );
    Yum.products.addProduct( new Yum.Product( 3, 'Lemon Juice', 'lemon', 5.49, 20 ) );
    Yum.products.addProduct( new Yum.Product( 4, 'Grapefruit Juice', 'grapefruit', 6.99, 10 ) );
    /** milk smoothies **/
    Yum.products.addProduct( newMilkSmoothie( 5, 'Strawberry Milk', 'stawberrymilk', 9.99, 90 ) );
    Yum.products.addProduct( newMilkSmoothie( 6, 'Blueberry Milk', 'blueberrymilk', 11.99, 100 ) );
    Yum.products.addProduct( newMilkSmoothie( 7, 'Banana Milk', 'bananamilk', 9.99, 6 ) );
    Yum.products.addProduct( newMilkSmoothie( 8, 'Summer Fruits Milk', 'summerfruitsmilk', 11.99, 2 ) );
    /** non-milk smoothies **/
    Yum.products.addProduct( newSmoothie( 9, 'Strawberry &amp; Banana', 'stawberrybanana', 9.99, 4, true ) );
    Yum.products.addProduct( newSmoothie( 10, 'Raspberry Pie', 'raspberrypie', 10.99, 4, true ) );
    Yum.products.addProduct( newSmoothie( 11, 'Blueberry, Rasberry &amp; Blackberry', 'blueberryraspberryblackberry', 12.99, 6, false ) );
    Yum.products.addProduct( newSmoothie( 12, 'Forest Fruits', 'forestfruits', 15.99, 10, false ) );

    pageSorter( 'name' );

}

function showPage( pageName ) {
    var pages = [];
    pages.push( 'home_page' );
    pages.push( 'juices_page' );
    pages.push( 'smoothies_page' );
    pages.push( 'glutenfree_page' );
    pages.push( 'dairyfree_page' );
    pages.push( 'basket_page' );
    pages.push( 'checkout_page' );

    for( var i = 0; i< pages.length; i++ ) {
        document.getElementById( pages[i] ).className = "page";
    }

    document.getElementById( pageName ).className = "page visible";

    return false; //stop the hyperlink from redirecting to another page
}

function pageSorter( sortBy ) {
    var sorter = new Yum.ProductListSorter( Yum.products.products );
    switch( sortBy ) {
        case 'lowprice' :
            Yum.products.products = sorter.priceAscending();
            break;
        case 'highprice' :
            Yum.products.products = sorter.priceDescending();
            break;
        case 'popularity' :
            Yum.products.products = sorter.popularity();
            break;
        case 'name' :
        default :
            Yum.products.products = sorter.name();
            break;
    }
    //render pages
    renderPageSections();

    return false; //stop the hyperlink from redirecting to another page
}

function renderPageSections() {
    document.getElementById( 'basket' ).innerHTML = Yum.basket.render();
    document.getElementById( 'juices' ).innerHTML = Yum.products.renderCategoryStock( 'juice' );
    document.getElementById( 'smoothies' ).innerHTML = Yum.products.renderCategoryStock( 'smoothie' );
    document.getElementById( 'glutenfree' ).innerHTML = Yum.products.renderGlutenFreeStock();
    document.getElementById( 'dairyfree' ).innerHTML = Yum.products.renderDairyFreeStock();
}

function addToBasket( productId ) {
    var product = Yum.products.getProduct( productId );
    Yum.basket.add( product );
    renderPageSections();
}

function removeFromBasket( productId ) {
    var product = Yum.products.getProduct( productId );
    Yum.basket.remove( product );
    renderPageSections();
}