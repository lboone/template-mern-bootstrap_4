import axios from "axios";
import {
  GET_PROFILE,
  GET_PROFILES,
  CLEAR_CURRENT_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types";
import { CURRENT_API_VERSION } from "../config/keys";

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/${CURRENT_API_VERSION}/profile`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Get a profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/${CURRENT_API_VERSION}/profile/handle/${handle}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};
// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post(`/api/${CURRENT_API_VERSION}/profile`, profileData)
    .then(res => history.push("/dashboard"))
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};
// Delete Account
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure?  This can NOT be undone!")) {
    axios
      .delete(`/api/${CURRENT_API_VERSION}/profile`)
      .then(res => dispatch({ type: SET_CURRENT_USER, payload: {} }))
      .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
  }
};

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/${CURRENT_API_VERSION}/profile/all`)
    .then(res => dispatch({ type: GET_PROFILES, payload: res.data }))
    .catch(err => dispatch({ type: GET_PROFILES, payload: null }));
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
