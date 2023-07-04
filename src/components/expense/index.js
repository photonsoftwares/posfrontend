import React, { useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { HiOutlineArrowSmallLeft } from "react-icons/hi2"
import Select, { useStateManager } from 'react-select'
import { AiOutlinePlus } from "react-icons/ai"
import Flatpickr from "react-flatpickr";
import AddExpense from './AddExpense'

const Expense = (props) => {
    const { expenseModalIsOpen, setExpenseModalIsOpen } = props
    const [addExpenseModalIsOpen, setAddExpenseModalIsOpen] = useState(false)
    const expense_category_dropdown = []

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (<>
        <Modal
            isOpen={expenseModalIsOpen}
            toggle={() => { setExpenseModalIsOpen(!expenseModalIsOpen) }}
        >
            <ModalHeader>
                <HiOutlineArrowSmallLeft
                    className='mouse-pointer'
                    onClick={() => {
                        setExpenseModalIsOpen(!expenseModalIsOpen)
                    }}
                />&nbsp;
                Create Expense
            </ModalHeader>
            <Form onSubmit={handleSubmit}>
                <ModalBody>
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Select Category <span className="text-red"> * </span></Label>
                                <Select
                                    options={expense_category_dropdown}
                                    required={true}
                                    placeholder="Select Category"
                                />
                            </FormGroup>
                        </Col>

                        <Col md={12}>
                            <FormGroup>
                                <Label>Expense Date <span className="text-red"> * </span></Label>
                                <Flatpickr
                                    className='form-control'
                                    onChange={e => {
                                        // setEndDate(e[0])
                                    }}
                                    options={{ allowInput: true, dateFormat: "d-M-Y" }}
                                    // value={endDate}
                                    required={true}
                                    placeholder='Select Date'
                                />
                            </FormGroup>
                        </Col>


                        <Col md={12}>
                            <FormGroup>
                                <Label>Payment Mode <span className="text-red"> * </span></Label>
                                <div className='d-flex'>
                                    <div className='me-4'>
                                        <Input
                                            type="radio"
                                            className='me-2 mouse-pointer'
                                            id='online-radio'
                                            name='payment-mode'
                                        />
                                        <Label htmlFor="online-radio" className='mouse-pointer'>Online</Label>
                                    </div>
                                    <div className='me-4'>
                                        <Input
                                            type="radio"
                                            className='me-2 mouse-pointer'
                                            id="cheque-radio"
                                            name='payment-mode'
                                        />
                                        <Label htmlFor='cheque-radio mouse-pointer'>Cheque</Label>
                                    </div>
                                    <div>
                                        <Input
                                            type="radio"
                                            className='me-2'
                                            id="cash-radio"
                                            name='payment-mode'
                                        />
                                        <Label htmlFor='cash-radio'>Cash</Label>
                                    </div>
                                </div>
                            </FormGroup>
                        </Col>

                        <Col md={12}>
                            <FormGroup style={{ fontWeight: "bolder", color: "#0d6efd", cursor: "pointer" }}
                                onClick={() => {
                                    setAddExpenseModalIsOpen(!addExpenseModalIsOpen)
                                }}
                            >
                                <AiOutlinePlus /> Add Expenses
                            </FormGroup>
                        </Col>

                        <Col md={12}>
                            <FormGroup>
                                <Label>Expense Notes <span className="text-red"> * </span></Label>
                                <Input
                                    type='textarea'
                                    rows={4}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button
                        type="button"
                        color='primary'
                    >
                        Create
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
        <AddExpense
            addExpenseModalIsOpen={addExpenseModalIsOpen}
            setAddExpenseModalIsOpen={setAddExpenseModalIsOpen}
        />
    </>)
}

export default Expense