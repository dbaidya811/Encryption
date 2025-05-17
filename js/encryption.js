// Encryption Module Main Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Algorithm selection
    const algorithmButtons = document.querySelectorAll('.algorithm-btn');
    const keyInputs = document.querySelectorAll('.key-input');
    const algorithmInfos = document.querySelectorAll('.algorithm-info');
    let currentAlgorithm = 'caesar'; // Default algorithm
    
    // Set up algorithm selection
    algorithmButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            algorithmButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Get selected algorithm
            currentAlgorithm = button.getAttribute('data-algorithm');
            
            // Show corresponding key input
            keyInputs.forEach(input => {
                if (input.classList.contains(currentAlgorithm)) {
                    input.classList.remove('hidden');
                } else {
                    input.classList.add('hidden');
                }
            });
            
            // Show corresponding algorithm info
            algorithmInfos.forEach(info => {
                if (info.id === `${currentAlgorithm}-info`) {
                    info.classList.remove('hidden');
                } else {
                    info.classList.add('hidden');
                }
            });
            
            showNotification(`${currentAlgorithm.toUpperCase()} algorithm selected`, 'info');
        });
    });
    
    // Encrypt button functionality
    document.getElementById('encrypt-btn').addEventListener('click', () => {
        const inputText = document.getElementById('input-text').value.trim();
        
        if (!inputText) {
            showNotification('Please enter text to encrypt', 'warning');
            return;
        }
        
        try {
            let result;
            
            switch (currentAlgorithm) {
                case 'caesar':
                    const caesarShift = parseInt(document.getElementById('caesar-key').value);
                    result = caesarCipher(inputText, caesarShift);
                    break;
                case 'vigenere':
                    const vigenereKey = document.getElementById('vigenere-key').value.trim();
                    if (!vigenereKey) {
                        showNotification('Please enter a keyword for Vigenère cipher', 'warning');
                        return;
                    }
                    result = vigenereCipher(inputText, vigenereKey);
                    break;
                case 'aes':
                    const aesKey = document.getElementById('aes-key').value.trim();
                    if (!aesKey) {
                        showNotification('Please enter a secret key for AES encryption', 'warning');
                        return;
                    }
                    result = aesEncrypt(inputText, aesKey);
                    break;
                case 'rsa':
                    const publicKey = document.getElementById('public-key').value.trim();
                    if (!publicKey) {
                        showNotification('Please generate or enter RSA keys first', 'warning');
                        return;
                    }
                    result = rsaEncrypt(inputText, publicKey);
                    break;
            }
            
            document.getElementById('output-text').value = result;
            showNotification('Text encrypted successfully', 'success');
        } catch (error) {
            showNotification(`Encryption failed: ${error.message}`, 'error');
            console.error('Encryption error:', error);
        }
    });
    
    // Decrypt button functionality
    document.getElementById('decrypt-btn').addEventListener('click', () => {
        const inputText = document.getElementById('input-text').value.trim();
        
        if (!inputText) {
            showNotification('Please enter text to decrypt', 'warning');
            return;
        }
        
        try {
            let result;
            
            switch (currentAlgorithm) {
                case 'caesar':
                    const caesarShift = parseInt(document.getElementById('caesar-key').value);
                    result = caesarDecipher(inputText, caesarShift);
                    break;
                case 'vigenere':
                    const vigenereKey = document.getElementById('vigenere-key').value.trim();
                    if (!vigenereKey) {
                        showNotification('Please enter a keyword for Vigenère cipher', 'warning');
                        return;
                    }
                    result = vigenereDecipher(inputText, vigenereKey);
                    break;
                case 'aes':
                    const aesKey = document.getElementById('aes-key').value.trim();
                    if (!aesKey) {
                        showNotification('Please enter a secret key for AES decryption', 'warning');
                        return;
                    }
                    result = aesDecrypt(inputText, aesKey);
                    break;
                case 'rsa':
                    const privateKey = document.getElementById('private-key').value.trim();
                    if (!privateKey) {
                        showNotification('Please generate or enter RSA keys first', 'warning');
                        return;
                    }
                    result = rsaDecrypt(inputText, privateKey);
                    break;
            }
            
            document.getElementById('output-text').value = result;
            showNotification('Text decrypted successfully', 'success');
        } catch (error) {
            showNotification(`Decryption failed: ${error.message}`, 'error');
            console.error('Decryption error:', error);
        }
    });
    
    // Generate RSA keys
    document.getElementById('generate-keys').addEventListener('click', () => {
        try {
            const crypt = new JSEncrypt({default_key_size: 1024});
            const privateKey = crypt.getPrivateKey();
            const publicKey = crypt.getPublicKey();
            
            document.getElementById('private-key').value = privateKey;
            document.getElementById('public-key').value = publicKey;
            
            showNotification('RSA key pair generated successfully', 'success');
        } catch (error) {
            showNotification(`Failed to generate RSA keys: ${error.message}`, 'error');
            console.error('RSA key generation error:', error);
        }
    });
    
    // Caesar Cipher Implementation
    function caesarCipher(text, shift) {
        return text.split('').map(char => {
            if (char.match(/[a-z]/i)) {
                const code = char.charCodeAt(0);
                const isUpperCase = code >= 65 && code <= 90;
                const offset = isUpperCase ? 65 : 97;
                
                // Apply shift and handle wrap-around
                return String.fromCharCode(((code - offset + shift) % 26) + offset);
            }
            return char; // Non-alphabetic characters remain unchanged
        }).join('');
    }
    
    function caesarDecipher(text, shift) {
        return caesarCipher(text, 26 - (shift % 26));
    }
    
    // Vigenère Cipher Implementation
    function vigenereCipher(text, keyword) {
        keyword = keyword.toLowerCase().replace(/[^a-z]/g, '');
        if (!keyword) throw new Error('Invalid keyword');
        
        let result = '';
        let keyIndex = 0;
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            
            if (char.match(/[a-z]/i)) {
                const isUpperCase = char === char.toUpperCase();
                const plainChar = char.toLowerCase();
                const plainCode = plainChar.charCodeAt(0) - 97;
                const keyChar = keyword[keyIndex % keyword.length];
                const keyCode = keyChar.charCodeAt(0) - 97;
                
                // Apply Vigenère encryption
                let encryptedCode = (plainCode + keyCode) % 26;
                let encryptedChar = String.fromCharCode(encryptedCode + 97);
                
                result += isUpperCase ? encryptedChar.toUpperCase() : encryptedChar;
                keyIndex++;
            } else {
                result += char; // Non-alphabetic characters remain unchanged
            }
        }
        
        return result;
    }
    
    function vigenereDecipher(text, keyword) {
        keyword = keyword.toLowerCase().replace(/[^a-z]/g, '');
        if (!keyword) throw new Error('Invalid keyword');
        
        let result = '';
        let keyIndex = 0;
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            
            if (char.match(/[a-z]/i)) {
                const isUpperCase = char === char.toUpperCase();
                const encryptedChar = char.toLowerCase();
                const encryptedCode = encryptedChar.charCodeAt(0) - 97;
                const keyChar = keyword[keyIndex % keyword.length];
                const keyCode = keyChar.charCodeAt(0) - 97;
                
                // Apply Vigenère decryption
                let plainCode = (encryptedCode - keyCode + 26) % 26;
                let plainChar = String.fromCharCode(plainCode + 97);
                
                result += isUpperCase ? plainChar.toUpperCase() : plainChar;
                keyIndex++;
            } else {
                result += char; // Non-alphabetic characters remain unchanged
            }
        }
        
        return result;
    }
    
    // AES Encryption Implementation
    function aesEncrypt(text, key) {
        return CryptoJS.AES.encrypt(text, key).toString();
    }
    
    function aesDecrypt(encryptedText, key) {
        const bytes = CryptoJS.AES.decrypt(encryptedText, key);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
    
    // RSA Encryption Implementation
    function rsaEncrypt(text, publicKey) {
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(publicKey);
        return encrypt.encrypt(text);
    }
    
    function rsaDecrypt(encryptedText, privateKey) {
        const decrypt = new JSEncrypt();
        decrypt.setPrivateKey(privateKey);
        return decrypt.decrypt(encryptedText);
    }
});
