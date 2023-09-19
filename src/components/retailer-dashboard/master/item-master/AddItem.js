import React, { useCallback, useEffect, useRef, useState } from "react";
import Select, { useStateManager } from "react-select";
import { useDispatch, useSelector } from "react-redux";

import {
  handleAddItemToStoreRequest,
  handleUploadPicRequest,
  handleUpdateItemToStoreRequest,
  handleInventoryMasterRequest,
} from "../../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { FcDepartment } from "react-icons/fc";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import { createMakeAndWithStyles } from "tss-react";
// import { PhotoCameraRoundedIcon } from "@material-ui/icons";
import { AiFillCamera } from "react-icons/ai";

// import { useHistory } from "react-router-dom";
import Webcam from "react-webcam";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Button, Col } from "react-bootstrap";
import { Label, FormGroup } from "reactstrap";
import { BASE_Url } from "../../../../URL";
const videoConstraints = {
  width: 200,
  facinMode: "enviorment",
};

const AddItem = ({
  addUpdateItemModalIsOpen,
  setAddUpdateItemModalIsOpen,
  row,
  setFlag,
  flag,
}) => {
  const navigate = useNavigate();
  const { makeStyles } = createMakeAndWithStyles({});
  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100%",
      textAlign: "center",
    },
    imgBox: {
      maxWidth: "80%",
      maxHeight: "80%",
      margin: "10px",
    },
    img: {
      height: "inherit",
      maxWidth: "inherit",
    },
    input: {
      display: "none",
    },
  }));
  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log("takePhoto");
  }
  const { save_product_id } = useSelector((e) => e.ComponentPropsManagement);

  // console.log(save_product_id);
  const dispatch = useDispatch();
  //
  // const classes = useStyles();

  const [source, setSource] = useState("");
  //
  const [selectedOptionDiscount, setSelectedOptionDiscount] = useState(null);
  const [selectedOptionTax, setSelectedOptionTax] = useState(null);
  const [selectedHSNTax, setSelectedHSNTax] = useState(null);
  const [itemName, setItemName] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [stockQuantity, setstockQuantity] = useState("");
  const [openingQuantity, setOpeningQuantity] = useState("0");
  const [receivedQuantity, setReceivedQuantity] = useState("0");
  const [clossingQuantity, setClossingQuantity] = useState("");
  const [image, setImage] = useState("");
  const [uploadItem, setUploadItem] = useState("");
  const [department, setDepartment] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [itemPrice, setItemPrice] = useState("0");
  const [openCam, setOpenCam] = useState(false);
  const [productId, setProductId] = useState("");
  const [taxPercentage, setTaxPercentage] = useState("0");
  const [itemCategory, setItemCategory] = useState("");
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  // console.log("UPLOAD ITEM", uploadItem);
  // console.log("rr", row)
  // useEffect(() => {
  //   if (item_id) {
  //     setProductId(item_id);
  //   }
  // }, [item_id]);

  useEffect(() => {
    if (row) {
      setItemName(row.item_name);
      setItemPrice(row.price);
      setTaxPercentage(row.tax_percent);
      setItemCode(row.hsn_code);
      setHsnCode(row.hsn_code);
    }
  }, [row]);

  const { saasId, storeId } = JSON.parse(localStorage.getItem("User_data"));

  console.log("ROW", row);

  // console.log(capturePhoto);

  const handleAddItem = (e) => {
    e.preventDefault();
    dispatch(
      handleAddItemToStoreRequest({
        item_name: itemName,
        description: itemName,
        price: Number(itemPrice),
        tax: Number(taxPercentage),
        tax_code: Number(taxPercentage),
        status: "active",
        saas_id: saasId,
        store_id: storeId,
        department: itemName,
        item_code: Number(itemCode),
        // discount: Number(selectedOptionDiscount.value),
        // promo_id: saasId,
      })
    );
    setItemName("");
    setItemPrice("");
    setItemCode("");
    setItemDesc("");
    setItemCategory("");
    setItemDesc("");
    setDepartment("");
    setSelectedOptionDiscount(null);
    setTaxPercentage("");
    setSelectedHSNTax(null);
    setSelectedOptionTax(null);
    setProductId(row.item_id);
  };

  const onUserMedia = (e) => {
    console.log(e);
  };

  const handleCapture = (target) => {
    if (target.files) {
      if (target.files?.length !== 0) {
        // const file = target.files[0];
        // const newUrl = URL.createObjectURL(file);
        // setSource(newUrl);
        setSource(target.files[0]);
      }
    }
  };

  const handleUploadImage = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      item_name: itemName,
      item_code: row.item_id,
      description: itemName,
      price: itemPrice,
      discount: row.discount,
      tax: taxPercentage,
      status: row.status,
      saas_id: saasId,
      store_id: storeId,
      promo_id: row.promo_id,
      sku: 0,
      category: row.category,
      barcode: row.barcode,
      mrp: row.mrp,
      stock_quantity: 0,
      update_price: itemPrice,
      selling_price: itemPrice,
      opening_quantity: openingQuantity,
      closing_quantity: 0,
      received_quantity: receivedQuantity,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${BASE_Url}/item/update-item/${row.item_id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    // console.log("Æ");
    dispatch(
      handleInventoryMasterRequest({
        item_name: itemName,
        // item_code: Number(itemCode),
        item_code: row.item_id,
        description: itemName,
        price: Number(itemPrice),
        // discount: Number(selectedOptionDiscount.value),
        tax: Number(taxPercentage),
        tax_code: Number(0),
        status: row.status,
        saas_id: saasId,
        product_av_cost: purchasePrice,
        product_cost: purchasePrice,
        mrp: mrp,
        sold_qty: 0,
        // closing_qty: closingQuantity,
        closing_qty: 0,
        opening_qty: openingQuantity,
        received_qty: receivedQuantity,
        category: row.category,
        product_price: itemPrice,
        stock_qty: "0",
        tax_percentage: taxPercentage,
        store_id: storeId,
        department: itemName,
        // promo_id: saasId,
      })
    );
    setAddUpdateItemModalIsOpen(false);
    // dispatch(handleUpdateItemToStoreRequest({ formData, id: row.item_id }));

    // setTimeout(() => {
    //   // setProductId(row.item_id)
    //   setAddUpdateItemModalIsOpen(!addUpdateItemModalIsOpen);
    //   setFlag(!flag);
    // }, 500);
  };

  return (
    <>
      <Modal
        isOpen={addUpdateItemModalIsOpen}
        toggle={() => setAddUpdateItemModalIsOpen(!addUpdateItemModalIsOpen)}
      >
        <ModalHeader>
          <BsArrowLeft
            onClick={() =>
              setAddUpdateItemModalIsOpen(!addUpdateItemModalIsOpen)
            }
            className="mouse-pointer"
          />{" "}
          Update Item *
        </ModalHeader>
        <ModalBody>
          <div className="row d-flex justify-content-center">
            <div className="">
              <form
                className="form-box"
                onSubmit={handleAddItem}
                // encType="multipart/form-data"
                encType="Content-Type"
              >
                <div
                  className="d-flex flex-col"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Col md={12}>
                    {/* <div class="mb-3">
                      <label for="formFile" class="form-label">
                        Click Here to upload Product Picture
                      </label>
                      <input
                        class="form-control"
                        type="file"
                        // multiple={true}
                        accept="image/*"
                        id="formFile"
                        onChange={(e) => {
                          setImage(e.target.files[0]);
                          // setImage(e.target.value);
                        }}
                      />
                    </div> */}
                    {/* <div style={{ height: "100px", width: "100px" }}>
                      <img
                        style={{ height: "100px", width: "100px" }}
                        src={image}
                        alt=""
                      />
                    </div> */}
                  </Col>
                  <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    label="Item Name"
                    multiline
                    required
                    rows={1}
                  />

                  <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    value={itemPrice}
                    required
                    onChange={(e) => setItemPrice(e.target.value)}
                    label="Item Price"
                  />
                  <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    value={hsnCode}
                    required
                    onChange={(e) => setHsnCode(e.target.value)}
                    label="HSN Code"
                  />

                  <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    value={taxPercentage}
                    required
                    onChange={(e) => setTaxPercentage(e.target.value)}
                    label="Tax Percentage"
                  />
                  <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    value={purchasePrice}
                    required
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    label="Purchase Price"
                  />
                  <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    value={openingQuantity}
                    required
                    onChange={(e) => setOpeningQuantity(e.target.value)}
                    label="Opening Quantity"
                  />
                  <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    value={receivedQuantity}
                    required
                    onChange={(e) => setReceivedQuantity(e.target.value)}
                    label="Received Quantity"
                  />
                  {/* <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    value={clossingQuantity}
                    required
                    onChange={(e) => setClossingQuantity(e.target.value)}
                    label="Clossing Quantity"
                  /> */}
                </div>

                <div className="">
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#20b9e3",
                      outline: "none",
                      border: "none",
                      fontSize: "20px",
                      padding: "10px 20px",
                      borderRadius: "10px",
                      color: "#fff",
                    }}
                    onClick={handleUploadImage}
                  >
                    Update
                  </button>

                  {/* <button
                    style={{
                      backgroundColor: "#20b9e3",
                      outline: "none",
                      border: "none",
                      marginLeft: "20px",
                      fontSize: "20px",
                      padding: "10px 20px",
                      borderRadius: "10px",
                      color: "#fff",
                    }}
                  >
                    Add
                  </button> */}
                  <span
                    // to="/retailer-dashboard"
                    onClick={() => {
                      setAddUpdateItemModalIsOpen(!addUpdateItemModalIsOpen);
                    }}
                    className="btn btn-primary"
                    style={{
                      backgroundColor: "#fc0202",
                      outline: "none",
                      border: "none",
                      marginLeft: "20px",
                      fontSize: "20px",
                      padding: "10px 20px",
                      borderRadius: "10px",
                      color: "#fff",
                    }}
                  >
                    Close
                  </span>
                </div>
              </form>
              {/* )} */}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>{/* <h1>FOOTER</h1> */}</ModalFooter>
      </Modal>
    </>
  );
};

export default AddItem;
