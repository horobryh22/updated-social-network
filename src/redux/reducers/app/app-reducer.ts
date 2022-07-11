import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {me} from '../auth/auth-reducer';

type InitialAppState = {
    initialized: boolean
}

const initialState: InitialAppState = {
    initialized: false
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(initializeApp.fulfilled, (state, action) => {
                state.initialized = action.payload;
            })
    }
});

export const initializeApp = createAsyncThunk<boolean, void, { rejectValue: string }>(
    'app/initializeApp',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            await dispatch(me());
            return true;
        } catch (e) {
            const err = e as Error;
            return rejectWithValue('me: ' + err.message);
        }
    }
);

export default appSlice.reducer;