/******************************************************************
 *********  JavaScript code for the login page
 *
 * 
 * ****************************************************************
 */

function setFormMessage(formElement, messageType, message){
    const messageElement = formElement.querySelector(".form--message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${messageType}`);
}

 /*
  * Functions to set and clear error and success messages
  *
  *  element.parentElement() grabs the parent input group of the input field (i.e. username)
  *  and sets the message text of the input message element
  */
function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}
function setInputSuccess(inputElement, message){
    inputElement.classList.add("form__input--success");
    inputElement.parentElement.querySelector(".form__input-success-message").textContent = message;
}
function clearInputError(inputElement){
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}
function clearInputSuccess(inputElement){
    inputElement.classList.remove("form_input-success");
    inputElement.parentElement.querySelector(".form__input-success-message").textContent = "";
}
/*
 * Function for username and password character validation
 * username: No special characters allowed
 * 
 * the regex [^a-zA-Z0-9] should match a single character 
 * that is not alphanumeric 
 * 
 * password: must contain at least one upper and lower case letter, 
 * at least one special character and at aleast one number.
 */
function invalidCharacters(inputText){
    var specialChar = /[^a-zA-Z0-9]/g;
    var username = inputText;
    return (specialChar.test(username));
}

function usernameLength(inputText){
    const username = inputText;
    return (username.length > 0 && username.length < 4);
}

function validPassword(inputText){
    const password = inputText;
    const pattern = /^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/g;
    return (pattern.test(inputText));
}
/* DOMContentLoaded event is triggered when initial HTML document has been
*  loaded and parsed. the " document " interface represents the HTML document
*  and allows modification to that HTML document
*
*  querySelector will look for id's in the HTML
*
*  DOM: Document Object Model - a programming API for HTML and XML documents
*/

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    const forgotPassword = document.querySelector("#forgotPassword");
    //Document.querySelector() returns the first Element within the document
    //that matches the parameter
    document.querySelector("#linkCreateAccount").addEventListener("click", event => {
        event.preventDefault();
        //classList property returns the CSS classnames of an element as a DOMTokenList
        //can be accessed by index
        loginForm.classList.add("form--hidden");
        forgotPassword.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
       
    });

    document.querySelector("#linkLogin").addEventListener("click", event => {
        event.preventDefault();
        loginForm.classList.remove("form--hidden");
        forgotPassword.classList.add("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    document.querySelector("#linkForgotPassword").addEventListener("click", event => {
        event.preventDefault();
        loginForm.classList.add("form--hidden");
        forgotPassword.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });
    
    //Returns to the login page from the Forgot Password page
    document.querySelector("#linkLogin2").addEventListener("click", event => {
        event.preventDefault();
        loginForm.classList.remove("form--hidden");
        forgotPassword.classList.add("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    //Login form submission
    loginForm.addEventListener("click", event => {
        
        event.preventDefault();
        
        //login stuff here like AJAX server communication

        setFormMessage(loginForm, "error", "Invalid username or password");
    });

    //Account creation submission
    createAccountForm.addEventListener("submit", event => {
        event.preventDefault();
    });

    //Forgot password submission
    forgotPassword.addEventListener("submit", event => {
        event.preventDefault();
    });
    /************************************************
     ***** Account Creation form input
     ************************************************/

    
        document.querySelectorAll(".form__input").forEach(inputElement => {
         inputElement.addEventListener("blur", event => {
            event.preventDefault();
              if(event.target.id === "signupUsername" && event.target.value.length > 0 && event.target.value.length < 4) {
                    setInputError(inputElement, "Username must be at least 4 characters long.");
                
             } else if(event.target.id === "signupUsername" && invalidCharacters(event.target.value) === true){
                    setInputError(inputElement, "Username may contain alphanumeric characters only.");
               
             } else if (event.target.id === "signupUsername" && invalidCharacters(event.target.value) === false) {
                    setInputSuccess(inputElement, "Username is valid!");
              }

              if(event.target.id === "signupPassword" && validPassword(event.target.value) === false){
                    setInputError(inputElement, "Password must: Be at least 8 characters long. Contain at least one number, one special character, an upper and a lower chase letter");
              } else if(event.target.id === "signupPassword" && validPassword(event.target.value) === true){
                    setInputSuccess(inputElement, "Password is valid!");
              }
            });
            inputElement.addEventListener("input", event => {
                    clearInputError(inputElement);
                    clearInputSuccess(inputElement);
            })
     });
    
    
});
