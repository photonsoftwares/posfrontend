import "bootstrap/dist/css/bootstrap.min.css";
import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { IoIosSearch } from "react-icons/io";
import { BsHandbag, BsArrowRight } from "react-icons/bs";
import { FcSpeaker } from "react-icons/fc";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

import Logo from "../assets/logo.jpeg";
import Product from "../components/Product";

import { useDispatch, useSelector } from "react-redux";

import {
  handleSearchedDataRequest,
  handleAddtoCart,
  handleInc,
} from "../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { Button } from "react-bootstrap";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Home = () => {
  const { get_searched_data, cart_data, total_price } = useSelector(
    (e) => e.ComponentPropsManagement
  );

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  // const handleShow = () => setShow(true);
  // const handleClose = () => setShow(false);

  // console.log("CART DATA", cart_data);
  const [showButton, setShowButton] = useState(true);
  const [qty, setQty] = useState(1);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [searchedData, setSearchedData] = useState(get_searched_data);
  const [searchValue, setSearchValue] = useState("");
  const [cartData, setCartData] = useState(cart_data);
  const [show, setShow] = useState(false);
  const [speachModal, setSpechModal] = useState(false);
  const [visibleVoiceCommand, setVisibleVoiceCommand] = useState(true);
  const [transScriptSearch, setTransScriptSearch] = useState(transcript);

  // console.log("TRANSACRIPT", { transcript });
  // console.log(get_searched_data);

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

  const handleVoiceSearch = (value) => {
    dispatch(handleSearchedDataRequest({ searchValue: value }));
  };

  const optimizedVoicefn = useCallback(debounce(handleVoiceSearch), []);

  useEffect(() => {
    // const { transcript, browserSupportsSpeechRecognition } =
    //   useSpeechRecognition();
    if (transcript) {
      optimizedVoicefn(transcript);
    }
  }, [transcript]);

  // const startListening = () =>
  //   SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

  // const { transcript, browserSupportsSpeechRecognition } =
  //   useSpeechRecognition();

  const dispatch = useDispatch();

  useEffect(() => {
    if (get_searched_data && get_searched_data.data) {
      setSearchedData(get_searched_data.data);
    }
  }, [get_searched_data]);

  useEffect(() => {
    if (cart_data && cart_data.length > 0) {
      setCartData(cart_data);
    }
  }, [cart_data]);

  const handleSearch = (e) => {
    dispatch(handleSearchedDataRequest({ searchValue: e.target.value }));
  };

  const optimizedFn = useCallback(debounce(handleSearch), []);

  const handleVoiceCommand = () => {
    setVisibleVoiceCommand((state) => !state);
    SpeechRecognition.startListening({ language: "en-IN" });
  };

  return (
    <div className="app">
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "",
          height: "100px",
          backgroundColor: "#fff",
          marginBottom: "80px",
        }}
      >
        <div
          className="bg-danger"
          style={{
            height: "100px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: "20px",
            paddingRight: "20px",
            justifyContent: "space-between",
          }}
        >
          <div
            className=""
            style={{
              height: "50px",
              width: "100%",
            }}
          >
            <img src={Logo} style={{ height: "50px", width: "40%" }} />
          </div>
          <div>
            <Select
              className="basic-single"
              classNamePrefix="select"
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: "red",
                  primary: "white",
                },
              })}
              name="color"
            />
          </div>
        </div>
        <div className="mt-3 d-flex align-items-center justify-content-center">
          <IoIosSearch size={30} opacity={0.4} />

          {visibleVoiceCommand ? (
            <input
              style={{ border: "none", outline: "none" }}
              type="text"
              value={searchValue}
              autoFocus
              onChange={(e) => {
                optimizedFn(e);
                setSearchValue(e.target.value);
              }}
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Search for items..."
            />
          ) : (
            <input
              style={{ border: "1px solid yellowgreen", outline: "none" }}
              type="text"
              value={transcript}
              autoFocus
              onChange={(e) => {
                optimizedFn(e);
                // console.log(e.target.value);
                setSearchValue(e.target.value);
              }}
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Search for items..."
            />
            // <div style={{ width: "100%" }}>{transcript}</div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "10px",
            justifyContent: "center",
          }}
        >
          <FcSpeaker
            size={30}
            opacity={0.9}
            // onClick={() => setSpechModal(true)}
            onClick={handleVoiceCommand}
            // onClick={() => {
            //   setVisibleVoiceCommand(true);
            //   startListening;
            // }}
          />
        </div>
      </div>
      <div
        style={{ paddingLeft: "20px", paddingRight: "20px", overflowY: "auto" }}
      >
        <h5 className="my-4 h4" style={{ fontWeight: "bold" }}>
          Recommended Items
        </h5>

        {searchedData.map((item, index) => (
          <Product item={item} key={index} />
        ))}
      </div>
      <div
        className="bg-danger"
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          borderRadius: "10px",
        }}
      >
        {cart_data && cart_data.length > 0 ? (
          <div
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "#fff",
            }}
          >
            <div
              style={{
                fontWeight: "lighter",
                color: "#fff",
                position: "relative",
              }}
            >
              <BsHandbag />
              <h6
                style={{
                  fontSize: "12px",
                  position: "absolute",
                  right: "-12px",
                  top: "-9px",
                }}
              >
                {cart_data.length}
              </h6>
            </div>
            <h2
              style={{
                fontWeight: "lighter",
                color: "#fff",
                textDecoration: "none",
              }}
              onClick={() => setShow(true)}
            >
              View Cart <BsArrowRight />
            </h2>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={() => setShow(false)}>
          <Modal.Title id="contained-modal-title-vcenter">My Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Items in Cart</h4>
          {cartData.map((item) => (
            <div className="cart_container">
              <h5>{item.productName}</h5>
              <h5>{item.price}</h5>
              <div className="cart_button">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => setShowButton(true)}
                >
                  <AiOutlineMinus />
                </button>
                <p className="cart_quantity">{qty}</p>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => dispatch(handleInc(item.productId))}
                >
                  <AiOutlinePlus />
                </button>
              </div>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {}} className="bg-danger">
            Make Payment
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={speachModal} onHide={() => {}}>
        <Modal.Header closeButton onClick={() => setSpechModal(false)}>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{transcript}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            //  onClick={startListening}
          >
            start listening{" "}
          </Button>
          <Button
            variant="primary"
            //  onClick={SpeechRecognition.stopListening}
          >
            stop listening{" "}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
