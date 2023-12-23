import customfetch,{checkforunauthorizedresponse} from "../../utils/axios";

export const getalljobsThunk = async (_, thunkAPI) => {
  const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().alljobs;

  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;

  if (search) {
    url = url + `&search=${search}`;
  }

  try {
    const resp = await customfetch.get(url, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });

    console.log(JSON.stringify(resp.data.jobs));
    return resp.data;
  } catch (error) {
    return checkforunauthorizedresponse(error,thunkAPI);
  }
};

export const showstatsThunk = async (_, thunkAPI) => {
  try {
    const resp = await customfetch.get("/jobs/stats", {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    return checkforunauthorizedresponse(error,thunkAPI);
  }
};
