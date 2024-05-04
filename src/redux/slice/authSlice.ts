import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import API from '../../helper/api-client';
import {GET_OTP, LOGIN_USER, USER} from '../../helper/api-endpoints';
import {AxiosError} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data: any) => {
    try {
      const response = await API.post(USER, data);
      return response.data;
    } catch (err) {}
  },
);
export const getOtp = createAsyncThunk(
  'auth/getOtp',
  async (data: {dialcode: string; phone: string}) => {
    try {
      const response = await API.patch(GET_OTP, data);
      console.log('response.data', JSON.stringify(response.data, null, 4));
      return response.data;
    } catch (err) {}
  },
);
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data: any, thunkAPI) => {
    try {
      data.date = new Date().toISOString();
      data.strategy = 'local';
      const response = await API.post(LOGIN_USER, data);
      const {accessToken, user} = response.data;
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      return response.data;
    } catch (err) {
      console.log('auth/loginUser::error', JSON.stringify(err, null, 4));
      if (err instanceof AxiosError) {
        return thunkAPI.rejectWithValue({error: err.message});
      }
    }
  },
);

type User = {
  _id: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  isactive: boolean;
  createdat: string;
  updatedat: string;
};

export interface AuthState {
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: string | undefined;
  accessToken: string | undefined;
  user: User | undefined;
  isFirstLogin: boolean;
}

// Define the initial state using that type
const initialState: AuthState = {
  status: 'idle',
  error: undefined,
  accessToken: undefined,
  user: undefined,
  isFirstLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setFirstLogin: (state, action) => {
      state.isFirstLogin = action.payload.isFirstLogin;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, state => {
        state.status = 'success';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const {accessToken, user} = action.payload;
      state.accessToken = accessToken;
      state.user = user;
    });
  },
});

export const {setAccessToken, setUser, setFirstLogin} = authSlice.actions;

export default authSlice.reducer;
