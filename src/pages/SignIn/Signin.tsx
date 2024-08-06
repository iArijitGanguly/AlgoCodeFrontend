import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { signin } from '../../redux/slices/authSlice';
import { AppDispatch } from '../../redux/store';
import { SigninData } from '../../types/SigninData';

export default function Signin(){
    const navigte = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
  const [signindetails, setsignindetails] = useState<SigninData>({
    email: '',
    password:'',
  });


  function handleformchange(e: ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target;
    setsignindetails({
      ...signindetails,
      [name]: value
    });
  }

  function restSignInForm() {
    setsignindetails({
        email: '',
        password: ''
    });
  }

  async function onformsubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(!signindetails.email && !signindetails.password) {
        return;
    }

    const response = await dispatch(signin(signindetails));
    if(response.payload) {
        navigte('/problems');
    }
    else {
        restSignInForm();
    }
  }
  return(

    <div className='flex flex-col items-center  bg-blue-50 justify-center h-[100vh]'>
      <div className='text-2xl text-black mb-4'>
        Welcome to AlgoCode
      </div>
      <div className='text-lg text-black'>Sign In To Your Account</div>
      <div className="w-full">
        <form onSubmit={onformsubmit} className="flex flex-col justify-center items-center w-3/4 mx-auto" autoComplete="off"> 

          <div className="my-5 w-1/3 text-black">
            <input 
              autoComplete="off"
              type="email"
              placeholder="Email..."
              className="px-8 py-3 w-full bg-white"
              name="email"
              onChange={handleformchange}
              value={signindetails.email}

            />
          </div>
          <div className="my-5 w-1/3 text-black">
            <input 
              autoComplete="off"
              type="password"
              placeholder="Password..."
              className="px-8 py-3 w-full bg-white"
              name="password"
              onChange={handleformchange}
              value={signindetails.password}

            />
          </div>
          <div className="my-5 w-1/3">
            <button className="btn btn-success w-full hover:bg-green-400 rounded-md px-2 py-1" type="submit">Submit</button>
          </div>

        </form>
      </div>
      <div className="mt-4">
        <p className="text-black">
                     Dont have an account ?
          <Link to={'/signup'}>
            <button className="btn btn-warning rounded-md px-2 mx-5 hover:bg-green-400">
                        SignUp
            </button>
          </Link>

        </p>
      </div>  
    </div>



  );
}