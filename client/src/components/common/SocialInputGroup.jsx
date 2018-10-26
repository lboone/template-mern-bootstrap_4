import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SocialInputGroup = ({
  name,
  placeholder,
  value,
  error,
  icon,
  type,
  info,
  onChange,
  disabled
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SocialInputGroup.propTypes = {
  type: "text"
};
SocialInputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  info: PropTypes.string,
  icon: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

export default SocialInputGroup;
