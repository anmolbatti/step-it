import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';

export default store = configureStore({
  reducer: {
        user: userReducer,
    }
});