// Initialize Lucide icons
lucide.createIcons();

// Mock blog data for edit mode
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

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// Initialize state
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

// DOM Elements
const titleInput = document.getElementById('title');
const locationInput = document.getElementById('location');
const descriptionInput = document.getElementById('description');
const backButton = document.getElementById('backButton');
const saveButton = document.getElementById('saveButton');
const pageTitle = document.getElementById('pageTitle');
const travelerTypesContainer = document.getElementById('travelerTypes');

// Initialize traveler type checkboxes
function initializeTravelerTypes() {
    travelerTypes.forEach(type => {
        const div = document.createElement('div');
        div.className = 'traveler-type';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = type.id;
        checkbox.value = type.id;
        
        const label = document.createElement('label');
        label.htmlFor = type.id;
        label.textContent = type.label;
        
        div.appendChild(checkbox);
        div.appendChild(label);
        travelerTypesContainer.appendChild(div);
        
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                content.travelerTypes.push(type.id);
            } else {
                content.travelerTypes = content.travelerTypes.filter(t => t !== type.id);
            }
        });
    });
}

// Initialize list management functions
function initializeListManagement(listId, newItemId, addButtonId, category) {
    const listContainer = document.getElementById(listId);
    const newItemInput = document.getElementById(newItemId);
    const addButton = document.getElementById(addButtonId);
    
    function addItem() {
        const value = newItemInput.value.trim();
        if (!value) return;
        
        content[category].push(value);
        renderList();
        newItemInput.value = '';
    }
    
    function removeItem(index) {
        content[category] = content[category].filter((_, i) => i !== index);
        renderList();
    }
    
    function renderList() {
        listContainer.innerHTML = '';
        content[category].forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'list-item';
            
            const span = document.createElement('span');
            span.textContent = item;
            
            const removeButton = document.createElement('button');
            removeButton.className = 'btn-ghost';
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => removeItem(index);
            
            div.appendChild(span);
            div.appendChild(removeButton);
            listContainer.appendChild(div);
        });
    }
    
    addButton.addEventListener('click', addItem);
    newItemInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addItem();
    });
    
    renderList();
}

// Load blog data if in edit mode
function loadBlogData() {
    if (id && mockBlogData[id]) {
        content = { ...mockBlogData[id] };
        titleInput.value = content.title;
        locationInput.value = content.location;
        descriptionInput.value = content.description;
        
        // Check traveler type checkboxes
        content.travelerTypes.forEach(type => {
            const checkbox = document.getElementById(type);
            if (checkbox) checkbox.checked = true;
        });
        
        pageTitle.textContent = 'Edit Travel Blog';
    }
}

// Save blog
function handleSave() {
    // Validate form
    if (!content.title || !content.location || !content.description || content.travelerTypes.length === 0) {
        alert('Please fill in all required fields and select at least one traveler type.');
        return;
    }
    
    // Save logic would go here in a real app
    alert(id ? 'Blog updated successfully!' : 'Blog created successfully!');
    window.location.href = '/creator/dashboard';
}

// Event Listeners
titleInput.addEventListener('input', (e) => content.title = e.target.value);
locationInput.addEventListener('input', (e) => content.location = e.target.value);
descriptionInput.addEventListener('input', (e) => content.description = e.target.value);
backButton.addEventListener('click', () => window.location.href = '/creator/dashboard');
saveButton.addEventListener('click', handleSave);

// Initialize
initializeTravelerTypes();
initializeListManagement('accommodationsList', 'newAccommodation', 'addAccommodation', 'accommodations');
initializeListManagement('activitiesList', 'newActivity', 'addActivity', 'activities');
initializeListManagement('foodList', 'newFood', 'addFood', 'food');
initializeListManagement('tipsList', 'newTip', 'addTip', 'tips');
loadBlogData(); 