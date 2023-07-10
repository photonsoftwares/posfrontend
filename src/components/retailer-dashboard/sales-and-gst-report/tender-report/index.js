import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardBody, Col, FormGroup, Nav, NavItem, NavLink, Row, TabContent, TabPane, Button, Modal, ModalBody, ModalFooter, ModalHeader, Label, Form } from 'reactstrap'
import { BsArrowDown, BsArrowUp } from "react-icons/bs"
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineEye } from "react-icons/ai"
import { BsArrowLeft } from "react-icons/bs"
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { handleTenderReportRequest } from "../../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement"
import moment from 'moment'
import DataTable from 'react-data-table-component';
import { CSVLink } from "react-csv";
import Flatpickr from "react-flatpickr";

const TenderReport = () => {

    const dispatch = useDispatch()
    // const dispatch = useDispatch()
    const { tender_report_data } = useSelector(state => state.ComponentPropsManagement)

    const [date, setDate] = useState("")
    // console.log("tender_report_data", tender_report_data)
    // const tender_report_data = [
    //     {
    //         "tender_name": "PhonePay",
    //         "total_amount": 300.00
    //     }
    // ]

    // const debounce = (func) => {
    //     let timer;
    //     return function (...args) {
    //         const context = this;
    //         if (timer) clearTimeout(timer);
    //         timer = setTimeout(() => {
    //             timer = null;
    //             func.apply(context, args);
    //         }, 1000);
    //     };
    // };

    // const handleFunCall = (date) => {
    //     const t1 = moment(date).format("Y-MM-DD")
    //     dispatch(handleSalesReportRequest(t1))
    // }

    // const optimizedFn = useCallback(debounce(handleFunCall), []);
    // useEffect(() => {
    //     if (date) {
    //         optimizedFn(date)
    //     }
    // }, [date])

    const columns = [
        {
            name: 'Tender Name',
            center: true,
            selector: row => row.tender_name,
        },
        {
            name: 'Total Amount',
            center: true,
            selector: row => row.total_amount,
        }
    ];

    // const actionsMemo = React.useMemo(() => {
    //     return (<>
    //         <CSVLink data={sales_report_table_data}>
    //             <Button className='btn btn-sm' style={{ backgroundColor: "var(--primary1)", border: "none" }}>
    //                 Export
    //             </Button>
    //         </CSVLink>
    //     </>)
    // }, []);

    // const handleSum = (arr) => {
    //     if (arr) {
    //         if (arr.length > 0) {
    //             let sum = 0
    //             arr.map(item => {
    //                 sum = sum + Number(item)
    //             })
    //             return sum
    //         }
    //     }
    //     return 0
    // }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(handleTenderReportRequest({ date }))
    }

    return (<>

        <Card className='my-3'>
            <CardBody>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={4}>
                            {/* <FormGroup> */}
                            <Label className='m-0 p-0'>Select Date <span className="text-red"> * </span></Label>
                            <Flatpickr
                                className='form-control'
                                onChange={e => {
                                    setDate(e[0])
                                }}
                                options={{ allowInput: true, dateFormat: "d-M-Y" }}
                                value={date}
                                required={true}
                                placeholder='Select Date'
                            />
                            {/* </FormGroup> */}
                        </Col>
                        <Col md={8}>
                            {/* <FormGroup> */}
                            <Label className='m-0 p-0'>&nbsp;</Label>
                            <div>
                                <Button style={{ backgroundColor: "var(--primary1)", border: "1px solid var(--primary1)" }}>Save</Button>
                            </div>
                            {/* </FormGroup> */}
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card>

        <DataTable
            columns={columns}
            responsive={true}
            data={tender_report_data}
            title={`Tender Amount: ${tender_report_data?.length > 0 && tender_report_data[0]?.total_amount}`}
        // fixedHeader={true}
        // fixedHeaderScrollHeight='500px'
        // actions={actionsMemo}
        />
    </>)
}

export default TenderReport