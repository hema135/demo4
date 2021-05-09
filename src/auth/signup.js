import React from "react";
import { Link } from "react-router-dom";
import { getQueryParameterByName } from "../helpers";
import './auth.css';

const Signup = () => {
  const error = getQueryParameterByName("error", window.location.search);
  return (
    <div className = "signup-header">
      <h1 className="title"> Sign up </h1>
      <form action="/signup" method="post">
        <div className="row">
          <div className="col-sm-12 form-group">
            <label>
              <input 
                type="text" 
                className="form-control" 
                name="fname" 
                required
              />
              <span className="floating-label">First Name</span>  
            </label>
          </div>
          <div className="col-sm-12 form-group">
            <label>
              <input 
                type="text" 
                className="form-control" 
                name="lname" 
                required
              />
              <span className="floating-label">
                Last Name
              </span>
            </label>
          </div>
          <div className="col-sm-12 form-group">
            <label>
              <input
                type="email"
                className="form-control"
                name="email"
                required
              />
              <span className="floating-label">
                Email
              </span>
            </label>
          </div>
          <div className="form-group col-md-12">
            <label>
              <input
                type="password"
                className="form-control"
                name="password"
                required
              />
              <span className="floating-label">
                Password
              </span>
            </label>
          </div>
          <div className="col-sm-12 form-group text-center">
            <p>Already a member? <Link to="login">Log In</Link></p>
          </div>
          <div className="col-sm-12 text-center">
            <button type="submit" className="btn btn-dark">
              Sign Up
            </button>
          </div>
        </div>
        {error && 
          <div className="row">
            <div className="col-sm-12 text-center">
              <p className="text-danger">
                {error}
              </p>
            </div>
          </div>
        }
      </form>
    </div>
  );
};

export default Signup;
