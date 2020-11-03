import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../actions";
import { Col, Container, Row, Table } from "react-bootstrap";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import AddProductModal from "./components/AddProductModal";
import Layout from "../../components/Layout";
import Modal from "../../components/UI/Modal";
import Loading from "../../components/UI/Loading";
import "./style.css";

import linearCategories from "../../helpers/linearCategories";
import { generatePublicUrl } from "../../urlConfig";

const Products = () => {
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

  useEffect(() => {
    if (!product.loading) {
      //clear modal
      setName("");
      setPrice("");
      setQuantity("");
      setDescription("");
      setProductPictures([]);
      setCategoryId("");
    }
  }, [product]);

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
        buttons={[
          {
            label: "Close",
            color: "dark",
            onClick: handleCloseProductDetailsModal,
          },
        ]}
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

  return (
    <Layout sidebar>
      {product.loading ? (
        <Loading message={"Please wait"} />
      ) : (
        <>
          <Container>
            <Row>
              <Col md={12}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>Product</h3>
                  <div className="action-btn-container">
                    <span>Actions: </span>
                    <button onClick={handleShowAddProductModal}>
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
            <Row>
              <Col>{renderProducts()}</Col>
            </Row>

            <AddProductModal
              show={showAddProductModal}
              modalTitle={"Add New Product"}
              handleClose={handleCloseAddProductModal}
              handleSubmit={handleSubmitAddProductModal}
              name={name}
              setName={setName}
              quantity={quantity}
              setQuantity={setQuantity}
              price={price}
              setPrice={setPrice}
              description={description}
              setDescription={setDescription}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
              categoryList={linearCategories(category.categories)}
              productPictures={productPictures}
              handleProductPictures={handleProductPictures}
            />

            {renderShowProductDetailsModal()}
          </Container>
        </>
      )}
    </Layout>
  );
};

export default Products;
