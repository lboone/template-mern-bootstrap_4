import React, { Component } from "react";

import { isNotEmpty } from "../../../utils";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    const user = profile.user;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-primary text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={user.avatar}
                  alt={user.name}
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{user.name}</h1>
              {profile.company && (
                <p className="lead text-center">
                  {profile.status} at {profile.company}
                </p>
              )}
              {profile.location && <p>{profile.location}</p>}

              <p>
                {isNotEmpty(profile.website) ? (
                  <a
                    className="text-white p-2"
                    target="_blank"
                    href={profile.website}
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                ) : null}

                {isNotEmpty(profile.social.twitter) ? (
                  <a
                    className="text-white p-2"
                    target="_blank"
                    href={profile.social.twitter}
                  >
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                ) : null}

                {isNotEmpty(profile.social.facebook) ? (
                  <a
                    className="text-white p-2"
                    target="_blank"
                    href={profile.social.facebook}
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                ) : null}

                {isNotEmpty(profile.social.linkedin) ? (
                  <a
                    className="text-white p-2"
                    target="_blank"
                    href={profile.social.linkedin}
                  >
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                ) : null}

                {isNotEmpty(profile.social.instagram) ? (
                  <a
                    className="text-white p-2"
                    target="_blank"
                    href={profile.social.instagram}
                  >
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                ) : null}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
