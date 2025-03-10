import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loginErr, setLoginErr] = useState(null);

  function handleFormSubmit(newUser) {
    const { username, password } = newUser;
    fetch(`http://localhost:3000/users?username=${username}&password=${password}`)
      .then(res => res.json())
      .then(userObj => {
        if (userObj.length === 0) {
          setLoginErr({ message: "Username or password invalid" });
        } else {
          console.log(userObj)
          const user=userObj[0]
          console.log(user)
         if(user.role==='Volunteer'){
          navigate('/volunteer', { state: userObj[0] });
         }else if(user.role==='Donor'){
          navigate('/donater', { state: userObj[0] });
         }
         else if(user.role==='Receiver'){
          navigate('/receiver', { state: userObj[0] });
         }
        }

      })
      .catch(err => setLoginErr({ message: "err" }));
  }
  return (
    <div >
        <div className="mt-4">
          <h1 className="display-3 text-center text-secondary">
             Login
          </h1>
          {/* Display login error message if any */}
          {loginErr && <p className='text-danger fs-1 text-center'>{loginErr.message}</p>}
          {/* Login form */}
          <form
            className="w-50 mx-auto mt-5 p-4 bg-light"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            {/* Username input */}
            <div className="mb-3">
              <label className="form-label" htmlFor="un">Username</label>
              <input
                type="text"
                {...register("username", { required: true })}
                id="un"
                className="form-control"
              />
              {errors.username && <p className='text-danger'>*Username is required</p>}
            </div>
            {/* Password input */}
            <div className="mb-3">
              <label className="form-label" htmlFor="pw">Password</label>
              <input
                type="password"
                {...register("password", { required: true })}
                id="pw"
                className="form-control"
              />
              {errors.password && <p className='text-danger'>*Password is required</p>}
            </div>
            {/* Submit button */}
            <button className="btn btn-outline-info d-block mx-auto" type="submit">
              Login
            </button>
          </form>
        </div>    
    </div>

  );

}
export default Login;
