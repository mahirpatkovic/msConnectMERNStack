import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
    isAuthenticated: false,
    currentUser: {},
};

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.currentUser = {};
        },
        setCurrentUser(state, action) {
            state.currentUser = action.payload;
        },
        setUserCover(state, action) {
            state.currentUser.cover = action.payload;
        },
        setUserProfile(state, action) {
            state.currentUser.photo = action.payload;
        },
    },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
