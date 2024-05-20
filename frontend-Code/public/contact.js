document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Get form data
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
  
    // You can perform validation here if needed
    
    // Example alert message
    const alertMessage = `
      Thank you for contacting us, ${name}! We will get back to you soon.
    `;
  
    // Display the alert message
    document.getElementById('contactMessage').innerHTML = `
      <div class="alert alert-success" role="alert">
        ${alertMessage}
      </div>
    `;
  
    // Clear the form after submission
    event.target.reset();
  });
  