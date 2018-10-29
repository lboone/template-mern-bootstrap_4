import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { APP_TITLE, APP_SLOGAN } from "../../config/keys";
class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">{APP_TITLE}</h1>
                <p className="lead"> {APP_SLOGAN}</p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-secondary mr-2">
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="btn btn-lg btn-light text-secondary"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = { auth: PropTypes.object.isRequired };
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Landing);
