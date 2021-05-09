import React from "react";
import { Link } from "react-router-dom";
import { getQueryParameterByName } from "../helpers";
import './auth.css';

const Signin = () => {
  const error = getQueryParameterByName("error", window.location.search);
  const success = getQueryParameterByName("message", window.location.search);
  return (
    <div className = "signup-header">
      <h1 className="title"> Sign In </h1>
      <form action="/login" method="post">
        {success && <div className="row">
          <div className="col-sm-12">
            <div className="alert alert-success">
              {success}
            </div>
          </div>
        </div>}
        <div className="row">
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
          <div className="form-group col-sm-12">
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
        </div>
        <div className="col-sm-12 text-center form-group">
          <p>
            Don't have a account? <Link to="/register">Register</Link>
          </p>
        </div>
        <div className="col-sm-12 text-center">
          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </div>
      </form>
      {error && 
        <div className="row">
          <div className="col-sm-12 text-center">
            <p className="text-danger">
              {error}
            </p>
          </div>
        </div>
      }
    </div>
  );
};

export default Signin;
