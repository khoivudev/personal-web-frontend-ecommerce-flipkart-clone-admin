import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCategory,
  getAllCategory,
  updateCategories,
  deleteCategories,
} from "../../actions";
import { Col, Container, Row, Button } from "react-bootstrap";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
} from "react-icons/md";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import Layout from "../../components/Layout";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

const Category = (props) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);

  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return myCategories;
  };

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleSubmitAddModal = () => {
    const form = new FormData();
    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);

    dispatch(addCategory(form));

    setShowAddModal(false);
  };

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });

    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  };

  const handleShowEditModal = () => {
    setShowEditModal(true);
    updateCheckedAndExpandedCategories();
  };
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleSubmitEditModal = () => {
    const form = new FormData();
    checkedArray.forEach((item) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type ? item.type : "");
    });

    expandedArray.forEach((item) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type ? item.type : "");
    });

    dispatch(updateCategories(form)).then((result) => {
      if (result) {
        dispatch(getAllCategory());
      }
    });

    setShowEditModal(false);
  };

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
    updateCheckedAndExpandedCategories();
  };

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleSubmitDeleteModal = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    const expandedIdsArray = expandedArray.map((item, index) => ({
      _id: item.value,
    }));
    const idsArray = checkedIdsArray.concat(expandedIdsArray);
    dispatch(deleteCategories(idsArray)).then((result) => {
      if (result) {
        dispatch(getAllCategory());
      }
    });
    setShowDeleteModal(false);
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleCategoryInput = (key, value, index, type) => {
    if (type == "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type == "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  const renderAddCategoryModal = () => {
    return (
      <Modal
        show={showAddModal}
        modalTitle={"Add new Category"}
        handleClose={handleCloseAddModal}
        buttons={[
          {
            label: "Save",
            color: "primary",
            onClick: handleSubmitAddModal,
          },
          {
            label: "Cancel",
            color: "dark",
            onClick: handleCloseAddModal,
          },
        ]}
      >
        <Input
          placeholder="Enter category name"
          value={categoryName}
          type="text"
          onChange={(e) => {
            setCategoryName(e.target.value);
          }}
        />
        <select
          className="form-control"
          onChange={(e) => {
            setParentCategoryId(e.target.value);
          }}
          value={parentCategoryId}
        >
          <option value={""}>Select category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

        <Input
          type="file"
          name="categoryImage"
          onChange={(e) => {
            setCategoryImage(e.target.files[0]);
          }}
        />
      </Modal>
    );
  };

  const renderEditCategoriesModal = () => {
    return (
      <Modal
        show={showEditModal}
        modalTitle={"Edit categories"}
        handleClose={handleCloseEditModal}
        size="lg"
        buttons={[
          {
            label: "Save",
            color: "primary",
            onClick: handleSubmitEditModal,
          },
          {
            label: "Cancel",
            color: "dark",
            onClick: handleCloseEditModal,
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
                  placeholder="Enter category name"
                  value={item.name}
                  type="text"
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  className="form-control"
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
                  {createCategoryList(category.categories).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col>
                <select
                  className="form-control"
                  onChange={(e) =>
                    handleCategoryInput(
                      "type",
                      e.target.value,
                      index,
                      "expanded"
                    )
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
                  placeholder="Enter category name"
                  value={item.name}
                  type="text"
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  className="form-control"
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
                  <option>Select category</option>
                  {createCategoryList(category.categories).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col>
                <select
                  className="form-control"
                  onChange={(e) =>
                    handleCategoryInput(
                      "type",
                      e.target.value,
                      index,
                      "checked"
                    )
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

  const renderDeleteCategoriesModal = () => {
    return (
      <Modal
        modalTitle={"Confirm"}
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleSubmit={handleSubmitDeleteModal}
        buttons={[
          {
            label: "Yes",
            color: "danger",
            onClick: handleSubmitDeleteModal,
          },
          {
            label: "No",
            color: "dark",
            onClick: handleCloseDeleteModal,
          },
        ]}
      >
        <p>Are you sure to delete these items?</p>
        <h5>Expanded Items:</h5>
        {expandedArray.length > 0 &&
          expandedArray.map((item, index) => (
            <span key={index}>{item.name} </span>
          ))}
        <h5>Checked Items:</h5>
        {checkedArray.length > 0 &&
          checkedArray.map((item, index) => (
            <span key={index}>{item.name}</span>
          ))}
      </Modal>
    );
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <Button variant="dark" onClick={handleShowAddModal}>
                Add
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <MdCheckBox />,
                uncheck: <MdCheckBoxOutlineBlank />,
                halfCheck: <MdCheckBoxOutlineBlank />,
                expandClose: <MdKeyboardArrowRight />,
                expandOpen: <MdKeyboardArrowDown />,
                expandAll: <></>,
                collapseAll: <></>,
                parentClose: <></>,
                parentOpen: <></>,
                leaf: <></>,
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <p style={{ fontSize: "12px", color: "#dc3545" }}>
              (*) Click to choose categories to delete or edit
            </p>
            <Button variant="dark" onClick={handleShowEditModal}>
              Edit
            </Button>{" "}
            <Button variant="dark" onClick={handleShowDeleteModal}>
              Delete
            </Button>
          </Col>
        </Row>
      </Container>

      {renderAddCategoryModal()}
      {renderEditCategoriesModal()}
      {renderDeleteCategoriesModal()}
    </Layout>
  );
};

export default Category;
