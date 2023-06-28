import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody } from 'reactstrap'
import { Table } from 'reactstrap';
import { handleLowStockItemsRequest } from "../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement"

const ProductDetails = () => {

    const dispatch = useDispatch()
    const { low_stock_items } = useSelector(state => state.ComponentPropsManagement)

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
    }

    const optimizedFn = useCallback(debounce(handleFunCall), []);
    useEffect(() => {
        optimizedFn()
    }, [])

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
                            <tr>
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
    </>)
}

export default ProductDetails