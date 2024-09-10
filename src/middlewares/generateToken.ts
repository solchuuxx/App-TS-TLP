import jwt from 'jsonwebtoken';

const secretKey = 'default_secret_key'; 

const payload = {
  userId: '222',
  username: 'testuser'
};

const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

console.log(`Token: ${token}`);
