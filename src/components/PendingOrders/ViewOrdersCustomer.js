import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { handleViewOrderByCustomerRequest } from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
// customer_order
const ViewOrdersCustomer = ({
  showVierCustomerOrderModal,
  setShowVierCustomerOrderModal,
}) => {
  //   const [show, setShow] = useState(false);

  const { customer_order } = useSelector((e) => e.ComponentPropsManagement);
  const handleClose = () => setShowVierCustomerOrderModal(false);
  const handleShow = () => setShow(true);
  let { saasId, userName } = localStorage.getItem("User_data")
    ? JSON.parse(localStorage.getItem("User_data"))
    : {};
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleViewOrderByCustomerRequest({ saasId, userName }));
  }, []);
  useEffect(() => {
    if (customer_order.length > 0) {
      // setOrderNumber(pending_order_data[0].order_id);
    }
  }, [customer_order]);
  return (
    <div>
      <Modal show={showVierCustomerOrderModal}>
        <Modal.Header>
          <Modal.Title>Your Orders</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                {customer_order.map((item) => {
                  return (
                    <>
                      <tr>
                        <th scope="row">{item.order_id}</th>
                        <td>{item.order_date}</td>
                        <td>{item.customer_name}</td>
                        <td>{item.order_qty}</td>
                        <td>{item.order_value}</td>
                        {/* <td>{item.order_discount}</td> */}
                        <td>{item.status}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewOrdersCustomer;
