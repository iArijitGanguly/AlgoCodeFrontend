import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import axiosSubmissionInstance from '../../helper/axiosSubmissionInstance';
import { SubmissionData } from '../../types/SubmissionData';
import { SubmissionDetails } from '../../types/SubmissionDetails';
import { SubmissionState } from '../../types/SubmissionState';

const initialState: SubmissionState = {
    submissionId: '',
    submissionStatus: '',
    evaluationResult: null
};

export const createSubmission = createAsyncThunk<AxiosResponse<SubmissionDetails>, SubmissionData>('/createSubmission', async (data) => {
    try {
        const response = await axiosSubmissionInstance.post('submission', data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const getSubmission = createAsyncThunk<AxiosResponse<SubmissionDetails>, string>('/getSubmission', async (submissionId) => {
    try {
        const response = await axiosSubmissionInstance.get(`submission/${submissionId}`);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

const submissionSlice = createSlice({
    name: 'submission',
    initialState,
    reducers: {
        handleEvaluationResult: (state, action) => {
            state.evaluationResult = action.payload;
        },
        handleSubmissionId: (state, action) => {
            state.submissionId = action.payload;
        },
        handleSubmissionStatus: (state, action) => {
            state.submissionStatus = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createSubmission.fulfilled, (state, action) => {
                if(!action.payload?.data) return;

                state.submissionId = action.payload?.data?.data?._id;
                state.submissionStatus = action.payload?.data?.data?.status;
            })
            .addCase(getSubmission.fulfilled, (state, action) => {
                if(!action.payload?.data) return;

                state.submissionStatus = action.payload?.data?.data?.status;
            });
    }
});

export const { handleEvaluationResult, handleSubmissionId, handleSubmissionStatus } = submissionSlice.actions;
export default submissionSlice.reducer;