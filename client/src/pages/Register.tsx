import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';
import { UserValidate } from '../types/user.interface';
import { emailRegex } from '../utils/emailRegex';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });

  const [errors, setErrors] = useState<UserValidate>({});
  const [errorsActive, setErrorsActive] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = (): boolean => {
    let currentErrors: UserValidate = {};
    if (!formData.username.length) currentErrors.username = 'El nombre es requerido';
    if (formData.username.length < 3) currentErrors.username = 'El nombre debe tener al menos 3 caracteres';
    if (!formData.email.length) currentErrors.email = 'El email es requerido';
    if (!emailRegex.test(formData.email)) currentErrors.email = 'Debes introducir un email válido';
    if (!formData.password.length) currentErrors.password = 'La contraseña es requerida';
    if (formData.password.length < 6) currentErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    if (formData.password === formData.password.toLowerCase()) currentErrors.password = 'La contraseña debe tener al menos una mayúscula';
    if (formData.password === formData.password.toUpperCase()) currentErrors.password = 'La contraseña debe tener al menos una minúscula';
    if (formData.password !== formData.confirmPassword) currentErrors.confirmPassword = 'Las contraseñas no coinciden';
    if (!formData.confirmPassword.length) currentErrors.confirmPassword = 'Debes confirmar la contraseña';

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await fetch('http://localhost:8000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          navigate('/login');
        } else {
          const result = await response.json();
          setServerError(result.message || 'Error en el registro');
        }
      } catch (error) {
        setServerError('Error en el registro');
      }
    } else {
      setErrorsActive(true);
    }
  };

  return (
    <div className='register-container'>
      <form className='register-form' onSubmit={handleSubmit}>
        <h2>Registro</h2>

        <label htmlFor="username">Nombre de usuario</label>
        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={formData.username}
          onChange={handleChange}
        />
        {errorsActive && errors.username && <p className='register-error'>{errors.username}</p>}

        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
        />
        {errorsActive && errors.email && <p className='register-error'>{errors.email}</p>}

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
        />
        {errorsActive && errors.password && <p className='register-error'>{errors.password}</p>}

        <label htmlFor="confirmPassword">Confirmar contraseña</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errorsActive && errors.confirmPassword && <p className='register-error'>{errors.confirmPassword}</p>}

        {serverError && <p className='register-error'>{serverError}</p>}

        <button type="submit" className='register-button'>Registrar</button>
        <p className='register-text'>¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a></p>
      </form>
    </div>
  );
};

export default RegisterPage;
