// Cached DOM elements for better performance
const submitButton = document.getElementById('submit-btn');
const menuBar = document.querySelector('.menu-bar');
const topElement = document.querySelector('.top');
const menuTitle = document.querySelector('.menu-title');
const bookingForm = document.getElementById('booking-form');
// const notification = document.getElementById('notification');
const closePopupBtn = document.getElementById('closePopupBtn');
const popup = document.getElementById('popup');

// Toggle menu bar active class
menuBar.addEventListener('click', () => {
    menuBar.classList.toggle('active');
    document.querySelector('.menu-items').classList.toggle('active');
});

// Add or remove active class based on scroll position
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    topElement.classList.toggle('active', scrollPosition > 100);
});

// Handle menu item clicks
// menuTitle.addEventListener('click', event => {
//     const menuButton = event.target.closest('.menu-button');
//     if (menuButton) {
//         const target = menuButton.getAttribute('data-title');

//         // Toggle active state for menu items
//         menuTitle.querySelector('.active').classList.remove('active');
//         menuButton.classList.add('active');

//         // Toggle active state for menu content
//         const menuContent = document.querySelector('.menu');
//         menuContent.querySelector('.menu-item-content.active').classList.remove('active');
//         menuContent.querySelector(`.${target}`).classList.add('active');
//     }
// });
// CODE CỦA PHẦN FORM
// Handle form submission with validation
bookingForm.addEventListener('submit', event => {
    event.preventDefault();
    clearErrors();

    const formData = {
        name: bookingForm.name.value.trim(),
        phone: bookingForm.phone.value.trim(),
        time: bookingForm.time.value,
        guests: bookingForm.guests.value,
        email: bookingForm.email.value.trim()
    };

    const validators = {
        name: value => value.length >= 2 || 'Please enter a valid full name.',
        phone: value => /^[0-9]{10,}$/.test(value) || 'Please enter a valid phone number with at least 10 digits.',
        time: value => value !== '' || 'Please select a time.',
        guests: value => parseInt(value) >= 1 || 'Please enter the number of guests (at least 1).',
        email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Please enter a valid email address.'
    };

    let isValid = true;

    for (const [key, validate] of Object.entries(validators)) {
        const errorMessage = validate(formData[key]);
        if (errorMessage !== true) {
            showError(`${key}-error`, errorMessage);
            isValid = false;
        }
    }

    if (isValid) {
        // alert('Form submitted successfully!');
        popup.style.display = 'block'
        setTimeout(function(){
            bookingForm.submit();

        }, 3000)
    }
});

// Show error message below form field
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.style.color = 'red';
}

// Clear all error messages
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(element => element.textContent = '');
}


// Popup

closePopupBtn.addEventListener('click', function(e){
    if (event.target === popup){
        popup.style.display = 'none'
    }
})


document.addEventListener('DOMContentLoaded', function() {
    const menuButtons = document.querySelectorAll('.menu-button');
    const menuContents = document.querySelectorAll('.menu-item-content');

    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            menuButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            menuContents.forEach(content => content.classList.remove('active'));

            const targetId = button.getAttribute('data-title');
            const targetContent = document.querySelector(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
});
