import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { handelAddcategoryRequest } from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { Button } from "react-bootstrap";

const AddCategory = () => {
  const { saasId, storeId } = JSON.parse(localStorage.getItem("User_data"));
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  //   handelAddcategoryRequest

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      handelAddcategoryRequest({
        saas_id: saasId,
        store_id: storeId,
        category: category,
      })
    );
    setCategory("");
  };

  return (
    <div>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-5 col-md-10 col-sm-12 px-5">
            <form className="form-box" onSubmit={handleSubmit}>
              <h4>Add Category</h4>

              <div>
                <TextField
                  size="small"
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
                  label="Category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                />
              </div>

              <div className="mt-3">
                <Button
                  //   to={"/home"}
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    // backgroundColor: "yellowgreen",
                    outline: "none",
                    border: "none",
                    fontSize: "20px",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    color: "#fff",
                  }}>
                  Save
                </Button>
                <Link
                  to="/"
                  type="submit"
                  // onClick={()=>}
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "gray",
                    outline: "none",
                    border: "none",
                    marginLeft: "20px",
                    fontSize: "20px",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    color: "#fff",
                  }}>
                  Close
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
