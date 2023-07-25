import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { Button, Card, CardBody, Col, Input, Label, Row } from 'reactstrap';
import { host } from "../../../../URL";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { MdDelete, MdEdit, MdPlaylistAdd } from "react-icons/md"
import { handleStoreMasterListRequest, handleSearchedDataRequest1 } from '../../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement';
import { toast } from 'react-toastify';
import AddItem from './UpdateStore';
import "./index.css"
import { useNavigate } from 'react-router-dom';

const ItemMaster = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { item_master_list, user_data } = useSelector((e) => e.ComponentPropsManagement);
    const {
        createdAt,
        password,
        registerId,
        status,
        storeId,
        storeName,
        userId,
        userName,
        saasId
    } = localStorage.getItem("User_data")
            ? JSON.parse(localStorage.getItem("User_data"))
            : {};
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [flag, setFlag] = useState(false)
    const [searchVal, setSearchVal] = useState("")

    useEffect(() => {
        setLoading(true)
        dispatch(handleStoreMasterListRequest({ currentPage }))
        //console.log()
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }, [currentPage, flag])

    const handlePageChange = (page) => {
        setCurrentPage(page)
    };

    const columns = [
        {
            name: 'User Id',
            center: true,
            selector: row => row.item_name,
            cell: row => {
                return (<>
                    <div style={{ fontWeight: "bolder" }}>
                        {row.item_name}
                    </div>
                </>)
            }
        },
        {
            name: 'Store Id',
            center: true,
            selector: row => row.category,
        },
        {
            name: 'Store Name',
            center: true,
            selector: row => row.description,
        },
        {
            name: 'State',
            center: true,
            selector: row => row.discount,
        },
        {
            name: 'Saas Id',
            center: true,
            selector: row => row.price,
        },
        {
            name: 'City',
            center: true,
            selector: row => row.hsn_code,
        },
        {
            name: 'Country',
            center: true,
            selector: row => row.tax,
        },
        {
            name: 'Address',
            center: true,
            selector: row => row.tax_code,
        },
        {
            name: 'Taxable',
            center: true,
            selector: row => row.tax_percent,
        },
        {
            name: 'GST Code',
            center: true,
            selector: row => row.tax_rate,
        },
        {
            name: "Action",
            center: true,
            selector: row => {
                const [addUpdateItemModalIsOpen, setAddUpdateItemModalIsOpen] = useState(false)
                const handleDelete = async () => {

                    try {
                        const response = await fetch(`${host}item/inactive-item/${row.item_id}/${saasId}`, {
                            method: "PUT",
                        });
                        const jsonData = await response.json();
                        if (jsonData) {
                            if (jsonData.status === true) {
                                toast.success(jsonData.message)
                                setFlag(!flag);
                                return;
                            }
                            toast.error(jsonData.message)
                            setFlag(!flag);
                        } else {
                            toast.error("Something went wrong server side");
                        }
                    } catch (err) {
                        toast.error(err.message);
                    }
                }

                return (<>
                    <div className='d-flex'>

                        <div className='me-2'>
                            <MdPlaylistAdd
                                size={22}
                                color='green'
                                className='mouse-pointer'
                                onClick={() => navigate("/add-item")}
                            />
                        </div>


                        <div className='me-2'>
                            <MdDelete
                                size={22}
                                color='red'
                                className='mouse-pointer'
                                onClick={() => handleDelete()}
                            />
                        </div>

                        <div>
                            <MdEdit
                                size={22}
                                color='var(--primary1)'
                                className='mouse-pointer'
                                onClick={() => {
                                    setAddUpdateItemModalIsOpen(!addUpdateItemModalIsOpen)
                                }}
                            />
                        </div>
                    </div>

                    <AddItem
                        addUpdateItemModalIsOpen={addUpdateItemModalIsOpen}
                        setAddUpdateItemModalIsOpen={setAddUpdateItemModalIsOpen}
                        row={row}
                        setFlag={setFlag}
                        flag={flag}
                    />
                </>)
            }
        }
    ]

    const handleSearch = () => {
        if (searchVal) {
            dispatch(handleSearchedDataRequest1({ searchValue: searchVal }));
        } else {
            setFlag(!flag)
        }
    };
    // const data = []
    console.log("Store8",item_master_list);
    return (<>

        <Card className='my-3'>
            <CardBody>
                <Row>
                    <Col md={5}>

                        <Input
                            type='text'
                            onChange={e => {
                                setSearchVal(e.target.value)
                            }}
                            value={searchVal}
                            placeholder='Search...'
                        />
                    </Col>
                    <Col md={3}>
                        <Button
                            style={{ backgroundColor: "var(--primary1)" }}
                            onClick={() => {
                                handleSearch()
                            }}
                        >Search</Button>
                    </Col>
                </Row>
            </CardBody>
        </Card>

        <DataTable
            columns={columns}
            responsive={true}
            // fixedHeader={true}
            // fixedHeaderScrollHeight="300px"

            data={item_master_list ? item_master_list?.list : []}
           
            progressPending={loading}
            pagination
            paginationServer
            paginationTotalRows={item_master_list ? item_master_list.totalCount : 1}
            // onChangeRowsPerPage={10}
            onChangePage={handlePageChange}
        />
    </>)
}

export default ItemMaster