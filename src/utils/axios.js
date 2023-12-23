import axios from "axios";
import { clearstore } from "../features/user/userSlice";

const customfetch = axios.create({
  baseURL: "https://jobify-prod.herokuapp.com/api/v1/toolkit",
});


export const checkforunauthorizedresponse = (error,thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearstore());
    return thunkAPI.rejectWithValue("Unauthorized user logging out...");
  }

  return thunkAPI.rejectWithValue(error.response.data.msg);
}


export default customfetch