// Search functionality
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');

// Add input event listener for real-time search
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    filterDestinations(searchTerm);
});

// Keep the button click handler for explicit search
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    filterDestinations(searchTerm);
});

// Enhanced filter functionality
function filterDestinations(searchTerm) {
    const cards = document.querySelectorAll('.destination-card');
    let hasResults = false;

    cards.forEach(card => {
        const title = card.querySelector('.destination-title').textContent.toLowerCase();
        const description = card.querySelector('.destination-description').textContent.toLowerCase();
        const price = card.querySelector('.destination-price').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || 
            description.includes(searchTerm) || 
            price.includes(searchTerm)) {
            card.style.display = 'block';
            hasResults = true;
        } else {
            card.style.display = 'none';
        }
    });

    // Show a "no results" message
    const noResultsMessage = document.querySelector('.no-results-message');
    if (!hasResults) {
        if (!noResultsMessage) {
            const message = document.createElement('div');
            message.className = 'no-results-message';
            message.textContent = 'No destinations found matching your search.';
            document.querySelector('.destinations-grid').appendChild(message);
        }
    } else if (noResultsMessage) {
        noResultsMessage.remove();
    }
}

// Sort functionality
const sortButtons = document.querySelectorAll('.sort-button');
sortButtons.forEach(button => {
    button.addEventListener('click', () => {
        sortButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        // Add sorting logic here
    });
});

// Responsive menu toggle
if (window.innerWidth <= 1024) {
    const filters = document.querySelector('.filters');
    const sortOptions = document.querySelector('.sort-options');
    
    // Add toggle buttons for mobile view
    const filterToggle = document.createElement('button');
    filterToggle.textContent = 'Filters';
    filterToggle.style.cssText = 'position: fixed; bottom: 20px; left: 20px; padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;';
    
    const sortToggle = document.createElement('button');
    sortToggle.textContent = 'Sort';
    sortToggle.style.cssText = 'position: fixed; bottom: 20px; right: 20px; padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;';
    
    document.body.appendChild(filterToggle);
    document.body.appendChild(sortToggle);
    
    filterToggle.addEventListener('click', () => {
        filters.classList.toggle('active');
    });
    
    sortToggle.addEventListener('click', () => {
        sortOptions.classList.toggle('active');
    });
} 