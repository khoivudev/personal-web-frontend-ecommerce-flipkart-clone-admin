import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import linearCategories from "../../helpers/linearCategories";
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
  const [banners, setBanners] = useState("");
  const [products, setProducts] = useState("");

  const [categories, setCategories] = useState([]);
  const category = useSelector((state) => state.category);

  useEffect(() => {
    setCategories(linearCategories(category.categories));
  }, [category]);

  const handleShowCreatePageModal = () => setShowCreatePageModal(true);
  const handleCloseCreatePageModal = () => setShowCreatePageModal(false);
  const handleSubmitCreatePageModal = () => {
    console.log(title, categoryId);
    setShowCreatePageModal(false);
  };

  const hanldeBannerImages = (e) => {
    setBanners([...banners, e.target.files[0]]);
  };

  const hanldeProductImages = (e) => {
    setProducts([...products, e.target.files[0]]);
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
              onChange={(e) => {
                setCategoryId(e.target.value);
              }}
            >
              <option value="">Select Category</option>
              {categories.map((item) => (
                <option key={item._id} value={item._id}>
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
