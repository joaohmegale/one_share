import { createSlice } from '@reduxjs/toolkit';
import { login, getInfo } from '../processes/session';

const sessionSlice = createSlice({
    extraReducers: builder => {
        builder
            .addCase(getInfo.pending, state => {
                state.loading = true;
                state.logout = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log(action);

                state.logout = null;
                localStorage.setItem('token', action.payload);
            })
            .addCase(getInfo.rejected, state => {
                state.loading = null;
                state.logout = true;

                localStorage.removeItem('token');
            })
            .addCase(getInfo.fulfilled, (state, action) => {
                console.log(action);
                state.logout = null;
                state.loading = null;
                state.user = action.payload;
            });
    },
    initialState: {
        loading: null
    },
    name: 'session'
});
export const getSessionInfo = state => state.session;
export default sessionSlice.reducer;