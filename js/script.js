const menuOpenButton = document.querySelector('#menu-open-button');
const menuCloseButton = document.querySelector('#menu-close-button');

menuOpenButton.addEventListener('click', () => {
    // Toggle the mobile menu visibility
    document.body.classList.toggle('show-mobile-menu');
    console.log("1")
});

// close the menu when the close button is clicked
menuCloseButton.addEventListener('click', () => menuOpenButton.click());