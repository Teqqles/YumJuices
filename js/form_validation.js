/**
 * Form Validation
 *
 * Author: David Long (dlong06)
 **/

/** namespace to protect against third-party libraries for the Yum product
 * @namespace Yum
 */
var Yum = window.Yum || {};

/**
 * formValidation
 * @class
 */
Yum.FormValidation = (function() {

    this.noErrors = true;

    /**
     * isValid
     *
     * Wrapper for the specialised field validation functions.
     *
     * Applies validation for each field in the checkout
     *
     * @private
     * @param {String} content
     * @param {String} id
     * @return {boolean}
     **/
    function isValid( content, id ) {
        switch( id ) {
            // any alphanumeric data is valid for first name, billing address and last name
            case "first_name" :
            case "last_name" :
            case "billing_address" :
                return content.length > 0;
            case "telephone" :
                //basic numeric validation for the telephone number
                return isValidNumber( content );
            case "credit_card_number" :
                //credit card numbers have 16 digits
                return isValidNumber( content ) && content.length == 16;
            case "email_address" :
                return isValidEmail( content );
        }
        return false;
    }

    /** displayHelpText
     *
     * Displays the help text associated with a field
     *
     * @private
     * @param field
     *
     **/
    function displayHelpText( field ) {
        document.getElementById( "errorDisplay_" + field.id ).className = "formError";
    }

    /** hideHelpText
     *
     * Hides the graphical help text displayed on a field
     *
     * @private
     * @param field
     **/
    function hideHelpText( field ) {
        document.getElementById( "errorDisplay_" + field.id ).className = "formHidden";
    }

    /** isValidNumber
     *
     * Checks to ensure the field contains only numeric data
     *
     * @private
     * @param {String} number
     * @return {boolean}
     **/
    function isValidNumber( number ) {
        return number.search( /^[\d]+$/gi ) != -1;
    }

    /** isValidEmail
     *
     * Checks to ensure the field contains only valid e-mail characters
     *
     * @private
     * @param {String} email
     * @return {Boolean}
     */
    function isValidEmail( email ) {
        return email.search( /^[\w\d._%+-]+@[\w\d.-]+\.[\w]{2,4}$/gi ) != -1;
    }

    /** checkValid
     *
     * Checks for valid data in form fields and displays a red highlight if an error is found
     *
     * @public
     * @param field
     */
    this.checkValid = function( field ) {
        hideHelpText( field );
        document.getElementById( "label_" + field.id ).className = field.className = "";
        if ( !isValid( field.value, field.id ) || field.value == field.title ) {
            this.noErrors = false;
            document.getElementById( "label_" + field.id ).className = field.className = "error";
            displayHelpText( field );
        }
    };

});