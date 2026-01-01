// Dark Mode Toggle Function
function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
}

// Initialize dark mode toggle button
document.addEventListener('DOMContentLoaded', function() {
    const darkModeButton = document.querySelector('.dark-mode-button');
    if (darkModeButton) {
        darkModeButton.addEventListener('click', toggleDarkMode);
    }
});

