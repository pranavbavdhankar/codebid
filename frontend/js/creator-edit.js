// Mock data
const mockBlogData = {
  '1': {
    title: 'My Solo Adventure in Paris',
    location: 'Paris, France',
    coordinates: [2.3522, 48.8566],
    description: 'A wonderful week exploring the City of Lights as a solo traveler.',
    travelerTypes: ['solo', 'budget'],
    accommodations: ['Budget-friendly hostel in Le Marais', 'Small boutique hotel near Montmartre'],
    activities: ['Walking tours of historic neighborhoods', 'Museum visits with Paris Pass', 'Seine river cruise'],
    food: ['Affordable bistros', 'Bakeries for breakfast', 'Street crepes'],
    tips: ['Visit museums on the first Sunday for free entry', 'Use Navigo weekly pass for unlimited transit'],
    images: []
  },
  '2': {
    title: 'Family Trip to Barcelona',
    location: 'Barcelona, Spain',
    coordinates: [2.1734, 41.3851],
    description: 'Our amazing family vacation to Barcelona with kids aged 5 and 8.',
    travelerTypes: ['family'],
    accommodations: ['Family apartment near Sagrada Familia', 'Kid-friendly hotel with pool'],
    activities: ['Park Güell exploration', 'Beach days', 'Interactive museums'],
    food: ['Family-friendly tapas restaurants', 'Markets with various options', 'Ice cream spots'],
    tips: ['Visit attractions early to avoid crowds', 'Consider skip-the-line tickets with kids'],
    images: []
  }
};

const travelerTypes = [
  { id: 'solo', label: 'Solo Traveler' },
  { id: 'solo-female', label: 'Solo Female Traveler' },
  { id: 'couple', label: 'Couple / Honeymoon' },
  { id: 'family', label: 'Family with Kids' },
  { id: 'budget', label: 'Budget Traveler' },
  { id: 'luxury', label: 'Luxury Traveler' }
];

// State management
let content = {
  title: '',
  location: '',
  coordinates: [0, 0],
  description: '',
  travelerTypes: [],
  accommodations: [],
  activities: [],
  food: [],
  tips: [],
  images: []
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  
  // Check authentication (mock)
  if (!isAuthenticated()) {
    window.location.href = '/login.html';
    return;
  }
  
  // Load blog data if editing
  if (id && mockBlogData[id]) {
    content = { ...mockBlogData[id] };
    document.getElementById('page-title').textContent = 'Edit Travel Blog';
    populateForm();
  }
  
  // Initialize traveler types
  initializeTravelerTypes();
  
  // Initialize image upload
  initializeImageUpload();

  // Initialize tabs
  initializeTabs();
});

// Form population
function populateForm() {
  document.getElementById('title').value = content.title;
  document.getElementById('location').value = content.location;
  document.getElementById('description').value = content.description;
  
  updateList('accommodations', content.accommodations);
  updateList('activities', content.activities);
  updateList('food', content.food);
  updateList('tips', content.tips);
  
  updateImages();
}

// List management
function updateList(category, items) {
  const list = document.getElementById(`${category}-list`);
  list.innerHTML = '';
  
  items.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <span>${item}</span>
      <button class="remove-button" onclick="removeItem('${category}', ${index})">
        <i class="fas fa-times"></i>
      </button>
    `;
    list.appendChild(div);
  });
}

function addItem(category) {
  const input = document.getElementById(`new-${category}`);
  const value = input.value.trim();
  
  if (value) {
    content[category].push(value);
    updateList(category, content[category]);
    input.value = '';
  }
}

function removeItem(category, index) {
  content[category].splice(index, 1);
  updateList(category, content[category]);
}

// Traveler types
function initializeTravelerTypes() {
  const container = document.getElementById('traveler-types');
  container.innerHTML = '';
  
  travelerTypes.forEach(type => {
    const div = document.createElement('div');
    div.className = 'traveler-type';
    div.innerHTML = `
      <input type="checkbox" id="${type.id}" 
        ${content.travelerTypes.includes(type.id) ? 'checked' : ''}
        onchange="handleTravelerTypeChange('${type.id}', this.checked)">
      <label for="${type.id}">${type.label}</label>
    `;
    container.appendChild(div);
  });
}

function handleTravelerTypeChange(typeId, checked) {
  if (checked) {
    content.travelerTypes.push(typeId);
  } else {
    content.travelerTypes = content.travelerTypes.filter(t => t !== typeId);
  }
}

// Image handling
function initializeImageUpload() {
  const uploadArea = document.getElementById('upload-area');
  
  uploadArea.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = handleImageUpload;
    input.click();
  });
  
  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.backgroundColor = '#f0f0f0';
  });
  
  uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.backgroundColor = '';
  });
  
  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.backgroundColor = '';
    handleImageUpload(e);
  });
}

function handleImageUpload(event) {
  const files = event.target.files || event.dataTransfer.files;
  
  for (let file of files) {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        content.images.push(e.target.result);
        updateImages();
      };
      reader.readAsDataURL(file);
    }
  }
}

function updateImages() {
  const grid = document.getElementById('image-grid');
  
  if (content.images.length === 0) {
    grid.innerHTML = '<p class="no-images">No images uploaded yet</p>';
    return;
  }
  
  grid.innerHTML = '';
  content.images.forEach((img, index) => {
    const div = document.createElement('div');
    div.className = 'image-item';
    div.innerHTML = `
      <img src="${img}" alt="Travel image">
      <button class="remove-button" onclick="removeImage(${index})">
        <i class="fas fa-times"></i>
      </button>
    `;
    grid.appendChild(div);
  });
}

function removeImage(index) {
  content.images.splice(index, 1);
  updateImages();
}

// Form submission
function handleSave() {
  // Get form values
  content.title = document.getElementById('title').value;
  content.location = document.getElementById('location').value;
  content.description = document.getElementById('description').value;
  
  // Validate form
  if (!content.title || !content.location || !content.description || content.travelerTypes.length === 0) {
    showToast('Please fill in all required fields and select at least one traveler type.', 'error');
    return;
  }
  
  // Save logic would go here in a real app
  showToast('Blog saved successfully!', 'success');
  navigateToDashboard();
}

// Navigation
function navigateToDashboard() {
  window.location.href = '/creator/dashboard.html';
}

// Authentication (mock)
function isAuthenticated() {
  return true; // In a real app, this would check for a valid session
}

// Toast notifications
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Tab functionality
function initializeTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      switchTab(tabId);
    });
  });
}

function switchTab(tabId) {
  // Update tab buttons
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    if (button.getAttribute('data-tab') === tabId) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });

  // Update tab panes
  const tabPanes = document.querySelectorAll('.tab-pane');
  tabPanes.forEach(pane => {
    if (pane.id === `${tabId}-tab`) {
      pane.classList.add('active');
    } else {
      pane.classList.remove('active');
    }
  });
} 