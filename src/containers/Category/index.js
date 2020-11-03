import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCategory, updateCategories, deleteCategories } from "../../actions";
import { Col, Container, Row } from "react-bootstrap";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdAdd,
  MdEdit,
  MdDelete,
} from "react-icons/md";

import Layout from "../../components/Layout";
import Loading from "../../components/UI/Loading";
import EditCategoriesModal from "./components/EditCategoriesModal";
import AddCategoryModal from "./components/AddCategoryModal";
import DeleteCategoryModal from "./components/DeleteCategoriesModal";
import "./style.css";

import linearCategories from "../../helpers/linearCategories";

const Category = () => {
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

  useEffect(() => {
    if (!category.loading) {
      //clear modal
      setCategoryName("");
      setParentCategoryId("");
      setCategoryImage("");
    }
  }, [category]);

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
    const categories = linearCategories(category.categories);
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

    dispatch(updateCategories(form));
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
    // const expandedIdsArray = expandedArray.map((item, index) => ({
    //   _id: item.value,
    // }));
    // const idsArray = checkedIdsArray.concat(expandedIdsArray);

    if (checkedIdsArray.length > 0) {
      dispatch(deleteCategories(checkedIdsArray));
      setShowDeleteModal(false);
    }
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

  return (
    <Layout sidebar>
      {category.loading ? (
        <Loading message={"Please wait..."} />
      ) : (
        <>
          <Container>
            <Row>
              <Col md={12}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>Category</h3>
                  <div className="action-btn-container">
                    <span>Actions: </span>
                    <button onClick={handleShowAddModal}>
                      <MdAdd />
                      <span>Add</span>
                    </button>
                    <button onClick={handleShowEditModal}>
                      <MdEdit />
                      <span>Edit</span>
                    </button>
                    <button onClick={handleShowDeleteModal}>
                      <MdDelete />
                      <span>Delete</span>
                    </button>
                  </div>
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
            <p style={{ fontSize: "12px", color: "#dc3545" }}>
              (*) Choose categories to delete or edit
            </p>
          </Container>

          <AddCategoryModal
            show={showAddModal}
            modalTitle={"Add New Category"}
            handleClose={handleCloseAddModal}
            handleSubmit={handleSubmitAddModal}
            categoryName={categoryName}
            setCategoryName={setCategoryName}
            parentCategoryId={parentCategoryId}
            setParentCategoryId={setParentCategoryId}
            setCategoryImage={setCategoryImage}
            categoryList={linearCategories(category.categories)}
          />

          <EditCategoriesModal
            show={showEditModal}
            handleClose={handleCloseEditModal}
            handleSubmit={handleSubmitEditModal}
            modalTitle={"Update Categories"}
            size="lg"
            expandedArray={expandedArray}
            checkedArray={checkedArray}
            handleCategoryInput={handleCategoryInput}
            categoryList={linearCategories(category.categories)}
          />

          <DeleteCategoryModal
            modalTitle={"Delete Categories"}
            show={showDeleteModal}
            handleClose={handleCloseDeleteModal}
            handleSubmit={handleSubmitDeleteModal}
            checkedArray={checkedArray}
          />
        </>
      )}
    </Layout>
  );
};

export default Category;
