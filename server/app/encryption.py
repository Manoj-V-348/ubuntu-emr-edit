from cryptography.fernet import Fernet

key_file_path = "fernet_key.key"

try:
    with open(key_file_path, "rb") as key_file:
        common_key = key_file.read()
except FileNotFoundError:
    common_key = Fernet.generate_key()
    with open(key_file_path, "wb") as key_file:
        key_file.write(common_key)

cipher_suite = Fernet(common_key)

def encrypt(data):
    ciphertext = cipher_suite.encrypt(data.encode())
    return ciphertext

def decrypt(encrypted)->str:
    decrypted_text = cipher_suite.decrypt(encrypted).decode()
    return decrypted_text
