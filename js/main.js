/**
 * Yum Juices
 *
 * Author: David Long (dlong06)
 *
 * Page setup and global functions used to call object-oriented and namespaced code
 **/


/** namespace to protect against third-party libraries for the Yum product
 * @namespace Yum
 */
var Yum = window.Yum || {};

/**
 * basket and product list for the site visitor
 */
Yum.basket   = new Yum.Basket();
Yum.products = new Yum.ProductList( Yum.basket );

/**
 * renderPage
 *
 * Utility called on page load which defines the Yum products and displays the homepage to the user.
 */
function renderPage() {
    showPage( 'home_page' );
    generateExampleText();

    /** Setup our product database **/
    /** juices **/
    Yum.products.addProduct( new Yum.Product( 0, 'Lime Juice', 'lime', 6.99, 50, "Lime Juice, Sweetener, Preservative" ) );
    Yum.products.addProduct( new Yum.Product( 1, 'Apple Juice', 'apple', 4.99, 15, "Apple Juice, Sweetener, Preservative" ) );
    Yum.products.addProduct( new Yum.Product( 2, 'Orange Juice', 'orange', 4.99, 30, "Orange Juice, Sweetener, Preservative" ) );
    Yum.products.addProduct( new Yum.Product( 3, 'Lemon Juice', 'lemon', 5.49, 20, "Lemon Juice, Sweetener, Preservative" ) );
    Yum.products.addProduct( new Yum.Product( 4, 'Grapefruit Juice', 'grapefruit', 6.99, 10, "Grapefruit Juice, Sweetener, Preservative" ) );
    /** milk smoothies **/
    Yum.products.addProduct( newMilkSmoothie( 5, 'Strawberry Milk', 'stawberrymilk', 9.99, 90, "Milk, Strawberries, Colouring, Sweeteners, Preservatives, Stabilizing Agent" ) );
    Yum.products.addProduct( newMilkSmoothie( 6, 'Blueberry Milk', 'blueberrymilk', 11.99, 100, "Milk, Blueberries, Colouring, Sweeteners, Preservatives, Stabilizing Agent"  ) );
    Yum.products.addProduct( newMilkSmoothie( 7, 'Banana Milk', 'bananamilk', 9.99, 6, "Milk, Bananas, Colouring, Sweeteners, Preservatives, Stabilizing Agent" ) );
    Yum.products.addProduct( newMilkSmoothie( 8, 'Summer Fruits Milk', 'summerfruitsmilk', 11.99, 2, "Milk, Blueberries, Blackberries, Raspberries, Colouring, Sweeteners, Preservatives, Stabilizing Agent" ) );
    /** non-milk smoothies **/
    Yum.products.addProduct( newSmoothie( 9, 'Strawberry &amp; Banana', 'stawberrybanana', 9.99, 4, true, "Bananas, Strawberries, Colouring, Sweeteners, Preservatives, Stabilizing Agent" ) );
    Yum.products.addProduct( newSmoothie( 10, 'Raspberry Pie', 'raspberrypie', 10.99, 4, true, "Raspberries, Colouring, Sweeteners, Preservatives, Stabilizing Agent" ) );
    Yum.products.addProduct( newSmoothie( 11, 'Blueberry, Rasberry &amp; Blackberry', 'blueberryraspberryblackberry', 12.99, 6, false, "Blueberries, Raspberries, Colouring, Sweeteners, Preservatives" ) );
    Yum.products.addProduct( newSmoothie( 12, 'Forest Fruits', 'forestfruits', 15.99, 10, false, "Blackberries, Cherries, Colouring, Sweeteners, Preservatives" ) );

    pageSorter( 'popularity' );
}

/**
 * showPage
 *
 * Utility function for selecting an individual page to view within the website.
 *
 * @param pageName
 * @return {Boolean}
 */
function showPage( pageName ) {
    var pages = [];
    pages.push( 'home_page' );
    pages.push( 'juices_page' );
    pages.push( 'smoothies_page' );
    pages.push( 'glutenfree_page' );
    pages.push( 'dairyfree_page' );
    pages.push( 'basket_page' );
    pages.push( 'checkout_page' );
    pages.push( 'thankyou_page' );

    //hide ordering tools from homepage, basket and checkout
    if ( pageName == 'home_page' || pageName == 'basket_page' || pageName == 'checkout_page' || pageName == 'thankyou_page' ) {
        document.getElementById( 'sorter' ).className = "";
    } else {
        document.getElementById( 'sorter' ).className = "visible";
    }

    for( var i = 0; i< pages.length; i++ ) {
        document.getElementById( pages[i] ).className = "page";
    }

    document.getElementById( pageName ).className = "page visible";

    return false; //stop the hyperlink from redirecting to another page
}

/**
 * pageSorter
 *
 * Function for re-ordering page content (uses Yum.ProductListSorter)
 *
 * @param sortBy
 * @return {Boolean}
 */
function pageSorter( sortBy ) {
    // do not update the product array unless we change ordering.
    if ( sortBy != Yum.lastSort ) {
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
    }
    //render pages
    renderPageSections();

    return false; //stop the hyperlink from redirecting to another page
}

/**
 * renderPageSections
 *
 * Defines the content for all page sections by calling the respective object methods.
 */
function renderPageSections() {
    document.getElementById( 'basket' ).innerHTML = Yum.basket.render( Yum.products );
    document.getElementById( 'basket_content').innerHTML = Yum.basket.renderBubble( Yum.products );
    document.getElementById( 'juices' ).innerHTML = Yum.products.renderCategoryStock( 'juice' );
    document.getElementById( 'smoothies' ).innerHTML = Yum.products.renderCategoryStock( 'smoothie' );
    document.getElementById( 'glutenfree' ).innerHTML = Yum.products.renderGlutenFreeStock();
    document.getElementById( 'dairyfree' ).innerHTML = Yum.products.renderDairyFreeStock();
    document.getElementById( 'home' ).innerHTML = Yum.products.renderTopSellers();
}

/**
 * addToBasket
 *
 * Global wrapper for the Yum.Basket.add method
 * @param productId
 */
function addToBasket( productId ) {
    var product = Yum.products.getProduct( productId );
    Yum.basket.add( product );
    renderPageSections();
}

/**
 * removeFromBasket
 *
 * Global wrapper for the Yum.Basket.remove method
 * @param productId
 */
function removeFromBasket( productId ) {
    var product = Yum.products.getProduct( productId );
    Yum.basket.remove( product );
    renderPageSections();
}

/** generateExampleText
 *
 * Initialises fields for displaying example text to the user **/
function generateExampleText() {
    displayExampleText( document.getElementById( "first_name" ) );
    displayExampleText( document.getElementById( "last_name" ) );
    displayExampleText( document.getElementById( "email_address" ) );
    displayExampleText( document.getElementById( "telephone" ) );
    displayExampleText( document.getElementById( "billing_address" ) );
    displayExampleText( document.getElementById( "shipping_address" ) );
    displayExampleText( document.getElementById( "credit_card_number" ) );
}

/** displayExampleText
 *
 * Display example text shown on page load and if data is not entered into a field
 *
 * @param field
 **/
function displayExampleText( field ) {
    if ( field.value == field.title || !field.value ) {
        field.value = field.title;
        field.className = "example";
    }
}

/** hideExampleText
 *
 * Hide example text shown in field before data entry
 *
 * @param field
 **/
function hideExampleText( field ) {
    if ( field.value == field.title ) {
        field.value = "";
        field.className = "";
    }
}

/**
 * processOrder
 *
 * Validates the customer order, showing errors or sending them to the confirmation page if no error found
 */
function processOrder() {
    var formValidation = new Yum.FormValidation();
    formValidation.checkValid( document.getElementById( "first_name" ) );
    formValidation.checkValid( document.getElementById( "last_name" ) );
    formValidation.checkValid( document.getElementById( "email_address" ) );
    formValidation.checkValid( document.getElementById( "telephone" ) );
    formValidation.checkValid( document.getElementById( "billing_address" ) );
    formValidation.checkValid( document.getElementById( "credit_card_number" ) );
    if ( formValidation.noErrors ) {
        //show order completed screen.
        showPage( 'thankyou_page' );
        Yum.basket.clearBasket();
        renderPageSections();
    }
}