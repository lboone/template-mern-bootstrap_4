import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import Profile from "../profile/view/Profile";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onDeleteClick = e => {
    this.props.deleteAccount();
  };
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/edit-profile`}>{user.name}</Link>
            </p>
            <div className="profile">
              <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-info">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <Link to="/edit-profile" className="btn btn-light">
                        <i className="fas fa-user-circle text-info mr-1" /> Edit
                        Profile
                      </Link>
                    </li>
                  </ul>
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <button
                        style={{ float: "right" }}
                        className="btn btn-danger"
                        onClick={this.onDeleteClick}
                      >
                        Delete My Account
                      </button>
                    </li>
                  </ul>
                </nav>

                <Profile profile={profile} />
              </div>
            </div>
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
