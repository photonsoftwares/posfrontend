import React, { useCallback, useEffect, useRef, useState } from "react";
import Select, { useStateManager } from "react-select";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAddItemToStoreRequest,
  handleUploadPicRequest,
} from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { FcDepartment } from "react-icons/fc";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import { createMakeAndWithStyles } from "tss-react";
// import { PhotoCameraRoundedIcon } from "@material-ui/icons";
import { AiFillCamera } from "react-icons/ai";

// import { useHistory } from "react-router-dom";
import Webcam from "react-webcam";
const videoConstraints = {
  width: 200,
  facinMode: "enviorment",
};

const AddItem = () => {
  const navigate = useNavigate();
  const { makeStyles } = createMakeAndWithStyles({
    // useTheme:useTheme
    /*
      OR, if you have extended the default mui theme adding your own custom properties:
      Let's assume the myTheme object that you provide to the <ThemeProvider /> is of
      type MyTheme then you'll write:
      */
    //"useTheme": useTheme as (()=> MyTheme)
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
  const [itemPrice, setItemPrice] = useState("");
  const [openCam, setOpenCam] = useState(false);
  const [productId, setProductId] = useState("");
  const [taxPercentage, setTaxPercentage] = useState("");
  const [itemCategory, setItemCategory] = useState("");

  // console.log("UPLOAD ITEM", uploadItem);

  useEffect(() => {
    if (save_product_id) {
      setProductId(save_product_id);
    }
  }, [save_product_id]);

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
        item_code: Number(itemCode),
        description: itemName,
        price: Number(itemPrice),
        // discount: Number(selectedOptionDiscount.value),
        tax: Number(taxPercentage),
        tax_code: Number(taxPercentage),
        status: "active",
        saas_id: saasId,
        store_id: storeId,
        department: itemName,
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
  return (
    <section>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-5 col-md-10 col-sm-12 px-5">
            {productId ? (
              <div>
                <p>Upload Pic</p>
                {/* <div style={{ display: "flex", flexDirection: "column" }}>
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/png"
                    videoConstraints={videoConstraints}
                    onUserMedia={onUserMedia}
                    mirrored={true}
                  />

                  <div className="my-3">
                    <button className="btn btn-primary" onClick={capturePhoto}>
                      Capture
                    </button>
                    <button
                      className="btn btn-primary mx-2"
                      onClick={() => setUrl(null)}
                    >
                      Refresh
                    </button>
                  </div>
                  {url && (
                    <div style={{ MaxWidth: "200px" }}>
                      <img
                        src={url}
                        style={{ height: "100px", width: "300px" }}
                        alt="Pic"
                      />
                    </div>
                  )}
                </div> */}
                {/* <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  value={uploadItem}
                  onChange={(e) => setUploadItem(e.target.value)}
                  capture="environment"
                /> */}
                {/*  */}
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
                    {/* <label htmlFor="icon-button-file">
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <AiFillCamera size="large" color="red" />
                      </IconButton>
                    </label> */}
                  </Grid>
                </Grid>
                {/*  */}
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
                    to="/home"
                    type="submit"
                    // onClick={()=>}
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
            ) : (
              <form className="form-box" onSubmit={handleAddItem}>
                <h2>Add Item</h2>
                <div
                  className="d-flex flex-col"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  {/* <TextField
                    size="small"
                    type="text"
                    className="form-control mt-4"
                    id="customer-name"
                    value={itemCode}
                    onChange={(e) => setItemCode(e.target.value)}
                    label="Item Code"
                  /> */}
                  <div
                  // className="d-flex flex-column"
                  // style={{ borderBottom: "1px solid #000" }}
                  >
                    {/* <input type="file" /> */}
                    {/* WEBCAM  */}
                    {/* 
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                height: "100px",
                                width: "100px",
                                marginBottom: "30px",
                              }}
                            > */}
                    {/* <Webcam
                                ref={webcamRef}
                                audio="false"
                                screenshotFormat="image/png"
                                videoConstraints={videoConstraints}
                                onUserMedia={onUserMedia}
                                mirrored={true}
                              />
          
                              <button onClick={capturePhoto}>Capture</button>
                              <button onClick={() => setUrl(null)}>Refresh</button>
                              {url && (
                                <div>
                                  <img src={url} alt="Pic" />
                                </div>
                              )} */}
                    {/* </div> */}
                    {/* <button
                              type="button"
                              // style={{
                              //   // all: "unset",
                              //   fontSize: "12px",
                              //   borderBottom: "1px solid rgb(255, 255, 255)",
                              //   flex: 1,
                              // }}
                              className="btn btn-primary my-2"
                              onClick={() => setOpenCam}
                            >
                              Upload Item Pic
                            </button> */}
                  </div>
                </div>
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
                    required
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    label="Item Desc"
                    multiline
                    rows={3}
                  />
                  <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    id="customer-name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    label="Item Category"
                    required
                    multiline
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
                    to="/home"
                    // type="submit"
                    // onClick={()=>}
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
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddItem;
