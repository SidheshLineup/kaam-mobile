import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice';
import jobPreferenceReducer from '../slice/jobPreferenceSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobPreference: jobPreferenceReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
