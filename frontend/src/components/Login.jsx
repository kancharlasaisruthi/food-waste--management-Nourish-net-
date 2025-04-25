import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loginErr, setLoginErr] = useState(null);

  function handleFormSubmit(credentials) {
    fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Login successful') {
          const user = data.user;
          console.log('Logged in user:', user);

          if (user.role === 'Volunteer') {
            navigate('/volunteer', { state: user });
          } else if (user.role === 'Donor') {
            navigate('/donater', { state: user });
          } else if (user.role === 'Receiver') {
            navigate('/receiver', { state: user });
          }
        } else {
          setLoginErr({ message: 'Invalid email or password' });
        }
      })
      .catch(err => {
        console.error('Login error:', err);
        setLoginErr({ message: 'Login failed. Please try again.' });
      });
  }
  return (
    <div style={{ backgroundColor: '#f7fbe8', minHeight: '100vh', paddingTop: '50px' }}>
      <div className="mt-4">
        <h1 className="display-3 text-center" style={{ color: '#2e7d32' }}>
          Login
        </h1>
        {loginErr && (
          <p className="text-center" style={{ color: '#c62828', fontSize: '1.5rem' }}>
            {loginErr.message}
          </p>
        )}
        <form
          className="w-50 mx-auto mt-5 p-4 shadow"
          style={{ backgroundColor: '#fffde7', borderRadius: '15px' }}
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="mb-3">
            <label className="form-label" htmlFor="un" style={{ color: '#388e3c' }}>
              Email
            </label>
            <input
              type="text"
              {...register('email', { required: true })}
              id="un"
              className="form-control"
              style={{ borderColor: '#aed581' }}
            />
            {errors.username && (
              <p className="text-danger" style={{ fontSize: '0.9rem' }}>
                *Email is required
              </p>
            )}
          </div>
  
          <div className="mb-3">
            <label className="form-label" htmlFor="pw" style={{ color: '#388e3c' }}>
              Password
            </label>
            <input
              type="password"
              {...register('password', { required: true })}
              id="pw"
              className="form-control"
              style={{ borderColor: '#aed581' }}
            />
            {errors.password && (
              <p className="text-danger" style={{ fontSize: '0.9rem' }}>
                *Password is required
              </p>
            )}
          </div>
  
          <button
            className="btn d-block mx-auto mt-3"
            type="submit"
            style={{
              backgroundColor: '#8bc34a',
              color: '#fff',
              padding: '10px 25px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem'
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
  
}

export default Login;
