

function setFormMessage(formElement, messageType, message){
    const messageElement = formElement.querySelector(".form--message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${messageType}`);
}

 /*element.parentElement() grabs the parent input group of the input field (i.e. username)
  *and sets the message text of the input message element
  */
function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement){
    inputElement.classList.remove("form__input-error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

function validCharacters(inputText){
    return /^[0-9a-zA-Z]+$/.test(inputText);
}
/* DOMContentLoaded event is triggered when initial HTML document has been
*  loaded and parsed. the " document " interface represents the HTML document
*  and allows modification to that HTML document
*
*  DOM: Document Object Model - a programming API for HTML and XML documents
*/

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    const forgotPassword = document.querySelector("#forgotPassword");
    //Document.querySelector() returns the first Element within the document
    //that matches the parameter
    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        //classList property returns the CSS classnames of an element as a DOMTokenList
        //can be accessed by index
        loginForm.classList.add("form--hidden");
        forgotPassword.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        forgotPassword.classList.add("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    document.querySelector("#linkForgotPassword").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        forgotPassword.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });
    
    //Returns to the login page from the Forgot Password page
    document.querySelector("#linkLogin2").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        forgotPassword.classList.add("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    //Login form submission
    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        //login stuff here like AJAX server communication

        setFormMessage(loginForm, "error", "Invalid username or password");
    });

    //input validation
    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if(e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 4) {
                setInputError(inputElement, "Username must be at least 4 characters long.");
            } 
            if(e.target.id === "signupUsername" && validCharacters(e.target.value) == false){
                setInputError(inputElement, "Username may contain alphanumeric characters only.");
            }
        });
        
        inputElement.addEventListener("blur", e => {
            if(e.target.id === "signupPassword" && e.target.value.length > 0 && e.target.value.length < 8 ) {
                setInputError(inputElement, "Password must be at least 8 characters long");
            }
        })    
        
    });
});
2