/**
 * 
 */

function renderPage() {

    var products = new Yum.ProductList();
    var basket = new Yum.Basket();

    /** juices **/
    products.addProduct( new Yum.Product( 0, 'Lime Juice', 'lime', 5.99, 50 ) );
    products.addProduct( new Yum.Product( 1, 'Apple Juice', 'apple', 5.99, 15 ) );
    products.addProduct( new Yum.Product( 2, 'Orange Juice', 'orange', 5.99, 30 ) );
    products.addProduct( new Yum.Product( 3, 'Lemon Juice', 'lemon', 5.99, 20 ) );
    products.addProduct( new Yum.Product( 4, 'Grapefruit Juice', 'grapefruit', 5.99, 10 ) );
    /** milk smoothies **/
    products.addProduct( newMilkSmoothie( 5, 'Strawberry Milk', 'stawberrymilk', 11.99, 90 ) );
    products.addProduct( newMilkSmoothie( 6, 'Blueberry Milk', 'blueberrymilk', 11.99, 100 ) );
    products.addProduct( newMilkSmoothie( 7, 'Banana Milk', 'bananamilk', 11.99, 6 ) );
    products.addProduct( newMilkSmoothie( 8, 'Summer Fruits Milk', 'summerfruitsmilk', 11.99, 2 ) );
    /** non-milk smoothies **/
    products.addProduct( newSmoothie( 9, 'Strawberry &amp; Banana', 'stawberrybanana', 11.99, 4, true ) );
    products.addProduct( newSmoothie( 10, 'Raspberry Pie', 'raspberrypie', 11.99, 4, true ) );
    products.addProduct( newSmoothie( 11, 'Blueberry, Rasberry &amp; Blackberry', 'blueberryraspberryblackberry', 11.99, 6, false ) );

    products.addProduct( newSmoothie( 12, 'Forest Fruits', 'forestfruits', 11.99, 10, false ) );

    document.getElementById( 'basket' ).innerHTML = basket.render();
    document.getElementById( 'juices' ).innerHTML = products.renderCategoryStock( 'juice' );
    document.getElementById( 'smoothies' ).innerHTML = products.renderCategoryStock( 'smoothie' );
    document.getElementById( 'glutenfree' ).innerHTML = products.renderGlutenFreeStock();
    document.getElementById( 'dairyfree' ).innerHTML = products.renderDairyFreeStock();

}