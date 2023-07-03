import React, { useState } from "react";
import {
  AiFillInfoCircle,
  AiOutlineEdit,
  AiOutlinePercentage,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { PiBookOpenLight } from "react-icons/pi";
import { BsBank2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { GiBlackBook } from "react-icons/gi";
import { Button } from "react-bootstrap";
import { BiChevronRight } from "react-icons/bi";

const DebitNote = () => {
  const [edit, setEdit] = useState(false);
  return (
    <section>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-5 col-md-10 col-sm-12 px-4">
            <h2>Create Debit Note</h2>
            <div className="d-flex justify-content-between bg-white">
              <div>
                <p
                  className="text-secondary mb-1"
                  //   style={{ paddingBottom: 0, marginBottom: 0 }}
                >
                  Debit Node#
                </p>
                <input
                  type="text"
                  value="0001"
                  style={{ width: "50%" }}
                  disabled={edit ? false : true}
                  className="mb-1"
                />
                <p className="text-secondary">2023-07-01</p>
              </div>
              <h5
                className="text-primary fw-bold"
                onClick={() => setEdit((state) => !state)}
              >
                {edit ? "Save" : "Edit"}
              </h5>
            </div>
            <div>
              <p className="mb-1 fw-bold">
                Party <AiFillInfoCircle />
              </p>
              <p className="text-primary bg-white" style={{ fontSize: "20px" }}>
                <AiOutlinePlusCircle className="mx-2" />
                Select Customer
              </p>
            </div>
            <div>
              <p className="mb-1 fw-bold">
                Products
                <AiFillInfoCircle className="mx-2" />
              </p>
              <p className="text-primary bg-white" style={{ fontSize: "20px" }}>
                <AiOutlinePlusCircle className="mx-2" />
                Add Products
              </p>
            </div>
            <div className="d-flex justify-content-between bg-white">
              <p className="fw-bold">Optional</p>
              <h5 className="text-primary fw-bold">
                <AiOutlinePlusCircle className="mx-2" />
                Additional Charges
              </h5>
            </div>
            <div className="rounded">
              <p className="d-flex align-items-center fw-bold fs-5 text-secondary">
                <BsBank2 className="mx-2" />
                Enter Bank Details
              </p>
              <p className="d-flex align-items-center fw-bold fs-5 text-secondary">
                <AiOutlineEdit className="mx-2" />
                Select Signature
              </p>
              <p className="d-flex align-items-center fw-bold fs-5 text-secondary">
                <PiBookOpenLight className="mx-2" />
                Add Notes
              </p>
              <p className="d-flex align-items-center fw-bold fs-5 text-secondary">
                <GiBlackBook className="mx-2" />
                Add Tearms
              </p>
              <div className="d-flex align-items-center justify-content-between">
                <p className="d-flex align-items-center fw-bold fs-5 text-secondary">
                  <AiOutlinePercentage className="mx-2" />
                  Extra Discount
                </p>
                <p className="text-danger fw-bold">-0</p>
              </div>
              <div>
                <p className="fw-bold fs-5">Received Amount</p>
              </div>
              <div className="d-flex align-items-center justify-content-between bg-white">
                <div>
                  <p className="fw-bold">Total Amount</p>
                  <p>₹ 0.00</p>
                </div>
                <div>
                  <Button>
                    Create
                    <BiChevronRight />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DebitNote;
