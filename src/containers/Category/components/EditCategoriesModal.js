import React from "react";
import { Col, Row } from "react-bootstrap";
import Input from "../../../components/UI/Input";
import Modal from "../../../components/UI/Modal";

const updateCategoriesModal = (props) => {
  const {
    show,
    modalTitle,
    size,
    handleClose,
    handleSubmit,
    expandedArray,
    checkedArray,
    handleCategoryInput,
    categoryList,
  } = props;

  return (
    <Modal
      show={show}
      modalTitle={modalTitle}
      handleClose={handleClose}
      size={size}
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
          <h6>Expanded</h6>
        </Col>
      </Row>
      {expandedArray.length > 0 &&
        expandedArray.map((item, index) => (
          <Row key={index}>
            <Col>
              <Input
                className="form-control-sm"
                placeholder="Enter category name"
                value={item.name}
                type="text"
                onChange={(e) =>
                  handleCategoryInput("name", e.target.value, index, "expanded")
                }
              />
            </Col>
            <Col>
              <select
                className="form-control form-control-sm"
                value={item.parentId}
                onChange={(e) =>
                  handleCategoryInput(
                    "parentId",
                    e.target.value,
                    index,
                    "expanded"
                  )
                }
              >
                <option value={""}>Select category</option>
                {categoryList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <select
                className="form-control form-control-sm"
                value={item.type}
                onChange={(e) =>
                  handleCategoryInput("type", e.target.value, index, "expanded")
                }
              >
                <option value="">Select Type</option>
                <option value="store">Store</option>
                <option value="product">Product</option>
                <option value="page">Page</option>
              </select>
            </Col>
          </Row>
        ))}
      <Row>
        <Col>
          <h6>Checked</h6>
        </Col>
      </Row>
      {checkedArray.length > 0 &&
        checkedArray.map((item, index) => (
          <Row key={index}>
            <Col>
              <Input
                className="form-control-sm"
                placeholder="Enter category name"
                value={item.name}
                type="text"
                onChange={(e) =>
                  handleCategoryInput("name", e.target.value, index, "checked")
                }
              />
            </Col>
            <Col>
              <select
                className="form-control form-control-sm"
                value={item.parentId}
                onChange={(e) =>
                  handleCategoryInput(
                    "parentId",
                    e.target.value,
                    index,
                    "checked"
                  )
                }
              >
                <option value="">Select category</option>
                {categoryList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <select
                className="form-control form-control-sm"
                value={item.type}
                onChange={(e) =>
                  handleCategoryInput("type", e.target.value, index, "checked")
                }
              >
                <option value="">Select Type</option>
                <option value="store">Store</option>
                <option value="product">Product</option>
                <option value="page">Page</option>
              </select>
            </Col>
          </Row>
        ))}
    </Modal>
  );
};

export default updateCategoriesModal;
