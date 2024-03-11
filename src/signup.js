import React from "react";
import UserState from "./statefunction";
console.log("hello");
function SignUp() {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (evt) => {
    const value = evt.target.value;
    console.log("before update", value);
    setState({
      ...state,
      [evt.target.name]: value,
    });
    // console.log(...state);
    console.log("it returns every thing u entered value after update", value);
  };
  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    const { name, email, password } = state;
    alert(`you r signed in ${name},${email},${password}`);
    for (const key in state) {
      console.log(key);
      setState({
        ...state,
        [key]: "",
      });
    }
  };
  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        {/* <div className="social-container">b
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div> */}
        <span>or use your email for registration</span>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
