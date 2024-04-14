let currentPage = 1; // Current page of records
const recordsPerPage = 2; // Number of records per page

// Function to fetch and display responses based on current page
function fetchAndDisplayResponses() {
    const start = (currentPage - 1) * recordsPerPage;
    fetch(`/responses?start=${start}&limit=${recordsPerPage}`)
    .then(response => response.json())
    .then(data => {
        const responsesList = document.getElementById('responsesList');

        // Clear previous responses
        responsesList.innerHTML = '';

        // Display each response
        data.forEach(response => {
            const responseItem = document.createElement('div');
            responseItem.classList.add('card', 'mb-3');

            const responseCardBody = document.createElement('div');
            responseCardBody.classList.add('card-body');

            responseCardBody.innerHTML = `
                <h5 class="card-title">${response.name}</h5>
                <p class="card-text">Age: ${response.age}</p>
                <p class="card-text">Gender: ${response.gender}</p>
                <p class="card-text">Feedback: ${response.feedback}</p>
            `;

            responseItem.appendChild(responseCardBody);
            responsesList.appendChild(responseItem);
        });
    })
    .catch(error => console.error('Error:', error));
}

// Function to handle "Next" button click
function nextPage() {
    currentPage++;
    fetchAndDisplayResponses();
}

// Function to handle "Previous" button click
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchAndDisplayResponses();
    }
}

// Fetch and display responses for the initial page
document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayResponses();
});

