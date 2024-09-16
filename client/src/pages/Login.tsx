import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { LoginValidate } from '../types/login.interface';
import { emailRegex } from '../utils/emailRegex'; 

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<LoginValidate>({});
  const [errorsActive, setErrorsActive] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = () => {
    let currentErrors: LoginValidate = {};
    if (!formData.email.length) currentErrors.email = 'El email es requerido';
    if (!emailRegex.test(formData.email)) currentErrors.email = 'Debes introducir un email válido';
    if (!formData.password.length) currentErrors.password = 'La contraseña es requerida';
    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const valid = validate();

    if (valid) {
      fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          navigate('/dashboard');  
        } else {
          setErrors({ password: 'Credenciales incorrectas' });
        }
      })
      .catch(err => {
        console.log(err);
        setErrors({ password: 'Error al intentar iniciar sesión' });
      });
    }

    setErrorsActive(true);
  };

  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>

        <label htmlFor="email">Email</label>
        <input 
          type="text" 
          name="email" 
          placeholder='ejemplo@email.com' 
          onChange={handleChange} 
        />
        {errorsActive && errors.email && <p className='login-error'>{errors.email}</p>}

        <label htmlFor="password">Contraseña</label>
        <input 
          type="password" 
          name="password" 
          placeholder='Ingresa tu contraseña' 
          onChange={handleChange} 
        />
        {errorsActive && errors.password && <p className='login-error'>{errors.password}</p>}

        {serverError && <p className='login-error'>{serverError}</p>} 

        <button type="submit" className='login-button'>Iniciar Sesión</button>
        <p className='login-text'>¿No tienes una cuenta? <a href="/register">Regístrate</a></p>
      </form>
    </div>
  );
};

export default LoginPage;
