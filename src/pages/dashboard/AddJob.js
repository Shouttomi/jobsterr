import { FormRow, Formrowselect } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  handlechange,
  clearvalues,
  createjob,
  editjob,
} from "../../features/job/jobSlice";
import { useEffect } from "react";
import userSlice from "../../features/user/userSlice";

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);

  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const handlesubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      toast.error("Fill out all fields");

      return;
    }

    if (isEditing) {
      dispatch(
        editjob({
          jobId: editJobId,
          job: { position, company, jobLocation, jobType },
        })
      );

      return;
    }

    dispatch(createjob({ position, company, jobLocation, jobType, status }));
  };

  useEffect(() => {
    if (!isEditing) {
      dispatch(handlechange({ name: "jobLocation", value: user.location }));
    }
  }, []);

  const handlejobinput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handlechange({ name, value }));

    console.table({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            handlechange={handlejobinput}
          />

          <FormRow
            type="text"
            name="company"
            value={company}
            handlechange={handlejobinput}
          />

          <FormRow
            type="text"
            name="jobLocation"
            value={jobLocation}
            labeltext="job location"
            handlechange={handlejobinput}
          />

          <Formrowselect
            name="status"
            value={status}
            handlechange={handlejobinput}
            list={statusOptions}
          />

          <Formrowselect
            name="jobType"
            value={jobType}
            labeltext="job Type"
            handlechange={handlejobinput}
            list={jobTypeOptions}
          />

          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => {
                dispatch(clearvalues());
              }}
            >
              clear
            </button>

            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handlesubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddJob;
