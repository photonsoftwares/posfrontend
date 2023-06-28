import React, { useState } from 'react'
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import DataTable, { createTheme } from 'react-data-table-component';
import { AiOutlineRight } from "react-icons/ai"

const HSNMaster = () => {
    const [itemName, setItemName] = useState("")
    const [itemHsn, setItemHsn] = useState("")
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
            name: 'Code',
            selector: row => row.code,
        },
        {
            name: 'Description',
            selector: row => row.description,
        },
        {
            name: 'Action',
            cell: row => {
                return (<>
                    <AiOutlineRight />
                </>)
            }
        }
    ];

    const data = [
        {
            id: 1,
            code: '851672',
            description: 'toasters'
        },
        {
            id: 2,
            code: '851672',
            description: 'toasters'
        }
    ]

    return (<>
        <div className=''>
            <Card>
                <CardBody>
                    <div style={{ fontSize: "22px", fontWeight: "bold" }}>HSN Master</div>

                    <Form className='mt-2'>
                        <Row>
                            <Col md={3}>
                                <FormGroup>
                                    <Label>Item Name <span className="text-red"> * </span></Label>
                                    <Input
                                        type='text'
                                        onChange={e => {
                                            setItemName(e.target.value)
                                        }}
                                        value={itemName}
                                        required={true}
                                        placeholder='Enter Item Name'
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={3}>
                                <FormGroup>
                                    <Label>Item HSN <span className="text-red"> * </span></Label>
                                    <Input
                                        type='text'
                                        onChange={e => {
                                            setItemHsn(e.target.value)
                                        }}
                                        value={itemHsn}
                                        required={true}
                                        placeholder='Enter Item HSN'
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={3}>
                                <FormGroup>
                                    <Label>&nbsp;</Label>
                                    <div>
                                        <Button style={{ border: "none", backgroundColor: "var(--primary2)" }}>
                                            Submit
                                        </Button>
                                    </div>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>

            <Card className='mt-4'>
                <CardBody>
                    <Row>
                        <Col md={12}>
                            <DataTable
                                columns={columns}
                                data={data}
                                title="Select HSN/SAC Code"
                                theme="solarized"
                                className='table-bordered'
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    </>)
}

export default HSNMaster