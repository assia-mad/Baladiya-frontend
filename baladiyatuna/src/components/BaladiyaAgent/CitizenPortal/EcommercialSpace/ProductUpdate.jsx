import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import apiInstance from "../../../../../API";
import ProductDetails from "./ProductDetails";
import SuccessSnackbar from "../../../Tools/SuccessSnackBar";
import ErrorSnackbar from "../../../Tools/ErrorSnackBar";


const ProductUpdate = () => {
  const { id } = useParams();
  const [modifiedProduct, setModifiedProduct] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isToastOpen, setToastOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const { t } = useTranslation();

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    if (isToastOpen) {
      setToastOpen(false);
    } else {
      setSuccessOpen(false);
    }
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await apiInstance.get(`products/${id}/`);
        setModifiedProduct(response);
      } catch (error) {
        console.log('Error fetching product data', error);
      }
    };

    fetchProductData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModifiedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('name', modifiedProduct.name);
    formData.append('description', modifiedProduct.description);
    formData.append('price', modifiedProduct.price);
    formData.append('action_type', modifiedProduct.action_type);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await apiInstance.patch(`products/${modifiedProduct.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setModifiedProduct(response);
      setSuccessMsg(t('La modification a réussi!'));
      setSuccessOpen(true);
      console.log('Response after update:', response);
    } catch (error) {
      console.log('Error updating product', error);
      setErrorMsg(t('Modification echouée'));
      setToastOpen(true);
    }
  };

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    setImageFile(selectedFile);
    console.log('Selected file:', selectedFile);
  };

  if (!modifiedProduct) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ErrorSnackbar
        open={isToastOpen}
        onClose={handleToastClose}
        errorMsg={errorMsg}
      />
      <SuccessSnackbar
        open={isSuccessOpen}
        onClose={handleToastClose}
        successMsg={successMsg}
      />
      <ProductDetails
        mode="update"
        handleChange={handleChange}
        handleUpdate={handleUpdate}
        handleImageUpload={handleImageUpload}
        modifiedProduct={modifiedProduct}
      />
    </>
  );
};

export default ProductUpdate;
