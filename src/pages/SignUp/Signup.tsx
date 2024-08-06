import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { signup } from '../../redux/slices/authSlice';
import { AppDispatch } from '../../redux/store';
import { SignupData } from '../../types/SignupData';

export default function Signup(){

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [signupDetails, setSignupDetails]= useState<SignupData>({
    email: '',
    password:'',
    userName: '',
  });


  function handleformchange(e: ChangeEvent<HTMLInputElement>){
    const {name, value} = e.target;
    setSignupDetails({
      ...signupDetails,
      [name]: value
    });

  }

  function resetSignupForm() {
    setSignupDetails({
        email: '',
        password: '',
        userName: ''
    });
  }

  async function onFormSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(!signupDetails.email || !signupDetails.password || !signupDetails.userName) {
        return;
    }

    const response = await dispatch(signup(signupDetails));
    if(response.payload) {
        navigate('/signin');
    }
    else {
        resetSignupForm();
    }
  }


  return(

    <div className='flex flex-col items-center  bg-blue-50 justify-center h-[100vh]'>
      <div className='text-2xl text-black mb-4'>
        Welcome to AlgoCode
      </div>
      <div className='text-lg text-black'>Create Your Account</div>
      <div className="w-full">
        <form onSubmit={onFormSubmit}   className="flex flex-col justify-center items-center w-3/4 mx-auto" autoComplete="off"> 
          <div className="my-5 w-1/3 text-black">
            <input 
              autoComplete="off"
              type="text"
              placeholder="Username..."
              className="px-8 py-3 w-full bg-white"
              name="userName"
              value={signupDetails.userName}
              onChange={handleformchange}

            />
          </div>
          <div className="my-5 w-1/3 text-black">
            <input 
              autoComplete="off"
              type="email"
              placeholder="Email..."
              className="px-8 py-3 w-full bg-white"
              name="email"
              value={signupDetails.email}
              onChange={handleformchange}


            />
          </div>
          <div className="my-5 w-1/3 text-black">
            <input 
              autoComplete="off"
              type="password"
              placeholder="Password..."
              className="px-8 py-3 w-full bg-white"
              name="password"
              value={signupDetails.password}
              onChange={handleformchange}

            />
          </div>
          <div className="my-5 w-1/3">
            <button className="btn btn-success w-full hover:bg-green-400 rounded-md px-2 py-1" type="submit">Submit</button>
          </div>

        </form>
      </div>
      <div className="mt-4">
        <p className="text-black">
                     Already have an account ?
          <Link to={'/signin'}>
            <button className="btn btn-warning rounded-md px-2 mx-5 hover:bg-green-400">
                        SignIn
            </button>
          </Link>

        </p>
      </div>  
    </div>



  );
}