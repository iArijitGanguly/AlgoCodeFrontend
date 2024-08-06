import { configureStore } from '@reduxjs/toolkit';

import authSliceReducer from './slices/authSlice';
import problemSliceReducer from './slices/problemSlice';
import submissionReducer from './slices/submissionSlice';

export const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        problem: problemSliceReducer,
        submission: submissionReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;