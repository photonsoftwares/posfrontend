import React, { useState } from "react";
import { Row, Col, FormGroup, Input, Button, Form } from "reactstrap";
import { FaUserAlt } from "react-icons/fa";
// import Billboard from "../../assets/images/logo.png";
// import Billboard from "../../assets/images/logo1.jpeg";
// import { handleLoginRequest } from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { handleLoginRequest } from "../../src/redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("Raja");
  const [password, setPassword] = useState("admin@123");
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
    // localStorage.setItem("token", "87xiuiu89udjw990")
    // location.replace("/");
  };
  return (
    <div className="loyality-login">
      <div className="loyality-login_container">
        <div
          className="my-4"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
      </div>
    </div>
  );
};

export default Login;
