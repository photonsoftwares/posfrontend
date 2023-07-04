import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { Table } from 'reactstrap';
import { HiOutlineArrowSmallLeft } from "react-icons/hi2"
import { handleLowStockItemsRequest, handleLowStockItemListRequest } from "../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement"

const ProductDetails = () => {

    const dispatch = useDispatch()
    const { low_stock_items } = useSelector(state => state.ComponentPropsManagement)
    const [modalIsOpen, setModalIsOpen] = useState(false)

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

    const handleFunCall = () => {
        dispatch(handleLowStockItemsRequest())
        dispatch(handleLowStockItemListRequest())
    }

    const optimizedFn = useCallback(debounce(handleFunCall), []);
    useEffect(() => {
        optimizedFn()
    }, [])

    const obj = [
        {
            "item_code": "345",
            "item_name": "Mayonaise",
            "closing_quantity": 7
        },
        {
            "item_code": "345",
            "item_name": "Tomato sauce",
            "closing_quantity": 5
        },
        {
            "item_code": "345",
            "item_name": "Sandwich Small",
            "closing_quantity": 8
        },
        {
            "item_code": "345",
            "item_name": "Pizza Base",
            "closing_quantity": 4
        }
    ]

    return (<>
        <Card style={{ border: "none", borderRadius: "12px", maxWidth: "400px" }} className='w-100 mb-4'>
            <CardBody>
                <div style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>
                    Product Details
                </div>

                <div>
                    <Table>
                        {/* <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                            </tr>
                        </thead> */}
                        <tbody>
                            <tr onClick={() => {
                                if (Number(low_stock_items) > 10) {
                                    setModalIsOpen(true)
                                }
                            }}>
                                <td>Low Stock Items</td>
                                <td style={{ fontWeight: "bold" }}>{low_stock_items}</td>
                            </tr>
                            {/* <tr>
                                <td>Item Group</td>
                                <td style={{ fontWeight: "bold" }}>14</td>
                            </tr> */}
                            <tr>
                                <td>No of Items</td>
                                <td style={{ fontWeight: "bold" }}>104</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </CardBody>
        </Card>

        <Modal isOpen={modalIsOpen} toggle={() => {
            setModalIsOpen(!modalIsOpen)
        }}>
            <ModalHeader>
                <HiOutlineArrowSmallLeft
                    className='mouse-pointer'
                    onClick={() => {
                        setModalIsOpen(!modalIsOpen)
                    }}
                />&nbsp;Low Stock
            </ModalHeader>
            <ModalBody>
                <Table className='text-center'>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {obj.map(item => {
                            return (<>
                                <tr key={item.item_code}>
                                    <td>{item.item_code}</td>
                                    <td>{item.item_name}</td>
                                    <td>{item.closing_quantity}</td>
                                </tr>
                            </>)
                        })}
                    </tbody>
                </Table>
            </ModalBody>
        </Modal>
    </>)
}

export default ProductDetails