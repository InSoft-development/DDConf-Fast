import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../api';

const initialState = {
    listDevices: [],
    selectedDeviceName: null,
    device: null,

    fetchListDevicesStatus: false,
    fetchListDevicesError: false,

    fetchDeviceStatus: false,
    fetchDeviceError: false,    

    saveDeviceStatus: false,
    saveDeviceError: false,
};

const fetchListDevices = createAsyncThunk(
    'network/fetchListDevices',
    async (_,{ rejectWithValue }) => {
        try{
            const responce = await request('network', 'list_devices');
            
            const data = responce.result.map((device) => ({text: device, value: device}));

            return data;
        }catch(error){
            return rejectWithValue(error.message);
        }
    }
);

const fetchDevice = createAsyncThunk(
    'network/fetchDevice',
    async ({device}, {rejectWithValue}) => {
        try{
            const responce = await request('network', 'fetch_device', {
                id: device
            });
            
            return responce.result;
        }catch(error){
            return rejectWithValue(error.message);
        }
    }
)

const saveDevice = createAsyncThunk(
    'network/saveDevice',
    async ({device}, {rejectWithValue}) => {
        try{
            const responce = await request('network', 'save_device', {
                ...device
            });

            return responce.result;
        }catch(error){
            return rejectWithValue(error.message)
        }
    }
);

const networkSlice = createSlice({
    name: 'network',
    initialState: initialState,
    reducers: {
        changeSelectedDevice: (state, action) => {
            state.selectedDeviceName = action.payload;
        },
        clearSlice: state => {
            return {
                ...initialState,
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchListDevices.pending, state => {
            state.fetchListDevicesStatus = 'pending';
            state.fetchListDevicesError = false;
        });
        builder.addCase(fetchListDevices.fulfilled, (state, action) => {
            state.fetchListDevicesStatus = 'fulfilled';
            state.fetchListDevicesError = false;
            state.listDevices = action.payload;
        });
        builder.addCase(fetchListDevices.rejected, (state, action) => {
            state.fetchListDevicesStatus = 'rejected';
            state.fetchListDevicesError = action.payload;
        });
        builder.addCase(fetchDevice.pending, state => {
            state.fetchDeviceStatus = 'pending';
            state.fetchDeviceError = false;
        });
        builder.addCase(fetchDevice.fulfilled, (state, action) => {
            state.fetchDeviceStatus = 'fullfiled';
            state.fetchDeviceError = false;
            state.device = action.payload;
        });
        builder.addCase(fetchDevice.rejected, (state, action) => {
            state.fetchDeviceStatus = 'rejected';
            state.fetchDeviceError = action.payload;
        });
        builder.addCase(saveDevice.pending, state => {
            state.saveDeviceStatus = 'pending';
            state.saveDeviceError = false;
        });
        builder.addCase(saveDevice.fulfilled, state => {
            state.saveDeviceStatus = 'fulfilled';
            state.saveDeviceError = false;
        });
        builder.addCase(saveDevice.rejected, (state, action) => {
            state.saveDeviceStatus = 'rejected';
            state.saveDeviceError = action.payload;
        })
    }
});

export { fetchListDevices, fetchDevice, saveDevice };
export const { changeSelectedDevice, clearSlice } = networkSlice.actions;
export default networkSlice.reducer;
