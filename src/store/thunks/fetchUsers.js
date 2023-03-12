import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUsers = createAsyncThunk("users/fetch", async () => {
    const response = await axios.get("http://localhost:3005/users");

    await pause(2000); //dev only
    return response.data; //assigned to payload property
});

//dev only
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

export { fetchUsers };