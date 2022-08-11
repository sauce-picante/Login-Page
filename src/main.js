/*****************************************************************
 *      Functions to set and clear error and success messages
 * 
 * element.parentElement() grabs the parent input group of the input field (i.e. username)
 * and sets the message text of the input message element
 * 
 * ****************************************************************
 */

 function setFormMessage(formElement, messageType, message){
    const messageElement = formElement.querySelector(".form--message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${messageType}`);
}

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
    inputElement.classList.remove("form_input--success");
    inputElement.parentElement.querySelector(".form__input-success-message").textContent = "";
}
/**********************************************************************
 *             Account Creation Input Validation  
 * 
 * Function for username and password character validation
 * username: No special characters allowed
 * 
 * the regex [^a-zA-Z0-9] should match a single character 
 * that is not alphanumeric 
 * 
 * password regex will look for 8 characters, at least one upper and lower case letter, 
 * at least one special character and at aleast one number.
 * 
 *   NOTE: Testing for a valid email address through a regular expression
 * is not good practice. This could potentially filter out unconventional
 * but perfectly valid email addresses.
 *
 * TO DO: Find a fancier way to validate email
 * 
 * TO DO: Fix Valid Username prompt upon mouse clicking the field
 */
function invalidCharacters(inputText){
    const invalidRegex = /[^a-zA-Z0-9]/g;
    return ((typeof inputText === 'undefined' || inputText === null || inputText === "") ? true : invalidRegex.test(inputText));
}

function usernameLength(inputText){
    return (inputText.length > 0 && inputText.length < 4);
}

function validPassword(inputText){
    const passwordRegex = /^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/g;
    return (passwordRegex.test(inputText));
}

function comparePasswords(inputText, password){
    if(typeof inputText === 'undefined' || inputText === null || inputText === ""){
        return false;
    }
    if(typeof password === 'undefined' || password === null || password === ""){
        return false;
    }
    return (inputText == password);
}
function validEmail(inputText){
    const emailRegex= / \S+@\S+\.\S+/;
    return emailRegex.test(inputText);
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
    
    /************************************************
     ***** Account Creation form input
     ***********************************************
     */
    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", event => {
            event.preventDefault();
            
            // Username 
              if(event.target.id === "signupUsername" && event.target.value.length > 0 && event.target.value.length < 4) {
                    setInputError(inputElement, "Username must be at least 4 characters long.");
                
             } else if(event.target.id === "signupUsername" && invalidCharacters(event.target.value) === true){
                    setInputError(inputElement, "Username may contain alphanumeric characters only.");
               
             } else if (event.target.id === "signupUsername" && invalidCharacters(event.target.value) === false) {
                    setInputSuccess(inputElement, "Username is valid!");
              }
            // Password
              if(event.target.id === "signupPassword" && validPassword(event.target.value) === true){
                setInputSuccess(inputElement, "Password is valid!");
                }else if(event.target.id === "signupPassword" && validPassword(event.target.value) === false) {
                    setInputError(inputElement, "Password must: Be at least 8 characters long. "
                                                + "Contain at least one number, one special character,"
                                                + " an upper and a lower chase letter");
                                        
            }
            
            // Confirm Password
            let password = document.getElementById("signupPassword").value;
            if(event.target.id === "confirmPassword" && validPassword(password) && comparePasswords(event.target.value, password)){
                 setInputSuccess(inputElement, "Passwords match!");
            } else if(event.target.id === "confirmPassword" && comparePasswords(event.target.value, password) === false){
                setInputError(inputElement, "Passwords do not match");
                
            }
            
          //Enter email
            if(event.target.id === "signupEmail"){
                if(validEmail(event.target.value) === true){
                    setInputSuccess(inputElement, "Email address is valid");
                } else {
                    setInputError(inputElement, "Please enter a valid email address");
                }
            }
        });
        // Clear messages when input is detected
        inputElement.addEventListener("keypress", event => {
                clearInputSuccess(inputElement);
                clearInputError(inputElement);
                
        });
     });

    /**************************************************
     *         Form Submission Events
     **************************************************/
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
});
