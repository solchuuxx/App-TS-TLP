import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../server/src/services/usuario.service'; 

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { token } = await loginUser(email, password);
      localStorage.setItem('token', token);
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Error de autenticación', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
