import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../api';
import checkResponce from '../../utils/checkResponce';

const initialState = {
    serial: null,
    license: null,
    protocols: [],
    network: [],

    fetchInitialStatus: false,
    fetchInitialError: false,
    fetchProtocolsStatus: false,
    fetchProtocolsError: false,
    fetchNetworkStatus: false,
    fetchNetworkError: false,
};

const fetchInitial = createAsyncThunk(
    'dashbord/fetchInitial',
    async (_, { rejectWithValue }) => {
        try{
            const responce = await request('dashboard', 'fetch_initial');
    
            return responce;
        }catch(error){           
            return rejectWithValue(error.message);
        }
    }
);

const fetchProtocols = createAsyncThunk(
    'dashbord/fetchProtocols',
    async (_, { rejectWithValue }) => {
        try{
            const data = await request('dashboard', 'fetch_protocols');
    
            return data;
        }catch(error){
            return rejectWithValue(error.message);
        }
    }
);

const fetchNetwork = createAsyncThunk(
    'dashboard/fetchNetwork',
    async (_, { rejectWithValue }) => {
        try {
            const data = await request('dashboard', 'fetch_net');

            return data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: initialState,
    reducers: {
        clearSlice: (state, action) => {
            state.network = [];
            state.fetchNetworkStatus = false;
            state.fetchNetworkError = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInitial.pending, state => {
            state.fetchInitialStatus = 'pending';
            state.fetchInitialError = false;
        });
        builder.addCase(fetchInitial.fulfilled, (state, action) => {
            state.fetchInitialStatus = 'fulfilled';
            state.fetchInitialError = false;
            state.serial = action.payload.result.serial;
            state.license = action.payload.result.license;
        });
        builder.addCase(fetchInitial.rejected, (state, action) => {          
            state.fetchInitialStatus = 'rejected';
            state.fetchInitialError = action.payload;
        });

        builder.addCase(fetchProtocols.pending, state => {
            state.fetchProtocolsStatus = 'pending';
            state.fetchProtocolsError = false;
        });
        builder.addCase(fetchProtocols.fulfilled, (state, action) => {
            state.fetchProtocolsStatus = 'fulfilled';
            state.fetchProtocolsError = false;
            state.protocols = action.payload.result;
        });
        builder.addCase(fetchProtocols.rejected, (state, action) => {
            state.fetchProtocolsStatus = 'rejected';
            state.fetchProtocolsError = action.payload;
        });

        builder.addCase(fetchNetwork.pending, state => {
            state.fetchNetworkStatus = 'pending';
            state.fetchNetworkError = false;
        });
        builder.addCase(fetchNetwork.fulfilled, (state, action) => {
            state.fetchNetworkStatus = 'fulfilled';
            state.fetchNetworkError = false;
            state.network = action.payload.result.map((net, i) => {
                return {
                    ...net,
                    id: i
                }
            });
        });
        builder.addCase(fetchNetwork.rejected, (state, action) => {
            state.fetchNetworkStatus = 'rejected';
            state.fetchNetworkError = action.payload;
        });
    }
});

export { fetchInitial, fetchProtocols, fetchNetwork };
export const { clearSlice } = dashboardSlice.actions;
export default dashboardSlice.reducer;