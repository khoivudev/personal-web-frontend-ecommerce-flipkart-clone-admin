import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import linearCategories from "../../helpers/linearCategories";
import { createPage } from "../../actions";
import { Container, Row, Col } from "react-bootstrap";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import "./style.css";

const Page = () => {
  const [showCreatePageModal, setShowCreatePageModal] = useState(false);

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [banners, setBanners] = useState("");
  const [products, setProducts] = useState("");
  const [categories, setCategories] = useState([]);

  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    setCategories(linearCategories(category.categories));
  }, [category]);

  const handleShowCreatePageModal = () => setShowCreatePageModal(true);
  const handleCloseCreatePageModal = () => setShowCreatePageModal(false);
  const handleSubmitCreatePageModal = () => {
    const form = new FormData();
    form.append("title", title);
    form.append("description", desc);
    form.append("category", categoryId);
    form.append("type", type);
    if (banners.length > 0) {
      banners.forEach((banner, index) => {
        form.append("banners", banner);
      });
    }
    if (products.length > 0) {
      products.forEach((product, index) => {
        form.append("products", product);
      });
    }
    dispatch(createPage(form));
    setShowCreatePageModal(false);
  };

  const hanldeBannerImages = (e) => {
    setBanners([...banners, e.target.files[0]]);
  };

  const hanldeProductImages = (e) => {
    setProducts([...products, e.target.files[0]]);
  };

  const handleOnChangeCategorySelect = (e) => {
    const category = categories.find((cat) => `${cat.value}` == e.target.value);
    if (category) {
      setCategoryId(category.value);
      setType(category.type);
    }
  };

  const renderCreatePageModal = () => {
    return (
      <Modal
        show={showCreatePageModal}
        modalTitle={"Create Product Page"}
        handleClose={handleCloseCreatePageModal}
        handleSubmit={handleSubmitCreatePageModal}
        buttons={[
          {
            label: "Save",
            color: "primary",
            onClick: handleSubmitCreatePageModal,
          },
          {
            label: "Cancel",
            color: "dark",
            onClick: handleCloseCreatePageModal,
          },
        ]}
      >
        <Row>
          <Col>
            <select
              className="form-control form-control-sm"
              value={categoryId}
              onChange={(e) => handleOnChangeCategorySelect(e)}
            >
              <option value="">Select Category</option>
              {categories.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Input
              className="form-control-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={"Page title"}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              className="form-control-sm"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder={"Page Desc"}
            />
          </Col>
        </Row>
        {banners.length > 0
          ? banners.map((banner, index) => (
              <Row key={index}>
                <Col>{banner.name}</Col>
              </Row>
            ))
          : null}
        <Row>
          <Col>
            <Input
              className="form-control-sm"
              type="file"
              name="banners"
              onChange={hanldeBannerImages}
            />
          </Col>
        </Row>
        {products.length > 0
          ? products.map((product, index) => (
              <Row key={index}>
                <Col>{product.name}</Col>
              </Row>
            ))
          : null}
        <Row>
          <Col>
            <Input
              className="form-control-sm"
              type="file"
              name="products"
              onChange={hanldeProductImages}
            />
          </Col>
        </Row>
      </Modal>
    );
  };
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Product Page</h3>
              <div className="action-btn-container">
                <span>Actions: </span>
                <button onClick={handleShowCreatePageModal}>
                  <MdAdd />
                  <span>Add</span>
                </button>
                <button onClick={() => {}}>
                  <MdEdit />
                  <span>Edit</span>
                </button>
                <button onClick={() => {}}>
                  <MdDelete />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      {renderCreatePageModal()}
    </Layout>
  );
};

export default Page;
