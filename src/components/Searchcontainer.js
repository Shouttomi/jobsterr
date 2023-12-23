import { FormRow, Formrowselect } from ".";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useSelector, useDispatch } from "react-redux";
import { handleChange, clearFilters } from "../features/alljobs/alljobsSlice";
import { useState, useMemo } from "react";

const Searchcontainer = () => {
  const [localsearch, setlocalsearch] = useState("");
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.alljobs);

  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);

  const dispatch = useDispatch();

  const handlesearch = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const clearsubmit = (e) => {
    e.preventDefault();
    setlocalsearch('');
    dispatch(clearFilters());
  };

  const debounce = () => {
    console.log("debounce called");
    let timeoutID;

    return (e) => {
      setlocalsearch(e.target.value);

      console.log(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        dispatch(handleChange({ name: e.target.name, value: e.target.value }));
      }, 1000);
    };
  };

  const optimizeddebounce = useMemo(() => debounce(), []);

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search position */}
          <FormRow
            type="text"
            name="search"
            value={localsearch}
            handlechange={optimizeddebounce}
          />

          {/* search by status */}
          <Formrowselect
            labeltext="status"
            name="searchStatus"
            value={searchStatus}
            handlechange={handlesearch}
            list={["all", ...statusOptions]}
          />
          {/* search by type */}
          <Formrowselect
            labeltext="type"
            name="searchType"
            value={searchType}
            handlechange={handlesearch}
            list={["all", ...jobTypeOptions]}
          />

          {/* sort */}
          <Formrowselect
            name="sort"
            value={sort}
            handlechange={handlesearch}
            list={sortOptions}
          />

          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={clearsubmit}
          >
            clear
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default Searchcontainer;
