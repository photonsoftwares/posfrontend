// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Col,
//   Form,
//   FormGroup,
//   Input,
//   Label,
//   Modal,
//   ModalBody,
//   ModalFooter,
//   ModalHeader,
//   Row,
// } from "reactstrap";
// import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
// import Flatpickr from "react-flatpickr";
// import { v4 as uuidv4 } from "uuid";
// import moment from "moment";
// import { useDispatch, useSelector } from "react-redux";
// import MyCart from "./MyCart";
// import {
//   //   handleViewOrderRequest,
//   handleViewOrderBySaasIdAndOrderIdRequest,
//   handleViewOrderRequest,
// } from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";

// const ViewOrders = ({ viewOrderModalIsOpen, setViewOrderModalIsOpen }) => {
//   const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
//   const { handle_view_order_details, handle_view_orders } = useSelector(
//     (e) => e.ComponentPropsManagement
//   );
//   //   console.log("handle_view_orders", handle_view_orders);
//   const dispatch = useDispatch();
//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     dispatch(handleViewOrderBySaasIdAndOrderIdRequest());
//   }, []);

//   return (
//     <>
//       <Modal
//         isOpen={viewOrderModalIsOpen}
//         toggle={() => setViewOrderModalIsOpen(!viewOrderModalIsOpen)}
//         className="modal-xl"
//       >
//         <ModalHeader>
//           <div className="w-100">
//             <div className="d-flex justify-content-between">
//               <div style={{ fontWeight: "bold" }}>
//                 <HiOutlineArrowSmallLeft
//                   className="mouse-pointer"
//                   onClick={() => {
//                     setViewOrderModalIsOpen(!viewOrderModalIsOpen);
//                   }}
//                 />
//                 &nbsp; Pending Orders
//               </div>
//               <div>
//                 {/* <Button type='button' className='btn btn-sm' color='primary'>To Bill</Button> */}
//               </div>
//             </div>
//           </div>
//         </ModalHeader>
//         <ModalBody>
//           {/* <Row>
//                     <Col md={12}>
//                         <div className='table-responsive'>
//                             <table className="table text-center table-bordered">
//                                 <thead>
//                                     <tr>
//                                         <th scope="col">Customer Name</th>
//                                         <th scope="col">Total Quantity</th>
//                                         <th scope="col">Value</th>
//                                         <th scope="col">
//                                             Action
//                                         </th>
//                                     </tr>

//                                 </thead>
//                                 <tbody>
//                                     <tr>
//                                         <td>Gagan</td>
//                                         <td>{orderQty}</td>
//                                         <td>{orderValue}</td>
//                                         <td>Cart</td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                         </div>
//                     </Col>
//                 </Row> */}
//           <div></div>
//           <div className="table-responsive">
//             <table className="table text-center table-bordered">
//               <thead>
//                 <tr>
//                   <th scope="col">Order Id</th>
//                   <th scope="col">Order Date</th>
//                   <th scope="col">Customer Name</th>
//                   <th scope="col">Order Quantity</th>
//                   <th scope="col">Order Value</th>
//                   {/* <th scope="col">Order Discount</th> */}
//                   <th scope="col">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {handle_view_orders && handle_view_orders.length > 0 ? (
//                   handle_view_orders.map((item) => {
//                     return (
//                       <>
//                         <tr>
//                           <th scope="row">{item.order_id}</th>
//                           <td>{item.order_date}</td>
//                           <td>{item.customer_name}</td>
//                           <td>{item.order_qty}</td>
//                           <td>{item.order_value}</td>
//                           {/* <td>{item.order_discount}</td> */}
//                           <td>
//                             <Button
//                               type="button"
//                               className="btn btn-sm"
//                               color="primary"
//                               onClick={() => {
//                                 dispatch(handleViewOrderRequest({ item }));
//                                 setShow(true);
//                                 console.log("ORDER ID", item.order_id);
//                               }}
//                             >
//                               To Bill
//                             </Button>
//                           </td>
//                         </tr>
//                       </>
//                     );
//                   })
//                 ) : (
//                   <></>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </ModalBody>
//         <ModalFooter></ModalFooter>
//       </Modal>
//       {show === true && (
//         <>
//           <MyCart show={show} setShow={setShow} />
//         </>
//       )}
//     </>
//   );
// };

// export default ViewOrders;

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
  const [show, setShow] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const { pending_order_data } = useSelector((e) => e.ComponentPropsManagement);

  console.log("pending_order_data", pending_order_data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleViewOrderPendingRequest());
  }, []);

  useEffect(() => {
    if (pending_order_data.length > 0) {
      setOrderNumber(pending_order_data[0].order_id);
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
          {/* <Row>
                    <Col md={12}>
                        <div className='table-responsive'>
                            <table className="table text-center table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Customer Name</th>
                                        <th scope="col">Total Quantity</th>
                                        <th scope="col">Value</th>
                                        <th scope="col">
                                            Action
                                        </th>
                                    </tr>

                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Gagan</td>
                                        <td>{orderQty}</td>
                                        <td>{orderValue}</td>
                                        <td>Cart</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row> */}
          <div></div>
          <div className="table-responsive">
            <table className="table text-center table-bordered">
              <thead>
                <tr>
                  <th scope="col">Order Id</th>
                  <th scope="col">Date</th>
                  <th scope="col">Name</th>
                  <th scope="col">Quantity</th>
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
                          <Button
                            type="button"
                            className="btn btn-sm"
                            color="primary"
                            onClick={() => setShow(true)}
                          >
                            To Bill
                          </Button>
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
