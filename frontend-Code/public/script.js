document.getElementById('registrationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    fetch('/register', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('message').innerHTML = `<p>${data.message}</p>`;
    })
    .catch(error => console.error('Error:', error));
  });
  