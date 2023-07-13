import React, { useState, useEffect } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { HiOutlineArrowSmallLeft } from "react-icons/hi2"
import Flatpickr from "react-flatpickr";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { useDispatch } from 'react-redux';

const ViewOrders = ({ viewOrderModalIsOpen, setViewOrderModalIsOpen }) => {
    const [orderQty, setOrderQty] = useState(0)
    const [orderValue, setOrderValue] = useState(0)
    const a1 = [
        {
            "order_id": 4387,
            "order_date_time": "2023-07-11",
            "order_date": "2023-07-11",
            "customer_id": 123456789,
            "customer_name": "ansh Doe",
            "saas_id": "S1234",
            "store_id": "STORE001",
            "order_qty": 10,
            "order_tax": 2.50,
            "order_value": 100.00,
            "order_discount": 10.00,
            "status": "update done"
        },
        {
            "order_id": 4442,
            "order_date_time": "2023-07-11",
            "order_date": "2023-07-11",
            "customer_id": 123456789,
            "customer_name": "rishabh Doe",
            "saas_id": "S1234",
            "store_id": "STORE001",
            "order_qty": 10,
            "order_tax": 2.50,
            "order_value": 100.00,
            "order_discount": 10.00,
            "status": "true"
        },
        {
            "order_id": 4501,
            "order_date_time": "2023-07-11",
            "order_date": "2023-07-11",
            "customer_id": 123456789,
            "customer_name": "rishabh Doe",
            "saas_id": "S1234",
            "store_id": "STORE001",
            "order_qty": 10,
            "order_tax": 2.50,
            "order_value": 100.00,
            "order_discount": 10.00,
            "status": null
        },
        {
            "order_id": 4502,
            "order_date_time": "2023-07-11",
            "order_date": "2023-07-11",
            "customer_id": 123456789,
            "customer_name": "rishabh Doe",
            "saas_id": "S1234",
            "store_id": "STORE001",
            "order_qty": 10,
            "order_tax": 2.50,
            "order_value": 100.00,
            "order_discount": 10.00,
            "status": "order placed"
        },
        {
            "order_id": 4513,
            "order_date_time": "2023-07-11",
            "order_date": "2023-07-11",
            "customer_id": 123456789,
            "customer_name": "rishabh Doe",
            "saas_id": "S1234",
            "store_id": "STORE001",
            "order_qty": 10,
            "order_tax": 2.50,
            "order_value": 100.00,
            "order_discount": 10.00,
            "status": "order placed"
        }
    ]
    useEffect(() => {
        if (a1.length > 0) {
            const t1 = a1.map(io => io.order_qty)
            let sum = 0
            t1.map(s => {
                sum = sum + s
            })
            setOrderQty(sum)


            const t2 = a1.map(io => io.order_value)
            let sum1 = 0
            t2.map(s => {
                sum1 = sum1 + s
            })
            setOrderValue(sum1)
        }
    }, [a1])



    return (<>
        <Modal
            isOpen={viewOrderModalIsOpen}
            toggle={() => setViewOrderModalIsOpen(!viewOrderModalIsOpen)}
            className='modal-xl'
        >
            <ModalHeader>
                <div className='w-100'>
                    <div className="d-flex justify-content-between">
                        <div>

                            <HiOutlineArrowSmallLeft
                                className='mouse-pointer'
                                onClick={() => {
                                    setViewOrderModalIsOpen(!viewOrderModalIsOpen)
                                }}
                            />&nbsp;
                            View Orders
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
                            <table class="table text-center table-bordered">
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
                <div>

                </div>
                <div className='table-responsive'>
                    <table class="table text-center table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Order Id</th>
                                <th scope="col">Order Date</th>
                                <th scope="col">Customer Name</th>
                                <th scope="col">Order Quantity</th>
                                <th scope="col">Order Value</th>
                                <th scope="col">Order Discount</th>
                                <th scope="col">Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {a1.map(item => {
                                return (<>
                                    <tr>
                                        <th scope="row">{item.order_id}</th>
                                        <td>{item.order_date_time}</td>
                                        <td>{item.customer_name}</td>
                                        <td>{item.order_qty}</td>
                                        <td>{item.order_value}</td>
                                        <td>{item.order_discount}</td>
                                        <td>
                                            <Button type='button' className='btn btn-sm' color='primary'>To Bill</Button>
                                        </td>
                                    </tr>
                                </>)
                            })}
                        </tbody>
                    </table>
                </div>
            </ModalBody>
            <ModalFooter>

            </ModalFooter>
        </Modal>
    </>)
}

export default ViewOrders