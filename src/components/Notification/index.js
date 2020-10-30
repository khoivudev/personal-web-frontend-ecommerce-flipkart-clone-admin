import React, { useState } from "react";
import { Alert } from "react-bootstrap";

const Notification = (props) => {
  return <Alert variant={props.messageType}>{props.message}</Alert>;
};

export default Notification;
