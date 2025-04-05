// DOM Elements
const paymentForm = document.getElementById('paymentForm');
const paymentMethods = document.querySelectorAll('.payment-method');
const cardNumberInput = document.getElementById('cardNumber');
const expiryDateInput = document.getElementById('expiryDate');
const cvvInput = document.getElementById('cvv');

// Payment method selection
paymentMethods.forEach(method => {
    method.addEventListener('click', () => {
        paymentMethods.forEach(m => m.classList.remove('active'));
        method.classList.add('active');
    });
});

// Format card number
cardNumberInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    e.target.value = value;
});

// Format expiry date
expiryDateInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
    }
    e.target.value = value;
});

// Format CVV
cvvInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
});

// Form validation
function validateForm() {
    let isValid = true;
    const errors = [];

    // Card number validation
    const cardNumber = cardNumberInput.value.replace(/\s/g, '');
    if (cardNumber.length !== 16) {
        isValid = false;
        errors.push('Please enter a valid 16-digit card number');
    }

    // Expiry date validation
    const expiryDate = expiryDateInput.value;
    if (!expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
        isValid = false;
        errors.push('Please enter a valid expiry date (MM/YY)');
    } else {
        const [month, year] = expiryDate.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;
        
        if (parseInt(year) < currentYear || 
            (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
            isValid = false;
            errors.push('Card has expired');
        }
    }

    // CVV validation
    if (cvvInput.value.length !== 3) {
        isValid = false;
        errors.push('Please enter a valid 3-digit CVV');
    }

    // Name validation
    const cardName = document.getElementById('cardName').value;
    if (!cardName.trim()) {
        isValid = false;
        errors.push('Please enter the name on card');
    }

    // Billing address validation
    const billingAddress = document.getElementById('billingAddress').value;
    if (!billingAddress.trim()) {
        isValid = false;
        errors.push('Please enter billing address');
    }

    // Terms and conditions validation
    const termsCheckbox = document.getElementById('terms');
    if (!termsCheckbox.checked) {
        isValid = false;
        errors.push('Please agree to the terms and conditions');
    }

    return { isValid, errors };
}

// Form submission
paymentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const { isValid, errors } = validateForm();

    if (!isValid) {
        // Show error messages
        const errorContainer = document.createElement('div');
        errorContainer.className = 'error-messages';
        errorContainer.innerHTML = `
            <div class="error-header">
                <i class="fas fa-exclamation-circle"></i>
                <h3>Please fix the following errors:</h3>
            </div>
            <ul>
                ${errors.map(error => `<li>${error}</li>`).join('')}
            </ul>
        `;

        // Remove existing error messages
        const existingErrors = document.querySelector('.error-messages');
        if (existingErrors) {
            existingErrors.remove();
        }

        // Add new error messages
        paymentForm.insertBefore(errorContainer, paymentForm.firstChild);

        return;
    }

    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
        <i class="fas fa-spinner fa-spin"></i>
        Processing...
    `;
    submitBtn.disabled = true;

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <h3>Payment Successful!</h3>
                <p>Your subscription has been activated. Redirecting to dashboard...</p>
            </div>
        `;

        // Replace form with success message
        paymentForm.parentNode.replaceChild(successMessage, paymentForm);

        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
            window.location.href = '/dashboard.html';
        }, 3000);

    } catch (error) {
        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-circle"></i>
                <h3>Payment Failed</h3>
                <p>There was an error processing your payment. Please try again.</p>
                <button class="retry-btn" onclick="window.location.reload()">
                    <i class="fas fa-redo"></i>
                    Try Again
                </button>
            </div>
        `;

        // Replace form with error message
        paymentForm.parentNode.replaceChild(errorMessage, paymentForm);
    }
});

// Add styles for error and success messages
const style = document.createElement('style');
style.textContent = `
    .error-messages {
        background-color: #fff3f3;
        border: 1px solid #ffcdd2;
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 1.5rem;
    }

    .error-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
        color: #d32f2f;
    }

    .error-messages ul {
        list-style: none;
        padding-left: 1rem;
    }

    .error-messages li {
        color: #d32f2f;
        margin-bottom: 0.5rem;
    }

    .success-message {
        background-color: #f1f8e9;
        border: 1px solid #c8e6c9;
        border-radius: 8px;
        padding: 2rem;
        text-align: center;
    }

    .success-content i {
        font-size: 3rem;
        color: #4caf50;
        margin-bottom: 1rem;
    }

    .success-content h3 {
        color: #2e7d32;
        margin-bottom: 1rem;
    }

    .error-message {
        background-color: #fff3f3;
        border: 1px solid #ffcdd2;
        border-radius: 8px;
        padding: 2rem;
        text-align: center;
    }

    .error-content i {
        font-size: 3rem;
        color: #d32f2f;
        margin-bottom: 1rem;
    }

    .error-content h3 {
        color: #d32f2f;
        margin-bottom: 1rem;
    }

    .retry-btn {
        background-color: var(--primary-color);
        color: white;
        border: none;
        padding: 0.8rem 1.5rem;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 1rem auto;
    }

    .retry-btn:hover {
        background-color: #357abd;
    }
`;
document.head.appendChild(style); 