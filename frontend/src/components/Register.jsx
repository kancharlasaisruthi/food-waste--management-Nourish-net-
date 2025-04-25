import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import register2 from '../assets/register2.jpg';

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [err, setErr] = useState(null);

  function handleFormSubmit(newUser) {
    fetch('http://localhost:5000/api/auth/register', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    }).then(res => {
      if (res.status === 201) {
        console.log(newUser);
        navigate('/login');
      } else {
        setErr({ message: res.message });
      }
    }).catch(err => setErr(err));
  }

  return (
    <div className="container-fluid">
      <div className="row min-vh-100 align-items-center bg-light">
        
        <div className="col-md-6 p-0 d-none d-md-block">
          <img src={register2} alt="register" className="img-fluid h-100 object-cover" style={{ maxHeight: '100vh',width:'450px' }} />
        </div>
        
        {/* Form Section */}
        <div className="col-md-6 py-5">
          <div className="card shadow-lg border-0 mx-auto" style={{ maxWidth: '500px' }}>
            <div className="card-header bg-success text-white text-center py-3">
              <h2 className="mb-0">Create Your Account</h2>
            </div>
            <div className="card-body p-4">
              {err && <div className="alert alert-danger">{err.message}</div>}
              
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                {/* Username */}
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    id="un"
                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                    placeholder="Username"
                    {...register("username", { required: true, minLength: 8 })}
                  />
                  <label htmlFor="un">Username</label>
                  {errors.username?.type === 'required' && 
                    <div className="invalid-feedback">Username is required</div>}
                  {errors.username?.type === 'minLength' && 
                    <div className="invalid-feedback">Username must be at least 8 characters</div>}
                </div>
                
                {/* Password */}
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    id="pw"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Password"
                    {...register("password", { required: true })}
                  />
                  <label htmlFor="pw">Password</label>
                  {errors.password?.type === 'required' && 
                    <div className="invalid-feedback">Password is required</div>}
                </div>
                
                {/* Email */}
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    id="em"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="Email"
                    {...register("email", { required: true })}
                  />
                  <label htmlFor="em">Email</label>
                  {errors.email?.type === 'required' && 
                    <div className="invalid-feedback">Email is required</div>}
                </div>
                
                {/* Phone Number */}
                <div className="form-floating mb-4">
                  <input
                    type="number"
                    id="db"
                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                    placeholder="Phone number"
                    {...register("phone", { required: true })}
                  />
                  <label htmlFor="db">Phone number</label>
                  {errors.phone?.type === 'required' && 
                    <div className="invalid-feedback">Phone number is required</div>}
                </div>
                
                {/* Role Selection */}
                <div className="form-floating mb-4">
                  <select
                    id="ch"
                    className={`form-select ${errors.role ? 'is-invalid' : ''}`}
                    {...register("role", { required: true })}
                  >
                    <option value="select" disabled hidden>Select your role</option>
                    <option value="Donor">Donor</option>
                    <option value="Receiver">Receiver</option>
                    <option value="Volunteer">Volunteer</option>
                  </select>
                  <label htmlFor="ch">Choose your role</label>
                  {errors.role?.type === 'required' && 
                    <div className="invalid-feedback">Please select a role</div>}
                </div>
                
                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="btn btn-success btn-lg w-100 mt-2"
                  style={{ backgroundColor: '#4CAF50' }}
                >
                  Register
                </button>
                
                {/* Login Link */}
                <div className="text-center mt-3">
                  <span className="text-muted">Already have an account?</span>
                  <a href="/login" className="ms-2 text-success">Login</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;