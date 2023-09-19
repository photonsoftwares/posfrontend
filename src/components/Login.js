import React, { useEffect, useState } from "react";
import { Row, Col, FormGroup, Input, Button, Form } from "reactstrap";
import { FaUserAlt } from "react-icons/fa";
// import Billboard from "../../assets/images/logo.png";
// import Billboard from "../../assets/images/logo1.jpeg";
// import { handleLoginRequest } from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { handleLoginRequest } from "../../src/redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { useDispatch } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { isDev } from "../URL";

import AddToHomeScreenButton from "./AddToHome";
import axios from "axios";
const Login = () => {
  const params = useParams();
  console.log("LOGIN PARAMS", params);
  const navigate = useNavigate();
  // console.log("NAVIGATE", navigate());
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (isDev === true) {
      setUsername("80001");
      setPassword("demo123");
    }
  }, [isDev]);

  const userData = async () => {
    axios
      .get(
        `http://3.111.70.84:8088/test/api/v1/register/business-name/${params.BU}`
      )
      .then((res) => {
        console.log("RESPONSE STORE DATA", res);
        setUsername(res.data.data.username);
        setPassword(res.data.data.password);
        // setStoreData(res.data.data.store_name);
      });
  };

  useEffect(() => {
    if (params.BU) {
      console.log("INN");
      userData();
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("USERNAME", username);
    console.log("PASSWORD", password);

    // const params = {
    //   username,
    //   password,
    // };
    localStorage.clear();
    dispatch(
      handleLoginRequest({
        user_name: username,
        password: password,
      })
    );
    // localStorage.setItem("token", "87xiuiu89udjw990");
    // setTimeout(() => {
    //   window.location.replace("/");
    // }, 500);
  };
  return (
    <div className="loyality-login">
      <div className="loyality-login_container">
        <div
          className="my-4"
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "30px",
            border: "1px solid black",
          }}
        >
          Welcome to NanoMPoS Solutions
          {/* <img
            src={Billboard}
            alt=""
            style={{ height: "100%", width: "50%" }}
          /> */}
        </div>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <FormGroup>
                <Input
                  type="text"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  value={username}
                  required={true}
                  placeholder="Username"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Input
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                  required={true}
                  placeholder="Password"
                />
              </FormGroup>
            </Col>
          </Row>
          <Button
            color="primary"
            // className="login_button"
            type="submit"
            style={{
              backgroundColor: "#20b9e3",
              outline: "none",
              border: "none",
              fontSize: "20px",
              padding: "10px 20px",
              borderRadius: "8px",
              background: "#ECE447",
              width: "100%",
              color: "#000",
            }}
          >
            Login
          </Button>
        </Form>
        <div style={{ marginTop: "10px" }}>
          <small>** This is WPA worked in any browser</small>
        </div>
        {/* <div className="mt-4">
          <Link to="/register">
            <h2>Sign Up</h2>
          </Link>
        </div> */}
        {/* <p
          className="mt-3"
          style={{
            color: "#808080",
            fontFamily: "Segoe UI",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHight: "normal",
            textAlign: "center",
          }}
        >
          Don’t have an account?
          <Link
            to="/register"
            // to={`/register/{}`}
            style={{ textDecoration: "none" }}
          >
            Signup
          </Link>
        </p> */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 10,
            justifyContent: "center",
          }}
        >
          <AddToHomeScreenButton />
        </div>
      </div>
    </div>
  );
};

export default Login;
