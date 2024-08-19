import { createSlice } from "@reduxjs/toolkit";

let theme = localStorage.getItem('theme');
if(!theme){
    theme = false;
} else {
    theme = theme === 'true' ? true : false;
}
const initialThemeState = {
    darkMode: true
}

const themeSlice = createSlice({
    name: 'theme',
    initialState: initialThemeState,
    reducers: {
        toggleTheme(state){
            state.darkMode = !state.darkMode
        }
    }
})

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;