# SecureCrypt

A modern, clean, and responsive web application for encrypting and decrypting sensitive text data using Python (Flask) and the Fernet symmetric encryption algorithm.

## Features

- Secure encryption and decryption using Fernet (AES-128-CBC with PKCS7 padding)
- User-friendly web interface with modern design
- Random key generation
- Copy results to clipboard
- Responsive design for all devices

## Installation

1. Clone this repository or download the files
2. Install the required dependencies:

```
pip install -r requirements.txt
```

## Usage

1. Run the Flask application:

```
python app.py
```

2. Open your web browser and navigate to `http://127.0.0.1:5000`

3. Enter the text you want to encrypt/decrypt and provide a secret key
   - You can generate a random key using the key button
   - Remember to save your key as you'll need it to decrypt your message later

4. Click "Encrypt" or "Decrypt" to process your text
5. The result will be displayed in the result box
6. You can copy the result to your clipboard using the "Copy Result" button

## Security Notes

- The encryption key is never stored on the server
- All encryption/decryption happens on the server-side using Python's cryptography library
- The application uses Fernet, which is built on top of AES-128-CBC with PKCS7 padding and HMAC using SHA256 for authentication
- Always use strong, unique keys for sensitive data

## License

MIT License
