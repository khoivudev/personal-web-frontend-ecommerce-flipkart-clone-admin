import React from "react";
import { Spinner } from "react-bootstrap";
import "./style.css";

const Loading = ({ message }) => {
  return (
    <div className="loading">
      <Spinner animation="border" role="status" variant="primary" />
      <br />
      {message ? <p>{message}</p> : <p>Loading...Please wait</p>}
    </div>
  );
};

export default Loading;
