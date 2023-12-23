import { configureStore } from '@reduxjs/toolkit';
import jobSlice from './features/job/jobSlice';
import alljobsSlice from './features/alljobs/alljobsSlice';
import userSlice from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    alljobs: alljobsSlice,
  },
});