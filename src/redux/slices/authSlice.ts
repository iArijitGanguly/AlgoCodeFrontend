import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

import axiosInstance from '../../helper/axiosInstance';
import { SigninData } from '../../types/SigninData';
import { SignInDetails } from '../../types/SigninDetails';
import { SignupData } from '../../types/SignupData';
import { SignupDetails } from '../../types/SignupDetails';
import { UserState } from '../../types/UserState';

const initialState: UserState = {
  userId: localStorage.getItem('userId') || '',  
  userName: localStorage.getItem('userName') || '',
  email: localStorage.getItem('email') || '',
  password: localStorage.getItem('password') || '',
  isLoggedIn: localStorage.getItem('isLoggedIn') == 'true'
};

export const signup = createAsyncThunk<AxiosResponse<SignupDetails>, SignupData>('/auth/signup', async (data) => {
  try {
    const response = axiosInstance.post('auth/signup', data);
    toast.promise(response, {
        loading: 'Submitting form',
        success: 'Successfully created a user',
        error: 'Something went wrong, try again'
    });
    return await response;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const signin = createAsyncThunk<AxiosResponse<SignInDetails, SigninData>, SigninData>('/auth/signin', async (data) => {
    try {
        const response = axiosInstance.post('auth/signin', data);
        toast.promise(response, {
            loading: 'Submitting form',
            success: 'Successfully signed in',
            error: 'Something went wrong, try again' 
        });
        return await response;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signin.fulfilled, (state, action) => {
        if(action.payload?.status != 200 || !action.payload) return;

        state.userId = action.payload?.data?.data?._id;
        state.isLoggedIn = (action.payload?.data != undefined);
        state.email = action.payload?.data?.data?.email;
        state.userName = action.payload?.data?.data?.userName;
        state.password = action.payload?.data?.data?.password;

        localStorage.setItem('userId', action.payload?.data?.data?._id);
        localStorage.setItem('isLoggedIn', (action.payload?.data != undefined).toString());
        localStorage.setItem('email', action.payload?.data?.data?.email);
        localStorage.setItem('userName', action.payload?.data?.data?.userName);
        localStorage.setItem('password', action.payload?.data?.data?.password);
    });
  }
});

export default authSlice.reducer;