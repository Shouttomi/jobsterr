import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getalljobsThunk, showstatsThunk } from "./alljobsThunk";

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: true,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getalljobs = createAsyncThunk("allJobs/getjobs", getalljobsThunk);

export const showstats = createAsyncThunk("allJobs/showstats", showstatsThunk);

const alljobsslice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showloading: (state) => {
      state.isLoading = true;
    },
    hideloading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changepage: (state, { payload }) => {
      state.page = payload;
    },
    clearalljobsstate: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getalljobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getalljobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        console.log(JSON.stringify(state.jobs));
        state.jobs = payload.jobs;
        state.numOfPages = payload.numOfPages;
        state.totalJobs = payload.totalJobs;
      })
      .addCase(getalljobs.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(showstats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showstats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.stats = payload.defaultStats;
        state.monthlyApplications = payload.monthlyApplications;
      })
      .addCase(showstats.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const {
  showloading,
  hideloading,
  handleChange,
  clearFilters,
  changepage,
  clearalljobsstate,
} = alljobsslice.actions;

export default alljobsslice.reducer;
