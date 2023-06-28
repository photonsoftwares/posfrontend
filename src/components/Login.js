import React, { useState } from "react";
import { Row, Col, FormGroup, Input, Button, Form } from "reactstrap";
import { FaUserAlt } from "react-icons/fa";
// import Billboard from "../../assets/images/logo.png";
// import Billboard from "../../assets/images/logo1.jpeg";
// import { handleLoginRequest } from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { handleLoginRequest } from "../../src/redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  // console.log("NAVIGATE", navigate());
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("USERNAME", username);
    console.log("PASSWORD", password);

    // const params = {
    //   username,
    //   password,
    // };
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
            border: "1px solid black"
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
          <Button color="primary" className="login_button" type="submit">
            Login
          </Button>
        </Form>
        <div style={{ marginTop: "10px" }} >

          <small>
            ** This is WPA worked in any browser
          </small>
        </div>
        {/* <div className="mt-4">
          <Link to="/register">
            <h2>Register</h2>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
