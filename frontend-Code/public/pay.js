document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    const billingAddress = document.getElementById('billingAddress').value;
    const amount = document.getElementById('amount').value;

    if (!validateCardNumber(cardNumber) || !validateExpiryDate(expiryDate) || !validateCVV(cvv)) {
      document.getElementById('paymentMessage').innerHTML = `
        <div class="alert alert-danger" role="alert">
          Please check your card details.
        </div>
      `;
      return;
    }

    const data = { cardNumber, expiryDate, cvv, billingAddress, amount };

    // Send payment data to the server for processing
    axios.post('http://localhost:3000/api/processPayment', data)
      .then(response => {
        // Handle response if needed (e.g., show success message, redirect to success page)
        console.log(response.data);
        window.location.href = `payment-success.html?amount=${amount}`;
      })
      .catch(error => {
        console.error('Error processing payment:', error);
        document.getElementById('paymentMessage').innerHTML = `
          <div class="alert alert-danger" role="alert">
            Payment failed. Please try again later.
          </div>
        `;
      });
});

// Card number validation function (basic example)
function validateCardNumber(cardNumber) {
  return /^\d{12,16}$/.test(cardNumber); // Assuming 12-16 digit card number format
}

// Expiry date validation function (basic example)
function validateExpiryDate(expiryDate) {
  return /^\d{2}\/\d{4}$/.test(expiryDate); // Assuming MM/YYYY format
}

// CVV validation function (basic example)
function validateCVV(cvv) {
  return /^\d{3,4}$/.test(cvv); // Assuming 3-4 digit CVV format
}