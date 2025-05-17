// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check if user has a theme preference in local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.checked = true;
    }
    
    // Toggle theme on switch change
    themeToggle.addEventListener('change', () => {
        body.classList.toggle('dark-theme');
        
        // Save theme preference to local storage
        const isDarkTheme = body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
        
        // Show notification
        showNotification(`${isDarkTheme ? 'Dark' : 'Light'} theme activated`, 'info');
    });
});
