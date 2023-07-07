import React, { useCallback, useEffect, useRef, useState } from "react";
import Select, { useStateManager } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAddItemToStoreRequest,
  handleUploadPicRequest,
  handleUpdateItemToStoreRequest
} from "../../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { FcDepartment } from "react-icons/fc";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs"
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
const videoConstraints = {
  width: 200,
  facinMode: "enviorment",
};

const AddItem = ({ addUpdateItemModalIsOpen, setAddUpdateItemModalIsOpen, row, setFlag, flag }) => {
  const navigate = useNavigate();
  const { makeStyles } = createMakeAndWithStyles({

  });
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
  const classes = useStyles();

  const [source, setSource] = useState("");
  //
  const [selectedOptionDiscount, setSelectedOptionDiscount] = useState(null);
  const [selectedOptionTax, setSelectedOptionTax] = useState(null);
  const [selectedHSNTax, setSelectedHSNTax] = useState(null);
  const [itemName, setItemName] = useState("");
  const [uploadItem, setUploadItem] = useState("");
  const [department, setDepartment] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [ItemTax, setItemTax] = useState("");
  const [itemPrice, setItemPrice] = useState("0");
  const [openCam, setOpenCam] = useState(false);
  const [productId, setProductId] = useState("");
  const [taxPercentage, setTaxPercentage] = useState("0");
  const [itemCategory, setItemCategory] = useState("");

  // console.log("UPLOAD ITEM", uploadItem);
  console.log("rr", row)
  // useEffect(() => {
  //   if (item_id) {
  //     setProductId(item_id);
  //   }
  // }, [item_id]);


  useEffect(() => {
    if (row) {
      setItemName(row.item_name)
      setItemPrice(row.price)
      setTaxPercentage(row.tax_percent)
      setItemCode(row.hsn_code)
    }
  }, [row])


  // console.log("PID", productId);

  const { saasId, storeId } = JSON.parse(localStorage.getItem("User_data"));
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);

  // console.log(URL, url);

  const capturePhoto = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
  });

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
    setProductId(row.item_id)
  };

  const onUserMedia = (e) => {
    console.log(e);
  };

  const handleCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        // const file = target.files[0];
        // const newUrl = URL.createObjectURL(file);
        // setSource(newUrl);
        setSource(target.files[0]);
      }
    }
  };

  const handleUploadImage = () => {
    var formdata = new FormData();
    formdata.append(
      "file",
      source
      // "/C:/Users/risha/OneDrive/Pictures/Screenshots/Screenshot 2023-05-23 161309.png"
    );
    dispatch(handleUploadPicRequest({ formdata, save_product_id }));
    setProductId("");
  };

  const handleUpdateItem = () => {
    const obj = {
      item_name: itemName,
      description: itemName,
      price: Number(itemPrice),
      tax: Number(taxPercentage),
      tax_code: Number(taxPercentage),
      status: "active",
      saas_id: saasId,
      store_id: storeId,
      department: itemName,
      hsn_code: row.hsn_code,
      discount: row.discount,
    }

    dispatch(handleUpdateItemToStoreRequest({ data: obj, id: row.item_id }))
    setTimeout(() => {
      // setProductId(row.item_id)
      setAddUpdateItemModalIsOpen(!addUpdateItemModalIsOpen)
      setFlag(!flag)
    }, 500);

  }

  return (<>
    <Modal isOpen={addUpdateItemModalIsOpen} toggle={() => setAddUpdateItemModalIsOpen(!addUpdateItemModalIsOpen)}>
      <ModalHeader>
        <BsArrowLeft
          onClick={() => setAddUpdateItemModalIsOpen(!addUpdateItemModalIsOpen)}
          className="mouse-pointer"
        />  Update Item
      </ModalHeader>
      <ModalBody>

        <div className="row d-flex justify-content-center">
          <div className="col-lg-5 col-md-10 col-sm-12">
            {/* {productId ? (
              <div>
                <p>Upload Pic</p>

                <Grid container>
                  <Grid item xs={12}>
                    <h5>Capture your image</h5>
                    {source && (
                      <div
                        display="flex"
                        justifyContent="center"
                        border={1}
                        className={classes.imgBox}
                      >
                        <img
                          src={source}
                          alt={"snap"}
                          className={classes.img}
                        />
                      </div>
                    )}
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="icon-button-file"
                      type="file"
                      capture="environment"
                      onChange={(e) => handleCapture(e.target)}
                    />

                  </Grid>
                </Grid>

                <button
                  type="button"
                  className="btn btn-primary my-2"
                  onClick={() => {
                    setOpenCam;
                    handleUploadImage();
                  }}
                >
                  Upload Item Pic
                </button>
                <div className="">
                  <button
                    style={{
                      backgroundColor: "#20b9e3",
                      outline: "none",
                      border: "none",
                      fontSize: "20px",
                      padding: "10px 20px",
                      borderRadius: "10px",
                      color: "#fff",
                    }}
                  >
                    Save
                  </button>
                  <Link
                    to="/retailer-dashboard"
                    type="submit"

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
                  </Link>
                </div>
              </div>
            ) : ( */}
            <form className="form-box" onSubmit={handleAddItem}>


              <div
                className="d-flex flex-col"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <TextField
                  size="small"
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
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
                  id="customer-name"
                  value={itemPrice}
                  required
                  onChange={(e) => setItemPrice(e.target.value)}
                  label="Item Price"
                />
                <TextField
                  size="small"
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
                  value={taxPercentage}
                  required
                  onChange={(e) => setTaxPercentage(e.target.value)}
                  label="Tax Percentage"
                />
              </div>

              <div className="">

                <button
                  type="button"
                  style={{
                    backgroundColor: "#20b9e3",
                    outline: "none",
                    border: "none",
                    fontSize: "20px",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    color: "#fff",
                  }}
                  onClick={handleUpdateItem}
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
                    setAddUpdateItemModalIsOpen(!addUpdateItemModalIsOpen)
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
      <ModalFooter>

      </ModalFooter>
    </Modal>
  </>);
};

export default AddItem;
