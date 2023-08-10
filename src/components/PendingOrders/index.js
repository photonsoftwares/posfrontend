import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import Flatpickr from "react-flatpickr";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import MyCart from "./MyCart";
import { handleViewOrderPendingRequest } from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";

const ViewOrders = ({ viewOrderModalIsOpen, setViewOrderModalIsOpen }) => {
  const { userName, userType } = localStorage.getItem("User_data")
    ? JSON.parse(localStorage.getItem("User_data"))
    : {};

  console.log("MAIN PENDING ORDER", userType);
  const checkCustomer = userName.includes("C");

  // useEffect(() => {
  //   if (userType === "CUSTOMER") {
  //     // navigate("/home");
  //   }
  // }, [userType]);

  const [show, setShow] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  console.log("ORDER NUMBER", orderNumber);
  const { pending_order_data } = useSelector((e) => e.ComponentPropsManagement);

  console.log("pending_order_data", pending_order_data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleViewOrderPendingRequest());
  }, []);

  useEffect(() => {
    if (pending_order_data.length > 0) {
      // setOrderNumber(pending_order_data[0].order_id);
    }
  }, [pending_order_data]);

  return (
    <>
      <Modal
        isOpen={viewOrderModalIsOpen}
        toggle={() => setViewOrderModalIsOpen(!viewOrderModalIsOpen)}
        className="modal-xl"
      >
        <ModalHeader>
          <div className="w-100">
            <div className="d-flex justify-content-between">
              <div style={{ fontWeight: "bold" }}>
                <HiOutlineArrowSmallLeft
                  className="mouse-pointer"
                  onClick={() => {
                    setViewOrderModalIsOpen(!viewOrderModalIsOpen);
                  }}
                />
                &nbsp; Pending Orders
              </div>
              <div>
                {/* <Button type='button' className='btn btn-sm' color='primary'>To Bill</Button> */}
              </div>
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div></div>
          <div className="table-responsive">
            <table className="table text-center table-bordered">
              <thead>
                <tr>
                  <th scope="col">Order Id</th>
                  <th scope="col">Date</th>
                  <th scope="col">Name</th>
                  <th scope="col">No. of Items</th>
                  <th scope="col">Value</th>
                  {/* <th scope="col">Order Discount</th> */}
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {pending_order_data.map((item) => {
                  return (
                    <>
                      <tr>
                        <th scope="row">{item.order_id}</th>
                        <td>{item.order_date}</td>
                        <td>{item.customer_name}</td>
                        <td>{item.order_qty}</td>
                        <td>{item.order_value}</td>
                        {/* <td>{item.order_discount}</td> */}
                        <td>
                          {userType === "CUSTOMER" ? (
                            <Button
                              type="button"
                              className="btn btn-sm disabled"
                            >
                              {item.status.toUpperCase()}
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              className="btn btn-sm "
                              color="primary"
                              // onClick={() => setShow(true)}
                              onClick={() => {
                                setShow(true);
                                setOrderNumber(item.order_id);
                              }}
                            >
                              To Bill
                            </Button>
                          )}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
      {show === true && (
        <>
          <MyCart show={show} setShow={setShow} orderNumber={orderNumber} />
        </>
      )}
    </>
  );
};

export default ViewOrders;
