import { showloading, hideloading, getalljobs } from "../alljobs/alljobsSlice";
import customFetch,{checkforunauthorizedresponse} from "../../utils/axios";
import { clearvalues } from "./jobSlice";


const authHeader = (thunkAPI)=>{
    return {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      }
}


export const createjobthunk = async (job, thunkAPI) => {
  try {
    const resp = await customFetch.post("/jobs", job, authHeader(thunkAPI));
    thunkAPI.dispatch(clearvalues());
    return resp.data;
  } catch (error) {
    return checkforunauthorizedresponse(error,thunkAPI);
  }
};

export const deletejobthunk = async (jobid, thunkAPI) => {
  thunkAPI.dispatch(showloading());
  try {
    const resp = await customFetch.delete(`/jobs/${jobid}`, {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    //now getalljobs will deal with pending and fulfilled
    //we just need to take care of error
    thunkAPI.dispatch(getalljobs());
    return resp.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideloading());
    return checkforunauthorizedresponse(error,thunkAPI);
  }
};

export const editjobthunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/jobs/${jobId}`, job, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });

    thunkAPI.dispatch(clearvalues());
  } catch (error) {
    return checkforunauthorizedresponse(error,thunkAPI);
  }
};
