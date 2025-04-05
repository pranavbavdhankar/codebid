// Sample destination data
const destinations = {
  'swiss-alps': {
    name: 'Swiss Alps, Switzerland',
    rating: '★★★★☆ (4.5)',
    price: 'Starting from $1,299',
    mainImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    thumbnails: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
    ],
    description: 'Experience the breathtaking beauty of the Swiss Alps with world-class skiing, charming mountain villages, and stunning panoramic views. Perfect for adventure seekers and nature lovers.',
    highlights: [
      'World-class skiing and snowboarding',
      'Scenic train rides through mountain passes',
      'Traditional Swiss mountain villages',
      'Hiking trails with breathtaking views'
    ],
    itinerary: [
      {
        day: 'Day 1',
        activities: 'Arrival in Zurich, transfer to mountain resort'
      },
      {
        day: 'Day 2',
        activities: 'Skiing and snowboarding lessons'
      },
      {
        day: 'Day 3',
        activities: 'Mountain hiking and village exploration'
      }
    ],
    pricing: {
      basic: '$1,299',
      premium: '$1,899',
      luxury: '$2,499'
    }
  },
  'amazon-rainforest': {
    name: 'Amazon Rainforest, Brazil',
    rating: '★★★★★ (4.8)',
    price: 'Starting from $899',
    mainImage: 'https://images.unsplash.com/photo-1522199710521-72d69614c702',
    thumbnails: [
      'https://images.unsplash.com/photo-1522199710521-72d69614c702',
      'https://images.unsplash.com/photo-1522199710521-72d69614c702',
      'https://images.unsplash.com/photo-1522199710521-72d69614c702'
    ],
    description: 'Immerse yourself in the world\'s largest rainforest. Discover exotic wildlife, indigenous cultures, and unique ecosystems through guided jungle tours and river cruises.',
    highlights: [
      'Guided jungle tours',
      'River cruises',
      'Wildlife spotting',
      'Indigenous cultural experiences'
    ],
    itinerary: [
      {
        day: 'Day 1',
        activities: 'Arrival in Manaus, transfer to jungle lodge'
      },
      {
        day: 'Day 2',
        activities: 'Morning jungle hike, afternoon river cruise'
      },
      {
        day: 'Day 3',
        activities: 'Visit indigenous village, night safari'
      }
    ],
    pricing: {
      basic: '$899',
      premium: '$1,299',
      luxury: '$1,799'
    }
  },
  'maldives': {
    name: 'Maldives',
    rating: '★★★★★ (4.9)',
    price: 'Starting from $2,499',
    mainImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    thumbnails: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'
    ],
    description: 'Escape to paradise with crystal-clear waters, overwater bungalows, and pristine white-sand beaches. Perfect for honeymooners and luxury travelers seeking ultimate relaxation.',
    highlights: [
      'Luxury overwater bungalows',
      'Private beach access',
      'Snorkeling and diving',
      'Spa and wellness treatments'
    ],
    itinerary: [
      {
        day: 'Day 1',
        activities: 'Arrival and resort check-in'
      },
      {
        day: 'Day 2',
        activities: 'Snorkeling and water activities'
      },
      {
        day: 'Day 3',
        activities: 'Spa day and sunset cruise'
      }
    ],
    pricing: {
      basic: '$2,499',
      premium: '$3,299',
      luxury: '$4,499'
    }
  }
};

// Function to load destination data
function loadDestinationData() {
  const urlParams = new URLSearchParams(window.location.search);
  const destinationId = urlParams.get('id');
  
  if (destinationId && destinations[destinationId]) {
    const destination = destinations[destinationId];
    
    // Update page title
    document.title = `${destination.name} - Wanderlust`;
    
    // Update header information
    document.getElementById('destination-name').textContent = destination.name;
    document.getElementById('destination-rating').textContent = destination.rating;
    document.getElementById('destination-price').textContent = destination.price;
    
    // Update images
    document.getElementById('main-image').src = destination.mainImage;
    const thumbnails = document.querySelectorAll('.thumbnail');
    destination.thumbnails.forEach((src, index) => {
      if (thumbnails[index]) {
        thumbnails[index].src = src;
      }
    });
    
    // Update description
    document.getElementById('destination-description').textContent = destination.description;
    
    // Update highlights
    const highlightsList = document.getElementById('destination-highlights');
    highlightsList.innerHTML = '';
    destination.highlights.forEach(highlight => {
      const li = document.createElement('li');
      li.textContent = highlight;
      highlightsList.appendChild(li);
    });
    
    // Update itinerary
    const itineraryDays = document.getElementById('itinerary-days');
    itineraryDays.innerHTML = '';
    destination.itinerary.forEach(day => {
      const dayDiv = document.createElement('div');
      dayDiv.className = 'itinerary-day';
      dayDiv.innerHTML = `
        <h3>${day.day}</h3>
        <p>${day.activities}</p>
      `;
      itineraryDays.appendChild(dayDiv);
    });
    
    // Update pricing
    const priceBreakdown = document.getElementById('price-breakdown');
    priceBreakdown.innerHTML = `
      <div class="price-option">
        <h3>Basic Package</h3>
        <p>${destination.pricing.basic}</p>
      </div>
      <div class="price-option">
        <h3>Premium Package</h3>
        <p>${destination.pricing.premium}</p>
      </div>
      <div class="price-option">
        <h3>Luxury Package</h3>
        <p>${destination.pricing.luxury}</p>
      </div>
    `;
  } else {
    // Redirect to home page if destination not found
    window.location.href = './home.html';
  }
}

// Load destination data when page loads
document.addEventListener('DOMContentLoaded', loadDestinationData); 