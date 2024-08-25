// Cached DOM elements for better performance
const submitButton = document.getElementById('submit-btn');
const menuBar = document.querySelector('.menu-bar');
const topElement = document.querySelector('.top');
const menuTitle = document.querySelector('.menu-title');
const bookingForm1 = document.getElementById('booking-form-1');
const popup1 = document.getElementById('popup-1');
const closePopupBtn1 = document.getElementById('closePopupBtn-1');


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



bookingForm1.addEventListener('submit', event => {
    event.preventDefault();
    clearErrors1();

    const formData = {
        name: bookingForm1.name.value.trim(),
        phone: bookingForm1.phone.value.trim(),
        time: bookingForm1.time.value,
        guests: bookingForm1.guests.value,
        email: bookingForm1.email.value.trim()
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
            showError1(`${key}-error-1`, errorMessage);
            isValid = false;
        }
    }

    if (isValid) {
        popup1.style.display = 'block';
        setTimeout(() => bookingForm1.submit(), 3000);
    }
});

function showError1(elementId, message) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.style.color = 'red';
}

function clearErrors1() {
    document.querySelectorAll('.error-message').forEach(element => element.textContent = '');
}

closePopupBtn1.addEventListener('click', () => {
    popup1.style.display = 'none';
});
