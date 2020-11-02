import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../actions";
import { Col, Container, Row, Button, Table } from "react-bootstrap";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";

const Products = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [productDetails, setProductDetails] = useState(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showProductDetailsModal, setShowProductDetailsModal] = useState(false);
  const product = useSelector((state) => state.product);
  const category = useSelector((state) => state.category);

  const dispatch = useDispatch();

  const handleCloseAddProductModal = () => setShowAddProductModal(false);
  const handleShowAddProductModal = () => setShowAddProductModal(true);

  const handleCloseProductDetailsModal = () =>
    setShowProductDetailsModal(false);

  const handleShowProductDetailsModal = (product) => {
    setProductDetails(product);
    setShowProductDetailsModal(true);
  };

  const handleSubmitAddProductModal = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("quantity", quantity);
    form.append("category", categoryId);
    form.append("description", description);
    productPictures.forEach((pic) => {
      form.append("productPicture", pic);
    });

    dispatch(addProduct(form));
    setShowAddProductModal(false);
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const renderProducts = () => {
    return (
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product) => (
                <tr
                  onClick={() => {
                    handleShowProductDetailsModal(product);
                  }}
                  key={product._id}
                  style={{ cursor: "pointer" }}
                >
                  <td>1</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category.name}</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  const renderShowProductDetailsModal = () => {
    if (!productDetails) {
      return null;
    }

    return (
      <Modal
        show={showProductDetailsModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={"Product Details"}
        size={"lg"}
      >
        <Row>
          <Col md={6}>
            <label className="modal__key">Name</label>
            <p className="modal__value">{productDetails.name}</p>
          </Col>
          <Col md={6}>
            <label className="modal__key">Price</label>
            <p className="modal__value">{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <label className="modal__key">Quantity</label>
            <p className="modal__value">{productDetails.quantity}</p>
          </Col>
          <Col md={6}>
            <label className="modal__key">Category</label>
            <p className="modal__value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <label className="modal__key">Description</label>
            <p className="modal__value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="modal__key">Product pictures</label>
            <div style={{ display: "flex" }}>
              {productDetails.productPictures.map((pic) => (
                <div className="modal__product-img-container">
                  <img src={generatePublicUrl(pic.img)} />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Modal>
    );
  };

  const renderAddProductModal = () => {
    return (
      <Modal
        show={showAddProductModal}
        modalTitle={`Add new product`}
        handleClose={handleCloseAddProductModal}
        handleSubmit={handleSubmitAddProductModal}
      >
        <Input
          label="Name"
          placeholder="Product name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          label="Quantity"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
        />
        <Input
          label="Price"
          placeholder="Price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <Input
          label="Description"
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => {
            setCategoryId(e.target.value);
          }}
        >
          <option>Select category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
        <Input
          type="file"
          name="productPictures"
          onChange={handleProductPictures}
        />
      </Modal>
    );
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Product</h3>
              <Button variant="dark" onClick={handleShowAddProductModal}>
                Add
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
        {renderAddProductModal()}
        {renderShowProductDetailsModal()}
      </Container>
    </Layout>
  );
};

export default Products;
