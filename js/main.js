// Loading Screen Functionality
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.getElementById('progress-bar');
    const container = document.querySelector('.container');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Hide loading screen and show content
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                container.classList.add('loaded');
            }, 500);
        }
        progressBar.style.width = `${progress}%`;
    }, 200);
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove any existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Copy to clipboard functionality
document.getElementById('copy-btn').addEventListener('click', () => {
    const outputText = document.getElementById('output-text');
    
    if (!outputText.value) {
        showNotification('Nothing to copy!', 'warning');
        return;
    }
    
    navigator.clipboard.writeText(outputText.value)
        .then(() => {
            showNotification('Copied to clipboard!', 'success');
        })
        .catch(err => {
            showNotification('Failed to copy text!', 'error');
            console.error('Could not copy text: ', err);
        });
});

// Clear functionality
document.getElementById('clear-btn').addEventListener('click', () => {
    document.getElementById('input-text').value = '';
    document.getElementById('output-text').value = '';
    showNotification('All fields cleared', 'info');
});
