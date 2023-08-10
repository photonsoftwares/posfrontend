import React, { useState } from "react";
import Purchase from "./Purchase/Purchase";
import Expences from "./Expenses/Expences";
import Baikhata from "./Baikhata/Baikhata";
import Challan from "./Challan/Challan";
import DaySale from "./Day-sales/DaySale";
// import DebitNote from './Debit-Note/DebitNote';

import { TabContent, Nav, NavItem, NavLink, TabPane } from "reactstrap";
import ItemMaster from "../master/item-master";
import SupplierMaster from "../master/supplier-master";
import TaxMaster from "../master/tax-master";
import HSNMaster from "../master/hsn-master";
import SaasMaster from "../master/saas-master";
import UserMaster from "../master/user-master";
import StoreMaster from "../master/store-master";

export default function Misreport() {
  const [activeTab, setActiveTab] = useState("1");

  const tabArray = [
    {
      id: "1",
      name: "Purchase",
      className: "active",
      isActive: true,
    },

    {
      id: "2",
      name: "Expenses",
      className: "active",
      isActive: true,
    },

    {
      id: "3",
      name: "Debit Note",
      className: "active",
      isActive: true,
    },

    {
      id: "4",
      name: "Challan",
      className: "active",
      isActive: true,
    },

    {
      id: "5",
      name: "Baikhata",
      className: "active",
      isActive: true,
    },
    {
      id: "6",
      name: "Day Sales",
      className: "active",
      isActive: true,
    },
  ];

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

  return (
    <>
      <Nav tabs className="mt-3">
        {tabArray
          .filter((io) => io.isActive === true)
          .map((item, index) => {
            return (
              <>
                <NavItem
                  style={{
                    backgroundColor: "var(--primary1)",
                    borderRadius:
                      String(index + 1) === activeTab ? "10px" : "0px",
                    border: "none",
                  }}
                >
                  <NavLink
                    style={{
                      color:
                        String(index + 1) === activeTab ? "black" : "white",
                      fontWeight: "bold",
                      border: "none",
                    }}
                    className={`${
                      String(index + 1) === activeTab && "active"
                    } mouse-pointer`}
                    onClick={() => {
                      setActiveTab(String(index + 1));
                    }}
                  >
                    {/* <span style={{ color: "white" }}> */}
                    {item.name}
                    {/* </span> */}
                  </NavLink>
                </NavItem>
              </>
            );
          })}
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <ItemMaster />
        </TabPane>

        <TabPane tabId="2">
          <SupplierMaster />
        </TabPane>

        <TabPane tabId="3">
          <TaxMaster />
        </TabPane>

        <TabPane tabId="4">
          <HSNMaster />
        </TabPane>

        <TabPane tabId="5">
          <SaasMaster />
        </TabPane>

        <TabPane tabId="6">
          <UserMaster />
        </TabPane>

        <TabPane tabId="7">
          <StoreMaster />
        </TabPane>
      </TabContent>
    </>
  );
}
