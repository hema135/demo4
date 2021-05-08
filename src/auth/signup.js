import React from "react";
import './auth.css';

const Signup = () => {
  return (
    <div className = "signup-header">
      <h1> Sign up </h1>
      <form>
        <div class="form-row">
          <div class="form-group">
            <label for="fname">First Name</label>
            <input type="text" class="form-control" id="fname" required/>
          </div>
          <div class="form-group">
            <label for="lname">Last Name</label>
            <input type="text" class="form-control" id="lname" required/>
          </div>
          <div class="form-group col-md-6">
            <label for="inputEmail4">Email</label>
            <input
              type="email"
              class="form-control"
              id="inputEmail4"
              placeholder="Email"
              required
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputPassword4">Password</label>
            <input
              type="password"
              class="form-control"
              id="inputPassword4"
              placeholder="Password"
              required
            />
          </div>
          <p>Already a member? <a href= "" >Log In</a></p>
        </div>
        <button type="submit" class="btn btn-dark">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
