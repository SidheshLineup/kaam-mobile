import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import API from '../../helper/api-client';
import {JOB_ROLES} from '../../helper/api-endpoints';
import {RootState} from '../store/store';

export type JobRole = {
  _id: string;
  role: string;
  isSelected: boolean;
};

export interface JobPrefereceState {
  jobRoles: undefined | JobRole[];
}

const initialState: JobPrefereceState = {
  jobRoles: undefined,
};

export const getJobPreference = createAsyncThunk(
  'jobPreference/getJobPreference',
  async (_, {getState}) => {
    try {
      const state: RootState = getState() as RootState;
      const accessToken = state.auth.accessToken;
      const response = await API.get(JOB_ROLES, {
        headers: {Authorization: `Bearer ${accessToken}`},
        params: {paginate: false},
      });
      return response.data;
    } catch (error) {
      console.log('jobPreference::error::', error);
    }
  },
);

const jobPreferenceSlice = createSlice({
  name: 'jobPreference',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getJobPreference.fulfilled, (state, action) => {
      state.jobRoles = action.payload;
    });
  },
});

export const {} = jobPreferenceSlice.actions;

export default jobPreferenceSlice.reducer;
