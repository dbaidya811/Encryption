document.addEventListener('DOMContentLoaded', function() {
    // Prevent default form submission
    const cryptoForm = document.getElementById('crypto-form');
    cryptoForm.addEventListener('submit', function(e) {
        e.preventDefault();
    });
    // DOM Elements
    const textInput = document.getElementById('text');
    const keyInput = document.getElementById('key');
    const encryptBtn = document.getElementById('encrypt-btn');
    const decryptBtn = document.getElementById('decrypt-btn');
    const copyBtn = document.getElementById('copy-btn');
    const clearBtn = document.getElementById('clear-btn');
    const toggleKeyBtn = document.getElementById('toggle-key');
    const generateKeyBtn = document.getElementById('generate-key');
    const resultText = document.getElementById('result-text');
    const alertBox = document.getElementById('alert');
    
    // Event Listeners
    encryptBtn.addEventListener('click', () => processData('encrypt'));
    decryptBtn.addEventListener('click', () => processData('decrypt'));
    copyBtn.addEventListener('click', copyResult);
    clearBtn.addEventListener('click', clearAll);
    toggleKeyBtn.addEventListener('click', toggleKeyVisibility);
    generateKeyBtn.addEventListener('click', generateRandomKey);
    
    // Form element
    const form = document.getElementById('crypto-form');
    const actionInput = document.getElementById('action');
    
    // Functions
    function processData(action) {
        const text = textInput.value.trim();
        const key = keyInput.value.trim();
        
        if (!text) {
            showAlert('Please enter text to ' + action, 'error');
            return;
        }
        
        if (!key) {
            showAlert('Please enter an encryption key', 'error');
            return;
        }
        
        // Set the action value
        actionInput.value = action;
        
        // Create form data from the form
        const formData = new FormData(form);
        
        // Show loading state
        showAlert('Processing...', 'info');
        
        // Send the request to the server
        fetch('/process', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                showAlert(data.error, 'error');
            } else {
                resultText.textContent = data.result;
                copyBtn.disabled = false;
                showAlert(`Text ${action}ed successfully!`, 'success');
            }
        })
        .catch(error => {
            showAlert('An error occurred: ' + error.message, 'error');
        });
    }
    
    function copyResult() {
        const result = resultText.textContent;
        if (result && result !== 'Your encrypted or decrypted text will appear here...') {
            navigator.clipboard.writeText(result)
                .then(() => {
                    showAlert('Result copied to clipboard!', 'success');
                })
                .catch(err => {
                    showAlert('Failed to copy: ' + err, 'error');
                });
        }
    }
    
    function clearAll() {
        textInput.value = '';
        keyInput.value = '';
        resultText.textContent = 'Your encrypted or decrypted text will appear here...';
        copyBtn.disabled = true;
        hideAlert();
    }
    
    function toggleKeyVisibility() {
        const type = keyInput.type === 'password' ? 'text' : 'password';
        keyInput.type = type;
        toggleKeyBtn.innerHTML = type === 'password' ? 
            '<i class="fas fa-eye"></i>' : 
            '<i class="fas fa-eye-slash"></i>';
    }
    
    function generateRandomKey() {
        // Generate a random 32-character key
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let key = '';
        for (let i = 0; i < 32; i++) {
            key += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        keyInput.value = key;
        showAlert('Random key generated! Make sure to save it.', 'success');
    }
    
    function showAlert(message, type) {
        alertBox.textContent = message;
        alertBox.className = `alert ${type === 'success' ? 'success' : ''}`;
        
        // Auto-hide after 5 seconds
        setTimeout(hideAlert, 5000);
    }
    
    function hideAlert() {
        alertBox.className = 'alert hidden';
    }
});
