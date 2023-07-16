import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTodo(state, action) {
            const { id, text } = action.payload;
            state.push({ id, text, completed: false });
        },
        checkTodo(state, action) {
            const todo = state.find(todo => todo.id === action.payload);
            if(todo){
                todo.completed = !todo.completed;
            }
        },
        deleteTodo(state, action) {
            state.splice(action.payload, 1);
        },
        editTodo(state, action) {
            const todo = state.find(todo => todo.id === action.payload.id);
            if(todo){
                todo.text = action.payload.text;
            }
        }
    }
})

export const { addTodo, checkTodo, deleteTodo, editTodo } = todosSlice.actions;

export default todosSlice.reducer;
