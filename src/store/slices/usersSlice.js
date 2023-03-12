import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";
import { addUser } from "../thunks/addUser";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        data: [],
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.pending, (state, action) => {
            //Update our state object however appropriate
            //to show the user what we are loading date 
            state.isLoading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            //request finished
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            //request failed
            state.isLoading = false;
            state.error = action.error; //error property is added in case of error by thunk function
        });
        builder.addCase(addUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data.push(action.payload);
        });
        builder.addCase(addUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    }
});

export const usersReducer = usersSlice.reducer; // small state
//usersSlice.actions - type reducer functions that return e.g. type: users/AddUser, payload: "kjkj"