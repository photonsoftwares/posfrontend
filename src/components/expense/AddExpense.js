import React, { useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { HiOutlineArrowSmallLeft } from "react-icons/hi2"
import Select, { useStateManager } from 'react-select'
import { AiOutlinePlus } from "react-icons/ai"
import Flatpickr from "react-flatpickr";

const AddExpense = (props) => {
    const { addExpenseModalIsOpen, setAddExpenseModalIsOpen, addExpenseArr, setAddExpenseArr } = props
    const [addExpenseState, setAddExpenseState] = useState({
        expense_name: "",
        quantity: "",
        cost: "",
        amount: ""
    })
    const expense_category_dropdown = []
    const handleSubmit = (e) => {
        e.preventDefault()
        setAddExpenseArr([...addExpenseArr, addExpenseState])
        setTimeout(() => {
            setAddExpenseState({
                expense_name: "",
                quantity: "",
                cost: "",
                amount: ""
            })
            setAddExpenseModalIsOpen(!addExpenseModalIsOpen)
        }, 500);
    }

    return (<>
        <Modal
            isOpen={addExpenseModalIsOpen}
            toggle={() => { setAddExpenseModalIsOpen(!addExpenseModalIsOpen) }}
        >
            <ModalHeader>
                <HiOutlineArrowSmallLeft
                    className='mouse-pointer'
                    onClick={() => {
                        setAddExpenseModalIsOpen(!addExpenseModalIsOpen)
                    }}
                />&nbsp;
                Add Expense
            </ModalHeader>
            <Form onSubmit={handleSubmit}>
                <ModalBody>
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Enter Name <span className="text-red"> * </span></Label>
                                <Input
                                    type="text"
                                    onChange={e => {
                                        const val = e.target.value
                                        setAddExpenseState({ ...addExpenseState, expense_name: val })
                                    }}
                                    value={addExpenseState.expense_name}
                                    required={true}
                                    placeholder='Enter Name'
                                />
                            </FormGroup>
                        </Col>

                        <Col md={12}>
                            <FormGroup>
                                <Label>Enter Quantity <span className="text-red"> * </span></Label>
                                <Input
                                    type="number"
                                    onChange={e => {
                                        const val = e.target.value
                                        setAddExpenseState({ ...addExpenseState, quantity: val })
                                    }}
                                    value={addExpenseState.quantity}
                                    required={true}
                                    placeholder='Enter Quantity'
                                />
                            </FormGroup>
                        </Col>

                        <Col md={12}>
                            <FormGroup>
                                <Label>Enter Cost <span className="text-red"> * </span></Label>
                                <Input
                                    type="number"
                                    onChange={e => {
                                        const val = e.target.value
                                        setAddExpenseState({ ...addExpenseState, cost: val })
                                    }}
                                    value={addExpenseState.cost}
                                    required={true}
                                    placeholder='Enter Cost'
                                />
                            </FormGroup>
                        </Col>

                        <Col md={12}>
                            <FormGroup>
                                <Label>Enter Amount <span className="text-red"> * </span></Label>
                                <Input
                                    type="number"
                                    onChange={e => {
                                        const val = e.target.value
                                        setAddExpenseState({ ...addExpenseState, amount: val })
                                    }}
                                    value={addExpenseState.amount}
                                    required={true}
                                    placeholder='Enter Amount'
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
                        Save
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    </>)
}

export default AddExpense