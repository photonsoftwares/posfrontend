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
const UserMaster = () => {
  const dispatch = useDispatch();
  
    const { user_data, state_dropdown } = useSelector(
    (state) => state.ComponentPropsManagement
  );
  
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
                      Store ID  <span className="text-red"> * </span>
                    </Label>
                    <Select
                      // options={gst_type_dropdown}
                      onChange={(e) => {
                        setStoreId(e.value);
                      }}
                      
                      value={storeId}
                      required={true}
                      placeholder="Store ID"
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
                    Register ID<span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setRegisterId(e.target.value);
                      }}
                      value={registerId}
                      required={true}
                      placeholder="Enter Register ID"
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

export default UserMaster;
