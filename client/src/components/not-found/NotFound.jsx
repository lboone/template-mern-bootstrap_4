import React from "react";

export default function NotFound() {
  return (
    <div className="container">
      <h1 className="display-4">Page Not Found</h1>
      <p>Sorry this page does not exist</p>
      <a href="/" className="btn btn-lg btn-info">
        Return Home
      </a>
    </div>
  );
}
