// API Configuration
const API_URL = 'http://localhost:3000/api/destinations';

// Static destinations data
const staticDestinations = [
    {
        id: 1,
        name: "Paris, France",
        description: "The City of Light, known for its romantic atmosphere, iconic landmarks like the Eiffel Tower, and world-class museums.",
        price: 1200,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
        address: "Paris, Île-de-France, France",
        category: "City",
        latitude: 48.8566,
        longitude: 2.3522,
        duration: "7-10 days"
    },
    {
        id: 2,
        name: "Bali, Indonesia",
        description: "A tropical paradise with stunning beaches, lush rice terraces, and a rich cultural heritage.",
        price: 1500,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
        address: "Bali, Indonesia",
        category: "Island",
        latitude: -8.3405,
        longitude: 115.0920,
        duration: "10-14 days"
    },
    {
        id: 3,
        name: "New York City, USA",
        description: "The city that never sleeps, featuring iconic landmarks like Times Square, Central Park, and the Statue of Liberty.",
        price: 1800,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
        address: "New York, NY, USA",
        category: "City",
        latitude: 40.7128,
        longitude: -74.0060,
        duration: "5-7 days"
    },
    {
        id: 4,
        name: "Tokyo, Japan",
        description: "A vibrant metropolis blending traditional culture with cutting-edge technology and amazing cuisine.",
        price: 2000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
        address: "Tokyo, Japan",
        category: "City",
        latitude: 35.6762,
        longitude: 139.6503,
        duration: "8-12 days"
    },
    {
        id: 5,
        name: "Santorini, Greece",
        description: "Famous for its white-washed buildings, blue domes, and stunning sunsets over the Aegean Sea.",
        price: 1600,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
        address: "Santorini, Greece",
        category: "Island",
        latitude: 36.3932,
        longitude: 25.4615,
        duration: "4-6 days"
    },
    {
        id: 6,
        name: "Sydney, Australia",
        description: "A stunning harbor city with iconic landmarks like the Opera House and Harbour Bridge.",
        price: 2200,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
        address: "Sydney, NSW, Australia",
        category: "City",
        latitude: -33.8688,
        longitude: 151.2093,
        duration: "7-10 days"
    },
    {
        id: 7,
        name: "Cape Town, South Africa",
        description: "A beautiful coastal city with stunning beaches, mountains, and rich cultural heritage.",
        price: 1400,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
        address: "Cape Town, South Africa",
        category: "City",
        latitude: -33.9249,
        longitude: 18.4241,
        duration: "6-8 days"
    },
    {
        id: 8,
        name: "Rio de Janeiro, Brazil",
        description: "Famous for its Carnival, beautiful beaches, and the iconic Christ the Redeemer statue.",
        price: 1300,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
        address: "Rio de Janeiro, Brazil",
        category: "City",
        latitude: -22.9068,
        longitude: -43.1729,
        duration: "5-7 days"
    }
];

// DOM Elements
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const destinationsGrid = document.querySelector('.destinations-grid');
const sortButtons = document.querySelectorAll('.sort-button');
const priceCheckboxes = document.querySelectorAll('input[id^="price"]');
const durationCheckboxes = document.querySelectorAll('input[id^="duration"]');
const ratingCheckboxes = document.querySelectorAll('input[id^="rating"]');

// State
let destinations = [...staticDestinations];
let currentSort = 'price-low';
let activeFilters = {
    priceRanges: [],
    durations: [],
    minRating: null
};

// Debounce function to limit API calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Filter destinations based on criteria
function filterDestinations(destinations, filters) {
    return destinations.filter(destination => {
        // Price range filter
        if (filters.priceRanges && filters.priceRanges.length > 0) {
            const priceInRange = filters.priceRanges.some(range => {
                const [min, max] = range.split('-').map(Number);
                return destination.price >= min && destination.price <= max;
            });
            if (!priceInRange) return false;
        }

        // Duration filter
        if (filters.durations && filters.durations.length > 0) {
            const durationInRange = filters.durations.some(range => {
                const [min, max] = range.split('-').map(Number);
                const destDuration = parseInt(destination.duration);
                return destDuration >= min && destDuration <= max;
            });
            if (!durationInRange) return false;
        }

        // Rating filter
        if (filters.minRating && destination.rating < filters.minRating) {
            return false;
        }

        // Search query filter
        if (filters.query) {
            const searchQuery = filters.query.toLowerCase();
            const matchesName = destination.name.toLowerCase().includes(searchQuery);
            const matchesDescription = destination.description.toLowerCase().includes(searchQuery);
            const matchesAddress = destination.address.toLowerCase().includes(searchQuery);
            if (!matchesName && !matchesDescription && !matchesAddress) return false;
        }

        return true;
    });
}

// Sort destinations
function sortDestinations(destinations, sortType) {
    return [...destinations].sort((a, b) => {
        switch (sortType) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            default:
                return 0;
        }
    });
}

// Update filters
function updateFilters() {
    // Price ranges
    activeFilters.priceRanges = Array.from(priceCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => {
            switch (checkbox.id) {
                case 'price1': return '0-500';
                case 'price2': return '501-1000';
                case 'price3': return '1001-2000';
                case 'price4': return '2000-9999';
                default: return '';
            }
        });

    // Durations
    activeFilters.durations = Array.from(durationCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => {
            switch (checkbox.id) {
                case 'duration1': return '1-3';
                case 'duration2': return '4-7';
                case 'duration3': return '8-14';
                case 'duration4': return '15-30';
                default: return '';
            }
        });

    // Rating
    const checkedRating = Array.from(ratingCheckboxes)
        .find(checkbox => checkbox.checked);
    
    activeFilters.minRating = checkedRating ? 
        parseInt(checkedRating.id.replace('rating', '')) : 
        null;

    // Add search query to filters
    activeFilters.query = searchInput.value.trim();

    // Apply filters and render
    const filteredDestinations = filterDestinations(staticDestinations, activeFilters);
    const sortedDestinations = sortDestinations(filteredDestinations, currentSort);
    renderDestinations(sortedDestinations);
}

// Render destinations
function renderDestinations(destinations) {
    if (destinations.length === 0) {
        destinationsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No destinations found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }

    destinationsGrid.innerHTML = destinations.map(destination => `
        <div class="destination-card">
            <div class="card-image-container">
                <img src="${destination.image}" alt="${destination.name}" class="destination-image">
                <div class="card-category">${destination.category}</div>
            </div>
            <div class="destination-info">
                <h3 class="destination-title">${destination.name}</h3>
                <p class="destination-address">${destination.address}</p>
                <p class="destination-description">${destination.description}</p>
                <div class="destination-details">
                    <div class="price-rating">
                        <p class="destination-price">From $${destination.price}</p>
                        <div class="destination-rating">
                            ${generateStarRating(destination.rating)}
                        </div>
                    </div>
                    <div class="location-coordinates">
                        <span class="location-icon">📍</span>
                        <span>${destination.latitude.toFixed(4)}, ${destination.longitude.toFixed(4)}</span>
                    </div>
                    <div class="duration">
                        <i class="fas fa-clock"></i>
                        <span>${destination.duration}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Generate star rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return `
        ${'★'.repeat(fullStars)}
        ${hasHalfStar ? '½' : ''}
        ${'☆'.repeat(emptyStars)}
        <span class="rating-value">(${rating.toFixed(1)})</span>
    `;
}

// Create debounced search function
const debouncedSearch = debounce(updateFilters, 300);

// Event Listeners
searchInput.addEventListener('input', debouncedSearch);

searchButton.addEventListener('click', updateFilters);

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        updateFilters();
    }
});

// Add event listeners to filter checkboxes
priceCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateFilters);
});

durationCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateFilters);
});

ratingCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateFilters);
});

sortButtons.forEach(button => {
    button.addEventListener('click', () => {
        sortButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const sortType = button.getAttribute('data-sort') || 'price-low';
        currentSort = sortType;
        updateFilters();
    });
});

// Initial render
renderDestinations(destinations);

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