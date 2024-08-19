import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
    items: []
}

const expenseSlice = createSlice({
    name: 'expense',
    initialState: initialExpenseState,
    reducers: {
        saveData(state, action){
            state.items = action.payload;
        },
        addItem(state, action) {
            state.items.push(action.payload);
        },
        removeItem(state, action){
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        editItem(state, action){
            const { id, updatedExpense } = action.payload;
            const idx = state.items.findIndex((item) => item.id === id);
            if(idx !== -1){
                state.items[idx] = { id, ...updatedExpense};
            }
        }
    }
})

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;