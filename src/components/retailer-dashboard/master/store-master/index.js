import React, { useState, useEffect, useCallback } from "react";
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

import Select from "react-select";
import Flatpickr from "react-flatpickr";
import { AiFillInfoCircle } from "react-icons/ai";
import Toggle from "react-toggle";

import { useDispatch, useSelector } from "react-redux";
const StoreMaster = () => {
  const dispatch = useDispatch();
  
    const { user_data, state_dropdown } = useSelector(
    (state) => state.ComponentPropsManagement
  );
  
  const [userId, setUserId] = useState(false);
  const [storeId, setStoreId] = useState("");
  const [saasId, setSaasId] = useState("");
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      user_id: userId,
      store_id: storeId,
      saas_id: user_data.saasId,
      store_name: storeName,
      city: city,
      state: state,
      country: country,
      address: address,
      taxable: taxable,
      gst_code: gstCode,
      hsn_code: hsnCode,
      store_type: storeType,
      exclusive_tax: exclusiveTax,
      inclusive_tax: inclusiveTax,
      store_logo: storeLogo,
      bank_account: bankAccount,
      bank_ifsc: bankIfsc,
      bank_branch: bankBranch,
      payment_qr_code: paymentQrCode,
      receipt_format: receiptFormat,
      tnc: tnc,
    };
    
    dispatch(handleAddPartyRequest(obj));
  };

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 1000);
    };
  };
  

  return (
    <>
      <div className="">
        <Card>
          <CardBody>
            <div style={{ fontSize: "22px", fontWeight: "bold" }}>User</div>
            <Form onSubmit={handleSubmit}>
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
                      State<span className="text-red"> * </span>
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
                    City<span className="text-red"> * </span>
                    </Label>
                    <Select
                      options={state_dropdown}
                      onChange={(e) => {
                        setCity(e.value);
                      }}
                      value={state_dropdown.filter((e) => e.value === state)}
                      required={true}
                      placeholder="Select City"
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label>
                    Country<span className="text-red"> * </span>
                    </Label>
                    <Select
                      options={state_dropdown}
                      onChange={(e) => {
                        setCountry(e.value);
                      }}
                      value={state_dropdown.filter((e) => e.value === state)}
                      required={true}
                      placeholder="Select Country"
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label>
                    Address  <span className="text-red"> * </span>
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
                    Taxable  <span className="text-red"> * </span>
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
                    HSN Code  <span className="text-red"> * </span>
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
                    Exclusive Tax  <span className="text-red"> * </span>
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
                    Inclusive Tax  <span className="text-red"> * </span>
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
                    Store Logo  <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setStoreLogo(e.target.value);
                      }}
                      value={storeLogo}
                      required={true}
                      placeholder="Enter  Store Logo "
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
            </Form>
          </CardBody>
        </Card>
        
      </div>
    </>
  );
};

export default StoreMaster;
