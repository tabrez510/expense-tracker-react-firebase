import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {
    darkMode: true,
    isPremium: true
}

const themeSlice = createSlice({
    name: 'theme',
    initialState: initialThemeState,
    reducers: {
        toggleTheme(state){
            state.darkMode = !state.darkMode;
        },
        addPremium(state){
            state.isPremium = true;
        },
        removePremium(state){
            state.isPremium = false;
            state.darkMode = true;
        }
    }
})

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;