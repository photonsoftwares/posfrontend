import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import Logo from "../assets/logo.jpeg";
import Logo2 from "../assets/logo2.png";
import Logo3 from "../assets/logo3.png";
import Logo4 from "../assets/logo3.jpeg";
import { Link } from "react-router-dom";
import NavTab2 from "./NavTab2";
import NavTab1 from "./NavTab1";
import { GrLogout } from "react-icons/gr";
import { BiArrowBack, BiGroup } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  handleOpneMenuRequest,
  handleShowModal,
  handlecartCount,
} from "../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { BiCart } from "react-icons/bi";
import cart from "../assets/cart.jpeg";
import cart2 from "../assets/cart2.jpeg";
import cart3 from "../assets/cart3.jpeg";
import cart4 from "../assets/cart4.jpeg";
import logout from "../assets/logout.jpeg";
import logout2 from "../assets/logout2.jpeg";

const Navbar = () => {
  const {
    createdAt,
    password,
    registerId,
    status,
    saasId,
    storeId,
    storeName,
    userId,
    userName,
    userType,
  } = localStorage.getItem("User_data")
    ? JSON.parse(localStorage.getItem("User_data"))
    : {};
  console.log("NAVBAR Store name", typeof saasId);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const { open_menu, cart_data, show_cart_modal, product_count } = useSelector(
    (e) => e.ComponentPropsManagement
  );

  useEffect(() => {
    if (open_menu) {
      setOpenMenu(open_menu);
    }
  }, open_menu);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const el = JSON.parse(localStorage.getItem("my-cart"));
    if (el) {
      dispatch(handlecartCount(el?.length));
    } else {
      dispatch(handlecartCount(0));
    }
  }, []);
  const TabsData = [
    {
      id: 1,
      button: "Dashboard",
      component: <NavTab1 />,
    },
    {
      id: 2,
      button: "Master",
      component: <NavTab2 />,
    },
    {
      id: 3,
      button: "Master",
      component: <NavTab2 />,
    },
  ];
  const [openMenu, setOpenMenu] = useState(false);
  // const [storeName, setStoreName] = useState("");

  const [value, setValue] = useState(0);
  const [tabs] = useState(TabsData);
  const [cartCount, setCartCount] = useState(0);
  // const token = JSON.parse(localStorage.getItem("Token"));
  const data = localStorage.getItem("login_data");

  const { component } = tabs[value];

  // const allData = JSON.parse(localStorage.getItem("Store_data"));
  // console.log("ALL DATA", allData);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  useEffect(() => {}, [handleLogout]);

  // useEffect(() => {
  //   if (localStorage.getItem("Store_data")) {
  //     const allData = JSON.parse(localStorage.getItem("Store_data"));
  //     // console.log("STORE NAME", storeName);
  //     setStoreName(allData?.storeName);
  //   }
  // }, [storeName]);

  const footer_arr = [
    {
      id: 1,
      // label: "Parties",
      value: "parties",
      icon: <FaBars color="#fff" size="25" />,
      isActive: true,
    },
  ];
  const handleShowCart = () => {
    dispatch(handleShowModal({ bagModalIsOpne: !show_cart_modal }));
  };

  useEffect(() => {
    setCartCount(product_count);
  }, [product_count]);

  return (
    <div
      style={{
        width: "100%",
        margin: "auto",
        height: "85px",
        backgroundColor: "#24202D",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        // paddingRight: "20px",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <div style={{ width: "100px" }}>
        <Link
          to="/"
          className=""
          onClick={() => {
            dispatch(handleOpneMenuRequest(false));
            // setOpenMenu(false);
          }}
          style={{
            height: "75px",
            width: "100%",
            flex: 1,
          }}
        >
          {saasId === "13" ? (
            ""
          ) : (
            <img src={Logo4} style={{ height: "35px", width: "100%" }} />
          )}
        </Link>

        {!(location.pathname === "/" || location.pathname === "/login") && (
          <>
            {userType === "CUSTOMER" ? (
              ""
            ) : (
              <BiArrowBack
                size={20}
                color="#fff"
                onClick={() => {
                  navigate("/");
                }}
                style={{ cursor: "pointer" }}
              />
            )}
          </>
        )}
      </div>
      <div
        //  style={{ flexWrap: "nowrap" }}
        style={{ flex: 4 }}
      >
        <div
          style={{
            // color: "#eee",
            fontWeight: "bolder",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            // marginLeft: "10px",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              fontSize: "19px",
              padding: 0,
              margin: 0,
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            {/* {localStorage.getItem("User_data") ? storeName : ""} */}
            {storeName}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: "50px",
          flex: 1,
          width: "100%",
        }}
      >
        {/* {data && data.userName} */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // marginTop: 4,
          }}
        >
          {localStorage.getItem("User_data") ? (
            <div
              style={{
                position: "relative",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "10px",
              }}
              onClick={() => handleShowCart()}
            >
              <div
                style={{
                  height: "36px",
                  width: "40px",
                  marginTop: "16px",
                  marginRight: "10px",
                }}
              >
                <img
                  src={cart4}
                  style={{
                    height: "90%",
                    width: "100%",
                    backgroundColor: "red",
                  }}
                />
              </div>
              {/* <BiCart color="#fff" fontSize={50} opacity={0.8} /> */}
              <div
                style={{
                  position: "absolute",
                  top: "14px",
                  right: "62px",
                  color: "#fecf59",
                }}
              >
                {cartCount}
              </div>
              <span
                style={{
                  fontSize: "20px",
                  color: "#FFF",
                  marginTop: "17px",
                  // paddingRight: "10px",
                }}
              >
                Cart
              </span>
            </div>
          ) : (
            ""
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                cursor: "pointer",
                // color: "#fff",
              }}
            >
              {localStorage.getItem("User_data") &&
              localStorage.getItem("Token") ? (
                <div
                  style={{
                    height: "40px",
                    width: "40px",
                    // marginTop: "16px",
                    // marginRight: "10px",
                  }}
                  onClick={() => {
                    handleLogout();
                    setOpenMenu(false);
                  }}
                >
                  <img
                    src={logout2}
                    alt=""
                    style={{ height: "94%", width: "100%" }}
                  />
                </div>
              ) : (
                // <GrLogout
                //   size={25}
                //   color="#fff"
                //   onClick={() => {
                //     handleLogout();
                //     setOpenMenu(false);
                //   }}
                // />
                ""
              )}
            </div>
            {footer_arr
              .filter((io) => io.isActive === true)
              .map((item, i) => {
                return (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        margin: "10px",
                        marginBottom: "20px",
                        cursor: "pointer",
                      }}
                      key={i}
                      onClick={() => {
                        if (item.value === "product") {
                          navigate("/add-item");
                        }
                      }}
                    >
                      {item.value === "parties" ? (
                        <>
                          <Dropdown
                            isOpen={dropdownOpen}
                            toggle={toggle}
                            direction={"down"}
                          >
                            {location.pathname !== "/login" && (
                              <>
                                <DropdownToggle
                                  style={{ textAlign: "center" }}
                                  tag={"span"}
                                >
                                  <div>{item.icon}</div>
                                  <div>{item.label}</div>
                                </DropdownToggle>
                              </>
                            )}
                            <DropdownMenu>
                              <DropdownItem
                                onClick={() => {
                                  navigate("/link-customer");
                                }}
                              >
                                Link Customer
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  // navigate("/link-customer");
                                  navigate("/member-enrollment");
                                }}
                              >
                                Member Enrollment
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  navigate("/link-loyality-customer");
                                }}
                              >
                                Link Loyality
                              </DropdownItem>
                              {/* <DropdownItem
                                onClick={() => {
                                  navigate("/member-point-redemption");
                                }}
                              >
                                Member Point Redemption
                              </DropdownItem> */}
                            </DropdownMenu>
                          </Dropdown>
                        </>
                      ) : (
                        <>
                          <div>{item.icon}</div>
                          <div>{item.label}</div>
                        </>
                      )}
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
      <div className="nevbar-menu">
        {open_menu ? (
          <div
            style={{
              position: "absolute",
              right: "20px",
              border: "1px solod #eee",
              backgroundColor: "#fff",
              //   opacity: 0.1,
              top: "80px",
              border: "1px solid #e1e117",
              borderRadius: "20px",
              padding: "20px",
              zIndex: 999,
            }}
          >
            <div style={{ marginBottom: 0, paddingBottom: 0 }}>
              <div>
                <div>{component}</div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Navbar;
