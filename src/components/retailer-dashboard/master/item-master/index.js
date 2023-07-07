import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { Button, Card, CardBody } from 'reactstrap';
import { host } from "../../../../URL";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { MdDelete, MdEdit } from "react-icons/md"
import { handleItemMasterListRequest } from '../../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement';
import { toast } from 'react-toastify';
import AddItem from './AddItem';

const ItemMaster = () => {
    const dispatch = useDispatch()
    const { item_master_list, user_data } = useSelector((e) => e.ComponentPropsManagement);
    const {
        createdAt,
        password,
        registerId,
        status,
        saasId,
        storeId,
        storeName,
        userId,
        userName,
    } = localStorage.getItem("User_data")
            ? JSON.parse(localStorage.getItem("User_data"))
            : {};
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [flag, setFlag] = useState(false)

    useEffect(() => {
        setLoading(true)
        dispatch(handleItemMasterListRequest({ currentPage }))
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }, [currentPage, flag])

    const handlePageChange = (page) => {
        setCurrentPage(page)
    };

    const columns = [
        {
            name: 'Item Name',
            center: true,
            selector: row => row.item_name,
        },
        {
            name: 'Category',
            center: true,
            selector: row => row.category,
        },
        {
            name: 'Description',
            center: true,
            selector: row => row.description,
        },
        {
            name: 'Discount',
            center: true,
            selector: row => row.discount,
        },
        {
            name: 'Price',
            center: true,
            selector: row => row.price,
        },
        {
            name: 'HSN Code',
            center: true,
            selector: row => row.hsn_code,
        },
        {
            name: 'Tax',
            center: true,
            selector: row => row.tax,
        },
        {
            name: 'Tax Code',
            center: true,
            selector: row => row.tax_code,
        },
        {
            name: 'Tax Percent',
            center: true,
            selector: row => row.tax_percent,
        },
        {
            name: 'Tax Rate',
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
                            <MdDelete
                                size={22}
                                color='var(--primary1)'
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
    // const data = []
    return (<>

        <DataTable
            columns={columns}
            responsive={true}
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