import React, { useState, useEffect, useCallback } from 'react'
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { handleGetHsnCodeDropdownRequest } from "../../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement"
import { useDispatch, useSelector } from 'react-redux'
import Select from "react-select"
import Flatpickr from "react-flatpickr";

const TaxMaster = () => {
    const dispatch = useDispatch()
    const { hsn_code_dropdown } = useSelector(state => state.ComponentPropsManagement)
    const [hsnCode, setHsnCode] = useState("")

    const [taxDescription, setTaxDescription] = useState("")
    const [effectiveFrom, setEffectiveFrom] = useState("")
    const [endDate, setEndDate] = useState("")

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
        dispatch(handleGetHsnCodeDropdownRequest())
    }

    const optimizedFn = useCallback(debounce(handleFunCall), []);
    useEffect(() => {
        optimizedFn()
    }, [])

    return (<>
        <div>
            <Card>
                <CardBody>
                    <Form>
                        <Row>
                            <Col md={3}>
                                <FormGroup>
                                    <Label>HSN Code <span className="text-red"> * </span></Label>

                                    <Select
                                        options={hsn_code_dropdown}
                                        onChange={e => {
                                            setHsnCode(e.value)
                                        }}
                                        value={hsn_code_dropdown.filter(e => e.value === hsnCode)}
                                        required={true}
                                        placeholder='Select HSN Code'
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={3}>
                                <FormGroup>
                                    <Label>Tax Description <span className="text-red"> * </span></Label>
                                    <Input
                                        type='text'
                                        onChange={e => {
                                            setTaxDescription(e.target.value)
                                        }}
                                        value={taxDescription}
                                        required={true}
                                        placeholder='Enter Tax Description'
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={3}>
                                <FormGroup>
                                    <Label>Effective From <span className="text-red"> * </span></Label>
                                    <Flatpickr
                                        className='form-control'
                                        onChange={e => {
                                            setEffectiveFrom(e[0])
                                        }}
                                        options={{ allowInput: true, dateFormat: "d-M-Y" }}
                                        value={effectiveFrom}
                                        required={true}
                                        placeholder='Select Date'
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={3}>
                                <FormGroup>
                                    <Label>End Date <span className="text-red"> * </span></Label>
                                    <Flatpickr
                                        className='form-control'
                                        onChange={e => {
                                            setEndDate(e[0])
                                        }}
                                        options={{ allowInput: true, dateFormat: "d-M-Y" }}
                                        value={endDate}
                                        required={true}
                                        placeholder='Select Date'
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
        </div>
    </>)
}

export default TaxMaster