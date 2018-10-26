import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { GITHUB } from "../../../config/keys";

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const clientId = GITHUB.CLIENT_ID;
    const clientSecret = GITHUB.CLIENT_SECRET;
    const count = GITHUB.REPOSITORY_COUNT;
    const sort = GITHUB.REPOSITORY_SORT;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) {
          this.setState({
            repos: data
          });
        }
      })
      .catch(err => console.log(err));
  }
  render() {
    const { repos } = this.state;
    let repoItems = null;
    if (repos.length > 0) {
      const repoVals = repos.map(repo => (
        <div key={repo.id} className="card card-body mb-2">
          <div className="row">
            <div className="col-md-6">
              <h4>
                <a href={repo.html_url} className="text-info" target="_blank">
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div className="col-md-6">
              <span className="badge badge-info mr-1">
                Stars: {repo.stargazers_count}
              </span>
              <span className="badge badge-secondary mr-1">
                Watchers: {repo.watchers_count}
              </span>
              <span className="badge badge-success">
                Forks: {repo.forks_count}
              </span>
            </div>
          </div>
        </div>
      ));

      repoItems = (
        <div>
          <hr />
          <h3 className="mb-4">Latest Github Repos</h3>
          {repoVals}
        </div>
      );
    }
    return <div ref="myRef">{repoItems}</div>;
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};
export default ProfileGithub;
