import React from "react";
import { Col, Row } from "react-bootstrap";
import Input from "../../../components/UI/Input";
import Modal from "../../../components/UI/Modal";

const AddCategoryModal = (props) => {
  const {
    show,
    modalTitle,
    handleClose,
    handleSubmit,
    categoryName,
    setCategoryName,
    parentCategoryId,
    setParentCategoryId,
    setCategoryImage,
    categoryList,
  } = props;

  return (
    <Modal
      show={show}
      modalTitle={modalTitle}
      handleClose={handleClose}
      buttons={[
        {
          label: "Save",
          color: "primary",
          onClick: handleSubmit,
        },
        {
          label: "Cancel",
          color: "dark",
          onClick: handleClose,
        },
      ]}
    >
      <Row>
        <Col>
          <Input
            className="form-control-sm"
            placeholder="Enter category name"
            value={categoryName}
            type="text"
            onChange={(e) => {
              setCategoryName(e.target.value);
            }}
          />
        </Col>
        <Col>
          <select
            className="form-control form-control-sm"
            onChange={(e) => {
              setParentCategoryId(e.target.value);
            }}
            value={parentCategoryId}
          >
            <option value={""}>Select category</option>
            {categoryList.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            type="file"
            name="categoryImage"
            onChange={(e) => {
              setCategoryImage(e.target.files[0]);
            }}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default AddCategoryModal;
