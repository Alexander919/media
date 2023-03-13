import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeUser = createAsyncThunk("users/remove", async (user) => {
    console.log("removeUser thunk start")
    await axios.delete(`http://localhost:3005/users/${user.id}`);
    console.log("removeUser thunk complete");
    // return response.data;
    return user;
});

export { removeUser };