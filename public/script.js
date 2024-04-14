document.getElementById('questionnaireForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var gender = document.getElementById('gender').value;
    var feedback = document.getElementById('feedback').value;

    // Send form data to the server
    fetch('http://localhost:3000/submit-questionnaire', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, age, gender, feedback })
    })
    .then(response => response.json())
    .then(data => {
        // Show modal for successful submission
        $('#successModal').modal('show');
        // Reset the form
        document.getElementById('questionnaireForm').reset();
    })
    .catch(error => console.error('Error:', error));
});
