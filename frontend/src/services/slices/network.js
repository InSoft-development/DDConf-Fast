import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../api';

const initialState = {
    listDevices: [],
    selectedDeviceName: null,
    device: null,
    deviceCondition: null,

    fetchListDevicesStatus: false,
    fetchListDevicesError: false,

    fetchDeviceStatus: false,
    fetchDeviceError: false,    

    saveDeviceStatus: false,
    saveDeviceError: false,

    featchDeviceConditionStatus: false,
    featchDeviceConditionError: false,

    changeDeviceConditionStatus: false,
    changeDeviceConditionError: false,
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
    async ({selectedDeviceName}, {rejectWithValue}) => {
        try{
            const responce = await request('network', 'fetch_device', {
                id: selectedDeviceName
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

const fetchDeviceCondition = createAsyncThunk(
    'network/fecthNetworkDeviceStatus',
    async (_, { rejectWithValue }) => {
        try{
            const responce = await request('network', 'netd_status');

            const netStatus = responce.result;

            if(typeof netStatus === 'number'){
                switch(netStatus){
                    case 0: {return 'остановлен'}
                    case 1: {return 'запущен'}
                    case 2: {return 'запускается'}
                    case -1: {return 'ошибка'}
                    case -2: {return 'крит. ошибка'}
                    default: {return netStatus}
                }
            }

        }catch(error){
            return rejectWithValue(error.message)
        }
    }
);

const changeDeviceCondition = createAsyncThunk(
    'network/changeDeviceCondition',
    async ({operation}, { rejectWithValue }) => {
        try{
            const responce = await request('network', 'process_op', {
                op: operation,
            });

            return responce.result;
        }catch(error){
            return rejectWithValue;
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
        });
        builder.addCase(fetchDeviceCondition.pending, state => {
            state.featchDeviceConditionStatus = 'pending';
            state.featchDeviceConditionError = false;
        });
        builder.addCase(fetchDeviceCondition.fulfilled, (state, action) => {
            state.featchDeviceConditionStatus = 'fulfilled';
            state.featchDeviceConditionError = false;
            state.deviceCondition = action.payload;
        });
        builder.addCase(fetchDeviceCondition.rejected, (state, action) => {
            state.featchDeviceConditionStatus = 'rejected';
            state.featchDeviceConditionError = action.payload;
        });
        builder.addCase(changeDeviceCondition.pending, state => {
            state.changeDeviceConditionStatus = 'pending';
            state.changeDeviceConditionError = false;
        });
        builder.addCase(changeDeviceCondition.fulfilled, state => {
            state.changeDeviceConditionStatus = 'fulfilled';
            state.changeDeviceConditionError = false;
        })
        builder.addCase(changeDeviceCondition.rejected, (state, action) => {
            state.changeDeviceConditionStatus = 'rejected';
            state.changeDeviceConditionError = action.payload;
        })
    }
});

export { fetchListDevices, fetchDevice, saveDevice, fetchDeviceCondition, changeDeviceCondition};
export const { changeSelectedDevice, clearSlice } = networkSlice.actions;
export default networkSlice.reducer;
