import { useState } from "react";
import { FormRow } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateuser } from "../../features/user/userSlice";

const Profile = () => {
  const { isloading, user } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const [userdata, setuserdata] = useState({
    name: user?.name || "",
    email: user?.email || "",
    lastName: user?.lastName || "",
    location: user?.location || "",
  });

  const handlesubmit = (e) => {
    e.preventDefault();

    const { name, email, lastName, location } = userdata;

    if (!name || !email || !lastName || !location) {
      toast.error("Fill all fields");
      return;
    }
    dispatch(updateuser(userdata))
  };

  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.table({name,value})

    setuserdata({ ...userdata, [name]: value });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handlesubmit}>
        <h3>profile</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={userdata.name}
            handlechange={handlechange}
          />

<FormRow
            type="text"
            name="lastname"
            labeltext='last name'
            value={userdata.lastName}
            handlechange={handlechange}
          />

<FormRow
            type="email"
            name="email"
            value={userdata.email}
            handlechange={handlechange}
          />

<FormRow
            type="text"
            name="location"
            value={userdata.location}
            handlechange={handlechange}
          />
          <button type="submit" className="btn btn-block" disabled={isloading}>
            {isloading?'Please wait...':'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default Profile;
