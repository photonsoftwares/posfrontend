import React, { useState, useEffect } from 'react'
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap'
import { handleUomListRequest } from '../../redux/actions-reducers/ComponentProps/ComponentPropsManagement'

const UOM = ({ uomModalIsOpen, setUomModalIsOpen }) => {
    const { uom_list_data } = useSelector((e) => e.ComponentPropsManagement);
    console.log("uom_list_data", uom_list_data)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(handleUomListRequest())
    }, [])

    return (<>
        <Modal isOpen={uomModalIsOpen} toggle={() => setUomModalIsOpen(!uomModalIsOpen)}>
            <ModalHeader>
                <HiOutlineArrowSmallLeft
                    className='mouse-pointer'
                    onClick={() => {
                        setUomModalIsOpen(!uomModalIsOpen)
                    }}
                />&nbsp;
                UOM List
            </ModalHeader>
            <ModalBody>
                <Table className='table table-bordered text-center' >
                    <thead>
                        <tr>
                            <th>UOM Id</th>
                            <th>UOM Name</th>
                            <th>Saas Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                        </tr>
                    </tbody>
                </Table>
            </ModalBody>
            <ModalFooter>
                <Button
                    type="button"
                    onClick={() => {
                        setUomModalIsOpen(!uomModalIsOpen)
                    }}
                    style={{
                        backgroundColor: "#fc0202",
                        border: "none"
                    }}
                >
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    </>)
}

export default UOM