import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import Logo from "../assets/logo.jpeg";
import Logo2 from "../assets/logo2.png";
import Logo3 from "../assets/logo3.png";
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
import { BsHandbag } from "react-icons/bs";

const Navbar = () => {
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
  const [storeName, setStoreName] = useState("");
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
  useEffect(() => { }, [handleLogout]);

  useEffect(() => {
    if (localStorage.getItem("Store_data")) {
      const allData = JSON.parse(localStorage.getItem("Store_data"));
      // console.log("STORE NAME", storeName);
      setStoreName(allData?.storeName);
    }
  }, [storeName]);

  const footer_arr = [
    {
      id: 1,
      // label: "Parties",
      value: "parties",
      icon: <FaBars color="#211212" size="25" />,
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
        maxWidth: "500px",
        margin: "auto",
        height: "85px",
        backgroundColor: "#ffd700",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: "20px",
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
            height: "50px",
            width: "100%",
            flex: 1,
          }}
        >
          <img src={Logo3} style={{ height: "35px", width: "100%" }} />
        </Link>

        {!(location.pathname === "/" || location.pathname === "/login") && (
          <>
            <BiArrowBack
              size={20}
              onClick={() => {
                navigate("/");
              }}
              style={{ cursor: "pointer" }}
            />
          </>
        )}
        <h6 style={{ fontSize: "14px", marginTop: "10px", width: "100%" }}>
          NextGen@CloudMpoS
        </h6>
      </div>
      <div
        //  style={{ flexWrap: "nowrap" }}
        style={{ flex: 4 }}
      >
        <div
          style={{
            color: "#eee",
            fontWeight: "bolder",
            color: "#8f0707",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ fontSize: "19px", padding: 0, margin: 0 }}>
            {localStorage.getItem("User_data") ? storeName : ""}
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
            marginTop: 4,
          }}
        >
          {localStorage.getItem("User_data") ? (
            <div
              style={{ position: "relative", cursor: "pointer" }}
              onClick={() => handleShowCart()}
            >
              <BsHandbag color="#000" fontSize={30} opacity={0.8} />
              <div style={{ position: "absolute", top: 8, right: 50 }}>
                {cartCount}
              </div>
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
              }}
            >
              {localStorage.getItem("User_data") &&
                localStorage.getItem("Token") ? (
                <GrLogout
                  size={25}
                  // style={{ cursor: "pointer", padding: 0, margin: 0 }}
                  onClick={() => {
                    handleLogout();
                    setOpenMenu(false);
                  }}
                />
              ) : (
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
                              {/* <DropdownItem
                                onClick={() => {
                                  navigate("/add-party");
                                }}
                              >
                                Link Loyalty
                              </DropdownItem> */}
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
                                Loyality Dashboard
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
