import React, { useState } from 'react';
import { Button, CardText, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane, Card, CardTitle } from 'reactstrap';
import ProductUpload from '../product-upload';
import SalesDashboard from '../sales-dashboard';
import InventoryDashboard from '../inventory-dashboard';
import Navbar from '../navbar';
import Master from '../master';
import SalesAndGstReport from '../sales-and-gst-report';

function Home() {
    const [headActiveTab, setHeadActiveTab] = useState("1")
    const [activeTab, setActiveTab] = useState("1")

    // const headArray = [
    //     {
    //         id: "1",
    //         name: "Sales and GST Report",
    //         className: "active",
    //         isActive: true
    //     }
    // ]

    const tabArray = [
        {
            id: "1",
            name: "Sales and GST Report",
            className: "active",
            isActive: true
        },
        {
            id: "2",
            name: "Product Upload",
            className: "active",
            isActive: true
        },
        {
            id: "3",
            name: "Sales Dashboard",
            className: "active",
            isActive: true
        },
        {
            id: "4",
            name: "Inventory Dashboard",
            className: "active",
            isActive: true
        },
        {
            id: "5",
            name: "Master",
            className: "active",
            isActive: true
        }
    ]


    return (<>
        {/* <Navbar /> */}
        <div className='container' style={{ backgroundColor: "var(--primary2)", padding: "30px" }}>
            <Nav tabs className='mt-3'>
                {tabArray.filter(io => io.isActive === true).map((item, index) => {
                    return (<>
                        <NavItem style={{ backgroundColor: "var(--primary1)", borderRadius: String(index + 1) === activeTab ? "10px" : "0px", border: "none" }}>
                            <NavLink
                                style={{ color: String(index + 1) === activeTab ? "black" : "white", fontWeight: "bold", border: "none" }}
                                className={`${String(index + 1) === activeTab && "active"} mouse-pointer`}
                                onClick={() => {
                                    setActiveTab(String(index + 1))
                                }}
                            >
                                {/* <span style={{ color: "white" }}> */}
                                {item.name}
                                {/* </span> */}
                            </NavLink>
                        </NavItem>
                    </>)
                })}
            </Nav>
            <TabContent activeTab={activeTab}>

                <TabPane tabId="1">
                    <SalesAndGstReport />
                </TabPane>

                <TabPane tabId="2">
                    <ProductUpload />
                </TabPane>

                <TabPane tabId="3">
                    <SalesDashboard />
                </TabPane>

                <TabPane tabId="4">
                    <InventoryDashboard />
                </TabPane>

                <TabPane tabId="5">
                    <Master />
                </TabPane>
            </TabContent>
        </div>
    </>);
}

export default Home;
