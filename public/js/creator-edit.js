// State management
let content = {
  title: '',
  location: '',
  description: '',
  duration: '',
  cost: '',
  accommodations: [],
  activities: [],
  food: [],
  tips: [],
  images: []
};


function navigateToDashboard(){
  window.location.href = '/home';
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  
  // Check authentication
  if (!isAuthenticated()) {
    window.location.href = '/login';
    return;
  }
  
  // Load blog data if editing
  if (id) {
    fetchBlogData(id);
  }
  
  // Initialize tabs
  initializeTabs();
  
  // Initialize form handlers
  initializeFormHandlers();
});

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

// Form handlers
function initializeFormHandlers() {
  // Basic info form fields
  document.getElementById('title').addEventListener('input', (e) => {
    content.title = e.target.value;
  });
  
  document.getElementById('location').addEventListener('input', (e) => {
    content.location = e.target.value;
  });
  
  document.getElementById('description').addEventListener('input', (e) => {
    content.description = e.target.value;
  });
  
  document.getElementById('duration').addEventListener('input', (e) => {
    content.duration = e.target.value;
  });
  
  document.getElementById('cost').addEventListener('input', (e) => {
    content.cost = e.target.value;
  });
}

// List management
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

// API calls
async function fetchBlogData(id) {
  try {
    const response = await fetch(`/api/blogs/${id}`);
    if (!response.ok) throw new Error('Blog not found');
    
    const data = await response.json();
    content = { ...data };
    populateForm();
  } catch (error) {
    showToast('Failed to load blog data', 'error');
  }
}

async function saveDraft() {
  if (!validateForm()) return;
  
  try {
    const response = await fetch('/api/blogs/draft', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(content)
    });
    
    if (!response.ok) throw new Error('Failed to save draft');
    
    showToast('Draft saved successfully');
  } catch (error) {
    showToast('Failed to save draft', 'error');
  }
}

async function publishBlog() {
  if (!validateForm()) return;
  
  try {
    const response = await fetch('/api/blogs/publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(content)
    });
    
    if (!response.ok) throw new Error('Failed to publish blog');
    
    showToast('Blog published successfully');
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1500);
  } catch (error) {
    showToast('Failed to publish blog', 'error');
  }
}

// Form population
function populateForm() {
  document.getElementById('title').value = content.title;
  document.getElementById('location').value = content.location;
  document.getElementById('description').value = content.description;
  document.getElementById('duration').value = content.duration;
  document.getElementById('cost').value = content.cost;
  
  updateList('accommodations', content.accommodations);
  updateList('activities', content.activities);
  updateList('food', content.food);
  updateList('tips', content.tips);
}

// Validation
function validateForm() {
  const requiredFields = ['title', 'location', 'description'];
  const missingFields = requiredFields.filter(field => !content[field]);
  
  if (missingFields.length > 0) {
    showToast(`Please fill in all required fields: ${missingFields.join(', ')}`, 'error');
    return false;
  }
  
  return true;
}

// Authentication (to be implemented)
function isAuthenticated() {
  // This should check for a valid session/token
  return true;
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