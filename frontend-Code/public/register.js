document.getElementById('registrationForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const form = new FormData(this);
  const formData = Object.fromEntries(form.entries());
  
  fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log(data);
      // Display success message with inserted ID
      document.getElementById('registrationMessage').innerHTML = `
          <div class="alert alert-success" role="alert">
              Registration successful! User ID: ${data.insertId}
          </div>
      `;
      // Wait 5 seconds before redirecting to login page
      setTimeout(() => {
          window.location.href = 'login.html'; // Redirect to login page
      }, 5000);
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      // Display error message
      document.getElementById('registrationMessage').innerHTML = `
          <div class="alert alert-danger" role="alert">
              Registration failed. Please try again later.
          </div>
      `;
  });
});
