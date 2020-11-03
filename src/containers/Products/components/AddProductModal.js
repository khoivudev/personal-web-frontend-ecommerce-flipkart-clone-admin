import React from "react";
import Input from "../../../components/UI/Input";
import Modal from "../../../components/UI/Modal";

const AddProductModal = (props) => {
  const {
    show,
    modalTitle,
    handleClose,
    handleSubmit,
    name,
    setName,
    quantity,
    setQuantity,
    price,
    setPrice,
    description,
    setDescription,
    categoryId,
    setCategoryId,
    categoryList,
    productPictures,
    handleProductPictures,
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
      <Input
        className="form-control-sm"
        label="Name"
        placeholder="Product name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        className="form-control-sm"
        label="Quantity"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <Input
        className="form-control-sm"
        label="Price"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Input
        className="form-control-sm"
        label="Description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Input
        type="select"
        className="form-control form-control-sm"
        placeholder={"Select category"}
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        options={categoryList}
      />

      <div>
        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
        <Input
          type="file"
          name="productPictures"
          onChange={(e) => handleProductPictures(e)}
        />
      </div>
    </Modal>
  );
};

export default AddProductModal;
