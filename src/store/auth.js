import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem('token');
const initialAuthState = {
  token: token,
  email: localStorage.getItem('uid'),
  isLoggedIn: !!token
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
            state.isLoggedIn = true;
        },
        logout(state){
            localStorage.removeItem('token');
            localStorage.removeItem('uid');
            state.token = null;
            state.uid = null;
            state.isLoggedIn = false;
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;
