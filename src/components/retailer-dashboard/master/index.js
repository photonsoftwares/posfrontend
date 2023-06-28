import React, { useState } from 'react'
import { Button, CardText, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane, Card, CardTitle } from 'reactstrap';
import HSNMaster from './hsn-master'
import SupplierMaster from './supplier-master'
import TaxMaster from './tax-master';

const Master = () => {
    const [activeTab, setActiveTab] = useState("1")

    const tabArray = [
        {
            id: "1",
            name: "Supplier Master",
            className: "active"
        },
        {
            id: "2",
            name: "Tax Master",
            className: "active"
        },
        {
            id: "3",
            name: "HSN Master",
            className: "active"
        }
    ]

    return (<>

        <div className='container' style={{ backgroundColor: "var(--primary2)", padding: "30px" }}>
            <Nav tabs>
                {tabArray.map((item, index) => {
                    return (<>
                        <NavItem style={{ backgroundColor: "var(--primary1)" }}>
                            <NavLink
                                style={{ color: String(index + 1) === activeTab ? "black" : "white", fontWeight: "bold" }}
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
                    <SupplierMaster />
                </TabPane>


                <TabPane tabId="2">
                    <TaxMaster />
                </TabPane>

                <TabPane tabId="3">
                    <HSNMaster />
                </TabPane>
            </TabContent>
        </div>


    </>)
}

export default Master