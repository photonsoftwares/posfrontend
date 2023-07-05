import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardBody, Col, FormGroup, Nav, NavItem, NavLink, Row, TabContent, TabPane, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { BsArrowDown, BsArrowUp } from "react-icons/bs"
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineEye } from "react-icons/ai"
import { BsArrowLeft } from "react-icons/bs"
import { handleLastWeekSalesRequest, handleLastMonthSalesRequest, handleLastSixtyDaysSalesRequest, handleTodaySalesRequest, handleLastFourteenDaysSalesRequest, handleYesterdaySalesRequest } from "../../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement"
import moment from 'moment'
import DataTable from 'react-data-table-component';
import { CSVLink } from "react-csv";


const SalesReport = () => {
    // const dispatch = useDispatch()
    const { sales_report_table_data } = useSelector(state => state.ComponentPropsManagement)

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

    // const handleFunCall = () => {
    //     dispatch(handleLastWeekSalesRequest())
    //     dispatch(handleLastMonthSalesRequest())
    //     dispatch(handleTodaySalesRequest())
    //     dispatch(handleLastFourteenDaysSalesRequest())
    //     dispatch(handleLastSixtyDaysSalesRequest())
    //     dispatch(handleYesterdaySalesRequest())
    // }

    // const optimizedFn = useCallback(debounce(handleFunCall), []);
    // useEffect(() => {
    //     optimizedFn()
    // }, [])

    const columns = [
        {
            name: 'Invoice Number',
            selector: row => row.invoice_no,
        },
        {
            name: 'Business Date',
            selector: row => row.business_date,
        },
        {
            name: 'Tax Total',
            selector: row => row.tax_total,
        },
        {
            name: 'Invoice Total',
            selector: row => row.invoice_total,
        },
        {
            name: 'Pdf Name',
            selector: row => row.pdf_name,
        },
        {
            name: "Action",
            selector: row => row.pdf_url,
            cell: row => {
                const [modalIsOpen, setModalIsOpen] = useState(false)
                return (<>
                    <AiOutlineEye
                        size={20}
                        className='mouse-pointer'
                        onClick={() => setModalIsOpen(true)}
                    />

                    <Modal
                        isOpen={modalIsOpen}
                        toggle={() => {
                            setModalIsOpen(!modalIsOpen)
                        }}
                    >
                        <ModalHeader>
                            <BsArrowLeft className='mouse-pointer' onClick={() => setModalIsOpen(!modalIsOpen)} /> View Pdf
                        </ModalHeader>
                        <ModalBody >
                            <iframe
                                src={row.pdf_url}
                                frameborder="0"
                                height="400px"
                                width={"100%"}
                            />
                        </ModalBody>
                        <ModalFooter>

                        </ModalFooter>
                    </Modal>
                </>)
            }
        }
    ];

    const actionsMemo = React.useMemo(() => {
        return (<>
            <CSVLink data={sales_report_table_data}>
                <Button className='btn btn-sm' style={{ backgroundColor: "var(--primary1)", border: "none" }}>
                    Export
                </Button>
            </CSVLink>
        </>)
    }, []);

    return (<>
        {/* <div>Business Date: {moment(new Date()).format("DD-MMM-Y")}</div> */}
        <DataTable
            columns={columns}
            responsive={true}
            data={sales_report_table_data}
            title="Sales Report"
            fixedHeader={true}
            fixedHeaderScrollHeight='500px'
            actions={actionsMemo}
        />
    </>)
}

export default SalesReport