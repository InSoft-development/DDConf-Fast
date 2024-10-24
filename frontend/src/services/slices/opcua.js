import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../api';
import { checkResponce } from '../../utils/checkResponce';


const initialState = {
    form: {},

    fetchUaStatus: false,
    fetchUaError: false,
    postUaStatus: false,
    postUaError: false,
};

const fetchUa = createAsyncThunk(
    'opcua/fetchUa',
    async (_, { rejectWithValue }) => {
        try {
            const responce = await request('opcua', 'fetch_ua');
            const data = await checkResponce(responce);

            return data;
        } catch (error) {
            rejectWithValue(error);
        }

    }
);

const postUa = createAsyncThunk(
    'opcua/postUa',
    async ({ form }, { rejectWithValue }) => {
        try {
            const responce = await request('opcua', 'post_ua', form);
            const data = await checkResponce(responce);

            return data;
        }catch(error){
            rejectWithValue(error);
        }
    }
);

const opcuaSlice = createSlice({
    name: 'opcua',
    initialState: initialState,
    reducers: {
        clearSlice: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUa.pending, state => {
            state.fetchUaStatus = 'pending';
            state.fetchUaError = false;
        });
        builder.addCase(fetchUa.fulfilled, (state, action) => {
            state.fetchUaStatus = 'fulfilled';
            state.fetchUaError = false;
            state.form = action.payload.result;
        });
        builder.addCase(fetchUa.rejected, (state, action) => {
            state.fetchUaStatus = 'rejected';
            state.fetchUaError = action.payload;
        });

        builder.addCase(postUa.pending, state => {
            state.postUaStatus = 'pending';
            state.fetchUaError = false;
        });
        builder.addCase(postUa.fulfilled, (state, action) => {
            state.postUaStatus = 'fulfilled';
            state.fetchUaError = false;
            state.form = action.payload.result;
        });
        builder.addCase(postUa.rejected, (state, action) => {
            state.postUaStatus = 'rejected';
            state.fetchUaError = action.payload;
        });
    }
});

export { fetchUa, postUa };
export const { clearSlice } = opcuaSlice.actions;

export default opcuaSlice.reducer;