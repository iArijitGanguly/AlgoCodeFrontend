import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import axiosProblemInstance from '../../helper/axiosProblemInstance';
import { ProblemDescription } from '../../types/ProblemDescription';
import { ProblemDetails } from '../../types/ProblemDetails';
import { ProblemState } from '../../types/ProblemState';

const initialState: ProblemState = {
    problemSet: [],
    problemDescription: null,
    problemCode: '',
    problemLanguage: 'java',
    problemTheme: 'monokai',
    activeTab: 'statement',
    testCaseTab: 'input',
    leftWidth: 50,
    isDragging: false,
    isClicked: false
};

export const getAllProblems = createAsyncThunk<AxiosResponse<ProblemDetails>>('/user/problems', async () => {
    try {
        const response = await axiosProblemInstance.get('problems');
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const getProblemById = createAsyncThunk<AxiosResponse<ProblemDescription>, string>('/getProblem', async (problemId) => {
    try {
        const response = await axiosProblemInstance.get(`problems/${problemId}`);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

const problemSlice = createSlice({
    name: 'problem',
    initialState,
    reducers: {
        handleCode: (state, action: PayloadAction<string>) => {
            state.problemCode = action.payload;
        },
        handleLanguage: (state, action) => {
            state.problemLanguage = action.payload;
        },
        handleTheme: (state, action) => {
            state.problemTheme = action.payload;
        },
        handleActiveTab: (state, action) => {
            state.activeTab = action.payload;
        },
        handleTestCaseActiveTab: (state, action) => {
            state.testCaseTab = action.payload;
        },
        handleLeftWidth: (state, action) => {
            state.leftWidth = action.payload;
        },
        handleIsDragging: (state, action) => {
            state.isDragging = action.payload;
        },
        handleSubmissionButton: (state, action) => {
            state.isClicked = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProblems.fulfilled, (state, action) => {
                if(!action.payload?.data) return;

                state.problemSet = action.payload?.data?.data;
            })
            .addCase(getProblemById.fulfilled, (state, action) => {
                if(!action.payload?.data) return;
    
                state.problemDescription = action.payload?.data?.data;
            });
    }
});

export const { handleCode, handleLanguage, handleTheme, handleActiveTab, handleTestCaseActiveTab, handleLeftWidth, handleIsDragging, handleSubmissionButton } = problemSlice.actions;
export default problemSlice.reducer;