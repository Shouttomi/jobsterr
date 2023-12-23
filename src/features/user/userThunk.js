import customfetch,{checkforunauthorizedresponse} from "../../utils/axios";
import { clearalljobsstate } from "../alljobs/alljobsSlice";
import { clearvalues } from "../job/jobSlice";
import { logoutuser } from "./userSlice";


export const registeruserthunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customfetch.post(url, user);
    return resp.data;
  } catch (error) {
    return checkforunauthorizedresponse(error,thunkAPI);
  }
};

export const loginuserthunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customfetch.post(url, user);
    console.log(resp);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateuserthunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customfetch.patch(url, user, {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    return resp.data;
  } catch (error) {
    console.log(error);
    console.log(error.response);

    return checkforunauthorizedresponse(error,thunkAPI);
  }
};

export const clearstoreThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutuser(message));
    thunkAPI.dispatch(clearalljobsstate());
    thunkAPI.dispatch(clearvalues());

    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
