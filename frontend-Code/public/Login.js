document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
    document.getElementById('loginMessage').innerHTML = `
      <div class="alert alert-danger" role="alert">
        Please enter your email and password.
      </div>
    `;
    return;
  }
  //naveen is a bad boy bro......!

  const data = { email, password };

  axios.post('http://localhost:3000/api/login', data)
    .then(response => {
      document.getElementById('loginMessage').innerHTML = `
        <div class="alert alert-success" role="alert">
          Login successful! Redirecting to home page...
        </div>
      `;
      // Store user data in localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(response.data));

      // Redirect to profile page with username and email as URL parameters
      const username = response.data.username;
      const userEmail = response.data.email;
      setTimeout(function() {
        window.location.href = `/frontend/public/home.html?username=${username}`;
      }, 3000); // Wait for 3 seconds before redirecting
    })
    .catch(error => {
      console.error('Error logging in:', error);
      document.getElementById('loginMessage').innerHTML = `
        <div class="alert alert-danger" role="alert">
          Login failed. Please check your credentials and try again.
        </div>
      `;
    });
});
