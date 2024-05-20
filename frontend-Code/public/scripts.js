// Wait for the document to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get references to form elements
    const paymentForm = document.getElementById('paymentForm');
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryDateInput = document.getElementById('expiryDate');
    const cvvInput = document.getElementById('cvv');
    const billingAddressInput = document.getElementById('billingAddress');

    // Add event listener to the form for submission
    paymentForm.addEventListener('submit', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();
        
        // Validate form inputs before submitting
        if (validateCardNumber(cardNumberInput) && validateExpiryDate(expiryDateInput) && validateCVV(cvvInput) && validateBillingAddress(billingAddressInput)) {
            // If all validations pass, submit the form
            paymentForm.submit();
        } else {
            // If any validation fails, display error messages or handle accordingly
            alert('Please check the payment information and try again.');
        }
    });

    // Function to validate card number
    function validateCardNumber(input) {
        // Implement card number validation logic here (e.g., check length, format, etc.)
        return input.value.trim().length === 12; // Example validation (16-digit card number)
    }

    // Function to validate expiry date
    function validateExpiryDate(input) {
        // Implement expiry date validation logic here (e.g., check format, future date, etc.)
        return /^\d{2}\/\d{4}$/.test(input.value.trim()); // Example validation (MM/YYYY format)
    }

    // Function to validate CVV/CVC
    function validateCVV(input) {
        // Implement CVV/CVC validation logic here (e.g., check length, numeric value, etc.)
        return /^\d{3}$/.test(input.value.trim()); // Example validation (3-digit CVV/CVC)
    }

    // Function to validate billing address
    function validateBillingAddress(input) {
        // Implement billing address validation logic here (e.g., check length, special characters, etc.)
        return input.value.trim().length >= 5; // Example validation (minimum 5 characters)
    }
});
