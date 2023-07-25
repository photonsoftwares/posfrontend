import React, { useCallback, useEffect, useRef, useState } from "react";
import Select, { useStateManager } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  handleCreateStoreMasterRequest,
  handleUploadPicRequest,
  handleUpdateItemToStoreRequest,
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
  const { user_data, state_dropdown } = useSelector(
    (state) => state.ComponentPropsManagement
  );
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
  //const [hsnCode, setHsnCode] = useState("");
  const [itemPrice, setItemPrice] = useState("0");
  const [openCam, setOpenCam] = useState(false);
  const [productId, setProductId] = useState("");
  const [taxPercentage, setTaxPercentage] = useState("0");
  const [itemCategory, setItemCategory] = useState("");
  const [userId, setUserId] = useState("");
  const [storeid, setStoreId] = useState("");
  const [saasid, setSaasId] = useState("");
  const [storeName, setStoreName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [taxable, setTaxable] = useState("");
  const [gstCode, setGstCode] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [storeType, setStoreType] = useState("");
  const [exclusiveTax, setExclusiveTax] = useState("");
  const [inclusiveTax, setInclusiveTax] = useState("");
  const [storeLogo, setStoreLogo] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [bankIfsc, setBankIfsc] = useState("");
  const [bankBranch, setBankBranch] = useState("");
  const [paymentQrCode, setPaymentQrCode] = useState("");
  const [receiptFormat, setReceiptFormat] = useState("");
  const [tnc, setTnc] = useState("");

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
      handleCreateStoreMasterRequest({
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
                      User ID <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setUserId(e.target.value);
                      }}
                      value={userId}
                      required={true}
                      placeholder="Enter User ID"
                    />
                  </FormGroup>
                </Col>                

                <Col md={3}>
                  <FormGroup>
                    <Label>
                    Store ID<span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setStoreId(e.target.value);
                      }}
                      value={storeId}
                      required={true}
                      placeholder="Enter Store ID"
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label>
                    Store Name <span className="text-red"> * </span>
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
                    Saas ID<span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setSaasId(e.target.value);
                      }}
                      value={saasId}
                      required={true}
                      placeholder="Enter Saas ID"
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

                <Col md={3}>
                  <FormGroup>
                    <Label>
                    Address  <span className="text-red"></span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      value={address}
                      required={true}
                      placeholder="Enter Address"
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label>
                    Taxable  <span className="text-red"></span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setTaxable(e.target.value);
                      }}
                      value={taxable}
                      required={true}
                      placeholder="Enter Taxable"
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label>
                    GST Code  <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setGstCode(e.target.value);
                      }}
                      value={gstCode}
                      required={true}
                      placeholder="Enter GST Code"
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label>
                    HSN Code  <span className="text-red"></span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setHsnCode(e.target.value);
                      }}
                      value={hsnCode}
                      required={true}
                      placeholder="Enter  HSN Code"
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label>
                    Store Type   <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setStoreType(e.target.value);
                      }}
                      value={storeType}
                      required={true}
                      placeholder="Enter Store Type"
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label>
                    Exclusive Tax  <span className="text-red"></span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setExclusiveTax(e.target.value);
                      }}
                      value={exclusiveTax}
                      required={true}
                      placeholder="Enter Exclusive Tax"
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label>
                    Inclusive Tax  <span className="text-red"> </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setInclusiveTax(e.target.value);
                      }}
                      value={inclusiveTax}
                      required={true}
                      placeholder="Enter Inclusive Tax"
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label>
                    Store no <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setStoreLogo(e.target.value);
                      }}
                      value={storeLogo}
                      required={true}
                      placeholder="Enter  "
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label>
                    Bank Account  <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setBankAccount(e.target.value);
                      }}
                      value={bankAccount}
                      required={true}
                      placeholder="Enter Bank Account"
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label>
                    Bank IFSC <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setBankIfsc(e.target.value);
                      }}
                      value={bankIfsc}
                      required={true}
                      placeholder="Enter Bank IFSC"
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label>
                    Bank Branch  <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setBankBranch(e.target.value);
                      }}
                      value={bankBranch}
                      required={true}
                      placeholder="Enter Bank Branch "
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label>
                    Payment QR Code  <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setPaymentQrCode(e.target.value);
                      }}
                      value={paymentQrCode}
                      required={true}
                      placeholder="Enter Payment QR Code "
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label>
                    Receipt Format   <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setReceiptFormat(e.target.value);
                      }}
                      value={receiptFormat}
                      required={true}
                      placeholder="Enter Receipt Format "
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label>
                    T&C  <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setTnc(e.target.value);
                      }}
                      value={tnc}
                      required={true}
                      placeholder="Enter T&C "
                    />
                  </FormGroup>
                </Col>

                <Col md={12}>
                  <div className="d-flex justify-content-end">
                    <FormGroup>
                      <Label>&nbsp;</Label>
                      <div>
                        <Button
                          style={{
                            border: "none",
                            backgroundColor: "var(--primary2)",
                          }}
                        >
                          Submit
                        </Button>
                      </div>
                    </FormGroup>
                  </div>
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
        <ModalFooter></ModalFooter>
      </Modal>
    </>
  );
};

export default AddItem;
