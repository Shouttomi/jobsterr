import { useState, useEffect } from "react";
import { Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginuser, registeruser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
const initialstate = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setvalues] = useState(initialstate);

  const navigate = useNavigate();

  console.log("this is yo bro");
  const { isLoading, user } = useSelector((store) => store.user);

  console.log(user);
  const dispatch = useDispatch();

  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setvalues({ ...values, [name]: value });
    // console.log(`${name}, ${value}`)
  };

  const onsubmit = (e) => {
    e.preventDefault();

    const { name, email, password, isMember } = values;

    if (!email || !password || (!isMember && !name)) {
      toast.error(" fill out all fields");
      return;
    }

    if (isMember) {
      //console.log(user)
      console.log("this is login");
      dispatch(loginuser({ email: email, password: password }));
      return;
    }

    dispatch(registeruser({ email: email, password: password, name: name }));
  };

  const togglemember = () => {
    setvalues({ ...values, isMember: !values.isMember });
  };

  useEffect(() => {
    if (user && user.email === values.email) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }

    if (user && user.email === "testUser@test.com") {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }

    
   // console.log("this is user email",user?.email,"this is values", values.email)

    
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onsubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>

        {/* name field */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handlechange={handlechange}
          />
        )}

        {/* email field */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handlechange={handlechange}
        />
        {/* password field */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handlechange={handlechange}
        />

        <button
          className="btn btn-block"
          type="submit"
          onClick={onsubmit}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "submit"}
        </button>

        <button
          className="btn btn-block btn-hipster"
          type="button"
          onClick={() => {
            dispatch(
              loginuser({ email: "testUser@test.com", password: "secret" })
            );
          }}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "demo user"}
        </button>

        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" className="member-btn" onClick={togglemember}>
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
