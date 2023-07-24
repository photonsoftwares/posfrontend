import React, { useCallback, useEffect, useRef, useState } from "react";
import Select, { useStateManager } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAddItemToStoreRequest,
  handleUploadPicRequest,
  handleUpdateItemToStoreRequest,
} from "../../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import {
  handleGstTypeDropdownRequest,
  handleCreateUserMasterRequest,
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
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import Flatpickr from "react-flatpickr";

// import { useHistory } from "react-router-dom";
import Webcam from "react-webcam";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
const videoConstraints = {
  width: 200,
  facinMode: "enviorment",
};

const AddUser= ({
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
  const { user_data, state_dropdown } = useSelector(
    (state) => state.ComponentPropsManagement
  );
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
  const [hsnCode, setHsnCode] = useState("");
  const [itemPrice, setItemPrice] = useState("0");
  const [openCam, setOpenCam] = useState(false);
  const [productId, setProductId] = useState("");
  const [taxPercentage, setTaxPercentage] = useState("0");
  const [itemCategory, setItemCategory] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeid, setStoreId] = useState("");
  const [saasid, setSaasId] = useState("");
  const [registerId, setRegisterId] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [expiration, setExpiration] = useState("");

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
      hsn_code: hsnCode,
      discount: row.discount,
      saas_id: user_data.saasId,
      user_name: userName,
      password: password,
      store_name: storeName,
      store_id: storeId,
      state: state,
      register_id: registerId,
      city: city,
      country: country
    };

    dispatch(handleUpdateItemToStoreRequest({ data: obj, id: row.item_id }));
    setTimeout(() => {
      // setProductId(row.item_id)
      setAddUpdateItemModalIsOpen(!addUpdateItemModalIsOpen);
      setFlag(!flag);
    }, 500);
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
          Update Item
        </ModalHeader>
        <ModalBody>
          <div className="row d-flex justify-content-center">
            <div className="">
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
                  <Row className="mt-2">
                <Col md={3}>
                  <FormGroup>
                    <Label>
                      Name <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                      value={userName}
                      required={true}
                      placeholder="Enter User Name"
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label>
                    Password <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      value={password}
                      required={true}
                      placeholder="Enter Password"
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label>
                    Store<span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setStoreName(e.target.value);
                      }}
                      value={storeName}
                      required={true}
                      placeholder="Enter Store Name"
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label>
                      StoreId  <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                
                      onChange={(e) => {
                        setStoreId(e.target.value);
                      }}
                    
                      value={storeid}
                      required={true}
                      placeholder="Store Id"
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label>
                      State<span className="text-red"></span>
                    </Label>
                    <Select
                      options={state_dropdown}
                      onChange={(e) => {
                        setState(e.value);
                      }}
                      value={state_dropdown.filter((e) => e.value === state)}
                      required={true}
                      placeholder="Select State"
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label>
                    SaasId<span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setSaasId(e.target.value);
                      }}
                      value={saasid}
                      required={true}
                      placeholder="Enter Saas Id"
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label>
                    RegisterId<span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setRegisterId(e.target.value);
                      }}
                      value={registerId}
                      required={true}
                      placeholder="Enter Register Id"
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label>
                    City<span className="text-red"></span>
                    </Label>
                    <Select
                      options={state_dropdown}
                      onChange={(e) => {
                        setCity(e.value);
                      }}
                      value={state_dropdown.filter((e) => e.value === city)}
                      required={true}
                      placeholder="Select City"
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label>
                    Country<span className="text-red"></span>
                    </Label>
                    <Select
                      options={state_dropdown}
                      onChange={(e) => {
                        setCountry(e.value);
                      }}
                      value={state_dropdown.filter((e) => e.value === country)}
                      required={true}
                      placeholder="Select Country"
                    />
                  </FormGroup>
                </Col>
                </Row>
                </div>

                <div className="">
                  <button
                    type="button"
                    style={{
                      backgroundColor: "#20b9e3",
                      outline: "none",
                      border: "none",
                      fontSize: "15px",
                      padding: "5px 10px",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    onClick={handleUpdateItem}
                  >
                    Update
                  </button>

                  
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
                      marginLeft: "15px",
                      fontSize: "15px",
                      padding: "5px 10px",
                      borderRadius: "8px",
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
        <ModalFooter></ModalFooter>
      </Modal>
    </>
  );
};

export default AddUser;
