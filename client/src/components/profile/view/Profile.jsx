import React, { Component } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileGithub from "./ProfileGithub";
import { isNotEmpty } from "../../../utils";

import { GITHUB } from "../../../config/keys";

class Profile extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          {GITHUB.USE_REPOSITORIES &&
            isNotEmpty(profile.githubusername) && (
              <ProfileGithub username={profile.githubusername} />
            )}
        </div>
      </div>
    );
  }
}

export default Profile;
