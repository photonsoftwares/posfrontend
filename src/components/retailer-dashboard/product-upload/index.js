import React, { useState } from 'react'
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import Flatpickr from "react-flatpickr";
import DataTable, { createTheme } from 'react-data-table-component';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { handleUploadItemRequest, handleUploadInventoryRequest } from "../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement"
import moment from 'moment';

const ProductUpload = () => {
    const [businessDate, setBusinessDate] = useState(new Date())
    const [fileFlag, setFileFlag] = useState("item")
    const [csvFile, setCsvFile] = useState("")
    const dispatch = useDispatch()

    createTheme('solarized', {
        text: {
            // primary: '#268bd2',
            // secondary: '#2aa198',

        },
        background: {
            // default: 'var(--primary2)',
            default: '#ffffff',
        }
    })

    const columns = [
        {
            name: 'File Name',
            selector: row => row.file_name,
        },
        {
            name: 'Number of Records',
            selector: row => row.no_of_records,
        },
        {
            name: 'Success',
            selector: row => row.success,
        },
        {
            name: 'Failed',
            selector: row => row.failed,
        },
    ];

    const data = [
        {
            id: 1,
            file_name: 'abc.csv',
            no_of_records: '5',
            success: "4",
            failed: "6"
        },
        {
            id: 2,
            file_name: 'abc.csv',
            no_of_records: '5',
            success: "4",
            failed: "6"
        },
        {
            id: 3,
            file_name: 'abc.csv',
            no_of_records: '5',
            success: "4",
            failed: "6"
        },
    ]

    const handleUploadFile = () => {
        if (fileFlag && csvFile) {
            if (fileFlag === "item") {
                dispatch(handleUploadItemRequest({ csvFile }))
            } else if (fileFlag === "inventory") {
                dispatch(handleUploadInventoryRequest({ csvFile }))
            }
        } else {
            toast.error("Please upload csv file")
        }
    }

    return (<>
        <div >

            <Row>
                <Col md={12} className='mt-3'>
                    <FormGroup>
                        <h3>
                            <b>
                                Product Upload
                            </b>
                        </h3>
                    </FormGroup>
                </Col>
                <Col md={12}>

                    <div style={{ fontWeight: "bold" }}>
                        <Form>
                            <Row>
                                <Col md={12}>

                                    <FormGroup>
                                        {`Business Date: ${moment(new Date()).format("DD-MMM-Y")}`}
                                        {/* <Label>
                                            Business Date <span className="text-red"> * </span>
                                        </Label>
                                        <Flatpickr
                                            // data-enable-time
                                            className='form-control'
                                            onChange={(date) => {
                                                setBusinessDate(date[0])
                                            }}
                                            options={{ allowInput: true, dateFormat: "d-M-Y" }}
                                            value={businessDate}

                                            required={true}
                                            placeholder='Select Date'
                                        /> */}
                                    </FormGroup>
                                </Col>


                                <Col md={12}>
                                    <FormGroup>
                                        <Card>
                                            <CardBody>
                                                <div className='d-flex mb-3'>
                                                    <div className='me-5'>
                                                        <Input
                                                            type='radio'
                                                            className='me-2'
                                                            id="item-radio"
                                                            name='csvradio'
                                                            onChange={e => {
                                                                setFileFlag("item")
                                                                setCsvFile("")
                                                            }}
                                                            checked={fileFlag === "item"}
                                                        />
                                                        <Label htmlFor='item-radio'>Item</Label>
                                                    </div>

                                                    <div>
                                                        <Input
                                                            type='radio'
                                                            className='me-2'
                                                            id="inventory-radio"
                                                            name='csvradio'
                                                            onChange={e => {
                                                                setFileFlag("inventory")
                                                                setCsvFile("")
                                                            }}
                                                            checked={fileFlag === "inventory"}
                                                        />
                                                        <Label htmlFor='inventory-radio'>Inventory</Label>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-wrap my-auto">
                                                    <div className='mb-3 me-4'>
                                                        <Label>Upload CSV File <span className="text-red"> * </span></Label>
                                                        <div>
                                                            <label htmlFor="csvfile" className='upload-doc'>Upload CSV</label>
                                                            <input
                                                                type="file"
                                                                accept='.csv'
                                                                id="csvfile"
                                                                onChange={e => {
                                                                    setCsvFile(e.target.files[0])
                                                                }}

                                                            />
                                                            <small className='ms-1'>
                                                                {csvFile.name}
                                                            </small>
                                                        </div>
                                                    </div>
                                                    <div className='my-auto'>
                                                        <Button
                                                            type='button'
                                                            onClick={(e) => handleUploadFile()}
                                                            style={{ backgroundColor: "var(--primary2)", border: "none" }}> Submit </Button>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </FormGroup>
                                </Col>

                                <Col md={12}>
                                    <Card>
                                        <CardBody>

                                            <DataTable
                                                columns={columns}
                                                data={data}
                                                theme="solarized"
                                                className='table-bordered'
                                            />
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>


                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    </>)
}

export default ProductUpload