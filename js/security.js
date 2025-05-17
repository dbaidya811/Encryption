// Disable right-click
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Disable keyboard shortcuts for developer tools
document.addEventListener('keydown', (e) => {
    // Disable F12
    if (e.key === 'F12') {
        e.preventDefault();
    }

    // Disable Ctrl+Shift+I and Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
    }

    // Disable Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
    }

    // Disable Ctrl+U (View Source)
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
    }
});

// Disable developer tools through console
setInterval(() => {
    const devtools = /./;
    devtools.toString = function() {
        this.opened = true;
    }
    console.log('%c', devtools);

    if (devtools.opened) {
        devtools.opened = false;
        // Optional: Redirect or show warning
        // window.location.href = window.location.href;
    }
}, 1000);

// Additional security measures
(function() {
    // Disable source view
    document.onkeypress = function (event) {
        event = (event || window.event);
        if (event.keyCode == 123) {
            return false;
        }
    }
    document.onmousedown = function (event) {
        event = (event || window.event);
        if (event.keyCode == 123) {
            return false;
        }
    }
    document.onkeydown = function (event) {
        event = (event || window.event);
        if (event.keyCode == 123) {
            return false;
        }
    }

    // Disable text selection
    document.onselectstart = function() {
        return false;
    };

    // Disable copy
    document.oncopy = function() {
        return false;
    };

    // Clear console on open
    console.clear();
    
    // Console warning
    console.log(
        '%cStop!', 
        'color: red; font-size: 30px; font-weight: bold;'
    );
    console.log(
        '%cThis is a security feature. Developer tools are not allowed on this page.', 
        'color: red; font-size: 16px;'
    );
})();
