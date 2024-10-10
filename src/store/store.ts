import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.ts';

const store = configureStore({
  reducer: {
    users: userReducer, 
  },
});

export default store;