import React, { useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { HiOutlineArrowSmallLeft } from "react-icons/hi2"
import Flatpickr from "react-flatpickr";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { handleUpdateMoqRequest } from '../../redux/actions-reducers/ComponentProps/ComponentPropsManagement';
const UpdateMoq = ({ updateMoqModalIsOpen, setUpdateMoqModalIsOpen }) => {
    const dispatch = useDispatch()
    const [updateMoqState, setUpdateMoqState] = useState({
        item_id: "",
        item_name: "",
        min_ord_qty: "",
        effective_date: "",
        valid_upto: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const payload = {
            ...updateMoqState,
            item_id: uuidv4(),
            effective_date: moment(updateMoqState.effective_date).format("Y-MM-DD"),
            valid_upto: moment(updateMoqState.valid_upto).format("Y-MM-DD")
        }
        dispatch(handleUpdateMoqRequest(payload))
        setTimeout(() => {
            setUpdateMoqState({
                item_id: "",
                item_name: "",
                min_ord_qty: "",
                effective_date: "",
                valid_upto: ""
            })
            setUpdateMoqModalIsOpen(!updateMoqModalIsOpen)
        }, 1000);
    }

    return (<>
        <Modal
            isOpen={updateMoqModalIsOpen}
            toggle={() => setUpdateMoqModalIsOpen(!updateMoqModalIsOpen)}
        >
            <ModalHeader>
                <div>
                    <HiOutlineArrowSmallLeft
                        className='mouse-pointer'
                        onClick={() => {
                            setUpdateMoqModalIsOpen(!updateMoqModalIsOpen)
                        }}
                    />&nbsp;
                    Update MOQ
                </div>
            </ModalHeader>
            <Form onSubmit={handleSubmit}>
                <ModalBody>
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label>
                                    Item Name <span className="text-red"> * </span>
                                </Label>
                                <Input
                                
style={{
    fontFamily: 'Arial, sans-serif',
    fontStyle: 'italic',
    fontSize: '16px',
  
  }}
                                    type='text'
                                    onChange={e => {
                                        const val = e.target.value
                                        setUpdateMoqState({ ...updateMoqState, item_name: val })
                                    }}
                                    value={updateMoqState.item_name}
                                    required={true}
                                    placeholder='Enter Item Name'
                                />
                            </FormGroup>
                        </Col>

                        <Col md={12}>
                            <FormGroup>
                                <Label>
                                    Minimum Order Quantity <span className="text-red"> * </span>
                                </Label>
                                <Input
                                style={{
                                    fontFamily: 'Arial, sans-serif',
                                    fontStyle: 'italic',
                                    fontSize: '16px',
                                  
                                  }}
                                    type='number'
                                    onChange={e => {
                                        const val = e.target.value
                                        setUpdateMoqState({ ...updateMoqState, min_ord_qty: val })
                                    }}
                                    value={updateMoqState.min_ord_qty}
                                    required={true}
                                    placeholder='Enter Minimum Order Quantity'
                                />
                            </FormGroup>
                        </Col>

                        <Col md={12}>
                            <FormGroup>
                                <Label>
                                    Effective Date <span className="text-red"> * </span>
                                </Label>
                                <Flatpickr

style={{
    fontFamily: 'Arial, sans-serif',
    fontStyle: 'italic',
    fontSize: '16px',
  
  }}
                                    className='form-control'
                                    onChange={e => {
                                        const val = e[0]
                                        setUpdateMoqState({ ...updateMoqState, effective_date: val })
                                    }}
                                    value={updateMoqState.effective_date}
                                    options={{ allowInput: true, dateFormat: "d-M-Y" }}
                                    required={true}
                                    placeholder='Select Date'
                                />
                            </FormGroup>
                        </Col>

                        <Col md={12}>
                            <FormGroup>
                                <Label>
                                    Valid Upto <span className="text-red"> * </span>
                                </Label>
                                <Flatpickr
                                style={{
                                    fontFamily: 'Arial, sans-serif',
                                    fontStyle: 'italic',
                                    fontSize: '16px',
                                  
                                  }}
                                    className='form-control'
                                    onChange={e => {
                                        const val = e[0]
                                        setUpdateMoqState({ ...updateMoqState, valid_upto: val })
                                    }}
                                    value={updateMoqState.valid_upto}
                                    options={{ allowInput: true, dateFormat: "d-M-Y" }}
                                    required={true}
                                    placeholder='Select Date'
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <div className="w-100">
                        <div className="d-flex justify-content-end">
                            <Button color='primary' type='submit'>
                                Update
                            </Button>
                        </div>
                    </div>
                </ModalFooter>
            </Form>
        </Modal>
    </>)
}

export default UpdateMoq