document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
      departureStation: document.getElementById('departureStation').value,
      arrivalStation: document.getElementById('arrivalStation').value,
      category: document.getElementById('category').value,
      price: document.getElementById('price').value,
      departureTime: document.getElementById('departureTime').value,
      arrivalTime: document.getElementById('arrivalTime').value,
      passengerName: document.getElementById('passengerName').value,
      email: document.getElementById('email').value,
      numTickets: document.getElementById('numTickets').value,
      seatNumber: document.getElementById('seatNumber').value,
      trainNumber: document.getElementById('trainNumber').value
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/book'); // Update URL with your backend URL
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        if (response.success) {
          document.getElementById('bookingResult').innerText = 'Booking successful. Inserted ID: ' + response.id;
          setTimeout(function() {
            window.location.href = 'ticket.html';
          }, 5000); // 5000 milliseconds = 5 seconds
        } else {
          document.getElementById('bookingResult').innerText = 'Booking failed.';
        }
      } else {
        console.error('Error:', xhr.statusText);
        document.getElementById('bookingResult').innerText = 'Error occurred during booking.';
      }
    };
    xhr.onerror = function() {
      console.error('Error:', xhr.statusText);
      document.getElementById('bookingResult').innerText = 'Error occurred during booking.';
    };
    xhr.send(JSON.stringify(formData));
  });
});
