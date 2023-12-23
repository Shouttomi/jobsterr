import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getuserfromlocalstorage } from "../../utils/localstorage";
import { createjobthunk, editjobthunk, deletejobthunk } from "./jobThunk";

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

export const createjob = createAsyncThunk("job/createjob", createjobthunk);

export const deletejob = createAsyncThunk("job/deletejob", deletejobthunk);

export const editjob = createAsyncThunk("job/editjob", editjobthunk);

const jobslice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handlechange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearvalues: () => {
      return {
        ...initialState,
        jobLocation: getuserfromlocalstorage()?.location || "",
      };
    },
    seteditjob: (state, { payload }) => {
      console.log(payload);
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createjob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createjob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job Created");
      })
      .addCase(createjob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deletejob.fulfilled, (state, { payload }) => {
        toast.success(payload);
      })
      .addCase(deletejob.rejected, (state, { payload }) => {
        toast.error(payload);
      })
      .addCase(editjob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editjob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job Edited");
      })
      .addCase(editjob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { handlechange, clearvalues, seteditjob } = jobslice.actions;
export default jobslice.reducer;
