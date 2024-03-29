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
// we are not using it
// import GSTandAddress from "./gst-and-address";
// import CreditAndBalance from "./credit-and-balance";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import { AiFillInfoCircle } from "react-icons/ai";
import Toggle from "react-toggle";
import {
  handleGstTypeDropdownRequest,
  handleAddPartyRequest,
} from "../../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { useDispatch, useSelector } from "react-redux";
const UserMaster = () => {
  const dispatch = useDispatch();
  // const { user_data, state_dropdown, gst_type_dropdown } = useSelector(
    const { user_data, state_dropdown } = useSelector(
    (state) => state.ComponentPropsManagement
  );
  // console.log(gst_type_dropdown);
  // const [limitFlag, setLimitFlag] = useState(false);
  // // const [activeTab, setActiveTab] = useState("1")
  // const [partyName, setPartyName] = useState("");
  // const [gstin, setGstin] = useState("");
  // const [phone, setPhone] = useState("");
  // const [gstType, setGstType] = useState("");
  // const [state, setState] = useState("");
  // const [email, setEmail] = useState("");
  // const [openingBalance, setOpeningBalance] = useState("");
  // const [creditLimitAmount, setCreditLimitAmount] = useState("");
  // const [billingAddress, setBillingAddress] = useState("");

  // console.log(gst_type_dropdown);
  const [userName, setUserName] = useState(false);
  const [password, setPassword] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeId, setStoreId] = useState("");
  const [saasId, setSaasId] = useState("");
  const [registerId, setRegisterId] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [expiration, setExpiration] = useState("");

  // const tabArray = [
  //     {
  //         id: "1",
  //         name: "GST & Address",
  //         className: "active"
  //     },
  //     {
  //         id: "2",
  //         name: "Credit & Balance",
  //         className: "active"
  //     }
  // ]

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const obj = {
  //     saas_id: user_data.saasId,
  //     party_name: partyName,
  //     gstin: gstin,
  //     phone_number: phone,
  //     gst_type: gstType,
  //     state: state,
  //     email: email,
  //     billing_address: billingAddress,
  //     opening_balance: openingBalance,
  //     credit_limit_flag: limitFlag,
  //     creditLimitAmount: creditLimitAmount,
  //   };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
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
    // const formData = new FormData();
    // console.log(formData)

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

  // const handleFunCall = () => {
  //   dispatch(handleGstTypeDropdownRequest());
  // };

  // const optimizedFn = useCallback(debounce(handleFunCall), []);
  // useEffect(() => {
  //   optimizedFn();
  // }, []);

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
                      User Name <span className="text-red"> * </span>
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
                      Store Id  <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                
                      onChange={(e) => {
                        setStoreId(e.target.value);
                      }}
                    
                      value={storeId}
                      required={true}
                      placeholder="Store Id"
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
                    Saas Id<span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setSaasId(e.target.value);
                      }}
                      value={saasId}
                      required={true}
                      placeholder="Enter Saas Id"
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label>
                    Register Id<span className="text-red"> * </span>
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

                {/* <Col md={3}>
                  <FormGroup>
                    <Label>
                      Opening Balance <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="number"
                      required={true}
                      onChange={(e) => {
                        setOpeningBalance(e.target.value);
                      }}
                      value={openingBalance}
                      placeholder="Enter Balance"
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label>
                      Credit Limit Amount <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="number"
                      onChange={(e) => {
                        setCreditLimitAmount(e.target.value);
                      }}
                      value={creditLimitAmount}
                      required={true}
                      placeholder="Enter Amount"
                    />
                  </FormGroup>
                </Col>

                <Col md={12}>
                  <FormGroup>
                    <Label>
                      Billing Address<span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="textarea"
                      onChange={(e) => {
                        setBillingAddress(e.target.value);
                      }}
                      value={billingAddress}
                      required={true}
                      placeholder="Enter Address"
                    />
                  </FormGroup>
                </Col> */}

                {/* <Col md={12}>
                  <div>
                    <span>Credit Limit</span>
                    <span className="ms-1">
                      <AiFillInfoCircle color="#979797" />
                    </span>
                  </div>
                </Col>

                <Col md={12} className="mt-3">
                  <div className="d-flex flex-wrap">
                    <Label
                      onClick={() => {
                        setLimitFlag(false);
                      }}
                      className="mouse-pointer"
                    >
                      No Limit
                    </Label>
                    <div style={{ position: "relative", top: "1px" }}>
                      <Toggle
                        // defaultChecked={contentToggle}
                        className="mx-2 "
                        onChange={() => {
                          setLimitFlag(!limitFlag);
                        }}
                        checked={limitFlag === true}
                        icons={false}
                      />
                    </div>
                    <Label
                      onClick={() => {
                        setLimitFlag(true);
                      }}
                      className="mouse-pointer"
                    >
                      Custom Limit
                    </Label>
                  </div>
                </Col> */}

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

        {/* <div className='mt-4'>
                <div className='' style={{ backgroundColor: "var(--primary2)" }}>
                    <Nav tabs>
                        {tabArray.map((item, index) => {
                            return (<>
                                <NavItem style={{ backgroundColor: "var(--primary1)" }}>
                                    <NavLink
                                        style={{ color: String(index + 1) === activeTab ? "black" : "white", fontWeight: "bold" }}
                                        className={`${String(index + 1) === activeTab && "active"} mouse-pointer`}
                                        onClick={() => {
                                            setActiveTab(String(index + 1))
                                        }}
                                    >
                                        {item.name}
                                    </NavLink>
                                </NavItem>
                            </>)
                        })}
                    </Nav>
                    <TabContent activeTab={activeTab}>

                        <TabPane tabId="1">
                            <GSTandAddress />
                        </TabPane>


                        <TabPane tabId="2">
                            <CreditAndBalance />
                        </TabPane>
                    </TabContent>
                </div>
            </div> */}
      </div>
    </>
  );
};

export default UserMaster;