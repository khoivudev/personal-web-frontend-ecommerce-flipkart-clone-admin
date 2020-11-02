import React from "react";
import Modal from "../../../components/UI/Modal";

const DeleteCategoriesModal = (props) => {
  const {
    modalTitle,
    show,
    handleClose,
    handleSubmit,
    expandedArray,
    checkedArray,
  } = props;

  return (
    <Modal
      modalTitle={modalTitle}
      show={show}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      buttons={[
        {
          label: "Yes",
          color: "danger",
          onClick: handleSubmit,
        },
        {
          label: "No",
          color: "dark",
          onClick: handleClose,
        },
      ]}
    >
      <p>Are you sure to delete these items?</p>
      <h6>Expanded Items:</h6>
      {expandedArray.length > 0 &&
        expandedArray.map((item, index) => (
          <span key={index}>{item.name} </span>
        ))}
      <h6>Checked Items:</h6>
      {checkedArray.length > 0 &&
        checkedArray.map((item, index) => <span key={index}>{item.name}</span>)}
    </Modal>
  );
};

export default DeleteCategoriesModal;
