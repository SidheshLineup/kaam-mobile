import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store/store';
import {AxiosError} from 'axios';
import API from '../../helper/api-client';
import {USER} from '../../helper/api-endpoints';

export const registerFcmDeviceToken = createAsyncThunk(
  'user/registerFcmDeviceToken',
  async (data: any, thunkAPI) => {
    try {
      const state: RootState = thunkAPI.getState() as RootState;
      const accessToken = state.auth.accessToken;
      const user = state.auth.user;
      const userId = user?._id;

      if (userId && data && accessToken) {
        const response = await API.patch(
          `${USER}/${userId}`,
          {
            firebasetokens: [data.fcmToken],
          },
          {
            headers: {Authorization: `Bearer ${accessToken}`},
          },
        );
        return response.data;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data);
      }
    }
  },
);

export interface UserState {}

// Define the initial state using that type
const initialState: UserState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
