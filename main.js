/**
 *      TO-DO LIST:
 *      Figure out why background colors change only when input is typed
 *      Learn how to organize into seperate JS files
 *      Learn how to bundle together for deployment?
 *      "Minify" the code
 */


/*****************************************************************
 *      Functions to set and clear error and success messages
 * 
 * element.parentElement() grabs the parent input group of the input field (i.e. username)
 * and sets the message text of the input message element
 * 
 * 
 * ****************************************************************
 */
 function setFormMessage(formElement, messageType, message) {
    const messageElement = formElement.querySelector(".form--message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${messageType}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.classList.remove("form__input--success");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function setInputSuccess(inputElement, message) {
    inputElement.classList.add("form__input--success");
    inputElement.parentElement.querySelector(".form__input-success-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

function clearInputSuccess(inputElement) {
    inputElement.classList.remove("form_input--success");
    inputElement.parentElement.querySelector(".form__input-success-message").textContent = "";
}
/**********************************************************************
 *             Account Creation Input Validation  
 * 
 * Function for username and password character validation
 * username: No special characters allowed
 * 
 * USERNAME: the regex [^a-zA-Z0-9] should match a single character 
 * that is not alphanumeric 
 * 
 * PASSWORD: password regex will look for 8 characters, at least one upper and lower case letter, 
 * at least one special character and at aleast one number.
 * 
 * 
 * EMAIL: NOTE: Testing for a valid email address through a regular expression
 * is not good practice. This could potentially filter out unconventional
 * but perfectly valid email addresses.
 *
 *  TO DO: Find a fancier way to validate email
 * 
 * DATE OF BIRTH: Regex will look for the date format of MM/DD/YYYY. The user must be at least 13 years
 * of age.
 */
function invalidCharacters(inputText) {
    const invalidRegex = /[^a-zA-Z0-9]/g;
    return ((typeof inputText === 'undefined' || inputText === null || inputText === "") ? true : invalidRegex.test(inputText));
}

function usernameLength(inputText) {
    return (inputText.length > 0 && inputText.length < 4);
}

function validPassword(inputText) {
    const passwordRegex = /^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/g;
    return (passwordRegex.test(inputText));
}

function comparePasswords(inputText, password) {
    if (typeof inputText === 'undefined' || inputText === null || inputText === "") {
        return false;
    }
    if (typeof password === 'undefined' || password === null || password === "") {
        return false;
    }
    return (inputText == password);
}

function validEmail(inputText) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(inputText);
}

function validBirthday(inputText){
    const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    if(dateRegex.test(inputText) === false){
        return false;
    } else {
        let tokens = inputText.split("/");
        let currentDay = new Date();
        let userDOB = new Date(tokens[0] + "/" + tokens[1] + "/" + tokens[2]);
        if(currentDay.getFullYear() - userDOB.getFullYear() > 13){
            return true;
        } else {
            return false;
    }
}
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
            if (event.target.id === "signupUsername") {
                if (event.target.value.length > 0 && event.target.value.length < 4) {
                    createAccountForm.addEventListener("submit", event => {
                        //event.preventDefault();
                        clearInputSuccess(inputElement);
                        clearInputError(inputElement);
                        setInputError(inputElement, "Username must be at least 4 characters long.");
                    });
                } else if (invalidCharacters(event.target.value) === true) {
                    createAccountForm.addEventListener("submit", event => {
                        //event.preventDefault();
                        clearInputSuccess(inputElement);
                        clearInputError(inputElement);
                        setInputError(inputElement, "Username may contain alphanumeric characters only.");
                    });
                } else if (invalidCharacters(event.target.value) === false) {
                    createAccountForm.addEventListener("submit", event => {
                        //event.preventDefault();
                        clearInputError(inputElement);
                        setInputSuccess(inputElement, "Username is valid!");
                    });
                }

            }
            //Enter email
            if (event.target.id === "signupEmail") {
                if (validEmail(event.target.value)) {
                    createAccountForm.addEventListener("submit", event => {
                        //event.preventDefault();
                        clearInputError(inputElement);
                        setInputSuccess(inputElement, "Email address is valid");
                    });
                } else if(!(validEmail(event.target.value))){
                    createAccountForm.addEventListener("submit", event => {
                        //event.preventDefault();
                        clearInputSuccess(inputElement);
                        clearInputError(inputElement);
                        setInputError(inputElement, "Please enter a valid email address");
                    });
                }
            }
             // Password
             if (event.target.id === "signupPassword") {
                if (validPassword(event.target.value)) {
                    createAccountForm.addEventListener("submit", event => {
                        //event.preventDefault();
                        clearInputError(inputElement);
                        setInputSuccess(inputElement, "Password is valid!");
                    });
                } else if (!(validPassword(event.target.value))) {
                    createAccountForm.addEventListener("submit", event => {
                        //event.preventDefault();
                        clearInputSuccess(inputElement);
                        clearInputError(inputElement);
                        setInputError(inputElement, "Password must: Be at least 8 characters long. " +
                            "Contain at least one number, one special character," +
                            " an upper and a lower chase letter");
                    });
                }
            }
            // Confirm Password
            let password = document.getElementById("signupPassword").value;
            if (event.target.id === "confirmPassword"){
                if(validPassword(password) && comparePasswords(event.target.value, password)) {
                createAccountForm.addEventListener("submit", event => {
                    //event.preventDefault();
                    clearInputError(inputElement);
                    setInputSuccess(inputElement, "Passwords match!");
                });
            } else if (comparePasswords(event.target.value, password) === false) {
                createAccountForm.addEventListener("submit", event => {
                    //event.preventDefault();
                    clearInputSuccess(inputElement);
                    clearInputError(inputElement);
                    setInputError(inputElement, "Passwords do not match");
                });
            }
        }
            //Verify user's age
            if(event.target.id === "userDOB"){
                if(validBirthday(event.target.value)){
                createAccountForm.addEventListener("submit", event => {
                    event.preventDefault();;
                    clearInputError(inputElement);
                    setInputSuccess(inputElement,"");
                })
                } else if(validBirthday(event.target.value) === false){
                    createAccountForm.addEventListener("submit", event => {
                        event.preventDefault();
                        clearInputSuccess(inputElement);
                        clearInputError(inputElement);
                        setInputError(inputElement,"Please enter a valid date.");
                    })
                }
            }
            // Clear messages when input is detected
            inputElement.addEventListener("input", event =>{
                //event.preventDefault();
                clearInputSuccess(inputElement);
                clearInputError(inputElement);

            });
        })

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
    })
});