$(document).ready(function () {
    
    // Feature: Toggle Password Visibility
    $('#togglePassword').on('click', function () {
        const passwordInput = $('#userPassword');
        const currentType = passwordInput.attr('type');
        
        if (currentType === 'password') {
            passwordInput.attr('type', 'text');
            $(this).text('Hide');
        } else {
            passwordInput.attr('type', 'password');
            $(this).text('Show');
        }
    });

    // Feature: Form Submission and Validation
    $('#registrationForm').on('submit', function (e) {
        e.preventDefault(); // Prevent standard form submission

        // Retrieve field values
        const name = $('#userName').val().trim();
        const email = $('#userEmail').val().trim();
        const phone = $('#userPhone').val().trim();
        const password = $('#userPassword').val().trim();

        // Array to store collected error messages
        let errors = [];

        // 1. Validate Required Fields
        if (!name || !email || !phone || !password) {
            errors.push("All fields are required.");
        }

        // 2. Validate Email Format
        if (email && !isValidEmail(email)) {
            errors.push("Please enter a valid email address (e.g., user@example.com).");
        }

        // 3. Validate Phone Number (Exactly 10 digits)
        if (phone && !isValidPhone(phone)) {
            errors.push("Phone number must be exactly 10 digits.");
        }

        // 4. Validate Password Strength
        if (password && !isValidPassword(password)) {
            errors.push("Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.");
        }

        // Display outcome based on validation results
        if (errors.length > 0) {
            displayMessage(errors.join("<br>"), "error");
        } else {
            displayMessage("Form submitted successfully!", "success");
            $('#registrationForm')[0].reset(); // Clear form fields
            $('#togglePassword').text('Show'); // Reset toggle button
            $('#userPassword').attr('type', 'password');
        }
    });

    // --- Modular Validation Functions ---

    /**
     * Checks if the email matches a standard pattern.
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Checks if the phone number contains exactly 10 digits.
     */
    function isValidPhone(phone) {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    }

    /**
     * Checks if the password has min 8 chars, 1 uppercase, 1 lowercase, and 1 number.
     */
    function isValidPassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W]{8,}$/;
        return passwordRegex.test(password);
    }

    /**
     * Handles displaying success and error messages in the DOM.
     * @param {string} messageHtml - The text/html to display.
     * @param {string} type - "error" or "success".
     */
    function displayMessage(messageHtml, type) {
        const messageBox = $('#messageBox');
        
        // Remove existing classes, add the new type class, and inject HTML
        messageBox.removeClass('error success')
                  .addClass(type)
                  .html(messageHtml)
                  .fadeIn();
    }
});