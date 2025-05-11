from flask import Flask, render_template, request, jsonify
from cryptography.fernet import Fernet
import base64
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(24)

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():
    data = request.form.get('text', '')
    key = request.form.get('key', '')
    action = request.form.get('action', '')
    
    if not data or not key:
        return jsonify({'error': 'Both text and key are required'}), 400
    
    try:
        # Convert the provided key to a valid Fernet key
        # Fernet keys must be 32 url-safe base64-encoded bytes
        key_bytes = key.encode()
        # Ensure the key is 32 bytes by hashing if necessary
        if len(key_bytes) != 32:
            from cryptography.hazmat.primitives import hashes
            digest = hashes.Hash(hashes.SHA256())
            digest.update(key_bytes)
            key_bytes = digest.finalize()
        
        # Convert to url-safe base64-encoded format
        fernet_key = base64.urlsafe_b64encode(key_bytes)
        cipher = Fernet(fernet_key)
        
        result = ""
        if action == 'encrypt':
            # Encrypt the data
            result = cipher.encrypt(data.encode()).decode()
        elif action == 'decrypt':
            # Decrypt the data
            result = cipher.decrypt(data.encode()).decode()
        else:
            return jsonify({'error': 'Invalid action'}), 400
            
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
