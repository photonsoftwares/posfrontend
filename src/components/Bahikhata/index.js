import React, { useState, useEffect } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { HiOutlineArrowSmallLeft } from "react-icons/hi2"
import Select, { useStateManager } from 'react-select'
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai"
import Flatpickr from "react-flatpickr";
//import AddExpense from './AddBahikhata'
import { BiEdit } from "react-icons/bi"
//import UpdateExpense from './UpdateBahikhata'
import { useDispatch, useSelector } from 'react-redux'
import { handleBahikhataPartyDropdownRequest, handleBahikhataCreateRequest } from '../../redux/actions-reducers/ComponentProps/ComponentPropsManagement'
import moment from 'moment'

const Bahikhata = (props) => {
    const dispatch = useDispatch()
    const { bahikhata_party_name_dropdown } = useSelector((e) => e.ComponentPropsManagement);
    const { bahikhataModalIsOpen, setBahikhataModalIsOpen } = props
    const [addBahikhataModalIsOpen, setAddBahikhataModalIsOpen] = useState(false)
    const [updateBahikhataModalIsOpen, setUpdateBahikhataModalIsOpen] = useState(false)
    const [updateItem, setUpdateItem] = useState("")
    const [updateIndexNumber, setUpdateIndexNumber] = useState("")
    const [addBahikhataArr, setAddBahikhataArr] = useState([])
    const [bahikhataArr, setBahikhataArr] = useState({
        party_name: "",
        payment_type: "",
        payment_date: "",
        payment_mode: "",
        amount: "",
        payment_notes: ""
    })


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(bahikhataArr);
        const payload = {
            ...bahikhataArr,
            payment_date: moment(bahikhataArr.payment_date).format("Y-MM-DD"),

        }
        dispatch(handleBahikhataCreateRequest(payload))
        setTimeout(() => {
            setBahikhataArr({
                party_name: "",
                payment_type: "",
                payment_date: "",
                payment_mode: "",
                amount: "",
                payment_notes: ""
            })


            setAddBahikhataArr([])
            setBahikhataModalIsOpen(!bahikhataModalIsOpen)
        }, 500);
    }

    useEffect(() => {
        dispatch(handleBahikhataPartyDropdownRequest())
    }, [])


  return (
    <>
      <Modal
        isOpen={bahikhataModalIsOpen}
        toggle={() => {
          setBahikhataModalIsOpen(!bahikhataModalIsOpen);
        }}
      >
        <ModalHeader>
          <HiOutlineArrowSmallLeft
            className="mouse-pointer"
            onClick={() => {
              setBahikhataModalIsOpen(!bahikhataModalIsOpen);
            }}
          />
          &nbsp; Create Bahikhata
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ModalBody>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label>
                    Select Party <span className="text-red"> * </span>
                  </Label>
                  <Select

styles={{
  menu: (baseStyles, state) => ({
    ...baseStyles,
    // height: "50px",
    overflow: "auto",
    fontWeight: "900",
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    height: "50px",
    fontWeight: "300",
    overflow: "auto",
  }),
  control: (baseStyles, state) => ({
    ...baseStyles,
    // height: "50px",
    fontWeight: "800",
    // overflow: "auto",
  }),
}}
                    options={bahikhata_party_name_dropdown}
                    onChange={(e) => {
                      const val = e.value;
                      setBahikhataArr({ ...bahikhataArr, party_name: val });
                    }}
                    value={bahikhata_party_name_dropdown.filter(
                      (io) => io.value === bahikhataArr.party_name
                    )}
                    required={true}
                    placeholder="Select Party"
                  />
                </FormGroup>
              </Col>

                        <Col md={12}>
                            <FormGroup>
                                <Label>Payment Type <span className="text-red"> * </span></Label>
                                <div className='d-flex'>
                                    <div className='me-4'>
                                        <Input
                                            type="radio"
                                            className='me-2 mouse-pointer'
                                            id='received-radio'
                                            onChange={e => {
                                                setBahikhataArr({ ...bahikhataArr, payment_type: "received" })
                                            }}
                                            checked={bahikhataArr.payment_type === "received"}
                                            name='payment-type'
                                        />
                                        <Label htmlFor="received-radio" className='mouse-pointer'>Received</Label>
                                    </div>
                                    <div className='me-4'>
                                        <Input
                                            type="radio"
                                            className='me-2 mouse-pointer'
                                            id="given-radio"
                                            onChange={e => {
                                                setBahikhataArr({ ...bahikhataArr, payment_type: "given" })
                                            }}
                                            checked={bahikhataArr.payment_type === "given"}
                                            name='payment-type'
                                        />
                                        <Label htmlFor='given-radio' className='mouse-pointer'>Given</Label>
                                    </div>

                                </div>
                            </FormGroup>
                        </Col>

                        <Col md={12}>
                            <FormGroup>
                                <Label>Payment Date <span className="text-red"> * </span></Label>
                                <Flatpickr

                                style={{fontStyle: 'italic',
                                fontFamily: 'Arial, sans-serif',}}
                                    className='form-control'
                                    onChange={e => {
                                        const d = e[0]
                                        setBahikhataArr({ ...bahikhataArr, payment_date: d })
                                    }}
                                    options={{ allowInput: true, dateFormat: "d-M-Y" }}
                                    value={bahikhataArr.payment_date}
                                    required={true}
                                    placeholder='Payment Date'
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
                                            onChange={e => {
                                                setBahikhataArr({ ...bahikhataArr, payment_mode: "online" })
                                            }}
                                            checked={bahikhataArr.payment_mode === "online"}
                                            name='payment-mode'
                                        />
                                        <Label htmlFor="online-radio" className='mouse-pointer'>Online</Label>
                                    </div>
                                    <div className='me-4'>
                                        <Input
                                            type="radio"
                                            className='me-2 mouse-pointer'
                                            id="cheque-radio"
                                            onChange={e => {
                                                setBahikhataArr({ ...bahikhataArr, payment_mode: "cheque" })
                                            }}
                                            checked={bahikhataArr.payment_mode === "cheque"}
                                            name='payment-mode'
                                        />
                                        <Label htmlFor='cheque-radio' className='mouse-pointer'>Cheque</Label>
                                    </div>
                                    <div>
                                        <Input
                                            type="radio"
                                            className='me-2 mouse-pointer'
                                            id="cash-radio"
                                            onChange={e => {
                                                setBahikhataArr({ ...bahikhataArr, payment_mode: "cash" })
                                            }}
                                            checked={bahikhataArr.payment_mode === "cash"}
                                            name='payment-mode'
                                        />
                                        <Label htmlFor='cash-radio' className='mouse-pointer'>Cash</Label>
                                    </div>
                                </div>
                            </FormGroup>
                        </Col>

                        <Col md={12}>
                            <FormGroup>
                                <Label>Amount <span className="text-red"> * </span></Label>
                                <Input
                                style={{fontStyle: 'italic',
                                fontFamily: 'Arial, sans-serif',}}
                                    type="number"
                                    onChange={e => {
                                        const val = e.target.value
                                        setBahikhataArr({ ...bahikhataArr, amount: val })
                                    }}
                                    value={bahikhataArr.amount}
                                    required={true}
                                    rows={4}
                                    placeholder='Enter Amount'
                                />
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Payment Notes <span className="text-red"> * </span></Label>
                                <Input

                                style={{fontStyle: 'italic',
                                fontFamily: 'Arial, sans-serif',}}
                                    type='textarea'
                                    onChange={e => {
                                        const val = e.target.value
                                        setBahikhataArr({ ...bahikhataArr, payment_notes: val })
                                    }}
                                    value={bahikhataArr.payment_notes}
                                    required={true}
                                    rows={4}
                                    placeholder='Enter Payment Notes'
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button
                        type="button"
                        onClick={() => {
                            setBahikhataModalIsOpen(!bahikhataModalIsOpen)
                        }}
                        style={{
                            backgroundColor: "#808080",   
                            border: "none"
                        }}
                    >
                        Close
                    </Button>

                    <Button
                        type="submit"

                        
                        style={{
                            border: "none",
                            backgroundColor:"#9ADC32"
                        }}
                    >
                        Save
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>




    </>)
}

export default Bahikhata