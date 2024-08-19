import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: localStorage.getItem('token'),
  email: localStorage.getItem('uid')
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialAuthState,
    reducers: {
        login(state, action){
            const {token, uid} = action.payload;
            localStorage.setItem('token', token);
            localStorage.setItem('uid', uid);
            state.token = token;
            state.uid = uid;
        },
        logout(state){
            localStorage.removeItem('token');
            localStorage.removeItem('uid');
            state.token = null;
            state.uid = null;
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;
