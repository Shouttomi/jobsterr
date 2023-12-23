import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  addusertolocalstorage,
  getuserfromlocalstorage,
  removeuserfromlocalstorage,
} from "../../utils/localstorage";
import {
  loginuserthunk,
  registeruserthunk,
  updateuserthunk,
  clearstoreThunk,
} from "./userThunk";

const initialState = {
  isLoading: false,
  issidebaropen: false,
  user: getuserfromlocalstorage(),
};

console.log(initialState.user);

export const registeruser = createAsyncThunk(
  "user/registeruser",
  async (user, thunkAPI) => {
    console.log(user);

    return registeruserthunk("auth/register", user, thunkAPI);
  }
);

export const loginuser = createAsyncThunk(
  "user/loginuser",
  async (user, thunkAPI) => {
    console.log(user);
    return loginuserthunk("auth/login", user, thunkAPI);
  }
);

export const updateuser = createAsyncThunk(
  "user/updateuser",
  async (user, thunkAPI) => {
    return updateuserthunk("auth/updateUser", user, thunkAPI);
  }
);

export const clearstore = createAsyncThunk("user/clearstore", clearstoreThunk);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    togglesidebar: (state) => {
      state.issidebaropen = !state.issidebaropen;
    },
    logoutuser: (state, { payload }) => {
      state.user = null;
      state.issidebaropen = false;
      removeuserfromlocalstorage();
      if (payload) {
        toast.success(payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registeruser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registeruser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        console.log(user);
        state.isLoading = false;
        state.user = user;
        addusertolocalstorage(user);
        toast.success(`Hello There, ${user.name}`);
      })
      .addCase(registeruser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(loginuser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginuser.fulfilled, (state, action) => {
        const { payload } = action;
        const { user } = payload;
        state.isLoading = false;
        console.log(action);
        state.user = user;
        addusertolocalstorage(user);
        console.log("this is login");
        toast.success(`Welcome back, ${user.name}`);
      })
      .addCase(loginuser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateuser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateuser.fulfilled, (state, action) => {
        const { payload } = action;
        const { user } = payload;
        state.isLoading = false;
        console.log(action);
        state.user = user;
        addusertolocalstorage(user);
        console.log("this is update");
        toast.success(`User updated!`);
      })
      .addCase(updateuser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(clearstore.rejected, () => {
        toast.error("there was an error");
      });
  },
});
export const { togglesidebar, logoutuser } = userSlice.actions;
export default userSlice.reducer;
