import React from "react";
import './auth.css';

const Signin = () => {
  return (
    <div className = "signup-header">
      <h1> Sign In </h1>
      <form>
        <div class="form-row">
          <div class="form-group">
            <label for="inputEmail4">Email</label>
            <input
              type="email"
              class="form-control"
              id="inputEmail4"
              placeholder="Email"
              required
            />
          </div>
          <div class="form-group">
            <label for="inputPassword4">Password</label>
            <input
              type="password"
              class="form-control"
              id="inputPassword4"
              placeholder="Password"
              required
            />
          </div>
        </div>
        <button type="submit" class="btn btn-primary">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Signin;
